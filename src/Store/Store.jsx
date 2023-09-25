import { configureStore } from "@reduxjs/toolkit";
import createSliceStore from "./SliceStore";

const store =configureStore({
    reducer:{
        wheather: createSliceStore
    }

})
export default store