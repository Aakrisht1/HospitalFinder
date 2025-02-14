"use client";
import { useEffect, useState, createContext, useContext } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            window.location.href = 'https://hospital-finder-dkbc.vercel.app/getLocation';
        } catch (error) {
            console.log(error);
        }
    }

    const logOut = async () => {
        try {
            await signOut(auth);
            window.location.href = 'https://hospital-finder-dkbc.vercel.app/';
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{user, googleSignIn, logOut}}>
            {children}
        </AuthContext.Provider>
    );
}

export const UserAuth = () => {
    return useContext(AuthContext);
}