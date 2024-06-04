import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import userImage from "../assets/user.png";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { usePosts } from "../contexts/postContext/PostContext";

function NavBar({ toggleModal, toggleCreateModal }) {
  const { currentUser, userLoggedIn } = useContext(AuthContext);
  const {resetPost} = usePosts()

  console.log(currentUser);

  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      resetPost();
      navigate("/");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar bg-blue-950 fixed z-50 px-5">
      <div className="flex-1">
        <p className="text-xl text-white">Simple Store</p>
      </div>
      <div className="flex-none gap-2">
        {/* <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div> */}
        <button onClick={toggleCreateModal} className="btn">Create Content</button>
        <h1 className="text-white">{currentUser.displayName}</h1>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={currentUser.photoURL ? currentUser.photoURL : userImage}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <button onClick={toggleModal} className="justify-between">
                Profile
                <span className="badge">New</span>
              </button>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button onClick={handleLogOut}>Log out</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
