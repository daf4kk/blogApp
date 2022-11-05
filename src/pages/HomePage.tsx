import React, {Dispatch, SetStateAction} from 'react';
import PageContainer from '../components/PageContainer';
import { useFetchBlogsQuery, useFetchUsersQuery } from '../store/serverApi/server.api';
import { useAppSelector } from '../hooks/useSelector';
import { IUser } from '../types/serverModels';
import {IBlog} from '../types/serverModels'
import img1 from '../blogImgs/1.png';
import img2 from '../blogImgs/2.png';
import img3 from '../blogImgs/3.png';
import img4 from '../blogImgs/4.png';   
import img5 from '../blogImgs/5.png';
import img6 from '../blogImgs/6.png';
import img7 from '../blogImgs/7.png';
import BlogItem from '../components/BlogItem';
import { useActions } from '../hooks/actions';
import { is } from 'immer/dist/internal';

interface Props{
    isLoged: null | IUser,
    setIsLoged: Dispatch<SetStateAction<IUser | null>>
}
const HomePage:React.FC<Props> = ({setIsLoged, isLoged}) => {

    const {addFavourite} = useActions();

  const favourites = useAppSelector((state) => state.favourites)
  console.log(favourites);
    const {data:blogs, isLoading, isError} = useFetchBlogsQuery(9);
    
    return (
        <PageContainer setIsLoged={setIsLoged}>
            <div className='w-[95%] h-auto mt-10 mb-20 text-black relative flex justify-center' >
                <div className = 'carousel-blog w-[100%] h-[400px] bg-cyan-700 m-auto rounded-2xl absolute flex'>
                    <div className='blog-img w-[100%] rounded-2xl'>
                        <img src = {require('../blogImgs/1.png')} alt = 'blog-img' className=' w-[100%] h-[400px] rounded-lg'></img>
                    </div>
                    <div className='blog-description p-5 h-[350px] absolute'>
                        <h1 className='font-bold text-4xl 2xl:text-2xl xl:text-xl lg:text-xl'>Сколько сколько?</h1>
                        <p className='description font-thin mt-5 text-2xl 2xl:text-lg xl:text-base lg:text-base' >"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                        <div className="buttons absolute right-5 bottom-0">
                            <button className='blog-carousel-button  bg-green-300 text-zinc-800 hover:text-white'>Добавить в избранное</button>
                            {/* <button className='blog-carousel-button bg-red-400 text-zinc-800 hover:text-white'>Удалить из избранного</button> */}
                            <button className='ml-5 blog-carousel-button  bg-cyan-600 hover:text-cyan-400'>Читать полностью</button>
                        </div>
                    </div>
                </div>
                <div className="content mt-[450px] grid grid-cols-3 gap-5 ">
                {blogs?.map((blog:IBlog) => <BlogItem blog = {blog} activeUser = {isLoged}key = {blog.blogId}/>)}
                </div>
                <h1 className='absolute bottom-[-50px] text-xl transition-colors duration-200 hover:text-emerald-200 cursor-pointer'>Смотреть все посты</h1>
            </div>  
        </PageContainer>
    );
};

export default HomePage;