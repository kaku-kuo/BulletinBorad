import React,{useContext} from 'react'
import PostItem from './PostItem';
import PostContext from '../context/post/postContext';

const Posts = () => {
    const postContext = useContext(PostContext)

    const {posts} = postContext;
    return (
        <div className="container">
          {posts.map(post => (
             <PostItem key={post.id} post={post}/> 
          ))}
        </div>
    )
}

export default Posts;