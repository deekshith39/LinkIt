// MUI components
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider, IconButton } from '@mui/material';

// helpers
import toastMessage from '../helpers/toast';

// Hooks
import { useState, useContext, useEffect } from 'react'

// Firebase
import firebase from '../firebase/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, deleteDoc } from "firebase/firestore";

// Context
import { UserContext } from '../contexts/UserContext';

const CardView = (props) => {

    const [user, setUser] = useContext(UserContext)
    const [checked, setChecked] = useState(false)
    const [likes, setLikes] = useState(props.data[0].likes)

    useEffect(() => {
        if (props.user) {
            updateCheckBox()
        }
    }, [])

    async function updateCheckBox() {
        const userRef = doc(firebase.db, "users", user);
        const docSnap = await getDoc(userRef);

        const liked = docSnap.data().liked;

        if (liked.includes(props.data[1])) {
            setChecked(true)
        } else {
            setChecked(false)
        }

    }

    async function updateUserProfile(postId, like) {
        const docRef = doc(firebase.db, "users", user);

        if (like) {
            await updateDoc(docRef, {
                liked: arrayUnion(postId)
            })
        } else {
            await updateDoc(docRef, {
                liked: arrayRemove(postId)
            })
        }
    }

    async function getDocument(id, like) {
        const docRef = doc(firebase.db, "posts", id);
        if (like) {
            await updateDoc(docRef, {
                likes: likes + 1
            });

        } else {
            await updateDoc(docRef, {
                likes: likes - 1
            });
        }

        updateUserProfile(id, like)
    }

    function handleLike(e) {
        // e.target.checked ? setChecked(true) : setChecked(false)
        console.log(e.target.checked)
        if (!e.target.checked) {
            setChecked(false)
            getDocument(props.data[1], false)
            setLikes(likes - 1)
        } else {
            setChecked(true)
            getDocument(props.data[1], true)
            setLikes(likes + 1)
        }
    }

    function shareLink() {
        // console.log("Clicked!")
        navigator.clipboard.writeText(props.data[0].link)
        toastMessage.success("Link copied to clipboard!")
    }

    async function checkLikeandDelete() {
        const docRef = doc(firebase.db, "users", user);
        // update postsmade
        const docSnap = await getDoc(docRef);
        const postsmade = docSnap.data().postsmade;

        if(postsmade.includes(props.data[1])) {
            await updateDoc(docRef, {
                liked: arrayRemove(props.data[1]),
                postsmade: arrayRemove(props.data[1])
            })
        } else {
            await updateDoc(docRef, {
                liked: arrayRemove(props.data[1])
            })
        }      
    }

    async function handleDelete() {
        checkLikeandDelete()
        await deleteDoc(doc(firebase.db, "posts", props.data[1]));
        window.location.reload()
    }

    return (
        <>
            <a
                href={props.data[0].link}
                rel="noreferrer"
                target="_blank"
                style={{ textDecoration: "none" }}
            >
                <Card
                    sx={{
                        width: "200px",
                        boxShadow: '0 8px 16px 0 #BDC9D7',
                        padding: "10px",
                        color: "grey",
                        marginRight: "15px"
                        // border: "1px solid white"
                    }}
                >
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            {props.data[0].title}
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                            {props.data[0].description}
                        </Typography>
                    </CardContent>
                    <Divider />

                </Card>
            </a>
            <Card
                sx={{
                    width: "200px",
                    boxShadow: '0 8px 16px 0 #BDC9D7',
                    padding: "10px",
                    marginBottom: "15px",
                    color: "grey",
                    // border: "1px solid white"
                }}
            >
                <CardActions>
                    <IconButton onClick={shareLink}>
                        <ShareIcon
                            style={{ marginRight: "17px" }}
                        />
                    </IconButton>
                    <>
                        {
                            props.user ?
                                <>
                                    <Checkbox
                                        icon={<FavoriteBorder />}
                                        checkedIcon={<Favorite />}
                                        onChange={handleLike}
                                        checked={checked}
                                    />
                                    <Typography>{likes}</Typography>
                                </> : null
                        }
                    </>
                    <>
                        {
                            props.user === props.data[0].name ?
                                <IconButton onClick={handleDelete}>
                                    <DeleteIcon 
                                        style={{ marginLeft: "12px" }}
                                    />
                                </IconButton> : null
                        }
                    </>
                </CardActions>
            </Card>

        </>
    );
}

export default CardView;