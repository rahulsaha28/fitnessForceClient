
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import EditNavBar from './Components/EditNavBar/EditNavBar';
import SignUp from './Components/SignUp/SignUp';
import LoginSection from './Components/LoginSection/LoginSection';
import Admin from './Components/Admin/Admin';
import CreateMeeting from './Components/CreateMeeting/CreateMeeting';
import ViewMeeting from './Components/ViewMeeting/ViewMeeting';
import { useState } from 'react';
import { createContext } from 'react';
import { getUserFromToken } from './Util/Authentication';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import ProfileInfo from './Components/ProfileInfo/ProfileInfo';

export const UserContext = createContext();
function App() {
  const [user, setUser] = useState(getUserFromToken())

  return (
    <div>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <div className="container-fluid">
            <div className="row">
              <EditNavBar />

              <Switch>
                {/* profile info here */}
                <PrivateRoute path="/new-meeting">
                  <CreateMeeting />
                </PrivateRoute>
                <PrivateRoute path="/meetingAll">
                  <ViewMeeting />
                </PrivateRoute>
                <PrivateRoute path="/profile-info">
                  <ProfileInfo/>
                </PrivateRoute>
                {/*  */}
                <PrivateRoute path="/profile">
                  <Admin />
                </PrivateRoute>
                <Route path="/login">
                  <LoginSection />
                </Route>
                <Route path="/signup">
                  <SignUp />
                </Route>
              </Switch>
            </div>
          </div>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
