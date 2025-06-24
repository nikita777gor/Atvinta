import {responseHelper} from "../helpers/response-helper.js";
import {componentsService} from "../services/components-service.js";
import {API_MESSAGES} from "../messages/api-messages.js";

class ComponentsController {

    async getAllComponents(req, res, next){
        const components = await componentsService.getAllComponents();
        responseHelper(res, components, API_MESSAGES.success.components.getComponents);
    }

}

export const componentsController = new ComponentsController();