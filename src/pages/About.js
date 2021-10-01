// components
import NavBar from '../components/NavBar'

// context
import { UserContext } from '../contexts/UserContext';

// Hooks
import { useState, useContext } from 'react';


const About = () => {
    const [user, isUser] = useContext(UserContext);

    return (
        <div>
            <NavBar isUser={user}/>
            <h1>About</h1>
        </div>
    );
}

export default About;