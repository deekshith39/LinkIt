// components
import NavBar from "../components/NavBar";

// Hooks
import { useState, useContext } from "react";

// context
import { UserContext } from '../contexts/UserContext'

const Dashboard = () => {
    const [user, setUser] = useContext(UserContext)

    return (
        <div>
            {console.log(user)}
            <NavBar isUser={user}/>
            <h1>Dashboard</h1>
        </div>
        
    );
}
 
export default Dashboard;