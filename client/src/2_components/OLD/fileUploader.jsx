import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import uploadService from "../../servises/upload.service";
import Trash from "../../1_ui/icon/trash";

function FileUploader() {
    const [filePreview, setFilePreview] = useState(null)
    const [file, setFile] = useState(null);

    const [imageUrl, setImageUrl] = useState(null);

    const sendFile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        const {content} = await uploadService.upload(formData)
        const {filename} = content
        // const url = config.get('url')
        const url = 'http://localhost:8080'
        console.log(`url`, url)
        setImageUrl(`${url}/uploads/${filename}`)
    };

    const clear = () => {
        setFile(null)
        setFilePreview(null)
    }

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        setFile(file)
        const reader = new FileReader();
        reader.onloadend = () => setFilePreview(reader.result);
        reader.readAsDataURL(file);
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    return (
        <>
            <div className={'flex flex-row gap-x-2 '}>
                <div className={'w-full'}>
                    <div
                        {...getRootProps()}
                        className={`p-6 border-2 rounded-lg ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`}
                    >
                        <input {...getInputProps()} />
                        {filePreview
                            ? (<img src={filePreview} className="h-24 mx-auto mb-4"/>)
                            : isDragActive
                                ? (<p className="text-blue-500">Перетащите файлы сюда ...</p>)
                                : (<p>Перетащите файлы или нажмите, чтобы выбрать файлы</p>)}
                    </div>
                    {/*{imageUrl && <img src={imageUrl} alt="Uploaded image" className="max-w-full"/>}*/}
                </div>

                <div
                    className={'flex flex-col justify-center items-center cursor-pointer w-10 '}
                    onClick={clear}
                >
                    <Trash/>
                </div>
            </div>
        </>
    );
}

export default FileUploader;
