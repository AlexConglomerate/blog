import Home from "../3_pages/home";
import {Navigate} from "react-router-dom";
import Auth from "../3_pages/auth";
import Blog from "../3_pages/blog";
import CreatePost from "../2_components/blog/createPost";
import localStorageService from "../servises/localStorage.service";

const routes = (location) => {
    const isLogged = localStorageService.getAccessToken()
    const main = [
        {path: '', element: <Home/>},
        {path: '*', element: <Navigate to={''}/>},
        {path: '/blog', element: <Blog/>,},
        {path: '/edit/:postId', element: <CreatePost/>,},
    ]

    const logged = [
        {path: '/createPost', element: <CreatePost/>},
    ]

    const auth = [
        {path: '/auth', element: <Auth/>},
    ]

    return [
        ...main,
        ...isLogged ? logged : '',
        ...!isLogged ? auth : '',
    ]
}

export default routes
