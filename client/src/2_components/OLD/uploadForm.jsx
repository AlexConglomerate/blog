import React, {useState} from 'react';
import uploadService from "../../servises/upload.service";

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const sendFile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        const {content} = await uploadService.upload(formData)
        const {filename} = content
        setImageUrl(`http://localhost:8080/uploads/${filename}`)
    };

    const handleFileChange = (e) => {
        console.log(`e.target.files[0]`, e.target.files[0])
        setFile(e.target.files[0]);
    };

    return (
        <>
            <input type="file" onChange={handleFileChange}/>
            <button onClick={(e) => sendFile(e)}>Upload</button>

            {imageUrl && (
                <div className="mt-4">
                    <h1>{imageUrl}</h1>
                    <img src={imageUrl} alt="Uploaded image" className="max-w-full"/>
                </div>
            )}
        </>
    );
}

export default UploadForm