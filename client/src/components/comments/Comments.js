import React,{useContext,useEffect,useState} from 'react';
import CommentItem from './CommentItem';
import commentContext from '../context/comment/commentContext';
import postContext from '../context/post/postContext';

const Comments = () => {
    const CommentContext = useContext(commentContext);
    const PostContext = useContext(postContext);
    
    const {commentId} = CommentContext;
    const {posts} = PostContext;
   

    return (
        <div>
           {}
        </div>
    )
}

export default Comments;