import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@mui/icons-material/Person';
import { Row, Column, Item } from '@mui-treasury/components/flex';

// Components
import Card from './CardView';

// Hooks
import { useState, useEffect } from 'react'

// External 
import { ScrollMenu } from 'react-horizontal-scrolling-menu'

// firebase
import { doc, getDoc } from "firebase/firestore";
import firebase from '../firebase/firebase';

const StyledTooltip = withStyles({
    tooltip: {
        marginTop: '0.2rem',
        backgroundColor: 'rgba(0,0,0,0.72)',
        color: '#fff',
    },
})(Tooltip);

const useBasicProfileStyles = makeStyles(({ palette }) => ({
    avatar: {
        borderRadius: 8,
        backgroundColor: '#495869',
    },
    overline: {
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#8D9CAD',
    },
    name: {
        fontSize: 14,
        fontWeight: 500,
        color: '#495869',
    },
}));


const useCardHeaderStyles = makeStyles(() => ({
    root: {
        paddingBottom: 0,
    },
    title: {
        fontSize: '2.25rem',
        color: '#122740',
    },
    subheader: {
        fontSize: '1.275rem',
        color: '#495869',
    },
}));

const CardHeader = (props) => {
    const styles = useCardHeaderStyles();
    const { name, email, liked, postsmade } = props.data
    return (
        <>
            <Row>
                <Item position={'middle'} margin={'25px'}>
                    <Typography className={styles.title}>
                        <b>{name}</b>
                    </Typography>
                    <Typography className={styles.subheader}>
                        {email}
                    </Typography>
                </Item>
            </Row>
            <Column>
                <Item position={'middle'} margin={'25px'}>
                    <Typography variant='subtitle1'>
                        Your Posts: {postsmade && postsmade.length}
                    </Typography>
                    <Typography variant='subtitle1'>
                        Liked Posts: {liked && liked.length}
                    </Typography>
                </Item>
            </Column>
        </>
    );
};

const useStyles = makeStyles(() => ({
    card: {
        border: '2px solid',
        borderColor: '#E7EDF3',
        borderRadius: 16,
        transition: '0.4s',
        '&:hover': {
            borderColor: '#5B9FED',
        },
    },
}));

export const ProfileCard = (props) => {

    const { liked, postsmade } = props.data
    const [likedPosts, setlikedPosts] = useState(null)
    const [busy, setBusy] = useState(true)
    

    const style = {
        textAlign: "left",
        marginTop: "50px",
        marginBottom: "10px"
    }

    useEffect(() => {
        
        if (liked) {
            setBusy(true)
            postDetails()
        }

    }, [liked])

    useEffect(() => {

        if(likedPosts) {
            console.log(likedPosts)
            setBusy(false)
        }

    }, [likedPosts])


    async function postDetails() {

        var posts = []

        liked.map(async (docId) => {
            const docRef = doc(firebase.db, "posts", docId);
            const docSnap = await getDoc(docRef);
            posts.push([docSnap.data(), docSnap.id])
        })

        setlikedPosts(posts)
    
    }

    // async function getUserProfile() {
    //     const docRef = doc(firebase.db, "users", props.user);
    //     const docSnap = await getDoc(docRef);
    //     setUserData(docSnap.data())        
    // }

    // async function getUserProfile() {
    //     const docRef = doc(firebase.db, "users", props.user);
    //     const docSnap = await getDoc(docRef);
    //     getLikedPosts(docSnap.data())
    //     setUserData(docSnap.data())
    // }

    // async function getLikedPosts(userDetails) {
    //     console.log(userDetails)
    // }

    const styles = useStyles();
    const gap = { xs: 1, sm: 1.5, lg: 2 }
    return (
        <div>
            {
                
                    <>
                        <Grid container spacing={4} justify={'center'}>
                            <Grid item xs={12} sm={9} lg={5}>
                                <Row className={styles.card} p={{ xs: 0.5, sm: 0.75, lg: 1 }} gap={gap}>
                                    <Item>
                                        <Box height={200} width={200} bgcolor={'#F4F7FA'} borderRadius={15} margin={'25px'}>
                                            <PersonIcon sx={{ fontSize: 200 }} />
                                        </Box>
                                    </Item>
                                    <Column>
                                        {
                                            props.data && <CardHeader data={props.data} />
                                        }
                                    </Column>
                                </Row>
                            </Grid>
                        </Grid>
                        <div>
                            <Typography
                                variant="h5"
                                color="primary"
                                style={style}
                            >
                                Liked Posts:
                            </Typography>
                            <ScrollMenu>
                                {
                                    !busy ? // console.log("busy") : console.log("not busy")
                                    likedPosts && likedPosts.map(data => {
                                        console.log(busy)
                                        console.log(data)
                                        // return (
                                        //     <Card data={data} user={props.user} key={data[1]} />
                                        // )
                                    }) : <h1>Loading..</h1>
                                }
                            </ScrollMenu>

                        </div>
                    </> 
            }
        </div>
    );
};
export default ProfileCard