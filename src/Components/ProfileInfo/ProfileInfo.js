import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import ProfileLeftBar from '../ProfileLeftBar/ProfileLeftBar';

const ProfileInfo = () => {
    const { user } = useContext(UserContext);
    return (
        <div className="row">
            <div className="col-md-3 p-4">
                <ProfileLeftBar />
            </div>
            <div className="col-md-9 p-4">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{ user.name }</h5>
                        Email: { user.email }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;