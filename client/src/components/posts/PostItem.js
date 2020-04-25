import React,{useState,useContext} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import postContext from '../context/post/postContext';



const PostItem = ({post}) => {
const PostContext = useContext(postContext);


const [dropdown,setDropdown] = useState(false);
const [dropdownClass,setDropdownClass] = useState('dropdown-content');

const {deletePost} = PostContext;
const {title,content,name,_id} = post;


  const handlePostDelete = () => {
      deletePost(_id);
  }

  const dropdownClick = () => {
      if(!dropdown){
        setDropdown(true);
        setDropdownClass("dropdown-content show");
      }else{
        setDropdown(false);
        setDropdownClass("dropdown-content");
      }
  }


    return (
       <div className="border border-grey shadow-sm rounded bg-white eachpost">

         <div className="container">
          
          <div className="posttitle mx-2 my-2"> 
            <span><strong>{title}</strong></span>
            <div className="dropdown">
             <span><FontAwesomeIcon className="threedots" onClick={dropdownClick} icon={['fas', 'ellipsis-h']}/></span>
             <div className={dropdownClass} >
              <Link to={`/${_id}`}><span>Edit</span></Link>
              <span onClick={handlePostDelete}>Delete</span>
             </div>
            </div>
          </div>
    
          <div className="postcontent mt-3">
           <p>{content}</p>
          </div>
           <span className="author"><FontAwesomeIcon className="mr-1" icon={['fas', 'pen']}/>{name}</span> 
           <hr className="separateline"/>

         </div>

           <div className="likecommentdiv">
              <div className="d-inline-block like">
                <span><FontAwesomeIcon icon={['far', 'thumbs-up']}/>Like</span>
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