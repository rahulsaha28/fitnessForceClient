import React, { useState } from 'react';
import ProfileLeftBar from '../ProfileLeftBar/ProfileLeftBar';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker';
import { useForm } from 'react-hook-form';
import API from '../../Util/API';
import { getToken } from '../../Util/Authentication';
import EditNotification from '../EditNotification/EditNotification';
import { useHistory } from 'react-router-dom';

const CreateMeeting = () => {

    const [dateTime, setDateTime] = useState(new Date());
    
    const { register, formState:{errors}, handleSubmit }  = useForm();

    const history = useHistory();

    const handelAddMeeting = data=>{
        data = {...data, dateTime}

        
        
        fetch(`${API}/meeting/add`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "token":getToken()
            },
            body:JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(newData=>{
            newData?.message?EditNotification("success", newData.message):EditNotification("error", newData.err);
            history.replace('/meetingAll');
        })
    }

    return (
        <div className="row">
            <div className="col-md-3 p-4">
                <ProfileLeftBar />
            </div>
            <div className="col-md-9 p-4">
                <h4>Create a new meeting: </h4>
                <form onSubmit={handleSubmit(handelAddMeeting)}>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Meeting title</label>
                        <input type="text" className="form-control"  {...register('title', { required: true })} />
                        {errors.title && <div className="error-feedback">Please enter title</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Meeting Description</label>
                        <textarea type="text" className="form-control"  {...register('description', { required: true })} />
                        {errors.description && <div className="error-feedback">Please enter description</div>}
                    </div>
                    
                    <div className="mb-3">  
                    <DateTimePicker onChange={setDateTime}  value={dateTime}/>
                    </div>
                    <button className="btn btn-success">Add Meeting</button>
                </form>
            </div>
        </div>
    );
};



export default CreateMeeting;