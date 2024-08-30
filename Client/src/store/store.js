import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "../reducer/reducer";

const Store = configureStore({
    reducer : RootReducer,
})

export default Store;