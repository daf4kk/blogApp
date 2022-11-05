import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { IUser } from './types/serverModels';
import RegistrationPage from './pages/Registration';
import { useFetchUsersQuery, useLazyFetchUserQuery } from './store/serverApi/server.api';
import FavouritesBlogsPage from './pages/FavouritesBlogsPage';
import { useAppSelector } from './hooks/useSelector';
import { useActions } from './hooks/actions';
import { useFetchBlogsQuery } from './store/serverApi/server.api';
import { IBlog } from './types/serverModels';
const App = () => {
  
  const [isLoged, setIsLoged] = useState<IUser | null>(null)
  // console.log(isLoged)
  const [fetchUser, {data:user}] = useLazyFetchUserQuery()
  const {data:users} = useFetchUsersQuery('')
  const {data:blogs, isLoading, isError} = useFetchBlogsQuery(100);

  

  useEffect(()=>{
    const userFromLS = localStorage.getItem('active-user-email');
    if (userFromLS){
      fetchUser(userFromLS);
      if (user){
        setIsLoged(user);
        clearState();
      }
    }
  }, [user,isLoged])
  //Попробовать всё таки перенести в соотв. page
  const {addFavourite, clearState} = useActions();
  useEffect(() => {
    clearState();
    const favouritesId = isLoged?.favouriteBlogs;
    favouritesId?.forEach((id) => {
      blogs?.forEach((blog) => {
        if (blog.blogId === id){
          addFavourite(blog)
        }
      })
    })
  }, [isLoged, user])

    //Так же нужен slice с users и blogs

  return (
    <Routes>
      <Route path = '/' element = { isLoged ? <Navigate to = '/home'></Navigate> : <LoginPage setIsLoged = {setIsLoged} users = {users}/> }></Route>
      <Route path = '/registration' element = {isLoged ? <Navigate to = '/home'></Navigate> : <RegistrationPage setIsLoged = {setIsLoged} users = {users}/>}></Route>
      <Route path = '/home' element = { isLoged ? <HomePage setIsLoged={setIsLoged} isLoged = {isLoged}/> : <Navigate to = '/'></Navigate>} ></Route>
      <Route path = 'home/favourites' element = {isLoged ? <FavouritesBlogsPage favouritesId = {isLoged?.favouriteBlogs} activeUser = {isLoged} setIsLoged = {setIsLoged}/> : <Navigate to = '/'></Navigate>}></Route>
    </Routes>
  );
};

export default App;