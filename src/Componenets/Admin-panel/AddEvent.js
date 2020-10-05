import React from 'react';
import logo from '../../volunteer-network/logos/Group 1329.png';
import user from '../../volunteer-network/logos/users-alt 1.png';
import plus from '../../volunteer-network/logos/plus 1.png';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";


const AddEvent = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        const event = { ...data };
        fetch('https://vounteer.herokuapp.com/AddEvent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event)

        })
        if (event) {
            alert('Event added successfully')
        }
    }

    return (
        <div className="m-5">
            <div className="d-flex">
                <Link to="/home" style={{ textDecoration: 'none' }}>
                    <img style={{ width: '13vw' }} src={logo} alt="" />
                </Link>
                <h4 style={{ marginLeft: '10vw' }}>Add Event</h4>
            </div>
            <aside style={{ marginTop: '10vh', zIndex: '-1' }}>
                <Link to='/admin' style={{ textDecoration: 'none' }}>
                    <div className="d-flex">
                        <img style={{ height: '4vh' }} className="mr-3" src={user} alt="" />
                        <h6>Volunteer registration list</h6>
                    </div>
                </Link>
                <Link to="addevent">
                    <div className="d-flex mt-3" style={{ cursor: 'pointer' }}>
                        <img style={{ height: '4vh' }} className="mr-3" src={plus} alt="" />
                        <h6>Add event</h6>
                    </div>
                </Link>
            </aside>
            <main style={{ marginLeft: '23vw', width: '70vw', marginTop: '-5vw' }}>
                <form className="center-alignment" onSubmit={handleSubmit(onSubmit)}>
                    <label >Event Name</label>
                    <input className="input-field " name="name" required ref={register} /> <br />
                    <label>Description</label>
                    <input className="input-field " name="Description" ref={register} /> <br />
                    <label>Event Date</label>
                    <input className="input-field " name="eventDate" type="date" ref={register} /> <br />
                    <label>Upload an image</label> <br />
                    <input name="img" type="file" ref={register} /> <br />
                    <input type="submit" className="Registration-btn" />
                </form>
            </main>
        </div>
    );
};

export default AddEvent;