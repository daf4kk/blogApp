import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"
import { userFavouritesActions } from "../store/serverApi/serverSlice";

const actions = {
    ...userFavouritesActions,
}

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch)
}