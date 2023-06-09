import React, {useEffect, useState} from 'react';
import BlogPost from "../2_components/blog/blogPost";
import {paginate} from "../utils/paginate";
import Pagination from "../2_components/blog/pagination";
import {downloadPost, getPosts} from "../store/posts";
import {useDispatch, useSelector} from "react-redux";
import Plus from "../1_ui/icon/plus";
import {useNavigate} from "react-router-dom";
import localStorageService from "../servises/localStorage.service";
import Loader from "../2_components/loader";

function Blog(props) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCreatePost = () => {
        const isLogged = localStorageService.getAccessToken()
        if (!isLogged) navigate('/auth')
        if (isLogged) navigate('/createPost')
    }

    const getPost = async () => dispatch(downloadPost())

    useEffect(() => {
        getPost()
    }, []);


    const {data: posts} = useSelector(getPosts())

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3

    if (!posts) return (
        <div className={'flex flex-col justify-center items-center mx-auto'}>
            <Loader/>
        </div>
    )

    const count = posts.length;
    const postsCrop = paginate(posts, currentPage, pageSize);

    const handlePageChange = (pageIndex) => setCurrentPage(pageIndex);

    return (
        <div className={'m-5 flex flex-col justify-center items-center mx-auto'}>
            <h1 className="text-4xl font-bold mb-8 ">Our blog posts</h1>
            {posts && postsCrop.map(item => (
                <BlogPost
                    key={item._id}
                    postId={item._id}
                    userId={item.userId}
                    fileId={item.fileId}
                    caption={item.caption}
                    message={item.message}
                    date={item.date}
                    name={item.name}
                />
            ))}

            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />

            <button
                onClick={handleCreatePost}
                className="fixed bottom-0 right-0 m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <Plus/>
            </button>


        </div>
    );
}

export default Blog;