import {ApiError} from "../exceptions/api-error.js";
import {API_MESSAGES} from "../messages/api-messages.js";
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

        const component = await userModel.findOneAndUpdate({
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
        }).select('storage');

        return component;
    }


    async actionUserComponent(userId, componentId, action){

        const component = await userModel.findOneAndUpdate({_id: userId},
            action === 'add' ? {$push: {storage: {component: componentId}}} :{$pull: {storage: {component: componentId}}},
            {new: true,
                // projection: {storage: {$elemMatch: {'component': componentId}}}
            },
        ).populate({
            path: 'storage.component',
            select: 'name image sellPrice'
        }).select('storage')

        return component;
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

        const incrementedComponent = await this.incrementUserComponent(userId, componentId);
        if(incrementedComponent) return incrementedComponent;

        const addedComponent = await this.actionUserComponent(userId, componentId, 'add');
        if(!addedComponent){
            throw ApiError.BadRequest(API_MESSAGES.error.userComponents.buy);
        };

        return addedComponent;

    }


    async sellUserComponent(userId, componentId){

        const {sellPrice} = await this.getUserComponent(componentId, 'sellPrice -_id');
        console.log(sellPrice);
        if(!sellPrice){
            throw ApiError.BadRequest(API_MESSAGES.error.userComponents.sell);
        }
        const coins = await coinsService.changeCoinsCount(userId, sellPrice);
        if(!coins){
            throw ApiError.BadRequest(API_MESSAGES.error.userComponents.sellCoins);
        }

        const incrementedComponent = await this.incrementUserComponent(userId, componentId, -1);
        console.log('INCREMENT')
        console.log(incrementedComponent);
        if(incrementedComponent) return incrementedComponent;

        const removedComponent = await this.actionUserComponent(userId, componentId, 'remove');
        if(!removedComponent){
            throw ApiError.BadRequest(API_MESSAGES.error.userComponents.sell);
        };

        return removedComponent;

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