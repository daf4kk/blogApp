import React, {useEffect, useState} from 'react';
import { useFetchBlogsQuery } from '../store/serverApi/server.api';
import { IBlog } from '../types/serverModels';

interface Props{
    items: string[] | [] | undefined
}

const FavouritesBlogsPage:React.FC<Props> = ({items}) => {
    //Хранить favourites в slice
    const [favourites, setFavourites] = useState([])
    const {data:blogs, isError, isLoading} = useFetchBlogsQuery(100);
    console.log(items)

    
    return (
        <div>
            <h1>Favourites</h1>
        </div>
    );
};

export default FavouritesBlogsPage;