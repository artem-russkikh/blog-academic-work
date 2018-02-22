import React from 'react'
import { Router, Route, hashHistory } from 'react-router'

import Posts from './Screens/Posts.js'
import SignUp from './Screens/SignUp.js'
import SignIn from './Screens/SignIn.js'
import PostNew from './Screens/PostNew.js'
import PostEdit from './Screens/PostEdit.js'
import PostShow from './Screens/PostShow.js'

export default () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={Posts}/>
      <Route path="/SignUp" component={SignUp}/>
      <Route path="/SignIn" component={SignIn}/>
      <Route path="/PostNew" component={PostNew}/>
      <Route path="/PostEdit" component={PostEdit}/>
      <Route path="/PostShow" component={PostShow}/>
    </Router>
  )
}