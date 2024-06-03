import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import userImage from "../assets/user.png";
import ProfileModal from "./ProfileModal";

function NavBar() {
  const [openModal, setOpenModal] = useState(false);

  const { currentUser, userLoggedIn } = useContext(AuthContext);
  console.log(currentUser);


  const toggleModal = ()=>{
    setOpenModal(!openModal);
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Simple Store</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <h1>{currentUser.displayName}</h1>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={currentUser.userImage ? currentUser.userImage : userImage}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                {/* {<ProfileModal openToggle={toggleModal} />} */}
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
