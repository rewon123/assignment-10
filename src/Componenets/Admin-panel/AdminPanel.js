import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../volunteer-network/logos/Group 1329.png'
import user from '../../volunteer-network/logos/users-alt 1.png'
import plus from '../../volunteer-network/logos/plus 1.png'
import trash from '../../volunteer-network/logos/trash-2 9.png'


const AdminPanel = () => {
    const [allUsers, setAllUsers] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:8080/allUsers`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAllUsers(data)
            })

    }, [])

    const deleteUser = (_id) => {
        fetch(`http://localhost:8080/deleteUser/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
            })
        alert('you deleted a user successfully reload the page to see the result')
    }
    return (
        <div className="m-5">
            <div className="d-flex">
                <Link to="/home" style={{ textDecoration: 'none' }}>
                    <img style={{ width: '13vw' }} src={logo} alt="" />
                </Link>
                <h4 style={{ marginLeft: '10vw' }}>Volunteer registration list</h4>
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
            <main>
                <table className="table" style={{ marginLeft: '23vw', width: '70vw', marginTop: '-5vw' }}>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email ID</th>
                            <th scope="col">Registration date</th>
                            <th scope="col">Volunteer list</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            allUsers.map(user => <tr className="bg-light" key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.data.date}</td>
                                <td>{user.data.name}</td>
                                <td ><img src={trash} onClick={() => deleteUser(user._id)} className="bg-danger" style={{ cursor: 'pointer', height: '5vh' }} alt="" /></td>
                            </tr>)
                        }





                    </tbody>
                </table>




            </main>
        </div >
    );
};

export default AdminPanel;