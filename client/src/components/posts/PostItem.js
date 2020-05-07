import React,{useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import postContext from '../context/post/postContext';
import authContext from '../context/auth/authContext';
import alertContext from '../context/alert/alertContext';


const PostItem = ({post}) => {
const PostContext = useContext(postContext);
const AuthContext = useContext(authContext);
const AlertContext = useContext(alertContext);

const {deletePost,addLikes,minusLikes,getPost,postForMinus} = PostContext;
const {user} = AuthContext;
const {setAlert} = AlertContext;
const {title,content,name,_id,userId,likes,likedUser} = post;

const [dropdown,setDropdown] = useState(false);
const [likeBtn,setLikeBtn] = useState(true);
const [dropdownClass,setDropdownClass] = useState('dropdown-content');
const [numOfLikes,setNumOfLikes] = useState(likes);

useEffect(() => {
if(localStorage.token && user !== null){  
 likedUser.length > 0 && likedUser.forEach(id => {
     if(user._id === id){
       setLikeBtn(false);
     }
  });
}else{
  setLikeBtn(true)
}
// eslint-disable-next-line 
},[user]);

const timestamp = _id.toString().substring(0,8);
const date = new Date( parseInt( timestamp, 16 ) * 1000 );
const now = new Date();

const diff = now.getTime() - date.getTime();
const sec = Math.round(diff / 1000);
const mins = Math.round(diff / 1000 / 60);
const hours = Math.round(mins / 60);
const days = Math.round(hours / 24);
const localTime = date.toLocaleString();
let postedTime;

if(sec < 60){
  postedTime = "Just now";
}else if(mins === 1){
  postedTime = `${mins} min`;
}else if(mins > 1 && mins < 60){
  postedTime = `${mins} mins`;
}else if(hours === 1){
  postedTime = `${hours} hr`;
}else if(hours > 1 && hours < 24){
  postedTime = `${hours} hrs`;
}else if(days === 2){
  postedTime = `Yesterday at ${localTime.substring(12,16)} ${localTime.substring(10,12) === "上午" ? "AM":"PM"}`;
}else if(days > 2){
  postedTime = `${localTime.substring(0,9)}
                ${localTime.substring(12,16)}
                ${localTime.substring(10,12) === "上午" ? "AM":"PM"}`;
}

  const handlePostDelete = () => {
        deletePost(_id);
        setAlert("Post Removed","success");
        window.scrollTo( 0, 0 );   
  }

  
  const handleLikeBtn = () => {
    
    if(localStorage.token){
      if(!likeBtn){
         getPost(post._id);
         setLikeBtn(true);
         setNumOfLikes(numOfLikes-1); 
      }else{
         setLikeBtn(false);
         setNumOfLikes(numOfLikes+1);
         if(numOfLikes === likes || numOfLikes > likes){
         addLikes(post);
        }
      } 
    }else{
      setAlert("Please login to like the post","warning");
    }

  }

    useEffect(() => {
      if(postForMinus !== null){
         minusLikes(postForMinus);
      }
      //eslint-disable-next-line  
    },[postForMinus]);
   
  const dropdownClick = () => {
      if(!dropdown){
        setDropdown(true);
        setDropdownClass("dropdown-content show");
      }else{
        setDropdown(false);
        setDropdownClass("dropdown-content");
      }
  };

 

    return (
       <div className="border border-grey shadow-sm rounded bg-white eachpost">

         <div className="container">

          {user !== null && user._id === userId ?
          <div className="posttitle mx-2 my-2">
            <h3><strong>{title}</strong></h3> 
             <div className="dropdown">
             <span><FontAwesomeIcon className="threedots" onClick={dropdownClick} icon={['fas', 'ellipsis-h']}/></span>
             <div className={dropdownClass} >
              <Link to={`/${_id}`}><span>Edit</span></Link>
              <span onClick={handlePostDelete}>Delete</span>
             </div>
            </div>
          </div>
          :
          <div className="posttitle mx-2 my-2">
            <h3><strong>{title}</strong></h3>
          </div>
          }

          <div className="postcontent mt-3">
            <p>{content}</p>
          </div>
          <div>
            {likes === 0 ? <span/> : <span className="likes">{`${numOfLikes} likes`}</span>}
          </div>
           <div className="authorAndPostedTime">
            <span className="author"><FontAwesomeIcon className="mr-1" icon={['fas', 'pen']}/>{name}</span>
            <span className="postedTime">{postedTime}</span>
           </div>
            <hr className="separateline"/>
          </div>

           <div className="likecommentdiv">
              <div className="d-inline-block like" onClick={handleLikeBtn}>
                <span className={likeBtn ? '':'liked'}><FontAwesomeIcon icon={likeBtn ? ['far', 'thumbs-up']:['fas', 'thumbs-up']}/>Like</span>
              </div>
              <div className="d-inline-block comment">
                <span><FontAwesomeIcon icon={['far', 'comment']}/>Comment</span>
              </div>
           </div>
          <hr className="separateline2"/>
       </div> 
    )
}

export default PostItem