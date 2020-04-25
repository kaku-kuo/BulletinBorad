import React,{useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';

const Login = props => {
const alertContext = useContext(AlertContext);
const authContext = useContext(AuthContext);

const { setAlert } = alertContext; 
const { login,error ,clearErrors, isAuthenticated } = authContext;

useEffect(() => {
  if(isAuthenticated){
    props.history.push("/");
    setAlert("Login Successfully!","success");
  } 
  if(error === "Invalid Credentials"){
    setAlert(error,"danger");
    clearErrors();
  }
  // eslint-disable-next-line
},[error,isAuthenticated,props.history])

const [user, setUser] = useState({
    email:'',
    password:''
 });


const {email,password} = user;   
const onChange = e => {
    setUser({...user,[e.target.name]:e.target.value});
}
   
const onSubmit = e => {
    e.preventDefault();
    if(email === '' || password === ''){
      setAlert("Please enter all fields","danger");
    }else {
      login({
        email,
        password
      });
      
    }
}
    return (
            <div className="container mt-3 text-center border border-lightgrey rounded bg-white registerform">
             <div className="logintitle">
               <span >Login</span>  
             </div>
             <form onSubmit={onSubmit}>
                 <label>Email</label>  
               <div className="form-group">
                 <input type="email" name="email" className="form-control" onChange={onChange}/> 
               </div>
                 <label>Password</label>  
               <div className="form-group">
                 <input type="password" name="password" className="form-control" onChange={onChange}/> 
               </div>
               <div className="text-center mt-5">
                <p className="lead">Don't have an account?</p> 
                <Link to="/register"><span>Sign Up</span></Link>
               </div>
               
               <button className="btn btn-dark   btn-sm my-3">Login</button>
             </form> 
           </div>
       )
}


export default Login;