import React, {useState} from 'react';
import Trash from "../../1_ui/icon/trash";
import FormScheduleDelete from "./formPostDelete";
import Edit from "../../1_ui/icon/edit";
import {useNavigate} from "react-router-dom";
import localStorageService from "../../servises/localStorage.service";

const BlogPost = ({postId, date, message, caption, fileId, name, userId}) => {
    const navigate = useNavigate()
    const textStyle = " text-gray-600 text-sm "

    const [showModal, setShowModal] = useState(false);
    const handleCloseForm = () => setShowModal(false)
    const handleOpenForm = () => setShowModal(true)

    const url = 'http://localhost:8080'
    const imageUrl = `${url}/uploads/${fileId}`

    const handleEdit = () => {
        navigate(`/edit/${postId}`)
    }

    const currentUserId = localStorageService.getUserId()

    return (
        <div className="bg-white p-6 my-4 mx-4 p-4 border rounded-md shadow-md w-[700px]">
            <div className="flex items-center mb-4 gap-5">
                <p className={textStyle + " hover:text-blue-800 hover:underline cursor-pointer "}
                >{name}</p>
                <p className={textStyle}>{date}</p>
            </div>

            {fileId && <img src={imageUrl} className="max-w-full"/>}
            <p className="text-gray-800 text-xl underline">{caption}</p>
            <p className="text-gray-800 text-lg">{message}</p>
            {currentUserId == userId &&
                <div className="flex justify-end gap-2">
                    <button className="p-1 px-3 text-white bg-blue-500 rounded-md" onClick={handleEdit}><Edit/></button>
                    <button className="p-1 text-white bg-red-500 rounded-md" onClick={handleOpenForm}><Trash/></button>
                </div>
            }

            <FormScheduleDelete
                handleCloseForm={handleCloseForm}
                showModal={showModal}
                currentScheduleName={"currentScheduleName"}
                selectedTeam={"selectedTeam"}
                postId={postId}
            />

        </div>
    );
};

export default BlogPost;


