import React, { useContext,useState,useEffect } from 'react';
import postContext from '../context/post/postContext';


const UpdatePost = props => {
    
    const PostContext = useContext(postContext);
    
    const {updatePost,setCurrent,clearCurrent} = PostContext;

    const [post , setPost] = useState({
        _id:null,
        title:'',
        content:''
    });
    useEffect(() => { 
        setCurrent(props.match.params.id);   
        // eslint-disable-next-line   
    },[])

    useEffect(()=> {
       if(localStorage.title && localStorage.content && localStorage._id){
           setPost({_id:localStorage._id,title:localStorage.title,content:localStorage.content});    
       }else{
           setPost({
            _id:null,
            title:'',
            content:''
           })
       }
    },[PostContext])
  

    const onChange = e => {
        setPost({...post,[e.target.name]:e.target.value})
    }
    const onSubmit = (e) => {
        e.preventDefault();
        updatePost(post);
        clearCurrent();
        props.history.push("/");
    }    

    return (
        <div className="border border-grey shadow-sm rounded bg-white eachpost">

         <div className="container">
           <form onSubmit={onSubmit}>
            <div className="posttitle mx-2 my-2">
             {post && <input className="form-control" name="title" onChange={onChange} value={post.title}/>}   
            </div>
            <div className="postcontent mt-3">
             {post && <textarea className="form-control" name="content" rows="8" onChange={onChange} value={post.content}/>}   
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


export default UpdatePost;