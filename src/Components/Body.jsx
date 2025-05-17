import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar"
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
const Body= ()=>{
    const dispatch=useDispatch();
    const navigate= useNavigate();
    const userData= useSelector((store)=>store.User);

    const fetchUser= async ()=>{
        if(userData) return;
        try{
            const res=await axios.get(BASE_URL+"/profile/view",{
                withCredentials:true,
            })
            dispatch(addUser(res.data));
            
        }catch(e){
            dispatch(removeUser());
            if(e.response.status===400) navigate("/login");
                // you can render a beautiful Error page
        }
    }
    useEffect(()=>{
        fetchUser();
    },[]);

    return (
        <>
         <Navbar/> 
         <Outlet/>
         <Footer/>
        </>
    )
}
export default Body;