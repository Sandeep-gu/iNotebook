import React,{useState} from 'react'
//import {useHistory} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';




const Login = (props) => {
   // let history = useHistory();
    const navigate = useNavigate()
    const [credential,setCredential]= useState({email:"",password:""})
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({Email:credential.email,password:credential.password})
        });
    
        const json = await response.json()
        console.log(json);
        if (json.Success){
            localStorage.setItem("token",json.authentication);
            navigate('/home');
            props.showAlert("login Successfully","success")
        }
        else{
            props.showAlert("login correct credentials","danger")
        }
    }
    const onChange=(e)=>{
        setCredential({...credential,[e.target.name]:e.target.value})
    }
    return (
        <div className="container my-5">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email"  value={credential.email} onChange={onChange} name="email" arial-aria-describedby='emailhHelp'/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder='password' value={credential.password}  onChange={onChange}  name="password" />
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
