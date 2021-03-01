import React, { useState, useEffect } from 'react';
import {  Button   } from 'react-bootstrap';
import Select from 'react-select'

import './Add.css';

const EditUserForm = props => {

    var tecnologies = [
        {
            value: 1,
            label: "C#"
        },
        {
            value: 2,
            label: "Javascript"
        },
        {
            value: 3,
            label: "NodeJs"
        },
        {
            value: 4,
            label: "Angular"
        },
        {
            value: 5,
            label: "Reaact"
        },
        {
            value: 6,
            label: "Ionic"
        },
        {
            value: 7,
            label: "Mensageria"
        },
        {
            value: 8,
            label: "PHP"
        },
        {
            value: 9,
            label: "Laravel"
        },
    ];

    const [user, setUser] = useState(props.currentUser);
    const [displayValue, getValue] = useState();


    const handleInputChange = event => {
        const { name, value } = event.target

        setUser({ ...user, [name]: value })
    };

    const handle = (e) =>{
    
        let value = Array.isArray(e) || e ? e.map(x =>x) : [];

        value = JSON.stringify(value)

        getValue( value);

    }

    const submitForm = event => {
        event.preventDefault();

        user.id_tec = displayValue;

        if (!user.name || !user.email || !user.id_tec) {
            
            alert('Formulário Incompleto')
            return
        };

        props.updateUser(user.id, user);
    };

    useEffect(() => {
        setUser(props.currentUser);
    }, [props]);

    return (
        <div className="content_add">

            <form className="col s12"
                onSubmit={submitForm}>
                <div className="div_input">
                    <div className="input-field col s12">

                        <input type="text" 
                            id={user.id} 
                            name="name"
                            value={user.name}
                            onChange={handleInputChange} 
                            placeholder="Nome"
                            required />
                        
                    </div>
                </div>

                <div className="div_input">
                    <div className="input-field col s12">

                        <input 
                            type="text" 
                            name="email" 
                            value={user.email}
                            onChange={handleInputChange} 
                            placeholder="Email"
                            required />
                       
                    </div>
                </div>

                <div className="div_input">
                    <div className="input-field col s12">

                        <input 
                            type="text" 
                            name="age" 
                            value={user.age}
                            onChange={handleInputChange} 
                            placeholder="Idade"
                            required />
                        
                    </div>
                </div>

                <div className="div_input">
                    <div className="input-field col s12">

                        <input 
                            type="text" 
                            name="linkdin_url" 
                            value={user.linkdin_url == null ? '' : user.linkdin_url}
                            onChange={handleInputChange} 
                            placeholder="Linkdin"
                             />
                        
                    </div>
                </div>

                <div className="div_input">
                    <div className="input-field col s12">
                        <label>tecologias: </label>
                        <Select isMulti options={tecnologies} required onChange={handle} ></Select>
                        
                    </div>
                </div>
                
                <div className="div_input">
                    <div className="buttons">

                        <Button type="submit" variant="primary" className="waves-effect waves-light btn">Atualizar</Button>

                        <Button variant="danger" 
                            className="waves-effect waves-light btn"
                            onClick={() => props.setEditing(false)}
                            >Cancelar</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditUserForm;