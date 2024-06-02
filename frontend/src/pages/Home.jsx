import React, { useContext, useEffect } from "react";
import { auth, googleProvider } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

function Home() {
  const { currentUser, userLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/");
    }
  }, [userLoggedIn, navigate]);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {currentUser && (
        <h1 className="text-2xl font-bold text-center mt-[100px]">
          Hello: {currentUser.displayName}
        </h1>
      )}
      <div className="flex justify-center mt-4">
        <button onClick={handleLogOut} className="btn btn-wide bg-blue-950">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
