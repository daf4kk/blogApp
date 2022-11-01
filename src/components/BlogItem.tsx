import React from 'react';
import {IBlog} from '../types/serverModels'

import addFavouriteIcon from '../imgs/add-favourite.png';
import removeFavouriteIcon from'../imgs/remove-favourite.png';

interface Props{
    item: IBlog
}

const BlogItem:React.FC<Props> = ({item}) => {
    return (
        <div className='blog-item  h-[400px]  relative bg-cyan-400 p-3 rounded cursor-pointer'>
        <img src = {require(`../blogImgs/${item.imgId}.png`)} alt = 'blog-img' className='h-[150px] w-[100%]'></img>
        <div className='flex text-slate-500 text-sm mt-1'>
            <h3 className='blog-theme'>{item.theme}</h3>
            <div className='blog-date ml-6 marker:m-0'>{item.date}</div>
        </div>
        <h1 className='text-lg font-medium'>{item.title}</h1>
        <p className='text-sm h-[130px] w-[100%] break-normal overflow-hidden'>
            {item.body}
        </p>
        <p className='text-sm text-slate-500 absolute bottom-4'>~{item.readTime}</p>
        <div className='flex absolute right-2 bottom-2 items-center'>
            {/* Картинки SVG надо */}
            {/* <img className='mr-2 w-[35px] h-[35px] cursor-pointer' alt = 'heart' src = {removeFavouriteIcon}></img> */}
            <img className='mr-2 w-[35px] h-[35px] cursor-pointer' alt = 'heart' src = {addFavouriteIcon}></img>
            <button className='blog-button bg-cyan-500 hover:text-white hover:bg-emerald-500 h-[40px] rounded '>Читать полностью</button>
        </div>
    </div>
    );
};

export default BlogItem;