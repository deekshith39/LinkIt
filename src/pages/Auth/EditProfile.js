// MUI components
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import CreateIcon from '@mui/icons-material/Create';

// components 
import NavBar from '../../components/NavBar'

// user context
import { UserContext } from '../../contexts/UserContext';

// Hooks
import { useContext, useState, useEffect } from 'react';

// Router Hooks
import { useHistory } from "react-router";

// Firebase
import {
    onAuthStateChanged,
    updateEmail,
    updateProfile,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential
} from "firebase/auth";

import { doc, updateDoc } from "firebase/firestore";

import firebase from "../../firebase/firebase";

// helpers
import toastMessage from "../../helpers/toast";
import validateEditProfile from "../../validators/validateEditProfile";

const EditProfile = () => {
    const [user, setuser] = useContext(UserContext);
    const [currentName, setCurrentName] = useState('')
    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [currentEmail, setCurrentEmail] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const history = useHistory()

    useEffect(() => {
        onAuthStateChanged(firebase.auth, (user) => {
            if (user) {
                setNewName(user.displayName)
                setCurrentName(user.displayName)
                setNewEmail(user.email)
                setCurrentEmail(user.email)
            } else {
                console.error("user signed out")
            }
        });
    }, [])

    function handleChange(e) {
        const { value, type } = e.target
        type === "text" ? setNewName(value) : (type === "email" ? setNewEmail(value) : setCurrentPassword(value))
    }

    function reauthenticateAndUpdate(currentEmail, password) {
        // console.log(currentEmail, password)
        var cred = EmailAuthProvider.credential(
            currentEmail,
            password
        );
        // console.log(cred)
        reauthenticateWithCredential(firebase.auth.currentUser, cred).then(() => {
            // console.log("Re-Auth Successful")
            updateUserAuth()
            history.push("/profile")
        }).catch((err) => {
            console.log(err.message)
            toastMessage.error(err.message)
        })
    }


    async function updateOnFirestore(field) {
        const docRef = doc(firebase.db, "users", user)
        if (field === "email") {
            await updateDoc(docRef, {
                email: newEmail
            })
            toastMessage.success("Email Updated")
        }

        if (field === "name") {
            await updateDoc(docRef, {
                name: newName
            })
            toastMessage.success("Name Updated")
        }

    }

    function updateUserAuth() {
        if (newEmail !== currentEmail) {
            updateEmail(firebase.auth.currentUser, newEmail).then(() => {
                console.log("Email updated!")
                updateOnFirestore("email")

            }).catch((err) => {
                console.log(err.message)
                toastMessage.error(err.message)
            })
        }
        if (newName !== currentName) {
            updateProfile(firebase.auth.currentUser, {
                displayName: newName
            }).then(() => {
                // console.log("Profile Updated!")
                updateOnFirestore("name")
            }).catch((err) => {
                console.log(err.message)
                toastMessage.error(err.message)
            })
        }
        if (newPassword !== "" && newPassword !== currentPassword ) {
            updatePassword(firebase.auth.currentUser, newPassword).then(() => {
                console.log("Password updated")
                toastMessage.success("Password Updated!")
            }).catch((err) => {
                console.log(err.message)
                toastMessage.error(err.message)
            })
        }
    }

    function handleEdit() {

        const message = validateEditProfile(newName, newEmail, newPassword)

        if(message === "no errors") {
            reauthenticateAndUpdate(currentEmail, currentPassword)
        } else {
            toastMessage.error(message);
        }        

    }

    return (
        <>
            <NavBar isUser={user} />
            <div
                style={{
                    marginTop: "70px"
                }}
            >
                <Container>
                    <div className="signin">
                        <Box
                            sx={{
                                boxShadow: 3
                            }}
                        >
                            <div className="subclass">
                                <Typography
                                    variant="h4"
                                    color="primary"
                                    style={{
                                        margin: "40px"
                                    }}
                                >
                                    <strong>Edit Profile</strong>
                                </Typography>
                                <TextField
                                    value={newName}
                                    onChange={handleChange}
                                    variant="outlined"
                                    color="secondary"
                                    type="text"
                                    label="Name"
                                    placeholder="Eg: Ravi Kumar"
                                    style={{
                                        margin: "10px"
                                    }}
                                />

                                <TextField
                                    value={newEmail}
                                    onChange={handleChange}
                                    variant="outlined"
                                    color="secondary"
                                    type="email"
                                    label="Email"
                                    placeholder="example@gmail.com"
                                    style={{
                                        margin: "10px"
                                    }}
                                />

                                <TextField
                                    value={currentPassword}
                                    onChange={handleChange}
                                    variant="outlined"
                                    color="secondary"
                                    type="password"
                                    label="Current Password"
                                    style={{
                                        margin: "10px"
                                    }}
                                />

                                <TextField
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    variant="outlined"
                                    color="secondary"
                                    type="password"
                                    label="New Password"
                                    style={{
                                        margin: "10px"
                                    }}
                                />

                                <Button
                                    onClick={handleEdit}
                                    color="primary"
                                    startIcon={<CreateIcon />}
                                    size="large"
                                    variant="contained"
                                    style={{
                                        margin: "25px"
                                    }}
                                >
                                    Edit
                                </Button>
                            </div>
                        </Box>
                    </div>
                </Container>
            </div>
        </>
    );
}

export default EditProfile;