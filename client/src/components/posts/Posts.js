import React,{ useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostItem from './PostItem';
import Preloader from '../layout/Preloader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PostContext from '../context/post/postContext';
import CommentContext from '../context/comment/commentContext';

const Posts = () => {
const postContext = useContext(PostContext);
const commentContext = useContext(CommentContext);
const { posts, loading, getPosts } = postContext;
const { comments, commentUpdate, clearComment } = commentContext;

useEffect(() => {
 getPosts();
 clearComment();
//eslint-disable-next-line
},[loading, comments ,commentUpdate]);

    return (                             
        <div>          
          {posts.length === 0 ?
          <Preloader/>  
          :                                    
          posts.map(post => (                                           
            <PostItem key={post._id} post={post}/>                    
         ))}                                           
         <Link to="/addpost"><FontAwesomeIcon className="addbtn" icon={['fas', 'plus-circle']}/></Link>                    
        </div>                                  
    )
}

export default Posts;