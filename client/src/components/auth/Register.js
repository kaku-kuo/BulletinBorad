import React,{ useState, useContext, useEffect} from 'react';
import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';


const Register = ({ history }) => {
const [name, setName] = useState("");  
const [email, setEmail] = useState("");  
const [password, setPassword] = useState("");  
const [password2, setPassword2] = useState("");  
const alertContext = useContext(AlertContext);
const authContext = useContext(AuthContext);

const { setAlert } = alertContext;
const { register ,error , clearErrors, isAuthenticated } = authContext;


useEffect(() => {
   if(!isAuthenticated) return;
   if(isAuthenticated){
       history.push("/");
   }; 
   if(error === "User already exist"){
       setAlert(error,"danger");
       clearErrors();
   };
   console.log("register effect")
   // eslint-disable-next-line
},[error,isAuthenticated]);


const onSubmit = e => {
    e.preventDefault();
    if(name === '' || email === '' || password === ''){
        setAlert("Please enter all fields","danger");
    }else if (password !== password2){
        setAlert("Passwords do not match","danger");
    }else {
        register({ name, email, password });
    }  
};
    return (
        <div className="container mt-3 text-center border border-lightgrey rounded bg-white registerform">
          <div className="registertitle">
            <span>Register</span>  
          </div>
          <form onSubmit={onSubmit}>
              <label>Name</label>  
            <div className="form-group">
              <input type="text" name="name" className="form-control" onChange={e => setName(e.target.value)}/> 
            </div>
              <label>Email</label>  
            <div className="form-group">
              <input type="email" name="email" className="form-control" onChange={e => setEmail(e.target.value)}/> 
            </div>
              <label>Password</label>  
            <div className="form-group">
              <input type="password" name="password" className="form-control" onChange={e => setPassword(e.target.value)}/> 
            </div>
              <label>Confirm Password</label>  
            <div className="form-group">
              <input type="password" name="password2" className="form-control" onChange={e => setPassword2(e.target.value)}/> 
            </div>
              <button className="btn btn-dark btn-sm my-3">Register</button>
          </form> 
        </div>
    )
}

export default Register;