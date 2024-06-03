import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, initializeUser)
        return unsubscribe;
    },[])

    async function initializeUser(user){
        if(user){
            console.log(user)
            const docRef = doc(db,"users", user.uid);
            const docSnap = await getDoc(docRef);
            
            setCurrentUser({...docSnap.data()})
            setUserLoggedIn(true);
        }else{
            setCurrentUser(null);
            setUserLoggedIn(false);
        }

        setLoading(false);
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading
    }

    return(
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
};


