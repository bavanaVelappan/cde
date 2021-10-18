import React, { useState } from "react";
import Input from "./common/input";
import Joi from "joi";
import {validateSubmit} from './common/validation';
import { toast } from "react-toastify";

const LoginForm = (props) =>{

    const [account,setAccount] = useState({username:'',password:''});
    const [errors, setErrors] = useState({username:'',password:''})

    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),    
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })

    const handleSubmit = (e)=>{
        const errorData = validateSubmit(e, schema, {username, password});
        setErrors(errorData || {});
        if(errorData) return;
        toast("LoggedIn Successfully!")
    }

    const handleChange = ({currentTarget:input})=>{
        const obj={...account,[input.name] : input.value}
        setAccount(obj);
    }
    
    const {username, password} = account;
    return (
        <>
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <Input name="username" type="text" value={username} label="Username" onChange={handleChange} error={errors.username}/>
            <Input name="password" type="password" value={password} label="Password" onChange={handleChange} error={errors.password}/>
            <br/>            
            <button type="submit" className="btn btn-primary">Login</button>
      </form>
        </>
    )
}

export default LoginForm;