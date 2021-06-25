import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faClipboardList, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';

const ProfileLeftBar = () => {
    return (
        <ul className="list-group">
            <li className="list-group-item">
                <Link to="/profile-info">
                <FontAwesomeIcon icon={faUserSecret} className="me-2"/> Profile Info</Link>
            </li>
            <li className="list-group-item">
                <Link to="/meetingAll">
                <FontAwesomeIcon icon={ faClipboardList } className="me-2"/> All Meeting
                </Link> </li>
            <li className="list-group-item">
                <Link to="/new-meeting">
                    <FontAwesomeIcon icon={faPlus} className="me-2" /> Create New Meeting</Link>
            </li>

        </ul>
    );
};

export default ProfileLeftBar;