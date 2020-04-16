import React,{useReducer} from 'react';
import CommentContext from './commentContext';
import CommentReducer from './commentReducer';


const CommentState = props => {
   const initialSteat = {
    comments:[
        {
          id:1,
          content:'I am first test comment content',
          author:'kaku'
        },
        {
          id:2,
          content:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
          author:'alan'
        },
        {
          id:3,
          content:'I am third test comment content',
          author:'rose'
        }
    ]
   }

   const [state , dispatch] = useReducer(CommentReducer,initialSteat)

    return (
        <CommentContext.Provider
        value={{
            comments:state.comments
        }}
        >
        {props.children}
        </CommentContext.Provider>
    )
}


export default CommentState;