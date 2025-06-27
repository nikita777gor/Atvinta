import {responseHelper} from "../helpers/response-helper.js";
import {API_MESSAGES} from "../messages/api-messages.js";

import {componentsService} from "../services/components-service.js";

class ComponentsController {

    async getComponents(req, res, next){
        try{
            const components = await componentsService.getComponents();
            responseHelper(res, components, API_MESSAGES.success.components.get);
        }catch(err){
            next(err);
        }
    }


}

export const marketController = new ComponentsController();