import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age ||"");
  const [gender, setGender] = useState(user.gender||"");
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [about, setAbout] = useState(user.about||"");
  const [showToast,setShowToast] = useState(false);

  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoURL,
          about,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setError("");
      setShowToast(true);
      setTimeout(()=>{
        setShowToast(false);
      },3000);

    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-5">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>

                <label>
                  <div className="label">
                    <span className="label-text my-2">PhotoUrl</span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                  ></textarea>
                </label>

                <label>
                  <div className="label">
                    <span className="label-text my-2">About</span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </label>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center my-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, photoURL, about }}
        />
      </div>
      {
      showToast && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile Saved Successfully!!</span>
        </div>
      </div>
      }
    </>
  );
};
export default EditProfile;


//*ender should be drop down