import React from 'react';
import './bootstrap.css';
import './app.css';
import PostState from './components/context/post/PostState';
import CommentState from './components/context/comment/CommentState';
import AuthState from './components/context/auth/AuthState';
import AlertState from './components/context/alert/AlertState';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { BrowserRouter,Switch,Route } from 'react-router-git initdom';
import Navbar from '../src/components/layout/Navbar'
import About from './components/pages/About';
import Home from './components/pages/Home';
import AddPost from './components/posts/AddPost';
import UpdatePost from './components/posts/UpdatePost';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alerts';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

library.add(far,fab,fas);

if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {

  return (
<AlertState>    
 <AuthState>   
  <PostState>
   <CommentState> 
    <BrowserRouter> 
     <div> 
      <Navbar/>
      <Alert/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/register" component={Register}/>       
        <Route exact path="/login" component={Login}/>       
        <PrivateRoute exact path="/addpost" component={AddPost}/>
        <PrivateRoute exact path="/:id" component={UpdatePost}/>
      </Switch>
     </div>
    </BrowserRouter> 
   </CommentState>
  </PostState>  
 </AuthState>
</AlertState>
  );
}

export default App;
