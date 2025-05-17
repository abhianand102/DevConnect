import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed=()=>{
   const dispatch= useDispatch();
   const feed= useSelector((store)=>store.Feed);
   // const [feed,setfeed]= useState(useSelector((store)=>store.Feed));

   
   const getFeed= async ()=>{
      if(feed) return;
      try{
      const res=await axios.get(BASE_URL+"/feed",{withCredentials: true});
       dispatch(addFeed(res?.data));
      
      }catch(err){
         // to do- error handling
      }
   }
   
   useEffect(()=>{
       getFeed();
       
   },[]);

   if(!feed) return;
   if(feed.length===0) return <h1 className="flex justify-center text-2xl my-15 text-amber-600"> No New User Found!!</h1>
   
   return( 
   (<div className="flex justify-center my-10">
      <UserCard  user={feed[0]} />
   </div>)
);
}
export default Feed;
