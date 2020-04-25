import React,{useContext,useEffect} from 'react';
import Posts from '../posts/Posts';
import PostContext from '../context/post/postContext';


const Home = () => {
const postContext = useContext(PostContext);

const { getPosts} = postContext;

useEffect(() => {
  getPosts();
  // eslint-disable-next-line
},[])

    return (
        <div>
          <Posts/>   
        </div>
    )
}

export default Home;
