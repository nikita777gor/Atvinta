export const responseHelper = (res, data, message, status = 200) => {
    return res.status(status).json({status: 'success', message, data})
}