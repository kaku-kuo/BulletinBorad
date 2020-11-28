import React,{ useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostItem from './PostItem';
import Preloader from '../layout/Preloader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PostContext from '../context/post/postContext';

const Posts = () => {
const postContext = useContext(PostContext)
const { posts, getPosts } = postContext;

useEffect(() => {
 getPosts();
//eslint-disable-next-line
},[]);

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