export const API_MESSAGES = {
    error: {
        main: {
            serverError: 'Ошибка сервера'
        },
        user: {
            authUser: 'Ошибка авторизации пользователя',
            userNotAuth: 'Пользователь не авторизован',
            getUser: 'Ошибка получения данных пользователя',
        },
        components: {
            getComponents: 'Ошибка получения комплектующих'
        }
    },
    success: {
        user: {
            authUser: 'Пользователь успешно авторизован',
            getUser: 'Данные пользователя успешно получены'
        },
        components: {
            getComponents: 'Все комплектующие успешно получены'
        }
    }
}