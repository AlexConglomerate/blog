import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import Trash from "../../1_ui/icon/trash";

function FileUploader({setFile,filePreview, setFilePreview}) {

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
                        className={`p-6 border-2 border-dotted rounded-lg ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`}
                    >
                        <input {...getInputProps()} />
                        {filePreview
                            ? (<img src={filePreview} className="h-24 mx-auto mb-4"/>)
                            : isDragActive
                                ? (<p className="text-blue-500">Drag and drop files here ...</p>)
                                : (<p>Drag and drop files or click to select files</p>)}
                    </div>

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
