// MUI components
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@mui/icons-material/Person';
import { Row, Column, Item } from '@mui-treasury/components/flex';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

// Router Hooks
import { Link } from 'react-router-dom';

const useCardHeaderStyles = makeStyles(() => ({
    root: {
        paddingBottom: 0,
    },
    title: {
        fontSize: '2.25rem',
        color: '#122740'
    },
    subheader: {
        fontSize: '1.275rem',
        color: '#495869'
    },
    link: {
        textDecoration: 'none'
    }
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

                    <Link to="/profile/edit" className={styles.link}>
                        <Button
                            // onClick={handleClick}
                            color="primary"
                            startIcon={<CreateIcon />}
                            size="large"
                            variant="contained"
                            style={{
                                margin: "25px"
                            }}
                        >
                            Update
                        </Button>
                    </Link>
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

    // const { liked, postsmade } = props.data
    // const [likedPosts, setlikedPosts] = useState([])
    // const [busy, setBusy] = useState(true)




    // useEffect(() => {

    //     if (props.data.liked) {
    //         setBusy(true)
    //         // postDetails()
    //     }

    // }, [props.data.liked])

    // useEffect(() => {

    //     if(likedPosts) {
    //         console.log(likedPosts)
    //         // setBusy(false)
    //     }

    // }, [likedPosts])


    // async function postDetails() {
    //     var posts = []
    //     props.data.liked.map((docId) => {
    //         postDetailsUtil(docId, posts)
    //     })
    //     setlikedPosts(posts)
    // }

    // async function postDetailsUtil(docId, posts) {

    //     const docRef = doc(firebase.db, "posts", docId);
    //     const docSnap = await getDoc(docRef);
    //     posts.push([docSnap.data(), docSnap.id])

    // }

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
                !props.busy ?
                    <>
                        <Grid container spacing={4} justifyContent={'center'}>
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
                        {/* <div>
                            <Typography
                                variant="h5"
                                color="primary"
                                style={style}
                            >
                                Liked Posts:
                            </Typography>
                            <ScrollMenu>
                                {
                                    // console.log(likedPosts)
                                    likedPosts && likedPosts.map(data => {
                                        console.log(data)
                                        return (
                                            <Card data={data} key={data[1]} />
                                        )
                                    })
                                }
                            </ScrollMenu>

                        </div> */}
                    </>
                    : <CircularProgress />
            }
        </div>
    );
};
export default ProfileCard