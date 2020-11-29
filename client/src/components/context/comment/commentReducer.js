import {
    ADD_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT,
    CLEAR_COMMENT
  } from '../type';

export default (state,action) => {
    switch(action.type){
    case ADD_COMMENT:   
    case DELETE_COMMENT:        
        return {
            ...state,
            comments:action.payload
        }
    case UPDATE_COMMENT:
        return {
            ...state,
            commentUpdate:action.payload
        }
    case CLEAR_COMMENT:
        return {
            ...state,
            comments:null,
            commentUpdate:null  
        }        
    default:
       return state
    }      
}