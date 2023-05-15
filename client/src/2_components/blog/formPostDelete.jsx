import React from 'react';
// import ModalWindow from "../schedule/navSchedule/modalWindow";
import Button from "../../1_ui/button";
import {toast} from "react-toastify";
import postsService from "../../servises/posts.service";
import ModalWindow from "./modalWindow";

function FormPostDelete({postId, showModal, handleCloseForm}) {

    const handleDeletePost = async () => {
        try {
            handleCloseForm()
            const {content} = await postsService.deletePost(postId)
            console.log(content)

            toast(`Post deleted`)
        } catch (error) {
            toast('Error. The post is not deleted')
        }
    }

    return (
        <ModalWindow showModal={showModal} handleCloseForm={handleCloseForm}>
            <div className={'flex flex-col p-5 '}>
                <span> Delete the post? </span>
                <div className={'flex flex-row gap-4 justify-center pt-10 '}>
                    <Button name={'Yes'} onClick={handleDeletePost}/>
                    <Button name={'No'} onClick={handleCloseForm}/>
                </div>
            </div>
        </ModalWindow>

    );
}

export default FormPostDelete;