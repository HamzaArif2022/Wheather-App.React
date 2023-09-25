import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isSelected:false,
    clouds:'',
    main:{
        temp_min:''
    }, 
    name:'', 
    sys:{
        sunrise:''
    }, 
    weather:'', 
    wind:{
        speed:''
    }

}
const createSliceStore=createSlice({
    name:"wheather",
    initialState,
    reducers:{
        setwheather:(state,action)=>{
            const {clouds, main, name, sys, weather, wind,isSelected} = action.payload
            state.clouds=clouds
            state.main=main
            state.name=name        
            state.sys=sys       
            state.weather=weather        
            state.wind=wind  
            state.isSelected=isSelected 
             
        
        },
        resetwheather:(state,action)=>{
            state.isSelected=action.payload
        },
    }
    
    

})
export default createSliceStore.reducer
export const {setwheather,resetwheather}=createSliceStore.actions