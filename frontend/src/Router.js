import React from 'react'
import { Router, IndexRoute, Route, browserHistory, Redirect } from 'react-router'

import MainLayout from './Layouts/MainLayout.js'

import Posts from './Screens/Posts.js'
import SignUp from './Screens/SignUp.js'
import SignIn from './Screens/SignIn.js'
import PostNew from './Screens/PostNew.js'
import PostEdit from './Screens/PostEdit.js'
import PostShow from './Screens/PostShow.js'
import NotFound from './Screens/NotFound';

export default () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={Posts}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/signin" component={SignIn}/>
        <Route path="/signout" component={() => {
          window.localStorage.removeItem('user')
          // setTimeout(() => , 500)
          browserHistory.push('/')
          return <div />
        }}/>
        <Route path="/posts/new" component={PostNew}/>
        <Route path="/posts/edit/:id" component={PostEdit}/>
        <Route path="/posts/:id" component={PostShow}/>
        <Route path="/*" component={NotFound}/>
      </Route>
    </Router>
  )
}
