import React,{useContext,useEffect} from 'react';
import Posts from '../posts/Posts';
import PostContext from '../context/post/postContext';
import Footer from '../layout/footer';


const Home = () => {
const postContext = useContext(PostContext);

const { getPosts,posts} = postContext;

useEffect(() => {
  getPosts();
  // eslint-disable-next-line
},[posts])

    return (
        <div>
          <Posts/>
          {posts.length > 0 && <Footer/>}   
        </div>
    )
}

export default Home;
