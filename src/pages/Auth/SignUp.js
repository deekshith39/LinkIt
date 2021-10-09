//MUI Components
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import CreateIcon from '@mui/icons-material/Create';

// CSS files
import './auth.css'

// Router
import { Link } from "react-router-dom";

// Hooks
import { useState } from "react";
import { useHistory } from "react-router";

// Auth
import firebase from "../../firebase/firebase";
import { updateProfile } from "firebase/auth";

// firestore
import { addDoc, collection, doc, setDoc } from "firebase/firestore";


// helpers
import toastMessage from "../../helpers/toast";

// Validator
import validateSignUp from "../../validators/validateSignUp";

const SignUp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleChange = (event) => {
    const { value, type } = event.target
    type === "text" ? setName(value) : (type === "email" ? setEmail(value) : setPassword(value))
  }

  async function createUser(uid) {
    await setDoc(doc(firebase.db, "users", uid), {
      name: name,
      email: email,
      postsmade: [],
      liked: []
    });
  }

  const handleClick = (event) => {
    event.preventDefault();

    const errorMessage = validateSignUp(name, email, password)

    if (errorMessage !== "no errors") {
      toastMessage.error(errorMessage)
    } else {
      firebase.createAccount(name, email, password)
        .then((userCred) => {
           // console.log(userCred.user.uid)
          createUser(userCred.user.uid)
          history.push("/login")
          toastMessage.success("Created Account!")
          return updateProfile(userCred.user, {
            displayName: name
          });
          
        })
        .catch((err) => {
          toastMessage.error("Error :" + err.message)
        })
    }

  }

  return (
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
              <strong>Create Account</strong>
            </Typography>
            <TextField
              value={name}
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
              value={email}
              onChange={handleChange}
              variant="outlined"
              color="secondary"
              type="email"
              label="email"
              placeholder="example@gmail.com"
              style={{
                margin: "10px"
              }}
            />

            <TextField
              value={password}
              onChange={handleChange}
              variant="outlined"
              color="secondary"
              type="password"
              label="Password"
              style={{
                margin: "10px"
              }}
            />

            <Button
              onClick={handleClick}
              color="primary"
              startIcon={<CreateIcon />}
              size="large"
              variant="contained"
              style={{
                margin: "25px"
              }}
            >
              Create
            </Button>

            <Typography>
              <Link to="/login"><p>Have an account?</p></Link>
            </Typography>
          </div>
        </Box>
      </div>
    </Container>
  );
}

export default SignUp;