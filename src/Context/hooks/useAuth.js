import { useEffect, useState } from 'react';

import api from "../../Api";
import histori from "../../History";

function useAuth  ()  {

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);
        }

        setLoading(false);
        
    }, []);

    async function handleLogin({email, password}){
        const { data: { token } } = await api.post('/login',{
            email: email,
            password: password
        });

        localStorage.setItem('token', JSON.stringify(token));
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setAuthenticated(true);
        histori.push('/candidates');
    }

    function handleLogout(){
        
        setAuthenticated(false);
        localStorage.removeItem('token');
        api.defaults.headers.Authorization = undefined;
        histori.push('/login');
   
    }

    async function handleSign({email, password}){
        
        const { data: { new_user } } = await api.post('/users',{
            email: email,
            password: password
        });

    }

    return {authenticated, loading, handleLogin, handleLogout, handleSign };
};

export default useAuth;