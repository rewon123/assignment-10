import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useHistory, Link } from 'react-router-dom';
import logo from '../../volunteer-network/logos/Group 1329.png'
import './Register.css'
import { UserContext } from '../../App';

const Register = () => {
    const { id } = useParams()
    const [events, setEvents] = useState({})
    const history = useHistory()
    const { register, handleSubmit } = useForm();
    const [loggedInUser] = useContext(UserContext)


    useEffect(() => {
        fetch(`https://vounteer.herokuapp.com/register/${id}`)
            .then(res => res.json())
            .then(data => {
                setEvents(data)
            })
    }, [id])

    const onSubmit = data => {
        // console.log('form submitted', data)
        const allData = { ...loggedInUser, data, forDashboard: events }

        fetch('https://vounteer.herokuapp.com/AddRegistrations', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(allData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data) {
                    alert('order placed successfully')
                    history.push('/DashBoard')
                }
            })
    };
    return (
        <div style={{ marginTop: '50px' }}>
            <div className='d-flex justify-content-center' >
                <Link to='/'> <img src={logo} style={{
                    width: '202.81px',
                    height: '60px'
                }} alt="" /></Link>
            </div>
            <div>
                <div className='  d-flex justify-content-center'>
                    <div className='center-alignment' style={{ marginTop: '30px' }}>
                        <label style={{ fontSize: '30px', fontFamily: 'Montserrat', fontWeight: 'bold' }}>Register as a Volunteer</label>
                        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
                            <input name="Username" ref={register({ required: true })} className="input-field" type="text" placeholder="Full name" />
                            <br />
                            <input type="email" name="email" ref={register({ required: true })} className="input-field" placeholder="User name or email" required />
                            <br />
                            <input type="date" name="date" ref={register({ required: true })} className="input-field" placeholder="date" required />
                            <br />
                            <input type="description" ref={register({ required: true })} name="description" className="input-field" placeholder="Description" />
                            <br />
                            <input name="name" ref={register({ required: true })} type="EventName" className="input-field" defaultValue={events.name} />
                            <br />
                            <button className="Registration-btn" type="submit">Registration</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Register;