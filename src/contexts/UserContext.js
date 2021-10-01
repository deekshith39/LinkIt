import { useState, createContext, useEffect } from "react";
import firebase from "../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";


export const UserContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState(null);

   
    useEffect(() => {
        
        const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user.displayName);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);
    
    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
}
