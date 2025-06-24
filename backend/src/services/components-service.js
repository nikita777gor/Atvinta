import {componentModel} from "../models/component-model.js";
import {ApiError} from "../exceptions/api-error.js";

class ComponentsService {

    async getAllComponents(){
        const components = await componentModel.find();
        return components;
    }

}

export const componentsService = new ComponentsService();