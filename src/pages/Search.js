// components
import NavBar from '../components/NavBar'

// context
import { UserContext } from '../contexts/UserContext';

// Hooks
import { useState, useContext, useEffect } from 'react';

// MUI components
import { TextField } from "@mui/material";
import Typography from '@mui/material/Typography';

// Firebase
import { collection, getDocs } from "firebase/firestore";
import firebase from '../firebase/firebase';


const Search = () => {
    
    const [user, isUser] = useContext(UserContext);
    const [filteredLinks, setFilteredLinks] = useState([]);
    const [filter, setFilter] = useState("");
    const [links, setLinks] = useState([]);

    useEffect(() => {

        getInitialLinks();

    }, []);

    useEffect(() => {
        handleSearch()
        // eslint-disable-next-line
    }, [filter])

    async function getInitialLinks() {

        const querySnapshot = await getDocs(collection(firebase.db, "posts"));
        var tempLinks = []
        querySnapshot.forEach((doc) => {
            tempLinks.push({ id: doc.id, ...doc.data() });
        });
        setLinks(tempLinks);

    }

    function handleSearch() {
        // console.log(filter)
        // console.log(links)

        const query = filter.toLowerCase();
        const matchedLinks = links.filter((link) => {
            return (
                link.title.toLowerCase().includes(query) ||
                link.description.toLowerCase().includes(query) ||
                link.link.toLowerCase().includes(query)
            )
        })
        setFilteredLinks(matchedLinks);

    }

    function handleChange(evt) {
        if (evt.key === "Enter") {
            setFilter(evt.target.value);
        }
    }

    return (
        <div>
            <NavBar isUser={user} />
            <div
                style={{
                    marginTop: '100px',
                    marginLeft: '50px'
                }}
            >
                <div>
                    <TextField
                        onKeyPress={handleChange}
                        variant="outlined"
                        color="primary"
                        type="Text"
                        label="Search.."
                        placeholder="Eg: React"
                        style={{
                            margin: "10px",
                            width: "500px"
                        }}
                    />
                    {
                        filteredLinks.length !== 0 || filter === "" ? filteredLinks.map((link) => {
                            return (
                                <div className="link-preview"> 
                                    <a
                                        href={link.link}
                                        rel="noreferrer"
                                        target="_blank"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <h2>{link.title}</h2>
                                        <Typography variant="caption" color="text.secondary">
                                            {link.description}
                                        </Typography>
                                    </a>
                                </div>
                            )
                        }) : <h1>Not Found :/</h1>
                    }
                </div>
            </div>
        </div>
    );
}

export default Search;