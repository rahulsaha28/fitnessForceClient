import React from 'react';
import { Notification } from 'rsuite';

const EditNotification = (functionName, message) => {
    Notification[functionName]({
        title:functionName,
        description:(
            <div>
                { message }
            </div>
        )
    })
};

export default EditNotification;