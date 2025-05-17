import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests,removeRequest } from "../utils/requestSlice";
import axios from "axios";

const Requests = () => {
  const requests = useSelector((store) => store.Requests);

  const dispatch = useDispatch();
  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.requests));
    } catch (err) {
      console.log(err);
    }
  };

  const reviewrequest = async (status, _id) => {
    try {
        await axios.post(
        BASE_URL + "/request/review/" + status + "/" +_id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));

    } catch (err) {
      // console.log(err.message);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests || requests.length === 0) return <h1 className="flex justify-center my-18 text-2xl text-red-500">No Request Found!!</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bolt text-white text-3xl">Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, age, gender, about, photoURL } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto justify-between items-center"
          >
            <div>
              <img
                src={photoURL}
                alt="photo"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewrequest("rejected",request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewrequest("accepted",request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
