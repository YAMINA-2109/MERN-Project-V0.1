import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import newRequest from '../utils/newRequest';
import {message} from 'antd';




const Login = () => {
    const [value, setValue] = useState()
    const [inputs, setInputs] = useState({
        email:"",
        password:""
    });
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAgent, setIsAgent] = useState(false);
    let navigate= useNavigate();
    const handlChange = (e)=>{
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(inputs);
        // post to the data base
        const res = await newRequest.post("/login", 
        {email: inputs.email, password: inputs.password});
        console.log(res);
        if(res.data.currentUser.isAdmin){
            setIsAdmin(true);
            localStorage.setItem("currentUser", JSON.stringify(res.data.currentUser));
            navigate('/dashboard');
            console.log('vous un admin');
            message.success("Bien venu dans votre compte d'admin")
        }else{
            if (res.data.currentUser.isAgent) {
                setIsAgent(true);
                localStorage.setItem("currentUser", JSON.stringify(res.data.currentUser));
                navigate('/dashboard');
                console.log('vous un agent');
                message.success("Bien venu dans votre compte d'agent")
            }else{
                message.error("vous avez pas accees a cette espace")
            }
        }

    }
    return (
        <div className='loginBackground'>
            <form onSubmit={handleSubmit}>
                <Box 
                display="flex" flexDirection={"column"} 
                maxWidth={400} alignItems="center"
                justifyContent="center"
                margin="auto"
                marginTop={5}
                paddingTop={3}
                borderRadius={5}
                boxShadow={'5px 5px 10px #ccc'}
                sx={{":hover":{
                    boxShadow: '10px 10px 20px #ccc'
                }}}
                >
                    <Typography
                    variant='h2'
                    padding={3}
                    textAlign="center"
                    >
                        Login
                    </Typography>
                    <TextField
                    onChange={handlChange}
                    name='email'
                    value={inputs.email}
                    type='email'
                    variant='outlined'
                    placeholder='Email'
                    margin='normal'
                    />
                    <TextField
                    onChange={handlChange}
                    name='password'
                    value={inputs.password}
                    type='password'
                    variant='outlined'
                    placeholder='Mot De Passe'
                    margin='normal'
                    />
                    <Button type='submit'
                    sx={{
                        borderRadius:3,
                        marginBottom: 5, marginTop: 4, width: 110, color:'#fff',
                        fontWeight:600,
                        background:'#ff7730'
                    }}
                        variant='contained'
                    >Login</Button>
                    
                </Box>
            </form>
        </div>
    )
}

export default Login
