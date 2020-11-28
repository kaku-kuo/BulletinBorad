import React,{ useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from '../context/auth/authContext';
import CommentContext from '../context/comment/commentContext';
import PostContext from '../context/post/postContext';

const CommentItem = ({ comment:{ contentofcomment, commentofauthor, idofauthor,_id } }) => {
const authContext = useContext(AuthContext);
const commentContext = useContext(CommentContext);
const postContext = useContext(PostContext);

const { user } = authContext;
const { deleteComment, updateComment, forUpdate } = commentContext;
const { posts, getPosts } = postContext;


const [dropdown, setDropdown] = useState(false);
const [showOption, setShowOption] = useState(false);
const [showUpdate, setShowUpdate] = useState(false);
const [commentForUpdate, setCommentForUpdate] = useState('');
const [optionClass, setOptionClass] = useState('threedots ml-2');
const [dropdownClass, setDropdownClass] = useState('dropdown-content');

const dropdownClick = () => {
  if(!dropdown){
    setDropdown(true);
    setDropdownClass("dropdown-content show");
  }else{
    setDropdown(false);
    setDropdownClass("dropdown-content");
  }
};

const handleMouseOver = () => {
    setShowOption(true);
};

const handleMouseLeave = () => {
    setShowOption(false); 
};

const handleUpdateComment = () => {
  if(!showUpdate){
    setShowUpdate(true);   
    setOptionClass('threedots ml-2 d-none');
    setDropdownClass('dropdown-content d-none');
    setCommentForUpdate(contentofcomment);      
  };
};

const handleChange = e => {
  setCommentForUpdate(e.target.value);
};

useEffect(() => {
  getPosts();
  //eslint-disable-next-line 
},[forUpdate])

const handleSubmit = e => {
  e.preventDefault();
  let post = posts.find(post => post.comment.find(each => each._id === _id));
  if(commentForUpdate === ''){
    deleteComment(post._id, _id);
  }else{
    updateComment(post._id, _id, commentForUpdate);
  }
  setShowUpdate(false);
  setDropdown(false);
  setOptionClass('threedots ml-2');
  setDropdownClass('dropdown-content');
};

const handleDeleteComment = () => {
  let post = posts.find(post => post.comment.find(each => each._id === _id));
  setDropdown(false);
  setDropdownClass("dropdown-content");
  deleteComment(post._id, _id);
};

const handleKeyPress = e => {
  if(e.keyCode === 27){
    setShowUpdate(false);
    setDropdown(false);
    setOptionClass('threedots ml-2');
    setDropdownClass('dropdown-content');
  }
}


    return (
       <div className="d-flex align-items-center" 
       onMouseOver={handleMouseOver} 
       onMouseLeave={handleMouseLeave}
       >   
        {showUpdate ? 
         <div className="form-group w-100 commentform">
         <form onSubmit={handleSubmit}>
          <input className="form-control commentinput" name="contentofcomment" value={commentForUpdate}
          onChange={handleChange}
          onKeyDown={handleKeyPress}       
          ref={input => input && input.focus()}  
          />   
         </form>
         <span className="font-weight-light">Press ESC to cancel</span> 
        </div>
        :
        <div className="eachcomment">
         <div className="commentauthor">{commentofauthor}</div>
         <div className="contentofcomment">{contentofcomment}</div>
        </div>
        }        
        
        {user !== null && user._id === idofauthor &&
         <div className="dropdown">
          {showOption || dropdown ? <span><FontAwesomeIcon onClick={dropdownClick} className={optionClass} icon={['fas', 'ellipsis-h']}/></span>
          :<span/>} 
          
          <div className={dropdownClass}>
            <div onClick={handleUpdateComment}>Edit</div>
            <div onClick={handleDeleteComment}>Delete</div>          
          </div>
         </div>}    
       </div>  
    )
}

export default CommentItem;