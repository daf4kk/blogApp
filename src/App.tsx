import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { IUser } from './types/serverModels';
import RegistrationPage from './pages/Registration';
import { useLazyFetchUserQuery } from './store/serverApi/server.api';
import FavouritesBlogsPage from './pages/FavouritesBlogsPage';
const App = () => {

  const [isLoged, setIsLoged] = useState<IUser | null>(null)

  const [fetchUser, {data:user}] = useLazyFetchUserQuery()

  useEffect(()=>{
    const userFromLS = localStorage.getItem('active-user-email');
    if (userFromLS){
      fetchUser(userFromLS);
      if (user){
        console.log(user.name)
        setIsLoged(user)
      }
    }
  }, [user])

  return (
    <Routes>
      <Route path = '/' element = { isLoged ? <Navigate to = '/home'></Navigate> : <LoginPage setIsLoged = {setIsLoged}/> }></Route>
      <Route path = '/registration' element = {isLoged ? <Navigate to = '/home'></Navigate> : <RegistrationPage setIsLoged = {setIsLoged}/>}></Route>
      <Route path = '/home' element = { isLoged ? <HomePage setIsLoged={setIsLoged} isLoged = {isLoged}/> : <Navigate to = '/'></Navigate>} ></Route>
      <Route path = 'home/favourites' element = {isLoged ? <FavouritesBlogsPage items = {user?.favouriteBlogs}/> : <Navigate to = '/'></Navigate>}></Route>
    </Routes>
  );
};

export default App;