import React from 'react'
import Nav from './Componenets/Layout/Nav'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SignIn from './Componenets/Auth/SignIn'
import Profile from './Componenets/Pages/Profile/Profile'
import HomePage from './Componenets/Pages/HomePage/HomePage'
import ChatRoom from './Componenets/Pages/ChatBox/ChatRoom'
import AddRoom from './Componenets/Pages/ChatBox/AddRoom'
import RoomList from './Componenets/Pages/ChatBox/RoomList'

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={SignIn} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/homepage" exact component={HomePage}/>
          <Route path="/roomlist" exact component={RoomList} />
          <Route path="/addroom" exact component={AddRoom}/>
          <Route path="/chatroom/:rooms" exact component={ChatRoom}/>
        </Switch>
      </div>
    </BrowserRouter>

  )
}

export default App;
