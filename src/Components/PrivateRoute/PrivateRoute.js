import React from 'react';
import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = ({children, ...rest}) => {
    const {user} = useContext(UserContext);
    return (
        <Route
        {...rest}
        render={
            ({location})=>
            user?.email?(
                children
            ):(
                <Redirect
                to={{
                    pathname:"/login",
                    state:{from:location}
                }}
                />
            )
        }
        />
    );
    
};

export default PrivateRoute;