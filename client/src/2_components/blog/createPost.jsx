import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import FormInput from "../../1_ui/formInput";
import FormButton from "../../1_ui/formButton";
import FormTextArea from "../../1_ui/formTextArea";
import FileUploader from "./fileUploader";
import uploadService from "../../servises/upload.service";
import postsService from "../../servises/posts.service";
import {useNavigate, useParams} from "react-router-dom";

const CreatePost = () => {
    const {postId} = useParams()
    const [filePreview, setFilePreview] = useState(null)
    const [file, setFile] = useState(null)
    const navigate = useNavigate()

    const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm({mode: "onBlur",})

    useEffect(() => {
        if (postId) {
            postsService.getPost(postId).then(content => {
                const {caption, message, fileId} = content.content[0]
                setFile(fileId)
                reset({caption, message})
            })
        }
    }, []);


    const sendData = async (values) => {
        try {
            if (!postId) { // if we create a post
                const fileId = file ? await sendFile(file) : ''
                const {content} = await postsService.addPost({...values, fileId})
                console.log(`content addPost`, content)
            } else { // if we edit the post
                // const fileId = filePreview ? await sendFile(file) : file
                console.log(`file`, file)
                const {content} = await postsService.editPost({_id: postId, ...values})
                console.log(`content editPost`, content)
            }

            navigate('/blog', {replace: false})

            reset()
            setFile(null)
            setFilePreview(null)
        } catch (error) {
            console.log(`error`, error)
        }
    }

    const sendFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const contentFile = await uploadService.upload(formData)
        const {filename} = contentFile.content
        return filename
    }

    return (
        <>
            <div className={' text-4xl font-bold mb-8 mx-36 my-7  '}>
                {postId ? 'Post editing' : 'Publishing a post'}
            </div>
            <form className={'mx-36 '} onSubmit={handleSubmit(sendData)}>

                <FileUploader setFile={setFile} filePreview={filePreview} setFilePreview={setFilePreview}/>
                <FormInput
                    errors={errors} register={register} type={'textarea'}
                    label={'Caption'} keyName={'caption'}
                    rules={{
                        required: "Required field",
                    }}
                />


                <FormTextArea
                    errors={errors} register={register} type={'textarea'}
                    label={'Message'} keyName={'message'}
                    rules={{
                        required: "Required field",
                        maxLength: {value: 100, message: 'Maximum length 100 characters'},
                    }}
                />

                <FormButton disabled={!isValid} name={postId ? 'Update' : 'Publish'}/>
            </form>

        </>
    );
};

export default CreatePost;
