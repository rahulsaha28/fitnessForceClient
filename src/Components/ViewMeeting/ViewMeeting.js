import React from 'react';
import ProfileLeftBar from '../ProfileLeftBar/ProfileLeftBar';
import 'rsuite/dist/styles/rsuite-default.css';
import { Table, Modal } from 'rsuite';
import { useForm } from 'react-hook-form';
import DateTimePicker from 'react-datetime-picker/dist/DateTimePicker';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import API from '../../Util/API';
import { getToken } from '../../Util/Authentication';
import EditNotification from '../EditNotification/EditNotification';




const ViewMeeting = () => {
    const [meetings, setMeetings] = useState([]);
    const { Column, Cell, HeaderCell } = Table;
    // showing the modal
    const [showModal, setShowModal] = useState(false);
    const [rowDataView, setRowDataView] = useState(null);
    const [meetingID, setMeetingID] = useState(null);

    // useform  use here
    const { handleSubmit, formState: { errors }, register } = useForm();
    // handel date
    const [dateTime, setDateTime] = useState();

    useEffect(() => {
        getMeetingData();
    }, []);

    
    

    // handel Edit Section
    const handelEditMeeting = (data) => {
        
        fetch(`${API}/meeting/id`, {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "token":getToken()
            },
            body:JSON.stringify({ id:meetingID, update:{...data, dateTime} })
        })
        .then(res=>res.json())
        .then(data=>{
            data?.message?EditNotification("success", data.message):EditNotification('error', data.err);
            getMeetingData();
        });
        close();
        
    }


    // delete meeting data
    const handelDeleteMeeting = (data)=>{
        fetch(`${API}/meeting/delete`, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "token":getToken()
            },
            body:JSON.stringify({id:data._id})
        })
        .then(res=>res.json())
        .then(newData=>{
            newData?.message?EditNotification('success', newData.message):EditNotification('error', newData.err);
            getMeetingData();
        })
    }

    // get all meeting data
    const getMeetingData = () => {
        fetch(`${API}/meeting/all`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": getToken()
            },

        })
            .then(res => res.json())
            .then(data => setMeetings(data.meetings));
    }

    // control the modal
    const handelModal = (data) => {
        setShowModal(!showModal);
        setDateTime(new Date())
        setRowDataView(data);
        setDateTime(new Date(Date.parse(data.dateTime)))
        setMeetingID(data._id);
        
    }
    // close the model
    const close = () => {
        setShowModal(!showModal);
    }
    return (
        <div className="row">
            <div className="col-md-3 p-4">
                <ProfileLeftBar />
            </div>
            <div className="col-md-9 p-4">
                <Table
                    height={700}
                    data={meetings}
                >
                    {/* this is the title of the meeting */}
                    <Column width={150} align="center">
                        <HeaderCell>
                            <h5>Meeting Title</h5>
                        </HeaderCell>
                        <Cell dataKey="title" />
                    </Column>
                    {/* This is the description of the meeting */}
                    <Column width={150} align="center">
                        <HeaderCell>
                            <h5>Meeting Description</h5>
                        </HeaderCell>
                        <Cell dataKey="description" />
                    </Column>
                    {/* date time of the meeting */}
                    <Column width={250} align="center">
                        <HeaderCell>
                            <h5>Meeting Shedule</h5>
                        </HeaderCell>
                        <Cell>
                            {
                                rowData=>{
                                    return (
                                        <span>
                                            {
                                                new Date(Date.parse(rowData.dateTime)).toLocaleString()
                                            }
                                        </span>
                                    )
                                }
                            }
                        </Cell>
                    </Column>
                    {/* Edit this cell */}
                    <Column width={100} align="center">
                        <HeaderCell>
                            <h5>Edit</h5>
                        </HeaderCell>
                        <Cell>
                            {
                                rowData => {
                                    const handelClickForEdit = (rowData) => {

                                        handelModal(rowData);

                                    }


                                    return (
                                        <>
                                            <button onClick={() => handelClickForEdit(rowData)} className="btn btn-success">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                            {/* showing the Meeting for edit */}
                                            <Modal show={showModal} onHide={close}>
                                                <Modal.Header>
                                                    <Modal.Title>Edit Meeting</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <form onSubmit={handleSubmit(handelEditMeeting)}>
                                                        <div className="mb-3">
                                                            <label htmlFor="" className="form-label">Edit Meeeting</label>
                                                            <input type="text" className="form-control"  {...register('title', { required: true, value: rowDataView?.title })} />
                                                            {errors.title && <div className="error-feedback">Please enter title</div>}
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="" className="form-label">Meeting Description</label>
                                                            <textarea type="text" className="form-control"  {...register('description', { required: true, value: rowDataView?.description })} />
                                                            {errors.description && <div className="error-feedback">Please enter description</div>}
                                                        </div>

                                                        <div className="mb-3">
                                                            <DateTimePicker onChange={setDateTime} value={dateTime} />
                                                        </div>
                                                        <button className="btn btn-success">Save</button>
                                                    </form>
                                                </Modal.Body>
                                            </Modal>
                                        </>
                                    )
                                }
                            }
                        </Cell>
                    </Column>
                    {/* delete the meeting */}
                    <Column width={100} align="center">
                        <HeaderCell>
                            <h5>Edit</h5>
                        </HeaderCell>
                        <Cell>
                            {
                                rowData => {

                                    const handelClick = (rowData) => handelDeleteMeeting(rowData);
                                    
                                    return (
                                        <>
                                            <button onClick={() => handelClick(rowData)} className="btn btn-danger">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>


                                        </>
                                    )
                                }
                            }
                        </Cell>
                    </Column>
                </Table>
            </div>
        </div>
    );
};

export default ViewMeeting;