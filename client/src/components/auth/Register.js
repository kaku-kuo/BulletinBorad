import React,{useState,useContext,useEffect} from 'react';
import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';


const Register = props => {
const alertContext = useContext(AlertContext);
const authContext = useContext(AuthContext);

const {setAlert} = alertContext;
const {register, error ,clearErrors, isAuthenticated} = authContext;


useEffect(() => {
   if(isAuthenticated){
       props.history.push("/");
   } 

   if(error === "User already exist"){
       setAlert(error,"danger");
       clearErrors();
   }
   // eslint-disable-next-line
},[error,isAuthenticated,props.history])

const [user, setUser] = useState({
     name:'',
     email:'',
     password:'',
     password2:''
});
const {name,email,password,password2} = user;

const onChange = e => {
    setUser({...user,[e.target.name]:e.target.value});

}

const onSubmit = e => {
    e.preventDefault();
    if(name === '' || email === '' || password === ''){
        setAlert("Please enter all fields","danger");
    }else if (password !== password2){
        setAlert("Passwords do not match","danger");
    }else {
        register({name,email,password});
        // props.history.push("/");
    }
    
}
    return (
        <div className="container mt-3 text-center border border-lightgrey rounded bg-white registerform">
          <div className="registertitle">
            <span>Register</span>  
          </div>
          <form onSubmit={onSubmit}>
              <label>Name</label>  
            <div className="form-group">
              <input type="text" name="name" className="form-control" onChange={onChange} /> 
            </div>
              <label>Email</label>  
            <div className="form-group">
              <input type="email" name="email" className="form-control" onChange={onChange} /> 
            </div>
              <label>Password</label>  
            <div className="form-group">
              <input type="password" name="password" className="form-control" onChange={onChange}/> 
            </div>
              <label>Confirm Password</label>  
            <div className="form-group">
              <input type="password" name="password2" className="form-control" onChange={onChange}/> 
            </div>
            <button className="btn btn-dark btn-sm my-3">Register</button>
          </form> 
        </div>
    )
}

export default Register;