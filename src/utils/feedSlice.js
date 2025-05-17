import { createSlice } from "@reduxjs/toolkit";

 const feedSlice= createSlice({
    name:"Feed",
    initialState:null,
    reducers:{
        addFeed: (state,action)=>action.payload,

        removeUserFromFeed: (state,action)=>{
            const newArray= state.filter(state._id !== action.payload);
            return newArray;
        },
    },
 })
 
 export const{addFeed, removeUserFromFeed} = feedSlice.actions;
 export default feedSlice.reducer;