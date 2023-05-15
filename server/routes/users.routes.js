const express = require('express')
const router = express.Router({mergeParams: true})
const User = require(`../models/User`)
const auth = require(`../middleware/auth.middleware`)

router.patch('/:userId', auth, async (req, res) => {
    try {
        const {userId} = req.params
        if (userId) {
            // обновляем пользователя
            // {new: true} - Это указываем, чтобы в updatedUser пришли обновлённые данные.
            // т.е. мы дождёмся, как перезапишется БД, и затем отправим на frontend данные
            const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true})
            res.send(updatedUser)
        } else {
            res.status(401).json({message: 'Unauthorized'})
        }
    } catch (e) {
        res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const list = await User.find()
        res.status(200).send(list) // статус 200 стоит по умолчанию. Поэтому можно просто res.send(list)
    } catch (e) {
        res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'})
    }
})

router.get('/:userId', auth, async (req, res) => {
    try {
        const {userId} = req.params
        const data = await User.find({"_id": userId})
        res.status(200).send(data) // статус 200 стоит по умолчанию. Поэтому можно просто res.send(list)
    } catch (e) {
        res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'})
    }
})


router.get('/getUserInfo/:userId', auth, async (req, res) => {
    try {
        const {userId} = req.params
        const content = await User.find({"_id": userId})
        const {email, name, telegramUserName} = content[0]._doc
        const user = {email, name}
        // const vacationRaw = await Vacation.find({userId})

        // Преобразуем дату из формата "2022-10-03T00:00:00.000Z" в формат "2022-10-03"
        const vacation = vacationRaw.map(item => {
            const {_doc: newItem} = item
            return {
                _id: newItem._id,
                start: newItem.start.toISOString().split("T")[0],
                end: newItem.end.toISOString().split("T")[0],
                type: newItem.type,
            }
        })

        res.status(200).send({user, vacation}) // статус 200 стоит по умолчанию. Поэтому можно просто res.send(list)
    } catch (e) {
        console.log(`e`, e)
        res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'})
    }
})


router.put('/updateTelegramUserName', auth, async (req, res) => {
    try {
        const {telegramUserName, userId} = req.body

        const data = await User.updateOne(
            {_id: userId},
            {$set: {telegramUserName}}
        );
        res.status(200).send(data) // статус 200 стоит по умолчанию. Поэтому можно просто res.send(list)
    } catch (e) {
        res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'})
    }
})

module.exports = router