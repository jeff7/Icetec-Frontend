import React, { useState } from 'react';
import {  Button  } from 'react-bootstrap';
import Select from 'react-select'

import './Add.css';

const AddUserForm = props => {

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

    const initialFormState = { name: '', email: '', age: '', linkdin_url: '', id_tec: ''};
    const [user, setUser] = useState(initialFormState);
    const [displayValue, getValue] = useState();

    const handleInputChange = event => {
        const {name, value} = event.target;

        setUser({ ...user, [name]: value });
    }

    const handle = (e) =>{
    
        let value = Array.isArray(e) || e ? e.map(x =>x) : [];

        value = JSON.stringify(value)

        getValue( value);

    }

    const submitForm = event => {
        event.preventDefault();

        // displayValue = getValue(JSON.stringify(displayValue)) ;

        // if(displayValue === undefined){
        //     displayValue = getValue('') ;
        // }
        
        user.id_tec = displayValue;
        
        if (!user.name || !user.email || !user.id_tec) {
            
            alert('Formulário Incompleto')
            return
        };

        console.log(user)

        props.addUser(user);
        setUser(initialFormState);

    };

    return (
        <div className="content_add">

            <form className="col s12"
                onSubmit={submitForm}>
                <div className="div_input">
                    <div className="input-field col s12">

                        <input type="text" 
                            id="name" 
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
                            value={user.linkdin_url}
                            onChange={handleInputChange} 
                            placeholder="linkdin_url"
                             />
                        
                    </div>
                </div>

                <div className="div_input">
                    <div className="input-field col s12">
                        <label>tecologias: </label>
                        <Select isMulti options={tecnologies} onChange={handle} ></Select>
                        
                    </div>
                </div>

                <div className="div_input">
                    <div className="input-field col s12">

                        <Button variant="success" required type="submit" className="waves-effect waves-light btn">Adicionar</Button >
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddUserForm;