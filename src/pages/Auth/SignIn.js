// MUI Components
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import logo from '../../assets/images/linkitlogo.jpeg'

// CSS files
import './auth.css'

// Router
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

// Hooks
import { useState, useEffect } from "react";

// Auth
import firebase from "../../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

// helpers
import toastMessage from "../../helpers/toast";


const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgot, setForgot] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const url = window.location.href;
    if (url.includes('forgot')) {
      setForgot(true)
    } else {
      setForgot(false)
    }

  }, [window.location.href])

  function handleChange(event) {
    const { value, type } = event.target;
    type === "email" ? setEmail(value) : setPassword(value)
  }


  function handleClick(event) {
    event.preventDefault();

    if (forgot) {
      if (!email) {
        toastMessage.error("Enter email to reset the password")
      }
      sendPasswordResetEmail(firebase.auth, email)
        .then(() => {
          toastMessage.success("Password reset email sent!")
          history.push("/login")
        })
        .catch((err) => toastMessage.error(err.message))
    } else {
      firebase.signIn(email, password)
        .then(() => {
          history.push('/')
          window.location.reload();
          toastMessage.success("Login Successful!")
        })
        .catch((err) => toastMessage.error(err.message))
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
            <img src={logo} alt="hey" />
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

            {!forgot ?
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
              /> : null}

            <Button
              onClick={handleClick}
              startIcon={<LoginIcon />}
              size="large"
              variant="contained"
              style={{
                margin: "20px"
              }}
            >
              {forgot ? "Reset" : "Login"}
            </Button>

            {!forgot ?
              <div className="bottom-links">
                <Typography
                  style={{
                    marginRight: "50px"
                  }}
                >
                  <Link to="/signup"><p>Signup?</p></Link>
                </Typography>
                <Typography
                  style={{
                    marginLeft: "50px"
                  }}
                >
                  <Link to="/login/forgot" ><p>Forgot?</p></Link>
                </Typography>
              </div> : null}
          </div>
        </Box>
      </div>
    </Container>
  );
}

export default SignIn;