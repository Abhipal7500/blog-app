import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Image from 'next/image';

const UpdateBlogModal = ({ blog, closeModal, fetchBlogs }) => {
    const [updatedData, setUpdatedData] = useState({
        title: blog.title,
        description: blog.description,
        category: blog.category,
        author: blog.author,
        image: blog.image
    });

    const [image, setImage] = useState(null);

    const onChangeHandler = (e) => {
        setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("id", blog.id);
        formData.append("title", updatedData.title);
        formData.append("description", updatedData.description);
        formData.append("category", updatedData.category);
        formData.append("author", updatedData.author);
 console.log(formData);
        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await axios.put('/api/blog', formData);
            if (response.data.success) {
                toast.success("Blog updated successfully!");
                fetchBlogs();
                closeModal();
            } else {
                toast.error("Error updating blog.");
            }
        } catch (error) {
            toast.error("Failed to update blog.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md w-96">
                <h2 className="text-lg font-bold mb-4">Update Blog</h2>
                <form onSubmit={onSubmitHandler}>

                    <label className="block mb-2">Title:</label>
                    <input type="text" name="title" value={updatedData.title}
                        onChange={onChangeHandler} className="w-full p-2 border rounded" required />

                    <label className="block mt-4 mb-2">Description:</label>
                    <textarea name="description" value={updatedData.description}
                        onChange={onChangeHandler} className="w-full p-2 border rounded" rows={4} required />

                    <label className="block mt-4 mb-2">Category:</label>
                    <select name="category" value={updatedData.category} onChange={onChangeHandler} className="w-full p-2 border rounded">
                        <option value="Startup">Startup</option>
                        <option value="Technology">Technology</option>
                        <option value="Lifestyle">Lifestyle</option>
                    </select>

                    <label className="block mt-4 mb-2">Author:</label>
                    <input type="text" name="author" value={updatedData.author}
                        onChange={onChangeHandler} className="w-full p-2 border rounded" required />

                    <label className="block mt-4 mb-2">Upload Image:</label>
                    <label htmlFor="image">
                        <Image className='mt-2' src={image ? URL.createObjectURL(image) : blog.image} width={140} height={70} alt="Blog Thumbnail" />
                    </label>
                    <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} className="hidden" />

                    <div className="flex justify-end mt-4">
                        <button type="button" onClick={closeModal} className="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateBlogModal;
