import React from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUser} from "../store/user";
import CreatePost from "../2_components/blog/createPost";

function Home() {
    const navigate = useNavigate()
    const path = '/blog'
    // const user = useSelector(getUser())

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Welcome to our blog!</h1>
            <p className="text-xl mb-8">Here you can find many interesting posts on various topics.</p>
            <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    onClick={() => navigate(path)}
            >Go to blog posts
            </button>
        </div>
    );
}

export default Home;
