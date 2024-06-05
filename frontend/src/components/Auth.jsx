import React, { useContext, useEffect, useState } from "react";
import googleImage from "../assets/google.png";
import { auth, googleProvider, db } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup , updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import Login from "./Login";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [close, setClose] = useState(false);
  const [flipLogin, setFlipLogin] = useState(true);

  const { userLoggedIn } = useContext(AuthContext);

  

  const navigate = useNavigate();

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/home");
    }
  }, [userLoggedIn, navigate]);

  const handleClose = () => {
    setClose(!close);
  };

  const toggleFlip = () => {
    setFlipLogin(!flipLogin);
  };

  const signIn = async () => {
    if (password === confirmPassword) {
      try {
        
        const {user} = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await updateProfile(auth.currentUser, {
            displayName:fullName,
            photoURL:""
        })
        

        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFullName("");
      } catch (error) {
        console.log(error);
      }
    } else {
      setClose(true);
    }
  };

  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        fullName: user.displayName,
        email: user.email,
      });

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFullName("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-blue-950 h-screen flex justify-center items-center">
      <div className="p-5 bg-white rounded-xl flex flex-col gap-2">
        <h1 className="text-center text-3xl font-bold mb-4">Simple Store</h1>
        {flipLogin ? (
          <Login toggle={toggleFlip} />
        ) : (
          <div className="flex flex-col gap-2">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                required
                type="text"
                className="grow"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                required
                type="text"
                className="grow"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                required
                type="password"
                className="grow"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                required
                type="password"
                className="grow"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                value={confirmPassword}
              />
            </label>

            <button onClick={signIn} className="btn btn-wide bg-blue-950 text-white">
              Register
            </button>
            <p className="text-blue-950">
              Have an account?{" "}
              <button onClick={toggleFlip} className="text-black font-bold">
                Login
              </button>
            </p>
          </div>
        )}

        <button onClick={googleSignIn} className="btn btn-wide bg-blue-950 text-white">
          <span><img className="w-5 " src={googleImage} alt="" /></span>Sign With Google
        </button>
      </div>

      {/* alert */}
      {close && (
        <div
          role="alert"
          className="alert alert-warning absolute top-[20px] w-[500px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Warning: Password and Confirm Password not matched!</span>
          <button onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default Auth;
