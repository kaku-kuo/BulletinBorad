import {GET_POSTS,
    ADD_POST,
    UPDATE_POST,
    DELETE_POST,
    SET_CURRENT,
    CLEAR_CURRENT,
    LOADING} from '../type';

    export default (state,action) => {

          switch(action.type){
            
            case UPDATE_POST:
                return {
                   ...state,
                   posts:state.posts.map(post => post.id === action.payload.id ? action.payload:post  )
                }    
            case DELETE_POST:
                return {
                    ...state,
                    posts:state.posts.filter(post => post.id !== action.payload)
                }
            case SET_CURRENT:
                return {
                    ...state,
                    current:state.posts.find(post => post.id === action.payload)
                }
            case CLEAR_CURRENT:
                return {
                    ...state,
                    current:action.payload
                }    
              default:
                return state;
          }
    }