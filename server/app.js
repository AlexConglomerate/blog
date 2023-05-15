const express = require('express')
const config = require('config')
const chalk = require('chalk')
const mongoose = require('mongoose')
const initDatabase = require('./startUp/initDatabase')
const routes = require('./routes')
const cors = require(`cors`)
const path = require('path')
require('dotenv').config()


const PORT = config.get('port') ?? 8080
const app = express() // получаем объект приложения
app.use(cors())
app.use(express.json()) // Добавляем парсер входящих JSON данных (middleware)
app.use(express.urlencoded({extended: false})) // Добавляем парсер входящих данных (middleware)
app.use('/api', routes) // Добавляем первый роут
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client'))) // указываем, путь до папки со статическими файлами
    const indexPath = path.join(__dirname, 'client', 'index.html') // прописываем путь до файла
    app.get('*', (req, res) => {
        res.sendFile(indexPath)
    })
}


const start = async () => {
    try {
        mongoose.set('strictQuery', true) // это нужно, чтобы ошибка не выскакивала в консоли
        // once означает, что подключаемся один раз || initDatabase - загружаем MOC данные
        // mongoose.connection.once('open', () => initDatabase())

        await mongoose.connect(process.env.MONGO_URI) // подключаемся к БД

        const text = chalk.bgGreen(`             `) + chalk.green(` Сервер запущен на порту ${PORT} => `) + chalk.green(new Date().toLocaleTimeString())
        app.listen(PORT, () => console.log(text)) // начинаем слушать порт || запускаем сервер

    } catch (e) {
        console.log(chalk.red(e.message))
        process.exit(1) // выйти из программы
    }
}


start()