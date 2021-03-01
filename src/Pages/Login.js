import React, { useContext, useState } from 'react';
import {Button} from 'react-bootstrap';

import { Context } from "../Context/AuthContext";

import './Login.css';

function initialState(){
   return { email: '', password: ''};
}

function Login() {

    const [values, setValues] = useState(initialState); 
    const { handleLogin, handleSign } = useContext(Context);

    function onChange(event){
    
        const { value, name } = event.target;
    
        setValues({
            ...values,
            [name] : value
        });
    }

    function onSubmit(event) {
        event.preventDefault();
    
        inLogin(values);
    
        setValues(initialState);
      }

    function inLogin({email, password}){
        
        handleLogin({email, password});
       
    }

    function sign_in(){
        
        sign_in_handle(values);

        inLogin(values);
       
    }

    function sign_in_handle({email, password}){
        
        handleSign({email, password});

        handleLogin({email, password});
       
    }

    return (
        <div className="user-login">
          <h1 className="user-login__title">Acessar o Sistema</h1>
          <form autoComplete="nope" onSubmit={onSubmit}>
            <div className="user-login__form-control">
              <label htmlFor="email">E-mail</label>
              <input id="email" type="text" name="email" autoComplete="off"  onChange={onChange} value={values.email}/>
            </div>
            <div className="user-login__form-control">
              <label htmlFor="password">Senha</label>
              <input id="password" type="password" name="password" onChange={onChange} value={values.password}/>
            </div>
            <div className="butto">
              
                <Button color="primary" type="submit">Entrar</Button>
              
                <Button variant="success" onClick={sign_in}>Cadastrar</Button>
              
            </div>
          </form>
        </div>
      );

}

export default Login;