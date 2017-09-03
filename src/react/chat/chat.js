import React from 'react';

import Input from './chat_input.js';
import api from './api.js';

import './chat.css';

const d = document;

class Chat extends React.Component {
  constructor(props){
    super(props);
    let loggedIn = false, uname="nigga";
    if(localStorage.digiChatToken){
      loggedIn = true;
      uname = localStorage.digiChatUname;
    }
    this.state = {
      loggedIn: loggedIn,
      username: uname,
      messages: [],
    };
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    d.getElementById("chat-input").focus();
    console.log("mounted ", this.state.loggedIn);
    this.getMessages();
  }

  getMessages(){
    if(this.state.loggedIn){
      const messages = api.fetchMessages(localStorage.digiChatToken);
      messages
        .then((messages) => {
          this.setState({messages: messages});
        })
    }
  }

  authenticate(uname, pass){

    if(this.state.loggedIn)
      return "You're already logged in mate";

    let string;
    const res = api.login(uname, pass);
    return res.then((res) => {

        if(res.data.token){
          localStorage.digiChatToken = res.data.token;
          localStorage.digiChatUname = uname;
          this.setState({
            loggedIn: true,
            username: uname
          })
        }
        this.getMessages();
        string = `Welcome my boi, ${uname}.`;
        return string;
    });
  }

  logout(){
    localStorage.digiChatToken = "";
    localStorage.digiChatUname = "";
    console.log("logged out");
    this.setState({
      loggedIn: false, 
      username: "nigga"
    });
  }

  render(){
    return(
      <div className="chat-terminal">
        <div className="messages">
          {
            this.state.messages.map((msg)=>{
              return (
                <div className="message" key={msg.time}>
                <strong>{msg.author}:</strong> {msg.content}
                <small className="time">{msg.time}</small>
                </div>
              );
            })
          }
        </div>
        <Input 
        auth={this.authenticate}
        logout={this.logout}
        username={this.state.username}/>
      </div>
    );
  }
}

export default Chat;
