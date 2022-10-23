import { configureStore } from "@reduxjs/toolkit";
import { userFavouritesReducer } from "./serverApi/serverSlice";
import { serverApi } from "./serverApi/server.api";
export const store = configureStore({
    reducer: {
        [serverApi.reducerPath]: serverApi.reducer,
        favourites: userFavouritesReducer
    },
    middleware: getDefaultWiddleWare => getDefaultWiddleWare().concat(serverApi.middleware)
})


export type RootState = ReturnType<typeof store.getState>   //Для удобства работы с данными в store