import {API_MESSAGES} from "../messages/api-messages.js";

export class ApiError extends Error {

    errors;

    constructor(status, message){
        super(message);
        this.status = status;
    }

    static BadRequest(message){
        return new ApiError(400, message);
    }

    static Unauthorized(){
        return new ApiError(401, API_MESSAGES.error.main.unauthorized)
    }

    static NotFound(){
        return new ApiError(404, API_MESSAGES.error.main.notFound)
    }

}