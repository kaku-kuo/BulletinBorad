import React,{useState,useContext} from 'react';
import PostContext from '../context/post/postContext';



const AddPost = (props) => {
const postContext = useContext(PostContext);


const {addPost} = postContext;

const [post, setPost] = useState({title:'',content:'',name:localStorage.name});



const onChange = e => {
    setPost({...post,[e.target.name]:e.target.value});
}

const onSubmit = e => {
    e.preventDefault();
    addPost(post);
    props.history.push("/");
}
    return (
        <div className="border border-grey shadow-sm rounded bg-white eachpost">

        <div className="container">
          <div className="newposttitle text-center">
            <span>New Post</span>  
          </div>  
          <form onSubmit={onSubmit}>
           <div className="posttitle mx-2 my-2">
             <input className="form-control" name="title" onChange={onChange}/>
           </div>
           <div className="postcontent mt-3">
            <textarea className="form-control" name="content" rows="8" onChange={onChange}/>
           </div>
           <div className="text-center mt-3">
            <input className="btn btn-primary btn-sm" type="submit" value="Submit"/>
           </div>
          </form> 
           <hr className="separateline"/>
        </div>

       </div>
    )
}

export default AddPost;
