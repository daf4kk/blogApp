import React, {Dispatch, SetStateAction} from 'react';
import { Link } from 'react-router-dom';
import logoIcon from '../imgs/logo.png'
import { IUser } from '../types/serverModels';
interface Props{
    setIsLoged: Dispatch<SetStateAction<IUser | null>>
    children: JSX.Element
}

const PageContainer:React.FC<Props> = ({setIsLoged, children}) => {
    return (
        <>
            <header className = 'w-[1900px] h-[65px] bg-cyan-500 m-auto mt-2 p-4 rounded-lg flex items-center justify-between shadow-2xl 2xl:w-[1200px] xl:w-[1000px] lg:w-[900px]'>
                <a href = 'https://github.com/daf4kk' target= '_blank' rel = 'noreferrer'><img src = {logoIcon} alt = 'logo' className = 'cursor-pointer w-[50px] h-[50px] '></img></a>
                <ul className='flex'>
                    <Link to = '/home' className='header-button'>Домой</Link>
                    <Link to = 'favourites' className='header-button'>Избранное</Link>
                    <li className='header-button'>Мои посты</li>
                    <li className='header-button'>Создать пост</li>
                    <li className='header-button hover:bg-red-400' onClick = {() => {
                        localStorage.removeItem('active-user-email');
                        setIsLoged(null)
                        // window.location.reload()
                    }}>Выйти</li>
                </ul>
            </header>
            <div className='w-[1900px] h-auto m-auto mt-2 mb-5 bg-cyan-500 shadow-2xl rounded-lg flex justify-center 2xl:w-[1200px] xl:w-[1000px] lg:w-[900px]'>
                {children}
            </div>
        </>
    );
};

export default PageContainer;