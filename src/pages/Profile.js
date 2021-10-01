// components
import NavBar from '../components/NavBar'

// Hooks
import { useContext, useEffect } from 'react'

// context
import { UserContext } from '../contexts/UserContext'

const Profile = () => {
    const [user, setUser] = useContext(UserContext)

    return (
        <div>
            <NavBar isUser={user}/>
            <h1>Profile</h1>
        </div>  
    );
}
 
export default Profile;