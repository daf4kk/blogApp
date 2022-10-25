import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { IUser } from './types/serverModels';
import RegistrationPage from './pages/Registration';
import { useLazyFetchUserQuery } from './store/serverApi/server.api';
const App = () => {

  const [isLoged, setIsLoged] = useState<IUser | null>(null)

  const [fetchUser, {data:user}] = useLazyFetchUserQuery()

  useEffect(()=>{
    const userFromLS = localStorage.getItem('active-user-email');
    if (userFromLS){
      fetchUser(userFromLS);
      if (user){
        setIsLoged(user)
      }
    }
  }, [user])

  return (
    <Routes>
      <Route path = '/' element = { isLoged ? <Navigate to = '/home'></Navigate> : <LoginPage setIsLoged = {setIsLoged}/> }></Route>
      <Route path = '/registration' element = {isLoged ? <Navigate to = '/home'></Navigate> : <RegistrationPage setIsLoged = {setIsLoged}/>}></Route>
      <Route path = '/home' element = { isLoged ? <HomePage setIsLoged={setIsLoged}/> : <Navigate to = '/'></Navigate>} ></Route>
    </Routes>
  );
};

export default App;