import { IBlog } from './../../types/serverModels';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useUpdateUserMutation } from './server.api';


interface userFavouritesState{
    favourites: IBlog[]
}


const initialState: userFavouritesState = {
    favourites: [] 
}
export const userFavouritesSlice = createSlice({    //slice - это те же самые reducer`s, а не "сложение" наших reducer`ов что можно было бы подумать
    name: 'server',
    initialState,
    reducers: {
        clearState(state){
            state.favourites = []
        },

        addFavourite(state, action:PayloadAction<IBlog>){ 
            state.favourites.push(action.payload);  
        },

        removeFavourite(state, action: PayloadAction<string>){
            state.favourites = state.favourites.filter(fav => fav.blogId !== action.payload)
        }
    }
})

export const userFavouritesActions = userFavouritesSlice.actions
export const userFavouritesReducer = userFavouritesSlice.reducer