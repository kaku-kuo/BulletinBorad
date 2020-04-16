import React,{useContext} from 'react';
import CommentItem from './CommentItem';
import commentContext from '../context/comment/commentContext';

const Comments = () => {
    const CommentContext = useContext(commentContext);
    
    const {comments} = CommentContext;

    return (
        <div>
          {comments.map(comment => (
              <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
    )
}

export default Comments;