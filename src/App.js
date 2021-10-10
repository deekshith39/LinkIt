// Routes
import SignIn from './pages/Auth/SignIn';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/Auth/SignUp';
import Profile from './pages/Profile';
import Create from './pages/Create'
import About from './pages/About';
import EditProfile from './pages/Auth/EditProfile';

import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Context 
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/login" exact component={SignIn} />
            <Route path="/login/forgot" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/profile/edit" component={EditProfile} />
            <Route path="/create" component={Create} />
            <Route path="/about" component={About} />
          </Switch>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
