import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './RoomList/RoomList';
import MessageList from './MessageList/MessageList';
import User from './User/User';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCrjfc4pimd-5LSanmOsIXVBPA4gwO4gZU",
    authDomain: "react-chat-97ce8.firebaseapp.com",
    databaseURL: "https://react-chat-97ce8.firebaseio.com",
    projectId: "react-chat-97ce8",
    storageBucket: "react-chat-97ce8.appspot.com",
    messagingSenderId: "26015947465"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);

    this.state ={
      activeRoom: "",
      user: ""
    }
  }

  setActiveRoom(room){
    this.setState({activeRoom: room});
  }
  setUser(user){
    this.setState({user: user});
  }
  render() {
    return (
      <div className="App">

          <aside id="sidebar">
            <div id="logo">React Chat</div>
            <RoomList 
              firebase={firebase}
              activeRoom = {this.state.activeRoom}
              setActiveRoom={ (room) => this.setActiveRoom(room)}
              user = {this.state.user}
              />
          </aside>
          <div id="main">
            <MessageList 
              firebase={firebase}
              activeRoom = {this.state.activeRoom}
              user = {this.state.user}
              />
          </div>
          <div>
            <User
              firebase={ firebase }
              user={ this.state.user }
              setUser={ (user) => this.setUser(user) }/>
          </div>

      </div>
    );
  }
}

export default App;
