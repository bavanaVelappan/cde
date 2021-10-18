import React, { useState } from "react";
import Input from "./common/input";
import {validateSubmit} from './common/validation';
import Joi from "joi";
import { toast } from "react-toastify";

const RegisterForm = (props) =>{
    const [errors, setErrors] = useState({email:'',password:'',name:''})
    const [account,setAccount] = useState({email:'',password:'',name:''});

    const schema = Joi.object({
        email: Joi.string().min(3).max(30).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),    
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        name: Joi.string().min(3).max(30).required()
    }) 
    
    const handleSubmit = (e)=>{
        const errorData = validateSubmit(e, schema, {email, password, name});
        setErrors(errorData || {});
        if(errorData) return;
        toast('Registered Successfully!')
    }

    const handleChange = ({currentTarget:input})=>{
        const obj={...account,[input.name] : input.value}
        setAccount(obj);
    }
    const {email, password, name} = account;
    
    return (
        <>
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <Input name="email" type="text" value={email} label="Username" onChange={handleChange} error={errors.email} />
            <Input name="password" type="password" value={password} label="Password" onChange={handleChange} error={errors.password}/>
            <Input name="name" type="text" value={name} label="Name" onChange={handleChange} error={errors.name}/>
            <br/>            
            <button type="submit" className="btn btn-primary">Register</button>
      </form>
        </>
    )
}

export default RegisterForm;