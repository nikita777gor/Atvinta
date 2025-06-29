import {ApiError} from "../exceptions/api-error.js";
import {API_MESSAGES} from "../messages/api-messages.js";
import {userComponentDto} from "../dtos/userComponent-dto.js";
import {userModel} from "../models/user-model.js";
import {componentModel} from "../models/component-model.js";

import {coinsService} from "./coins-service.js";
import {componentsService} from "./components-service.js";



class UserComponentsService {

    async getUserComponent(componentId, select){
        const component = await componentModel.findOne({_id: componentId}).select(select);
        return component;
    }

    async incrementUserComponent(userId, componentId, count = 1){

        const components = await userModel.findOneAndUpdate({
                _id: userId,
                'storage.component': componentId,
                storage: {$elemMatch: {'component': componentId, count: {$gt: count < 0 ? -count : 0}}}
            },
            { $inc: { 'storage.$[el].count': count }},
            {arrayFilters: [{ 'el.component': componentId }],
                new: true,
                // projection: {storage: {$elemMatch: {'component': componentId}}}
            }
        ).populate({
            path: 'storage.component',
            select: 'name image sellPrice'
        }).select('storage -_id');

        return components;
    }


    async toggleUserComponent(userId, componentId, action){

        const queryFilter = () => {
            if(action === 'remove') return {_id: userId, 'storage.component': componentId};
            return {_id: userId};
        }

        const components = await userModel.findOneAndUpdate(queryFilter(),
            action === 'add' ? {$push: {storage: {component: componentId}}} : {$pull: {storage: {component: componentId}}},
            {new: true,
                // projection: {storage: {$elemMatch: {'component': componentId}}}
            },
        ).populate({
            path: 'storage.component',
            select: 'name image sellPrice'
        }).select('storage')

        return components;
    }

    // Метод обьединяющий прибавление/убавление кол-во комплектующих и добавления/удаления комплектующих
    async actionUserComponent(userId, componentId, count, error){
        const incrementedComponents = await this.incrementUserComponent(userId, componentId, count);
        if(incrementedComponents) {
            return incrementedComponents.storage;
        }

        const toggledComponents = await this.toggleUserComponent(userId, componentId, count < 0 ? 'remove' : 'add');
        if(!toggledComponents){
            throw ApiError.BadRequest(error);
        };
        return toggledComponents.storage;
    }


    async buyUserComponent(userId, componentId){

        const {buyPrice} = await this.getUserComponent(componentId, 'buyPrice -_id');
        if(!buyPrice){
            throw ApiError.BadRequest(API_MESSAGES.error.userComponents.buy);
        }
        const coins = await coinsService.changeCoinsCount(userId, -buyPrice);
        if(!coins){
            throw ApiError.BadRequest(API_MESSAGES.error.userComponents.buyCoins);
        }

        const components = await this.actionUserComponent(userId, componentId, 1, API_MESSAGES.error.userComponents.buy);
        return components.map((item) => userComponentDto(item.component, item.count));
    }

    async sellUserComponent(userId, componentId){

        const {sellPrice} = await this.getUserComponent(componentId, 'sellPrice -_id');
        if(!sellPrice){
            throw ApiError.BadRequest(API_MESSAGES.error.userComponents.sell);
        }
        const coins = await coinsService.changeCoinsCount(userId, sellPrice);
        if(!coins){
            throw ApiError.BadRequest(API_MESSAGES.error.userComponents.sellCoins);
        }

        const components = await this.actionUserComponent(userId, componentId, -1, API_MESSAGES.error.userComponents.sell);
        return components.map((item) => userComponentDto(item.component, item.count));
    }


    // Заполнение отстуствующих комплектующих на складе для отправления на фронтенд
    async fillEmptyUserComponents(userId, userComponents){
        const allComponents = await componentsService.getComponents('name image sellPrice');

        const newComponents = allComponents.map((component) => {
            const compareIndex = userComponents.findIndex((userComponent) => {return userComponent.component.equals(component._id)});
            component.count = compareIndex !== -1 ? userComponents[compareIndex].count : 0
            return component
        })

        return newComponents;
    }

}

export const userComponentsService = new UserComponentsService();