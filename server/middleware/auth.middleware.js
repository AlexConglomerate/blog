const tokenSerice = require('../services/token.service')

module.exports = async (req, res, next) => {
    if (req.method === 'OPTION') {
        return next
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // достаём токен
        if (!token) {
            return res.status(401).json({message: 'Unauthorized'})
        }

        const data = tokenSerice.validateAccess(token) // валидируем, а затем и принимаем распарсеные токены

        if (!data) {
            return res.status(401).json({message: 'Unauthorized'})
        }

        req.user = data // модифицируем req для других методов
        // может сюда ещё записывать, права пользователя для команды?

        next() // продолжаем работу
    } catch (error) {
        console.log(`error`, error)
        res.status(401).json({message: 'Unauthorized'})
    }
}
