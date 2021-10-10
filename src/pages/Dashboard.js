// components
import NavBar from "../components/NavBar";
import ScrollView from "../components/ScrollView";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Hooks
import { useContext } from "react";

// context
import { UserContext } from '../contexts/UserContext'
import { Typography } from "@mui/material";

const Dashboard = () => {
    const [user, setUser] = useContext(UserContext)

    const style = {
        textAlign: "left",
        margin: "10px"
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
            <div style={{
                marginTop: "100px",
                marginLeft: "50px"
            }}>
                {
                    categories.map(data => {
                        return (
                            <div style={{ marginBottom: "20px" }}>
                                <Typography variant="h5" color="primary" style={style}>{data.value}</Typography>
                                <ScrollView category={data.value} user={user} />
                            </div>
                        )
                    })
                }
            </div>

        </div>

    );
}

export default Dashboard;