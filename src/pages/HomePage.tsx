import React from 'react';
import { useFetchUsersQuery } from '../store/serverApi/server.api';
const HomePage = () => {
    const {data:DBUsers} = useFetchUsersQuery('')
    console.log(DBUsers)
    return (
        <div>
            <h1>Home</h1>
        </div>
    );
};

export default HomePage;