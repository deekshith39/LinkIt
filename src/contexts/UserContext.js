import { useState, createContext, useEffect } from "react";
import firebase from "../firebase/firebase";


export const UserContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState(null);

   
    useEffect(() => {
        
        const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
            if (user) {
                // console.log(user.uid)
                setUser(user.uid);
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
