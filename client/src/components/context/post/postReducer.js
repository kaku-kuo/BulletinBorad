import {GET_POSTS,
    ADD_POST,
    UPDATE_POST,
    DELETE_POST,
    POST_ERROR,
    SET_CURRENT,
    CLEAR_CURRENT,
 } from '../type';

    export default (state,action) => {

          switch(action.type){
            case GET_POSTS:
                return {
                   ...state,
                   posts:action.payload,
                   loading:false
                }  
            case ADD_POST:
                return {
                   ...state,
                   posts:[...state.posts,action.payload],
                   loading:false
                }
            case UPDATE_POST:
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