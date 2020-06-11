import React,{useReducer} from 'react';
import axios from 'axios';
import setAuthToken from '../../../utils/setAuthToken';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT
} from '../type';


const AuthState = props => {
 const initialState = {
     token:localStorage.getItem('token'),
     isAuthenticated:null,
     user:null,
     loading:true,
     error:null
 };

 const [ state, dispatch ] = useReducer(AuthReducer,initialState);

 //Load User  
 const loadUser = async () => {
     if(localStorage.token){
        setAuthToken(localStorage.token);
     try {
        const res = await axios.get('/api/auth')  
        dispatch({type:USER_LOADED,payload:res.data});  
      } catch (err) {
        dispatch({type:AUTH_ERROR})  
      }
    }    
 };

 //Register User
 const register = async formData => {
     const config = {
         headers:{
          'Content-Type':'application/json'
         }
     }
     try {
       const res = await axios.post('/api/users',formData,config);
       dispatch({
           type:REGISTER_SUCCESS,
           payload:res.data
       }); 

       loadUser(); 

     } catch (err) {
        dispatch({
            type:REGISTER_FAIL,
            payload:err.response.data.msg
        }); 
     }
 };
 //Login 
 const login = async formData => {
    const config = {
        headers:{
         'Content-Type':'application/json'
        }
    }
    try {
      const res = await axios.post('/api/auth',formData,config);
      dispatch({
          type:LOGIN_SUCCESS,
          payload:res.data
      }); 
 
      loadUser(); 

    } catch (err) {
       dispatch({
           type:LOGIN_FAIL,
           payload:err.response.data.msg
       }); 
    }
};
 //Logout
 const logout = () => {
     dispatch({type:LOGOUT});
     localStorage.removeItem('title');
     localStorage.removeItem('content');
     localStorage.removeItem('_id');
 }

 //Clear Errors
 const clearErrors = () => {
     dispatch({type:CLEAR_ERRORS});
 }

    return (
        <AuthContext.Provider
          value={{
              token:state.token,
              isAuthenticated:state.isAuthenticated,
              loading:state.loading,
              user:state.user,
              error:state.error,
              register,
              login,
              logout,
              loadUser,
              clearErrors
          }}
        >
           {props.children}
        </AuthContext.Provider>
    )
}



export default AuthState;