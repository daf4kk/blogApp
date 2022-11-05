import React, {useEffect, useState, SetStateAction, Dispatch} from 'react';
import BlogItem from '../components/BlogItem';
import PageContainer from '../components/PageContainer';
import { useActions } from '../hooks/actions';
import { useAppSelector } from '../hooks/useSelector';
import { useLazyFetchBlogQuery, useFetchBlogsQuery } from '../store/serverApi/server.api';
import { IBlog, IUser } from '../types/serverModels';

interface Props{
    setIsLoged: Dispatch<SetStateAction<IUser | null>>  //Обязательный для контейнера
    favouritesId: string[] | [] | undefined,
    activeUser: IUser | null
}

const FavouritesBlogsPage:React.FC<Props> = ({favouritesId, activeUser, setIsLoged}) => {
    // useEffect(() => {
    //     clearState();
    //     const favouritesId = isLoged?.favouriteBlogs;
    //     favouritesId?.forEach((id) => {
    //       blogs?.forEach((blog) => {
    //         if (blog.blogId === id){
    //           addFavourite(blog)
    //         }
    //       })
    //     })
    // const {data:blogs, isLoading, isError} = useFetchBlogsQuery(100);
    const favourites = useAppSelector((state) => state.favourites.favourites)
    // const {addFavourite} = useActions()
    // console.log(favouritesId)
    // console.log(favourites)

    // useEffect(() => {
    //     blogs?.forEach((blog:IBlog) => {
    //         favouritesId?.forEach((id) => {
    //             if (blog.blogId.includes(id)){
    //                 addFavourite(blog)
    //                 return
    //             }
    //         })   
    //     })
    // }, [])
    return (
        <PageContainer setIsLoged={setIsLoged}>
            <div className='mb-5 flex flex-col items-center'>
                <h1 className='mt-5 text-2xl' >Избранное:</h1>
                <div className='favourites-items mt-3 grid grid-cols-3 gap-5'>
                    {favourites?.map((blog:IBlog) => <BlogItem blog = {blog} activeUser = {activeUser} key = {blog.blogId}/>)}
                </div>
            </div>
        </PageContainer>
    );
};

export default FavouritesBlogsPage;