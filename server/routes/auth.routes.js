const express = require('express')
const bcrypt = require(`bcryptjs`)
const User = require('../models/User.js')
const tokenSerice = require('../services/token.service')
const router = express.Router({mergeParams: true})
const {check, validationResult} = require(`express-validator`)

/*
Алгоритм регистрации:
1) Получаем от пользователя данные: почта, пароль, имя, и т.д.
2) Проверить, может такой пользователь уже существует
3) Хэшируем пароль
4) Создать пользователя
5) Сгенерировать токены, и отправить обратно
*/

/*
Пример запроса
http://localhost:8080/api/auth/signUp
{
    "email": "11121q@gmail.com",
    "password": "ftFVDFVFDFV24v"
}
*/


router.post('/signUp', [
    check('email', 'Некоректный email').isEmail(),
    check('password', `Длина пароля д.б. больше 8 символов`).isLength({min: 8}),
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({error: {message: `INVALID_DATA`, code: 400, errors: errors.array()}})
            }

            const {email, password} = req.body

            // обрабатываем ошибку: если пользователь существует
            const existingUser = await User.findOne({email})
            if (existingUser) {
                return res.status(400).json({
                    error: {message: 'EMAIL_EXIST', code: 400,}
                })
            }

            // хэшируем пароль | 12 - означает величину сложность
            const hashedPassword = await bcrypt.hash(password, 12)

            // создаём нового пользователя
            const newUser = await User.create({
                name: "Alex",
                ...req.body,
                password: hashedPassword,
            })

            // создаём токены
            const tokens = tokenSerice.generate({_id: newUser._id})

            await tokenSerice.save(newUser._id, tokens.refreshToken)

            // отправляем токены
            res.status(201).send({...tokens, userId: newUser._id})
        } catch (e) {
            res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'})
        }
    }])

/*
Алгоритм авторизации
1) валидируем входящие данные
2) найти пользователя
3) сравнить хэшированные пароли
4) сгенерировать токены
5) вернуть все необходимые данные
*/

/*
Пример запроса
http://localhost:8080/api/auth/signInWithPassword
{
    "email": "1111q@gmail.com",
    "password": "ftFVDFVFDFV24v"
}
* */


router.post('/signInWithPassword', [
    check('email', `Email некорректный`).normalizeEmail().isEmail(),
    check('password', `Пароль не может быть пустым`).exists(),  // exist - проверка на наличие
    async (req, res) => {
        try {
            // Проверяем валидацию
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({error: {message: `INVALID_DATA`, code: 400, errors: errors.array()}})
            }

            const {email, password} = req.body

            // Проверяем существование пользователя
            const existingUser = await User.findOne({email})
            if (!existingUser) { // если такого нет, но отправляем ошибку
                return res.status(400).send({error: {message: `EMAIL_NOT_FOUND`, code: 400, errors: errors.array()}})
            }

            // сравниваем пароли в захэшированном виде
            const isPasswordEqual = await bcrypt.compare(password, existingUser.password)
            if (!isPasswordEqual) { // если пароли не совпадают, отправляем ошибку
                return res.status(400).json({error: {message: `INVALID_PASSWORD`, code: 400, errors: errors.array()}})
            }

            // создаём токены
            const tokens = tokenSerice.generate({_id: existingUser._id})
            await tokenSerice.save(existingUser._id, tokens.refreshToken)

            // отправляем токены пользователю
            res.status(200).send({...tokens, userId: existingUser._id})

        } catch (e) {
            console.log(`e`, e)
            res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'})
        }
    }])

const isTokenInvalid = (data, dbToken) => {
    return !data || !dbToken || data._id !== dbToken?.user?.toString()
}

/*
пример запроса:
http://localhost:8080/api/auth/token
{
   "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q3ZjY5YWUzN2VkYTRjMTUxMDczZWQiLCJpYXQiOjE2NzUwOTc5ODJ9.BLXYvDr2iDnoe0VIAueeiJnYQmUAp6jGFLM6gc6g62w"
}
*/
router.post('/token', async (req, res) => {
    try {
        const {refresh_token: refreshToken} = req.body
        // проверяем валидность токена
        const data = tokenSerice.validateRefresh(refreshToken)
        const dbToken = await tokenSerice.findToken(refreshToken)
        if (isTokenInvalid(data, dbToken)) {
            return res.status(401).json({message: 'Unauthorized'})
        }

        // создаём токены
        const tokens = tokenSerice.generate({_id: data._id})
        await tokenSerice.save(data._id, tokens.refreshToken)

        // отправляем токены
        res.status(200).send({...tokens, userId: data._id})

    } catch (e) {
        res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'})
    }
})
module.exports = router