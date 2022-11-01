import React, {useState, Dispatch, SetStateAction} from 'react';
import { useFetchUsersQuery } from '../store/serverApi/server.api';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/useSelector';
import { useActions } from '../hooks/actions';
import { IUser } from '../types/serverModels';
import logoIcon from '../imgs/logo.png';
import errorIcon from '../imgs/error.png';

interface Props{
    setIsLoged: Dispatch<SetStateAction<IUser | null>>
}

const LoginPage:React.FC<Props> = ({setIsLoged}) => {

    // const {isLoading, isError, data} = useFetchUsersQuery('');
    // const {favourites} = useAppSelector(state => state.favourites)
    // const {addFavourite, removeFavourite} = useActions();
    
    const [error, setError] = useState<string | null>(null)
    const {data:DBUsers} = useFetchUsersQuery('')
    const [userData, setUserData] = useState({
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
        const {email, password} = userData;
        if (!email || !password ){
            setError('Поля должны быть заполнены')
            return
        }
        const user = DBUsers.find((user:IUser) => user.email === email)
        if (!user){
            setError(`Пользователь не найден`);
            return
        }
        if (user.password !== password){
            setError(`Неверный пароль`);
            return
        }
        setIsLoged(user)
        localStorage.setItem('active-user-email', email)
        return
    }

    
    return (
        <div className='absolute w-full h-full bg-cyan-900 flex justify-center '>
            <div className='w-[600px] h-[500px] bg-cyan-600 rounded-full flex flex-col justify-center items-center 2xl:mt-[10%] xl:mt-[7%] lg:mt-[5%]'>
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
                    <button className='auth-button hover:bg-lime-500' type = 'submit' onClick={checkForValidate}>Войти</button>
                    <Link to = '/registration' className='auth-button'>Регистрация</Link>
                </div>
                
            </div>
        </div>
    );
};

export default LoginPage;