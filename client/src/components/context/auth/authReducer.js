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

export default (state,action) => {
    switch(action.type){
      case USER_LOADED:
        localStorage.setItem("name",action.payload.name); 
        return {
           ...state,
           isAuthenticated:true,
           loading:false,
           user:action.payload 
        }    
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:    
        localStorage.setItem("token",action.payload.token);
        return {
           ...state,
           ...action.payload,
           isAuthenticated:true,
           loading:false 
        }
      case REGISTER_FAIL:
      case LOGIN_FAIL:
      case AUTH_ERROR:
      case LOGOUT:        
         localStorage.removeItem("token");
         localStorage.removeItem("name");
         return {
            ...state,
            token:null,
            isAuthenticated:null,
            loading:false,
            user:null,
            error:action.payload
         }
      case CLEAR_ERRORS:
         return {
            ...state,
            error:null 
         }         
      default:
         return state;
    }
}