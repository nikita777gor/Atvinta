import {ApiError} from "../exceptions/api-error.js";

import {API_MESSAGES} from "../messages/api-messages.js";

export const errorMiddleware = (err, req, res, next) => {
    console.log(err);

    // Проверка является ли ошибка экземпляром класса формирующего ошибки
    if(err instanceof ApiError){
        return res.status(err.status).json({status: 'error', message: err.message, errors: err.errors})
    }
    return res.status(500).json({status: 'error', message: API_MESSAGES.error.main.serverError})
}