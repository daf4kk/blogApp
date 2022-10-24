import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { IUser } from './types/serverModels';
import RegistrationPage from './pages/Registration';
const App = () => {
  
  const [isLoged, setIsLoged] = useState<IUser | null>(null)

  return (
    <Routes>
      <Route path = '/' element = { isLoged ? <Navigate to = '/home'></Navigate> : <LoginPage setIsLoged = {setIsLoged}/> }></Route>
      <Route path = '/registration' element = {isLoged ? <Navigate to = '/home'></Navigate> : <RegistrationPage setIsLoged = {setIsLoged}/>}></Route>
      <Route path = '/home' element = { isLoged ? <HomePage/> : <Navigate to = '/'></Navigate>} ></Route>
    </Routes>
  );
};

export default App;