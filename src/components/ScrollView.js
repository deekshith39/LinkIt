// MUI component
import Card from './CardView';
import CircularProgress from '@mui/material/CircularProgress';

// External 
import { ScrollMenu } from 'react-horizontal-scrolling-menu'

// Hooks
import { useEffect, useState } from 'react';

// firebase
import firebase from '../firebase/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";


const ScrollView = (props) => {

    const [items, setItems] = useState([])
    const [busy, setBusy] = useState(false)
    useEffect(() => {
        
        getItems()
        
    }, [])

    async function getItems() {
        setBusy(true)
        var q = query(collection(firebase.db, "posts"), where("category", "==", props.category));
        const querySnapshot = await getDocs(q);
        const posts = []
        querySnapshot.forEach((doc) => {
            posts.push([doc.data(), doc.id])
        });
        // console.log(posts)
        setItems(posts)
        setBusy(false)
    }

    return (
        <>
            {
                busy ?
                    <CircularProgress /> :
                    <ScrollMenu>
                        {
                            items.map(data => {
                                return (
                                    <Card data={data} user={props.user} key={data[1]} />
                                )
                            })
                        }
                    </ScrollMenu>
            }
            
        </>
    );
}

export default ScrollView;