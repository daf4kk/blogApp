import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface userFavouritesState{
    favourites: string[]
}

const initialState: userFavouritesState = {
    favourites: [] 
}

export const userFavouritesSlice = createSlice({    //slice - это те же самые reducer`s, а не "сложение" наших reducer`ов что можно было бы подумать
    name: 'server',
    initialState,
    reducers: {
        addFavourite(state, action:PayloadAction<string>){ //Тоесть тип payload - string
            state.favourites.push(action.payload);  //Сюда будут приходить url репозиториев
        },
        removeFavourite(state, action: PayloadAction<string>){
            state.favourites = state.favourites.filter(f => f !== action.payload)
        }
    }
})

export const userFavouritesActions = userFavouritesSlice.actions
export const userFavouritesReducer = userFavouritesSlice.reducer