// external
import { ScrollMenu } from "react-horizontal-scrolling-menu";

// components
import { useState, useEffect } from "react";

// Firebase
import { doc, getDoc } from "firebase/firestore";
import firebase from '../firebase/firebase';
import CardView from "./CardView";



const LikedSection = (props) => {
    const { liked } = props.data
    const [likedPosts, setLikedPosts] = useState([])


    useEffect(() => {
        // eslint-disable-next-line
        if (liked) {
            // console.log(liked)
            const posts = []
            liked.forEach(docId => {
                getPostDetails(docId, posts)
            })
            setLikedPosts(posts)
        }
    }, [liked])

    async function getPostDetails(Id, posts) {
        const docRef = doc(firebase.db, "posts", Id);
        const docSnap = await getDoc(docRef);
        posts.push(docSnap.data())
    }

    return (
        <>
            <h1>Liked</h1>
            {console.log(likedPosts)}
        </>

    );
}

export default LikedSection;