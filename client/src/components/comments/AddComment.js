import React,{ useState,useContext } from 'react';
import AuthContext from '../context/auth/authContext';
import CommentContext from '../context/comment/commentContext';


const AddComment = ({ postid }) => {
const authContext = useContext(AuthContext);
const commentContext = useContext(CommentContext);
const { user } = authContext;
const { addComment } = commentContext; 
const [contentofcomment, setContentofcomment] = useState("");
const [commentofauthor] = useState(user && user.name);



    
const handleSubmit = e => {
  e.preventDefault();
  addComment(postid, { contentofcomment, commentofauthor });
  setContentofcomment("");
};
    
    
    return (
      <div className="form-group commentform">
       <form onSubmit={handleSubmit}>
        <input className="form-control commentinput" placeholder="Write a comment..." name="contentofcomment" 
         value={contentofcomment} 
         onChange={e => setContentofcomment(e.target.value)}/>   
       </form> 
      </div>
    )
}

export default AddComment;