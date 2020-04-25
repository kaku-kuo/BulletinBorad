import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import PostItem from './PostItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PostContext from '../context/post/postContext';

const Posts = () => {
    const postContext = useContext(PostContext)

    const {posts} = postContext;
    return (
        <div className="container">

          {posts.length === 0 ?  (
            <div className="text-center mt-5">
              <div className="display-4 font-weight-bold">Loading...</div>
              <div className="spinner-grow" role="status"/>
            </div> 
          )
             : 
          posts.map(post => (
            <PostItem key={post._id} post={post}/> 
         ))}
         <Link to="/addpost"><FontAwesomeIcon className="addbtn" icon={['fas', 'plus-circle']}/></Link>

        </div>
    )
}

export default Posts;