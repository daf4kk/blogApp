import React, {Dispatch, SetStateAction} from 'react';
import PageContainer from '../components/PageContainer';
import { useFetchUsersQuery } from '../store/serverApi/server.api';
import { IUser } from '../types/serverModels';

interface Props{
    setIsLoged: Dispatch<SetStateAction<IUser | null>>
}
const HomePage:React.FC<Props> = ({setIsLoged}) => {

    // const {data:DBUsers} = useFetchUsersQuery('')
    // console.log(DBUsers)
    return (
        <PageContainer setIsLoged={setIsLoged}>
            <div>
                <h1>Home</h1>
            </div>
        </PageContainer>
    );
};

export default HomePage;