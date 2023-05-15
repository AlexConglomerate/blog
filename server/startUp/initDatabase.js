
const postContent = require('../models/Post')
const postMock = require('../mock/post.json')


module.exports = async () => {
    // если потребуется проинициализировать данные, то их нужно добавить сюда
    const initialDateArr = [
        {mock: postMock, model: postContent},
    ]


    initialDateArr.map(async (item) => {
        await createInitialEntity(item.model, item.mock) // отправляем данные в БД
    })
}


const createInitialEntity = async (Model, data) => {
    console.log(`createInitialEntity`)
    await Model.collection.drop() // на всякий случай очищаем всю коллекцию от данных
    return Promise.all(
        data.map(async item => {
            try {
                delete item._id // удаляем параметр _id, чтобы записывать без него
                const newItem = new Model(item)
                await newItem.save() // заносим данные в MongoDB
                return newItem
            } catch (e) {
                return e
            }
        })
    )
}
