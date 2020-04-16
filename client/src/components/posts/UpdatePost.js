import React, { useContext,useState,useEffect } from 'react';
import postContext from '../context/post/postContext';

const UpdatePost = props => {
    
    const PostContext = useContext(postContext);
    

    const {current,updatePost,setCurrent,clearCurrent} = PostContext;

    const [post , setPost] = useState({
        id:null,
        title:'',
        content:''
    });
    useEffect(() => {
         setCurrent(parseInt(props.match.params.id));     
    },[])

    useEffect(()=> {
       if(current !== null){
           setPost({id:current.id,title:current.title,content:current.content});    
       }else{
           setPost({
            id:null,
            title:'',
            content:''
           })
       }
    },[PostContext,current])
  
  console.log(props)

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