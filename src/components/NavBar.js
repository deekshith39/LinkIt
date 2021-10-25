import * as React from 'react';

// MUI components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { makeStyles } from '@mui/styles';
import HomeIcon from '@mui/icons-material/Home';

// Roboto Font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Auth
import firebase from '../firebase/firebase';

// helpers
import toastMessage from '../helpers/toast';

// router hooks
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: 'black'
  }
})


export default function PrimarySearchAppBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const history = useHistory()

  const classes = useStyles()

  const handleProfileMenuOpen = (event, isUser) => {
    // console.log(isUser)
    isUser ? setAnchorEl(event.currentTarget) : history.push("/login")
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  // Buttons 
  const handleMenuClose = (text) => {

    if (text === "logout") {
      firebase.logout()
        .then(() => {
          toastMessage.success("Logged Out!")
          history.push("/login")
        })
    } else if (text === "profile") {
      history.push("/profile")
    } else {
      setAnchorEl(null)
    }

  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleMenuClose("profile")}>Profile</MenuItem>
      <MenuItem onClick={() => handleMenuClose("logout")}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem onClick={handleMenuClose}>
        <IconButton
          size="large"
          color="inherit"
        >
          <SearchIcon />
        </IconButton>
        <Link to="/search" className={classes.link}>
          <p>Search</p>
        </Link>
      </MenuItem>

      <MenuItem onClick={handleMenuClose}>
        <IconButton
          size="large"
          color="inherit"
        >
          <HomeIcon />
        </IconButton>
        <Link to="/" className={classes.link}>
          <p>Dashboard</p>
        </Link>
      </MenuItem>

      <MenuItem onClick={handleMenuClose}>
        <IconButton
          size="large"
          color="inherit">
          <AddCircleOutlineIcon />
        </IconButton>
        <Link to={props.isUser ? "/create" : "/login"} className={classes.link}>
          <p>Create</p>
        </Link>
      </MenuItem>

      <MenuItem onClick={(event) => handleProfileMenuOpen(event, props.isUser)}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Account</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Link to="/" className={classes.link}>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{
                display: { xs: 'none', sm: 'block' },
                color: 'white'
              }}
            >
              <strong>LinkIt</strong>
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link to="/search" className={classes.link}>
              <IconButton
                size="large"
                sx={{ color: 'white' }}
              >
                <SearchIcon />
                <Typography sx={{
                  margin: "5px",
                  color: 'white'
                }}>
                  Search
                </Typography>
              </IconButton>
            </Link>
            <Link to={props.isUser ? "/create" : "/login"}
              className={classes.link}
            >
              <IconButton
                size="large"
                sx={{ color: 'white' }}
              >
                <AddCircleOutlineIcon />
                <Typography sx={{
                  margin: "5px",
                  color: 'white'
                }}>
                  Create
                </Typography>
              </IconButton>
            </Link>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={(event) => handleProfileMenuOpen(event, props.isUser)}
              color="inherit"
            >
              <AccountCircle />
              <Typography sx={{
                margin: "5px",
                color: "white"
              }}>
                Account
              </Typography>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
