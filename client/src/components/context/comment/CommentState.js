import React,{useReducer} from 'react';
import axios from 'axios';
import CommentContext from './commentContext';
import CommentReducer from './commentReducer';
import {
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  POST_ERROR
} from '../type';

const CommentState = props => {
   const initialSteat = {}

   const [state , dispatch] = useReducer(CommentReducer,initialSteat);

//Add a comment
const addComment = async (id,comment) => {
const config = {
  headers:{
     'Content-Type':'application/json'
    }
}    
  try {
    const res = await axios.put(`api/comments/addcomment/${id}`,comment,config);     
    dispatch({type:ADD_COMMENT,payload:res.data});
  } catch (err) {
    dispatch({type:POST_ERROR,payload:err.response.msg});
  }
} 

//Update comment
const updateComment = async(id,commentId,updateContent) => {
const config = {
  headers:{
      'Content-Type':'application/json'
    }
}    
const body = {
  "idforupdate":commentId,
  "contentforupdate":updateContent
}
  try {
    const res = await axios.put(`api/comments/updatecomment/${id}`,body,config);
    dispatch({typr:UPDATE_COMMENT,payload:res.data})
  } catch (err) {
    dispatch({type:POST_ERROR,payload:err.response.msg});
  }
} 

//Delete comment
const deleteComment = async(id,commentId) => {
const config = {
  headers:{
      'Content-Type':'application/json'
    }
}  
const commentID = {
  "_id":commentId
}
   try {
     const res = await axios.put(`api/comments/deletecomment/${id}`,commentID,config);
     dispatch({type:DELETE_COMMENT,payload:res.data});
   } catch (err) {
     dispatch({type:POST_ERROR,payload:err.response.msg});
   }

}

    return (
        <CommentContext.Provider
        value={{
            comments:state.comments,
            addComment,
            updateComment,
            deleteComment
        }}
        >
        {props.children}
        </CommentContext.Provider>
    )
}


export default CommentState;