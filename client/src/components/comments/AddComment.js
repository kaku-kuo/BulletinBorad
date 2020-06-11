import React,{useState,useContext,useEffect} from 'react';
import PostContext from '../context/post/postContext';
import AuthContext from '../context/auth/authContext';
import CommentContext from '../context/comment/commentContext';


const AddComment = ({postid}) => {
    const postContext = useContext(PostContext);
    const authContext = useContext(AuthContext);
    const commentContext = useContext(CommentContext);

    const {getPosts} = postContext;
    const {user} = authContext;
    const {addComment} = commentContext;


    const [comment,setComment] = useState({contentofcomment:'',commentofauthor:user && user.name})

    const handelChange = e => {
      setComment({...comment,[e.target.name]:e.target.value,commentofauthor:user.name});
    }

    const handleSubmit = e => {
      e.preventDefault();
      addComment(postid,comment);
      setComment({contentofcomment:''})
    }
    
    useEffect(() => {
      getPosts();
    //eslint-disable-next-line   
    },[comment])

    return (
        <div className="form-group commentform">
         <form onSubmit={handleSubmit}>
          <input className="form-control commentinput" placeholder="Write a comment..." name="contentofcomment" 
          value={comment.contentofcomment} 
          onChange={handelChange}
          />   
         </form> 
        </div>
    )
}

export default AddComment;