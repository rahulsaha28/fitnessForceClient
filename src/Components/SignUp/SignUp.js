import React from 'react';
import { useForm } from 'react-hook-form';
import API from '../../Util/API';
import EditNotification from '../EditNotification/EditNotification';
import './SignUp.css';
import { useHistory } from 'react-router-dom';

const SignUp = () => {

    // use form is use here
    const { register, handleSubmit, formState: { errors } , watch } = useForm();

    const history = useHistory();
    
    // handel the signup form
    const handelSignUpForm = (data) => {
        
        const { email, password, name } = data; 

        fetch(`${API}/user/signup`, {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({ email, password, name })
        })
        .then(res=>res.json())
        .then(newData=>{
            newData?.message?EditNotification('success', newData.message):EditNotification('error', newData.err);
            history.replace('/login');
        });

    }

    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="col-md-6 border p-5">
                <h4 className="mb-3">Sign Up Form</h4>
                <form onSubmit={handleSubmit(handelSignUpForm)} >
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Name</label>
                        <input type="Name" className="form-control"  {...register('name', {required:true})} />
                        { errors.name?.type==='required' && <div className="error-feedback">Please enter the name</div> }
                    </div>
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
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Password again</label>
                        <input type="password" className="form-control"  {...register('re_password', {required:true, minLength:6, validate:value=>value===watch('password')||"Password did not match"})} />
                        { errors.re_password && <div className="error-feedback">Password did not match</div> }
                    </div>
                    <button className="btn btn-primary">Signup</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;