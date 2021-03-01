import React from 'react';
import { Table, Button   } from 'react-bootstrap';

import './Table.css'

const UserTable = props => (
  <div className="overflow" >
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Linkdin</th>
                    <th>Actions</th>
                </tr>
            </thead>
        <tbody>
            {
                props.users.length > 0 ? (
                    props.users.map (user => (

                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>{user.linkdin_url}</td>
                            <td className="buttons">
                                <Button  
                                    className="waves-effect waves-light btn-small"
                                    onClick={() => props.editRow(user)}>
                                    edit
                                </Button >

                                <Button  
                                    variant="danger"
                                    className="waves-effect waves-light btn-small red darken-4"
                                    onClick={() => props.deleteUser(user.id)}>
                                    delete
                                </Button >
                            </td> 
                        </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={12}>{props.users[0]} No Users</td>
                        </tr>
                    )
            }          
        </tbody>
    </Table>
  </div>
);
    
export default UserTable;