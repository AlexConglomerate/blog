const jwt = require('jsonwebtoken')
const Token = require(`../models/Token`)
const config = require('config')
require('dotenv').config()

const accessSecret = process.env.ACCESSSECRET
const refreshSecret = process.env.REFRESHSECRET

class TokenService {

    // генерируем accessToken, refreshToken, expiresIn
    // expiresIn: '1h' - означает на 1 час
    // в качестве accessSecret и refreshSecret можно подставлять всё что угодно
    generate(payload) {
        const accessToken = jwt.sign(payload, accessSecret, {expiresIn: '1000h'})
        const refreshToken = jwt.sign(payload, refreshSecret)
        return {accessToken, refreshToken, expiresIn: 3600}
    }

    // сохраняем refreshToken для конкретного пользователя
    async save(userId, refreshToken) {
        //  ищем, есть ли уже для этого пользователя запись с токеном.
        const data = await Token.findOne({user: userId})
        if (data) {
            data.refreshToken = refreshToken // обновляем refreshToken
            return data.save()
        }

        const token = await Token.create({user: userId, refreshToken})
        return token
    }

    validateRefresh(refreshToken) {
        try {
            return jwt.verify(refreshToken, refreshSecret)
        } catch (e) {
            return null
        }
    }

    validateAccess(accessToken) {
        try {
            return jwt.verify(accessToken, accessSecret)
        } catch (e) {
            return null
        }
    }

    async findToken(refreshToken) {
        try {
            return await Token.findOne({refreshToken})
        } catch (e) {
            return null
        }

    }
}

module.exports = new TokenService()