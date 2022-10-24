import React, {useState, Dispatch, SetStateAction} from 'react';
import {useFetchUsersQuery, usePushUserMutation } from '../store/serverApi/server.api';

import { IUser } from '../types/serverModels';
import logoIcon from '../imgs/logo.png';
import errorIcon from '../imgs/error.png';
import { Link} from 'react-router-dom';
interface Props{
    setIsLoged: Dispatch<SetStateAction<IUser | null>>
}

const RegistrationPage:React.FC<Props> = ({setIsLoged}) => {
    const [pushUser] = usePushUserMutation()
    const [error, setError] = useState<string | null>(null)
    const {data:DBUsers} = useFetchUsersQuery('')
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setUserData({
            ...userData,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    function checkForValidate(){
        const {name,email,password} = userData;
        if (!name || email.length < 9 || !password){
            setError(`Введите корректные данные`)
            return
        }
        
        const checkForExistingUser = DBUsers.find((user:IUser) => user.email === email);
        if (checkForExistingUser){
            setError(`Данная почта занята`)
            return
        }
        const newUser:IUser = {
            email,
            name,
            password,
            blogs: []
        }
        pushUser(newUser)
        setIsLoged(newUser)
        //redirect после успешной регистраций
    }

    return (
        <div className='absolute w-full h-full bg-cyan-900 flex justify-center'>
            <div className='w-[600px] h-[600px] bg-cyan-600 mt-[10%] rounded-full flex flex-col justify-center items-center'>
                <a href = 'https://github.com/daf4kk' target= '_blank' rel = 'noreferrer'><img src = {logoIcon} alt = 'logo' className = 'relative bottom-5 cursor-pointer'></img></a>
                {error && (
                <div className='flex items-center mb-2 w-[350px]'>
                    <img src = {errorIcon} alt = 'error-icon' className='w-[23px] h-[23px]'></img>
                    <h1 className=' text-red-600 text-xl font-semibold ml-2'>{error}</h1>
                </div>
                )}
                <input 
                className = 'input' 
                type = 'text' placeholder='Введите имя'
                spellCheck = 'false'
                name = 'name'
                autoComplete='off'
                onChange={changeHandler}
                ></input>
                <input 
                className = 'input mt-3' 
                type = 'text' placeholder='Введите почту'
                spellCheck = 'false'
                name = 'email'
                autoComplete='off'
                onChange={changeHandler}
                ></input>
                <input 
                className='input mt-3'
                type = 'text' placeholder='Введите пароль'
                spellCheck = 'false'
                name = 'password'
                autoComplete='off'
                onChange={changeHandler}
                ></input>
                <div className='relative w-[350px] top-5 text-xl flex justify-between'>
                    <button className='auth-button hover:bg-lime-500' type = 'submit' onClick={checkForValidate}>Зарегистрироваться</button>
                    <Link to = '/' className = 'auth-button'>Войти</Link>
                </div>
                
            </div>
        </div>
    );
};

export default RegistrationPage;