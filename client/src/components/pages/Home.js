import React,{useContext,useEffect} from 'react';
import Posts from '../posts/Posts';
import PostContext from '../context/post/postContext';
import CommentContext from '../context/comment/commentContext';
import Footer from '../layout/footer';


const Home = () => {
const postContext = useContext(PostContext);
const commentContext = useContext(CommentContext);

const { getPosts,posts} = postContext;
const { comments } = commentContext;

useEffect(() => {
  getPosts();
  // eslint-disable-next-line
},[posts.length,comments])

    return (
        <div>
          <Posts/>
          {posts.length > 0 && <Footer/>}   
        </div>
    )
}

export default Home;
