import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Events.css'

const EventCards = () => {
    const [events, setEvents] = useState([])
    useEffect(() => {
        fetch('http://localhost:8080/eventsForRegister')
            .then(res => res.json())
            .then(data => setEvents(data))
    }, [])
    return (
        <div>
            <div className='container-fluid'>
                <div className="row row-cols-1 row-cols-md-3 col-xs-6 ">
                    {
                        events.map(event =>
                            <div key={event._id} className="col-md-3 work-container">
                                <div className="card color-card work-title">
                                    <Link style={{ textDecoration: 'none', color: 'white' }} to={"/register/" + event._id}>
                                        <img src={event.img} className="card-img-top" style={{ width: '100%' }} alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title ">{event.name}</h5>
                                        </div>
                                    </Link>
                                </div>
                            </div>)
                    }
                </div>
            </div>
        </div >
    );
};

export default EventCards;