import {ApiError} from "../exceptions/api-error.js";
import {API_MESSAGES} from "../messages/api-messages.js";
import {productionComponentDto} from "../dtos/productionComponent-dto.js";

import {userModel} from "../models/user-model.js";
import {robotModel} from "../models/robot-model.js";

import {userComponentsService} from "./userComponents-service.js";
import {coinsService} from "./coins-service.js";


class ProductionService {

    productionPopulate = [
        {
            path: 'production.robot',
            select: 'images type stabilizer createPrice'
        },
        {
            path: 'production.components.component',
            select: 'icons name'
        }
    ]

    async getRobotBySelectors(type, stabilizer){
        const robot = await robotModel.findOne({type, stabilizer}).lean();
        return robot;
    }

    async getProduction(userId){
        const production = await userModel.findOne({_id: userId}).select('production')
            .populate({
                path: 'production.robot',
                select: 'images type stabilizer createPrice'
            })
        return production;
    }

    async getProductionComponent(userId, componentId){
        const productionData = await userModel.findOne({_id: userId}, {'production': 1}).lean()

        console.log(productionData.production.components)

        const component = productionData.production.components.find((component) => component.component == componentId);

        return component;
    }


    async resetProductionComponents(userId){
        const productionData = await userModel.findOneAndUpdate({_id: userId},
            {'production.components.$[].count': 0}
        ).select('production.components');

        return productionData;
    }

    async changeProductionRobot(userId, type, stabilizer) {
        const robot = await this.getRobotBySelectors(type, stabilizer);
        if(!robot){
            throw ApiError.BadRequest(API_MESSAGES.error.production.changeRobot);
        }

        const userData = await userModel.findOne({_id: userId})
        .populate( {
            path: 'production.robot',
            select: 'images type stabilizer createPrice'
        }).lean();

        if(!userData){
            throw ApiError.BadRequest(API_MESSAGES.error.production.changeRobot);
        }

        // Добавление комплетующих обратно на склад (можно было написать эту логику в прошлом запросе с помощью агрегаци, но получался сложный не читабельный запрос поэтому решил не уделять этому много времени)
        const clearProductionComponents = userData.production.components;
         for(let component of clearProductionComponents){
            if(component.count === 0){
                continue;
            }
            const storageComponentIndex = userData.storage.findIndex((item) => {
                return item.component.equals(component.component);
            })
            if(storageComponentIndex !== -1){
                userData.storage[storageComponentIndex].count += component.count;
            }else{
                userData.storage.push({
                    component: component.component,
                    count: component.count
                })
            }
        }

        const newProductionComponents = robot.components.map((component) => {
            return {
                component: component.component,
                count: 0,
                maxCount: component.count
            }
        })

        const productionData = await userModel.findOneAndUpdate({_id: userId},
            {'production.robot': robot._id,
                    'production.components': newProductionComponents,
                    'storage': userData.storage
            }, {new: true})
            .populate(this.productionPopulate).lean();


        // Преобразование для удобной работы на фронтенде
        const newComponents = productionData.production.components.map((item) => productionComponentDto(item.component, item.count, item.maxCount));
        productionData.production.components = newComponents;
        return productionData.production;
    }


    async incrementProductionComponent(userId, componentId, count){
        const production = await userModel.findOneAndUpdate({
                _id: userId,
                'production.components': {$elemMatch: {$and: [
                    {component: componentId}, {count: count < 0 ? {$gte: -count} : {$gte: 0}} // Проверка при убавлении количества компонентов чтобы оно не становило отрицательным
                        ]}}},
            { $inc: { 'production.components.$[el].count': count }},
            {arrayFilters: [{ 'el.component': componentId }], new: true},
        ).populate(this.productionPopulate).select('production').lean();

        return production;

    }

    async addProductionComponent(userId, componentId){

        // Проверка привысит ли добавленная комплектующая число комплектующих для сборки робота
        // (Смог сделать решение только через еще одни запрос, т.к. в последующем запросе mongo из за своих особенностей не позволяет сравнивать значения субдокумента находящегося в массиве)
        const productionComponent = await this.getProductionComponent(userId, componentId);
        if(!productionComponent){
            throw ApiError.BadRequest(API_MESSAGES.error.production.addComponent);
        }

        if(productionComponent.count + 1 > productionComponent.maxCount){
            throw ApiError.BadRequest(API_MESSAGES.error.production.addComponentMax);
        }

        await userComponentsService.actionUserComponent(userId, componentId, -1, API_MESSAGES.error.production.addNotAvailableComponent);

        const productionData = await this.incrementProductionComponent(userId, componentId, 1);
        if(!productionData){
            throw ApiError.BadRequest(API_MESSAGES.error.production.addComponent)
        }

        return productionData.production.components.map((item) => productionComponentDto(item.component, item.count, item.maxCount));
    }


    async removeProductionComponent(userId, componentId){

        const productionData = await this.incrementProductionComponent(userId, componentId, -1);
        if(!productionData){
            throw ApiError.BadRequest(API_MESSAGES.error.production.removeNotAvailableComponent)
        }

        await userComponentsService.actionUserComponent(userId, componentId, 1, API_MESSAGES.error.production.removeComponent);

        return productionData.production.components.map((item) => productionComponentDto(item.component, item.count, item.maxCount));
    }


    async createProductionRobot(userId){
        const productionData = await this.getProduction(userId);
        if(!productionData){
            throw ApiError.BadRequest(API_MESSAGES.error.production.createRobot)
        }

        const {robot, components} = productionData.production;

        console.log(components);

        const createStatus = !components.find((component) => component.count !== component.maxCount);
        if(!createStatus){
            throw ApiError.BadRequest(API_MESSAGES.error.production.createRobotComponents);
        }

        const coinsCount = await coinsService.changeCoinsCount(userId, -robot.createPrice);
        if(!coinsCount){
            throw ApiError.BadRequest(API_MESSAGES.error.production.createRobotCoins)
        }

        const resetComponents = await this.resetProductionComponents(userId);
        if(!resetComponents){
            throw ApiError.BadRequest(API_MESSAGES.error.production.createRobot)
        }

        return robot;
    }

}

export const productionService = new ProductionService();