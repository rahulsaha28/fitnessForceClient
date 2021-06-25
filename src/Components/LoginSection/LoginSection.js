import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import API from '../../Util/API';
import { authenticationTokenSaver, getUserFromToken } from '../../Util/Authentication';
import EditNotification from '../EditNotification/EditNotification';

const LoginSection = () => {
    // get user from context
    const {  setUser } = useContext(UserContext);

    // history redirect
    const history = useHistory();

    const {handleSubmit, register, formState:{errors} } = useForm();

    // signin method
    const handelSignIn = (data)=>{
        fetch(`${API}/user/login`, {
            method:"POST",
            headers:{
                "Content-type":'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>{
            data?.token?authenticationTokenSaver(data.token):EditNotification('error', data.err);
            setUser(getUserFromToken());
            history.replace('/profile');
            
        });
    } 
    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="col-md-6 border p-5">
            <h4 className="mb-3">Login Form</h4>
            <form onSubmit={handleSubmit(handelSignIn)} >
               
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Email Address</label>
                    <input type="email" className="form-control"  {...register('email', { required:true })} />
                    { errors.email && <div className="error-feedback">Please enter valid email</div> }
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Password</label>
                    <input type="password" className="form-control"  {...register('password', {required:true, minLength:6})} />
                    { errors.password && <div className="error-feedback">Please enter password 6 or more than </div> }
                </div>
                
                <button className="btn btn-primary">Login</button>
            </form>
        </div>
    </div>
    );
};

export default LoginSection;