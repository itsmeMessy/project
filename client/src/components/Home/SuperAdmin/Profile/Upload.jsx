import React, { useState } from 'react';
import axios from 'axios';

export default function Upload({ handleClose }) {
    const [imgPreview, setImagePreview] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleInput = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagePreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
            setSelectedFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
        
            try {
                const response = await axios.post(`${process.env.REACT_APP_URI}/upload_avatar`, formData, {withCredentials:true})
                if(response.data.valid){
                    handleClose(true)
                }else{
                    console.log(response.data.error)
                }
                
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    return (
        <div className="bg-white dark:bg-zinc-800 p-8 rounded-lg shadow-lg max-w-2xl h-150 overflow-y-auto">
            <div className="bg-white dark:bg-zinc-800 mt-35 p-8 rounded-lg shadow-lg max-w-2xl">
                <h2 className="text-xl font-semibold mb-6 text-center text-zinc-700 dark:text-zinc-200">
                    Fill up Book Details
                </h2>
                <form onSubmit={handleSubmit} method='POST'>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <div className="col-span-2 flex items-center space-x-3">
                            <label htmlFor="importImage" className="block text-zinc-700 text-sm font-semibold mb-2">
                                Import Image:
                            </label>
                            <input
                                type="file"
                                name='img'
                                accept=".jpg,.png,.jpeg"
                                onChange={handleInput}
                                id="importImage"
                                className="mb-4 w-full text-sm text-red-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-100 file:text-red-700 hover:file:bg-red-200"
                            />
                        </div>
                    </div>
                    <div className="col-span-2 flex flex-col items-center justify-center">
                        <p>Image Preview</p>
                        {imgPreview && (
                            <div className="col-span-2 flex items-center space-x-3">
                                <img src={imgPreview} alt="Preview" style={{ width: '160px', height: 'auto' }} />
                            </div>
                        )}
                    </div>
                    <div className="mt-12">
                        <button type="submit" className="w-full bg-orange-500 text-white p-3 rounded-md">
                            Submit
                        </button>
                    </div>
                    <div className="mt-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="w-full bg-orange-500 text-white p-3 rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
