import {GET_POSTS,
    GET_POST,
    ADD_POST,
    UPDATE_POST,
    DELETE_POST,
    ADD_LIKES,
    POST_ERROR,
    SET_CURRENT,
    CLEAR_CURRENT,
    MINUS_LIKES,
 } from '../type';

    export default (state,action) => {

          switch(action.type){
            case GET_POSTS:
                return {
                   ...state,
                   posts:action.payload,
                   loading:false
                }
            case GET_POST:
                return {
                   ...state,
                   postForMinus:action.payload,
                   loading:false 
                }   
            case ADD_POST:
                return {
                   ...state,
                   posts:[...state.posts,action.payload],
                   loading:false
                }
            case UPDATE_POST:
            case ADD_LIKES:
            case MINUS_LIKES:        
                return {
                   ...state,
                   posts:state.posts.map(post => post._id === action.payload._id ? action.payload:post),
                   loading:false
                }    
            case DELETE_POST:
                return {
                    ...state,
                    posts:state.posts.filter(post => post._id !== action.payload),
                    loading:false
                }
            case SET_CURRENT:    
                return {
                    ...state
                }
            case CLEAR_CURRENT:
                return {
                    ...state
                }
            case POST_ERROR:
                return {
                    ...state,
                    error:action.payload
                }        
              default:
                return state;
          }
    }