import React from 'react'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'

import MainLayout from './Layouts/MainLayout.js'

import Posts from './Screens/Posts.js'
import SignUp from './Screens/SignUp.js'
import SignIn from './Screens/SignIn.js'
import PostNew from './Screens/PostNew.js'
import PostEdit from './Screens/PostEdit.js'
import PostShow from './Screens/PostShow.js'

const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      flex: 1,
      height: '100%'
    }}>
      <div style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img className="responsive-img" src="https://i.imgur.com/f0yZgd2.png"/>
      </div>
    </div>
  )
}

export default () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={Posts}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/signin" component={SignIn}/>
        <Route path="/posts/new" component={PostNew}/>
        <Route path="/posts/edit/:id" component={PostEdit}/>
        <Route path="/posts/:id" component={PostShow}/>
        <Route path="/*" component={NotFound}/>
      </Route>
    </Router>
  )
}