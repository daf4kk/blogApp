import React, {useState, useEffect} from 'react';
import {IBlog, IUser} from '../types/serverModels'

import addFavouriteIcon from '../imgs/add-favourite.png';
import removeFavouriteIcon from'../imgs/remove-favourite.png';
import { useActions } from '../hooks/actions';
import { useAppSelector } from '../hooks/useSelector';
import { useUpdateUserMutation } from '../store/serverApi/server.api';

interface Props{
    activeUser: IUser | null,
    blog: IBlog
}

const BlogItem:React.FC<Props> = ({blog, activeUser}) => {
    const [updateUser] = useUpdateUserMutation()
    const {addFavourite, removeFavourite} = useActions()
    const [isFav, setIsFav] = useState(false);

    const favourites = useAppSelector((state) => state.favourites.favourites)
    useEffect(() => {
        const fav = favourites.find((item:IBlog) => item.blogId === blog.blogId) ? true : false
        setIsFav(fav)
    }, [favourites])
    
    return (
        <div className='blog-item  h-[400px]  relative bg-cyan-400 p-3 rounded cursor-pointer'>
        <img src = {require(`../blogImgs/${blog.imgId}.png`)} alt = 'blog-img' className='h-[150px] w-[100%]'></img>
        <div className='flex text-slate-500 text-sm mt-1'>
            <h3 className='blog-theme'>{blog.theme}</h3>
            <div className='blog-date ml-6 marker:m-0'>{blog.date}</div>
        </div>
        <h1 className='text-lg font-medium'>{blog.title}</h1>
        <p className='text-sm h-[130px] w-[100%] break-normal overflow-hidden'>
            {blog.body}
        </p>
        <p className='text-sm text-slate-500 absolute bottom-4'>~{blog.readTime}</p>
        <div className='flex absolute right-2 bottom-2 items-center'>
            {/* Картинки SVG надо */}
            {isFav ? 
            <img className='mr-2 w-[35px] h-[35px] cursor-pointer' alt = 'heart' src = {removeFavouriteIcon} onClick = {() => {
                // removeFavourite(blog.blogId)
            }}></img> 
            :
            <img className='mr-2 w-[35px] h-[35px] cursor-pointer' alt = 'heart' src = {addFavouriteIcon} onClick = {() => {
                addFavourite(blog)
                console.log(favourites)
            }}></img> }

            <button className='blog-button bg-cyan-500 hover:text-white hover:bg-emerald-500 h-[40px] rounded '>Читать полностью</button>
        </div>
    </div>
    );
};

export default BlogItem;