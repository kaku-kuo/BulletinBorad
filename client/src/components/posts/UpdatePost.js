import React, { useContext, useState, useEffect } from 'react';
import PostContext from '../context/post/postContext';
import AlertContext from '../context/alert/alertContext';
import Preloader from '../layout/Preloader';

const UpdatePost = ({ history, match }) => {
const postContext = useContext(PostContext);
const alertContext = useContext(AlertContext);
const { current, updatePost, setCurrent, clearCurrent } = postContext;
const { setAlert } = alertContext;
const [id, setId] = useState("");
const [title, setTitle] = useState("");
const [content, setContent] = useState("");

useEffect(() => {
setCurrent(match.params.id);   
// eslint-disable-next-line   
},[]);

useEffect(()=> {
if(current){
  setId(current._id);
  setTitle(current.title);
  setContent(current.content);   
};
// eslint-disable-next-line   
},[current])
  
const onSubmit = e => {
    e.preventDefault();
    updatePost({ id, title, content });
    clearCurrent();
    history.push("/");
    setAlert("Update Successfully", "success");
};    

    return (
        current ?
        <div className="border border-grey shadow-sm rounded bg-white eachpost">
         <div className="container">
           <form onSubmit={onSubmit}>
            <div className="posttitle mx-2 my-2">
             <input className="form-control" name="title" onChange={e => setTitle(e.target.value)} value={title}/>   
            </div>
            <div className="postcontent mt-3">
             <textarea className="form-control" name="content" rows="8" onChange={e => setContent(e.target.value)} value={content}/>   
            </div>
            <div className="text-center mt-3">
             <input className="btn btn-primary btn-sm" type="submit" value="Submit"/>
            </div>
          </form> 
            <hr className="separateline"/>
         </div>
        </div>
        :
        <Preloader/>
    )
}


export default UpdatePost;