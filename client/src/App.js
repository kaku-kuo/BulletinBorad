import React from 'react';
import './bootstrap.css';
import './app.css';
import PostState from './components/context/post/PostState';
import CommentState from './components/context/comment/CommentState';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {BrowserRouter,Switch,Route } from 'react-router-dom';
import Navbar from '../src/components/layout/Navbar'
import About from './components/pages/About';
import Home from './components/pages/Home';
import UpdatePost from './components/posts/UpdatePost';

library.add(far,fab,fas);

function App() {
  return (
 <CommentState>   
  <PostState>
   <BrowserRouter> 
     <div>
      <Navbar/>
      <Switch>
        <Route exact path="/about" component={About}/>
        <Route exact path="/" component={Home}/>
        <Route exact path="/:id" component={UpdatePost}/>
      </Switch>
     </div>
   </BrowserRouter> 
  </PostState>  
 </CommentState>
  );
}

export default App;
