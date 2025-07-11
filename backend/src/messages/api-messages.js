export const API_MESSAGES = {
    error: {
        main: {
            serverError: 'Ошибка сервера',
            notFound: 'Данный маршрут не найдет 404',
            unauthorized: 'Ошибка, пользователь не авторизован'
        },
        user: {
            auth: 'Ошибка авторизации пользователя',
            get: 'Ошибка получения данных пользователя',
        },
        coins: {
            changeCount: 'Ошибка изменения количества монет'
        },
        components: {
            get: 'Ошибка получения всех комплектующих'
        },
        userComponents: {
            buyValidation: 'Ошибка, не корректные данные для покупки комплектующей',
            buyCoins: 'Ошибка, не хватает коинов для покупки комплектующей',
            buy: 'Ошибка, не удалось купить комплектующее',
            sellValidation: 'Ошибка, не корректные данные для продажи комплектующей',
            sellCoins: 'Ошибка, при продаже число коинов привысит максимально допустимое значение',
            sell: 'Ошибка, не удалось продать комплектующее'
        },
        production: {
            changeRobot: 'Ошибка изменения вида робота',
            changeRobotValidation: 'Ошибка, не корректные данные для изменения вида робота',
            addComponent: 'Ошибка, не удалось добавить комплектующую в производство робота',
            addComponentMax: 'Ошибка, для производства данного робота больше не требуется такая комплеткующая',
            addNotAvailableComponent: 'Ошибка, добавляемой комплектующей нет на складе',
            removeComponent: 'Ошибка, не удалось удалить комплектующую из производства робота',
            removeNotAvailableComponent: 'Ошибка, удаляемой комплектующей нет в производстве',
            createRobot: 'Ошибка создания робота',
            createRobotComponents: 'Ошибка, для создания робота установленны не все комплектующие',
            createRobotCoins: 'Ошибка, не хватает коинов для создания робота'
        }

    },
    success: {
        user: {
            auth: 'Пользователь успешно авторизован',
            get: 'Данные пользователя успешно получены'
        },
        coins: {
            changeCount: 'Количество монет успешно изменено'
        },
        components: {
            get: "Все коплектующие успешно получены",
        },
        userComponents: {
            buy: 'Покупка комплектующей прошла успешна',
            sell: 'Продажа комплектующей прошла успешна'
        },
        production: {
            changeRobot: 'Вид робота для изготовления успешно изменен',
            addComponent: 'Комплектующая успешно добавлена в производство робота',
            removeComponent: 'Комплектующая успешно удалена из производства робота',
            createRobot: 'Робот успешно создан'
        }
    }
}