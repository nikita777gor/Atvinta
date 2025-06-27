import {componentModel} from "../models/component-model.js";

import {ApiError} from "../exceptions/api-error.js";
import {API_MESSAGES} from "../messages/api-messages.js";

class ComponentsService {

    async getComponents(select = 'name image buyPrice'){
        const components = await componentModel.find({}, (select)).lean();
        if(!components){
            throw ApiError.BadRequest(API_MESSAGES.error.components.get);
        }
        return components;
    }


}

export const componentsService = new ComponentsService();