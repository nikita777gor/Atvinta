import {API_MESSAGES} from "../messages/api-messages.js";

export class ApiError extends Error {

    status;
    errors;

    constructor(status, message, errors = []){
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static BadRequest(status, message, errors = []){
        return new ApiError(400, message, errors);
    }

    static Unauthorized(){
        console.log(Error);
        return new ApiError(401, API_MESSAGES.error.user.userNotAuth)
    }

}