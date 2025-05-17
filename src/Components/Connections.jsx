import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice.js";

const Connections = () => {
  const dispatch = useDispatch();
  const connections= useSelector((store)=>store.Connections);

  const fetchConnections = async () => {
    if(connections) return; 
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnection(res?.data?.data));
    
    } catch (err) { 
      console.log(err);
      //handle error
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  

  if(!connections) return;
  if(connections.length===0) return <h1 className="flex justify-center my-18 text-2xl text-red-500">No Connection Found !!</h1>

  return (
  <div className="text-center my-10">
        <h1 className="text-bolt text-white text-3xl">Connections</h1>

        {connections.map((connection)=>{
            const {_id,firstName,lastName,age,gender,about,photoURL}= connection;

            return (
                <div key={_id} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
                <div>
                    <img 
                    src={photoURL} 
                    alt="photo" 
                    className="w-20 h-20 rounded-full"
                    />
                </div>
                <div className="text-left mx-4">
                    <h2 className="font-bold text-xl">
                        {firstName+" "+lastName}
                    </h2>
                    {age && gender && <p>{age+" "+gender}</p>}
                    <p>{about}</p>
                </div>
                </div>
            )
        })}
  </div>


   );
};
export default Connections;
