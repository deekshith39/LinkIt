// MUI components
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import CreateIcon from '@mui/icons-material/Create';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';

// components
import NavBar from '../components/NavBar'

// Hooks
import { useContext, useState } from 'react';
import { useHistory } from "react-router";

// context
import { UserContext } from '../contexts/UserContext';

// firebase
import { collection, addDoc, doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import firebase from "../firebase/firebase";

// validators
import validateCreate from "../validators/validateCreate";

// helpers
import toastMessage from "../helpers/toast";



const Create = () => {
    const [busy, setBusy] = useState(false)
    const [user, setUser] = useContext(UserContext)
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [link, setLink] = useState('')
    const [desc, setDesc] = useState('')
    const history = useHistory()


    function handleChange(event) {
        const { value, name } = event.target;
        console.log(name, value)
        if (name === "category") {
            setCategory(value);
        } else if (name === "title") {
            setTitle(value);
        } else if (name === "link") {
            setLink(value);
        } else {
            setDesc(value);
        }
    }

    async function updateUserProfile(postId) {
        const docRef = doc(firebase.db, "users", user);
        await updateDoc(docRef, {
            postsmade: arrayUnion(postId)
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        //setBusy(true)
        const docData = {
            category: category,
            title: title,
            name: user,
            link: link,
            description: desc,
            created: Date.now(),
            likes: 0
        }

        const errorMessage = validateCreate(docData)
        if (errorMessage === "no errors") {
            const docRef = await addDoc(collection(firebase.db, "posts"), docData)
            updateUserProfile(docRef.id)
            //setBusy(false)
            toastMessage.success("Added successfully!")
            history.go(-1)
            console.log(docRef.id)
        } else {
            //setBusy(false)
            toastMessage.error(errorMessage)
        }
    }

    const categories = [
        {
            value: 'Education',
        },
        {
            value: 'Coding',
        },
        {
            value: 'Web Development',
        },
        {
            value: 'Music',
        },
        {
            value: 'Other'
        }
    ];

    return (
        <div>
            <NavBar isUser={user} />


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
                                    margin: "30px"
                                }}
                            >
                                <strong>Create</strong>
                            </Typography>

                            <TextField
                                variant="outlined"
                                color="secondary"
                                name="category"
                                select
                                label="Category"
                                type="text"
                                value={category}
                                onChange={handleChange}
                                style={{
                                    margin: "10px",
                                    width: "300px",
                                    justifyContent: 'left'
                                }}
                                required
                            >
                                {categories.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.value}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                variant="outlined"
                                color="secondary"
                                name="title"
                                value={title}
                                onChange={handleChange}
                                type="text"
                                label="Title"
                                placeholder="Eg: Material UI Ninjas"
                                style={{
                                    margin: "10px",
                                    width: "300px"
                                }}
                                required
                            />

                            <TextField
                                variant="outlined"
                                color="secondary"
                                name="link"
                                value={link}
                                onChange={handleChange}
                                type="text"
                                label="Link"
                                placeholder="www.example.com"
                                style={{
                                    margin: "10px",
                                    width: "300px"
                                }}
                                required
                            />

                            <TextareaAutosize
                                minRows={7}
                                value={desc}
                                name="desc"
                                onChange={handleChange}
                                aria-label="maximum height"
                                placeholder="Description"
                                style={{
                                    width: "300px",
                                    margin: "10px"
                                }}
                                required
                            />

                            <Button
                                color="primary"
                                startIcon={<CreateIcon />}
                                size="large"
                                onClick={handleSubmit}
                                variant="contained"
                                style={{
                                    margin: "25px"
                                }}
                            >
                                Create
                            </Button>
                        </div>
                    </Box>
                </div>
            </Container>
        </div>
    );
}

export default Create;