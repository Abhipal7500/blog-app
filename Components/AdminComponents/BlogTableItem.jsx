import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const BlogTableItem = ({ authorImg, title, author, date, deleteBlog, openUpdateModal, mongoId }) => {
    const BlogDate = new Date(date);
    
    return (
        <tr className='bg-white border-b'>
            <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                <Image width={40} height={40} src={authorImg ? authorImg : assets.profile_icon} alt="Author" />
                <p>{author ? author : "No author"}</p>
            </th>
            <td className='px-6 py-4'>{title ? title : "No title"}</td>
            <td className='px-6 py-4'>{BlogDate.toDateString()}</td>
            <td className='px-6 py-4 flex gap-4'>
                <button onClick={() => openUpdateModal(mongoId, title, author, date)} className="text-blue-500">Edit</button>
                <button onClick={() => deleteBlog(mongoId)} className="text-red-500">Delete</button>
            </td>
        </tr>
    )
}

export default BlogTableItem;
