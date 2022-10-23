import React, { useState } from 'react';
import { Route, Routes } from 'react-router';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { IUser } from './types/serverModels';
const App = () => {
  
  const [isLoged, setIsLoged] = useState<IUser | null>(null)

  return (
    <Routes>
      <Route path = '/' element = { <LoginPage/> }></Route>
      <Route path = '/home' element = {<HomePage/>}></Route>
    </Routes>
  );
};

export default App;