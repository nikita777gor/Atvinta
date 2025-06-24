export class ApiError extends Error {

    status;
    errors;

    constructor(status, message, errors = []){
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static BadRequest(status, message, errors){
        console.log(Error);
        return new ApiError(status, message, errors);
    }

    static Unauthorized(){
        console.log(Error);
        return new ApiError(401, 'Пользователь не авторизован')
    }

}