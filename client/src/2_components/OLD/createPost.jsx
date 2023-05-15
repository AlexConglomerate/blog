import React, {useState} from "react";
import {useForm} from "react-hook-form";
import TextField from "./textArea";
import FileUploader from "./fileUploader";

const CreatePost = () => {
    const {register, handleSubmit} = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        const post = {
            title: data.title,
            content: data.content,
            date: new Date().toISOString(), // текущая дата в формате ISO
        };
        try {
            console.log(`post`, post)
            // await createPost(post); // создание поста через API-метод
            setIsLoading(false);
            // Перенаправляем пользователя на страницу с постами после создания нового поста
            // window.location.href = "/posts";
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">

                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                        Заголовок
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        {...register("title", {required: true})}
                    />

                </div>

                <FileUploader/>

                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
                        Содержимое
                    </label>
                    <textarea
                        id="content"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        {...register("content", {required: true})}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={isLoading}
                >
                    {isLoading ? "Создание..." : "Создать пост"}
                </button>

            </form>

            {/*<CreatePost/>*/}
            <TextField/>
        </div>
    );
};

export default CreatePost;