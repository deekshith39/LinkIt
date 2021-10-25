// Components
import NavBar from '../components/NavBar'
import { ProfileCard } from '../components/ProfileCard'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

// Hooks
import { useContext, useEffect, useState } from 'react'

// Context
import { UserContext } from '../contexts/UserContext'

// Firebase
import { doc, getDoc } from "firebase/firestore";
import firebase from '../firebase/firebase';


const Profile = () => {
    const [user, setUser] = useContext(UserContext)
    const [userData, setUserData] = useState({})
    const [busy, setBusy] = useState(true)

    useEffect(() => {

        setTimeout(() => {
            if (user) {
                getUserProfile()
            }
        }, 3000)

    }, [user])

    async function getUserProfile() {
        setBusy(true)

        const docRef = doc(firebase.db, "users", user);
        const docSnap = await getDoc(docRef);
        setUserData(docSnap.data())

        setBusy(false)
    }

    return (
        <div>
            <NavBar isUser={user} />
            {
                <div
                    style={{
                        marginTop: '100px',
                        marginLeft: '50px'
                    }}
                >
                    <ProfileCard data={userData} busy={busy} />
                    {/* <LikedSection data={userData} key={user}/> */}
                </div>
            }
        </div>
    );
}

export default Profile;