import React,{useState} from 'react'
import { useNavigate} from 'react-router-dom'

const SignUp = (props) => {
    const navigate = useNavigate()
    const [credential,setCredential]= useState({name:"",email:"",password:"",cpassword:""})
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password}=credential;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({"Name":name,"Email":email,"password":password})
        });
    
        const json = await response.json()
        console.log(json);
        if (json.Success){
            localStorage.setItem("token",json.authentication);
            navigate('/home');
        }
        else{
            alert("Invalid Credentials");
        }
    }
    const onChange=(e)=>{
        setCredential({...credential,[e.target.name]:e.target.value})
    }
         
    
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" onChange={onChange} value={credential.name} name="name" aria-describedby="emailHelp" placeholder="Enter Name" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} value={credential.email} name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} value={credential.password} name="password"  placeholder="password"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">cPassword</label>
                    <input type="password" className="form-control" id="cpassword" onChange={onChange} value={credential.cpassword} name="cpassword" placeholder="cpassword"/>
                </div>

                <button type="submit" className="btn btn-primary my-2">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
