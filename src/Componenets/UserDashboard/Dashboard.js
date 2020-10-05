import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Header from '../Header/Header';

const Dashboard = () => {
    const [loggedInUser] = useContext(UserContext);
    const [dashboardData, setDashboardData] = useState([])


    const deleteRegistration = id => {
        fetch(`https://vounteer.herokuapp.com/deleteRegistration/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(result => {
                // console.log('innanillah valo thakis');
            })
        alert('your registration has been cancelled succesfully reload the page to see the result')

    }
    useEffect(() => {
        fetch(`https://vounteer.herokuapp.com/specificRegistration?email=${loggedInUser.email}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setDashboardData(data)
            })
    }, [])
    // console.log(dashboardData);
    return (


        <div className='container  '>
            <Header />
            {
                // if statement starts form here
                dashboardData.length > 0 ? <div className='d-flex'>
                    <div className='row'>
                        {
                            dashboardData.map(data =>
                                <div key={data._id} className="card " style={{ width: '550px', height: '219px', marginTop: '50px', borderRadius: '10px', margin: " 10px 10px " }}>
                                    <div className="container bcontent">
                                        <div className="row no-gutters">
                                            <div className="col-sm-5">
                                                <img className="card-img" style={{ width: '194px', height: '173px', padding: '20px' }} src={data.forDashboard.img} alt="" />
                                            </div>
                                            <div className="col-sm-7">
                                                <div className="card-body">
                                                    <h5 className="card-title" style={{ fontWeight: 'bold' }}> {data.forDashboard.name}</h5>
                                                    <p className="card-text">{data.data.date}</p>
                                                    <div className='text-right'>
                                                        <button className="btn btn-secondary" onClick={() => deleteRegistration(data._id)} style={{ color: '#787878', border: 'none', backgroundColor: '#E3E3E3' }} >cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div >
                                </div>
                            )
                        }
                    </div>
                </div>
                    // else statement starts from here
                    :
                    <h1>you have no registration indeed</h1>
            }

        </div>
    );
};

export default Dashboard;