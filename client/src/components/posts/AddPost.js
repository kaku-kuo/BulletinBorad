import React, { useState, useContext } from 'react';
import PostContext from '../context/post/postContext';
import AlertContext from '../context/alert/alertContext';


const AddPost = ({ history }) => {
const postContext = useContext(PostContext);
const alertContext = useContext(AlertContext);
const { addPost } = postContext;
const { setAlert } = alertContext;
const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const [name] = useState(localStorage.name);

const onSubmit = e => {
    e.preventDefault();
    addPost({ title, content, name});
    history.push("/");
    setAlert("New post added!","success");
}
    return (
        <div className="border border-grey shadow-sm rounded bg-white eachpost">

        <div className="container">
          <div className="newposttitle text-center">
            <span>New Post</span>  
          </div>  
          <form onSubmit={onSubmit}>
           <div className="posttitle mx-2 my-2">
             <input className="form-control" name="title" value={title} onChange={e => setTitle(e.target.value)}/>
           </div>
           <div className="postcontent mt-3">
            <textarea className="form-control" name="content" value={content} rows="8" onChange={e => setContent(e.target.value)}/>
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
