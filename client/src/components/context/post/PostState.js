import React,{useReducer} from 'react';
import PostContext from './postContext';
import PostReducer from './postReducer';
import axios from 'axios';
import uuid from 'uuid';
import {GET_POSTS,
    ADD_POST,
    UPDATE_POST,
    DELETE_POST,
    SET_CURRENT,
    CLEAR_CURRENT,
    LOADING} from '../type';




const PostState = props => {
  const initialState = {
      posts:[
          {
            id:1,
            title:'first test post',
            content:'I am first test post content',
            author:'kaku'
          },
          {
            id:2,
            title:'second test post',
            content:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
            author:'alan'
        },
        {
            id:3,
            title:'third test post',
            content:'I am third test post content',
            author:'rose'
        }
      ],
      current:null
  };  
    
  const [ state, dispatch ] = useReducer(PostReducer,initialState);
 
  // Get all posts

  // Update post
  const updatePost = post => {
       dispatch({type:UPDATE_POST,payload:post});
  };  
  // Delete post
  const deletePost = id => {
       dispatch({type:DELETE_POST,payload:id});
  };
  // Set current
  const setCurrent = id => {
       dispatch({type:SET_CURRENT,payload:id})
  };  
 // Clear current
  const clearCurrent = () => {
      dispatch({type:CLEAR_CURRENT,payload:null});
  }  
   return (
       <PostContext.Provider
        value={{
            posts:state.posts,
            current:state.current,
            setCurrent,
            updatePost,
            deletePost,
            clearCurrent
        }}
       >
          {props.children}
       </PostContext.Provider>
   );
};

export default PostState;