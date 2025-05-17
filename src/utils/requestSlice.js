import { createSlice } from "@reduxjs/toolkit";

const requestSlice=createSlice({
    name:"Requests",
    initialState:null,
    reducers:{
        addRequests:(state,action)=>action.payload,
        removeRequest:(state,action)=>{
            const newArray= state.filter((req)=>req._id !== action.payload._id);
            return newArray;
        }
    }
});

export const {addRequests,removeRequest} = requestSlice.actions;
export default requestSlice.reducer;