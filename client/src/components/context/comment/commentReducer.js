import {
    ADD_COMMENT,
    DELETE_COMMENT
  } from '../type';

export default (state,action) => {
    switch(action.type){
    case ADD_COMMENT:   
    case DELETE_COMMENT:        
        return{
            comments:action.payload
        }
    default:
       return state
    }      
}