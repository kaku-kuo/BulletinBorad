import React,{useReducer} from 'react';
import PostContext from './postContext';
import PostReducer from './postReducer';
import axios from 'axios';
import {GET_POSTS,
    GET_POST,
    ADD_POST,
    UPDATE_POST,
    DELETE_POST,
    ADD_LIKES,
    MINUS_LIKES,
    POST_ERROR,
    SET_CURRENT,
    CLEAR_CURRENT,
    LOADING} from '../type';




const PostState = props => {
  const initialState = {
      posts:[],
      postForMinus:null,
      error:null
  };  
    
  const [ state, dispatch ] = useReducer(PostReducer,initialState);
 
  // Get all posts
  const getPosts = async () => {
      try {
          const res = await axios('/api/posts');
          dispatch({type:GET_POSTS,payload:res.data});
      } catch (err) {
          dispatch({type:POST_ERROR,payload:err.respnose.msg});
      }
  };

  // Add post
  const addPost = async post => {
    const config = {
        headers:{
         'Content-Type':'application/json'
        }
    }  
       try {
           const res = await axios.post('/api/posts',post,config);
           dispatch({type:ADD_POST,payload:res.data});
       } catch (err) {
           dispatch({type:POST_ERROR,payload:err.response.msg});
       }
  };

  // Update post
  const updatePost = async post => {
    const config = {
        headers:{
         'Content-Type':'application/json'
        }
    }  
    try {
       const res = await axios.put(`api/posts/${post._id}`,post,config) 

        dispatch({type:UPDATE_POST,payload:res.data});
     } catch (err) {
        dispatch({type:POST_ERROR,payload:err.response.msg});
     }
      
  }; 

  // Delete post
  const deletePost = async id => {
      try {
         await axios.delete(`api/posts/${id}`) 
         dispatch({type:DELETE_POST,payload:id});
      } catch (err) {
         dispatch({type:POST_ERROR,payload:err.response.data.msg});
      }
      
  };

  // Add likes
  const addLikes = async post => {
    const config = {
        headers:{
         'Content-Type':'application/json'
        }
    }  
    try {
       const res = await axios.put(`api/posts/addlikes/${post._id}`,post,config) 

        dispatch({type:ADD_LIKES,payload:res.data});
     } catch (err) {
        dispatch({type:POST_ERROR,payload:err.response.msg});
     }
      
  }; 

  // Minus likes
  const minusLikes = async post => {
    const config = {
        headers:{
         'Content-Type':'application/json'
        }
    }
  
    try {
       const res = await axios.put(`api/posts/minuslikes/${post._id}`,post,config) 

        dispatch({type:MINUS_LIKES,payload:res.data});
        //   console.log(res.data)
     } catch (err) {
        dispatch({type:POST_ERROR,payload:err.response.msg});
     }
    
  };  

  // Set current
  const setCurrent = async id => {
      try {
           const res = await axios.get(`api/posts/${id}`); 
           dispatch({type:SET_CURRENT,payload:res.data});
           localStorage.setItem('title',res.data.title);
           localStorage.setItem('content',res.data.content);
           localStorage.setItem('_id',res.data._id);
           
      } catch (err) {
           dispatch({type:POST_ERROR,payload:err.response.msg});
      }
  };  

  // Get post
  const getPost = async id => {
      try {
           const res = await axios.get(`api/posts/${id}`); 
           dispatch({type:GET_POST,payload:res.data});
      } catch (err) {
           dispatch({type:POST_ERROR,payload:err.response.msg});
      }
  };  
  // Clear current
  const clearCurrent = () => {
      dispatch({type:CLEAR_CURRENT});
      localStorage.removeItem('title');
      localStorage.removeItem('content');
      localStorage.removeItem('_id');
  }
  // Loading
  const loading = () => {
      dispatch({type:LOADING});
  } 
   return (
       <PostContext.Provider
        value={{
            posts:state.posts,
            postForMinus:state.postForMinus,
            error:state.error,
            getPosts,
            getPost,
            addPost,
            setCurrent,
            updatePost,
            deletePost,
            addLikes,
            minusLikes,
            clearCurrent,
            loading
        }}
       >
          {props.children}
       </PostContext.Provider>
   );
};

export default PostState;