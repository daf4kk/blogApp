import React, {useState} from 'react';
import { useFetchUsersQuery } from '../store/serverApi/server.api';
import { useAppSelector } from '../hooks/useSelector';
import { useActions } from '../hooks/actions';
import logoIcon from '../imgs/logo.png';
import errorIcon from '../imgs/error.png';
const LoginPage = () => {

    // const {isLoading, isError, data} = useFetchUsersQuery('');
    // const {favourites} = useAppSelector(state => state.favourites)
    // const {addFavourite, removeFavourite} = useActions();
    const [error, setError] = useState<string | null>(null)

    return (
        <div className='absolute w-full h-full bg-cyan-900 flex justify-center'>
            <div className='w-[600px] h-[500px] bg-cyan-600 mt-[10%] rounded-full flex flex-col justify-center items-center'>
                <a href = 'https://github.com/daf4kk' target= '_blank' rel = 'noreferrer'><img src = {logoIcon} alt = 'logo' className = 'relative bottom-5 cursor-pointer'></img></a>
                {error && (
                <div className='flex items-center mb-2 w-[350px]'>
                    <img src = {errorIcon} alt = 'error-icon' className='w-[23px] h-[23px]'></img>
                    <h1 className=' text-red-600 text-xl font-semibold ml-2'>{error}</h1>
                </div>
                )}
                <input 
                className = 'input' 
                type = 'text' placeholder='Введите почту'
                spellCheck = 'false'
                ></input>
                <input 
                className='input mt-3'
                type = 'text' placeholder='Введите пароль'
                spellCheck = 'false'
                ></input>
                <div className='relative w-[350px] top-5 text-xl flex justify-between'>
                    <button className='login-button'>Войти</button>
                    <button className='login-button' >Регистрация</button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;