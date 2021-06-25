import React from 'react';
import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import { getUserFromToken, logOut } from '../../Util/Authentication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const EditNavBar = () => {
    const { user, setUser } = useContext(UserContext);

    // use history
    const history = useHistory();

    const handelLogOut = ()=>{
        
        logOut()
        setUser(getUserFromToken());
        history.replace('/login');
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <span className="navbar-brand">Daily Task Management</span>
                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar">
                    <ul className="navbar-nav mb-2 ms-auto mb-lg-0">
                        {
                            user?.email ? (
                                <>
                                    <li className="nav-item">
                                        <Link to="/profile" className="nav-link">Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button onClick={handelLogOut} className="nav-link">
                                            <FontAwesomeIcon icon={faSignOutAlt}/>
                                        </button>
                                    </li>
                                </>

                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link to="/signup" className="nav-link">Sign Up</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/login"  className="nav-link">Login</Link>
                                    </li>
                                </>
                            )
                        }


                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default EditNavBar;