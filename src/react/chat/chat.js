import React from 'react';
import TimeAgo from 'react-timeago';
import Input from './chat_input.js';
import api from './api.js';
import intro from './intro.js';

import './chat.css';

const d = document;

class Chat extends React.Component {
  constructor(props){
    super(props);
    let loggedIn = false, uname="nigga", messages=[]
    if(sessionStorage.digiChatToken){
      loggedIn = true;
      uname = sessionStorage.digiChatUname;
    }
    if(!loggedIn){
      messages = intro;
    }
    this.state = {
      loggedIn: loggedIn,
      username: uname,
      messages: messages,
    };
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.getMessages = this.getMessages.bind(this);
  }

  componentDidMount(){
    this.focusInput();
    setInterval(this.getMessages, 3000);
  }

  setTitle(string) {
    document.getElementsByTagName("title")[0].innerHTML = string;
  }

  getMessages(){
    const s = this.state;
    if(!s)
      return;
    if(s.loggedIn){
      let lastMessageId = 0;
      if(s.messages.length)
        lastMessageId = s.messages[s.messages.length-1].id;
      console.log(lastMessageId);
      const messages = api.fetchMessages(lastMessageId);
      messages
        .then((newMessages) => {
          if (!newMessages)
            return;
          // Update state only if there are new messages
          if(newMessages.length){
            this.setTitle("digiChat (new messages)");
            const oldMessages = s.messages.slice();
            const newState = [...oldMessages, ...newMessages];
            this.setState({messages: newState});
            this.scroll();
          }
        });
    }
  }

  sendMessage(content, target="all"){
    const s = this.state;
    if(!s.loggedIn)
      return;
    let lastMessageId = 0;
    if(s.messages)
        lastMessageId = s.messages[s.messages.length-1].id;
    const mes = api.postMessage(content, this.state.username, target, lastMessageId);
    return mes.then((res) => {
      const newMessages = res.data;
      if(newMessages.length){
        const oldMessages = s.messages.slice();
        const newState = [...oldMessages, ...newMessages];
        this.setState({messages: newState});
        this.scroll();
      }
    })
    .catch((err) => console.log(err));
  }

  authenticate(uname, pass){

    if(this.state.loggedIn)
      return "You're already logged in mate";

    let string;
    const res = api.login(uname, pass);
    return res.then((res) => {

        if(res.data.token){
          sessionStorage.digiChatToken = res.data.token;
          sessionStorage.digiChatUname = uname;
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

  focusInput(){
    d.getElementById("chat-input").focus();
  }

  logout(){
    sessionStorage.digiChatToken = "";
    sessionStorage.digiChatUname = "";
    console.log("logged out");
    this.setState({
      loggedIn: false, 
      username: "nigga",
      messages: intro
    });
  }

  scroll(){
    const box = d.getElementById("messagebox");
    box.scrollTop = box.scrollHeight;
  }

  render(){
    const formatter = (value, unit, suffix, date, defaultFormatter) => `${value}${unit[0]} ${suffix}`;
    const msgs = this.state.messages;
    return(
      <div 
        className="chat-terminal" 
        onClick={this.focusInput}>

        <div className="messages" onClick={this.focusInput} id="messagebox">
          {
            msgs?msgs.map((msg)=>{
              const d = new Date(msg.ctime);
              const html = {__html: msg.content}
              return (
                <div className="message" key={msg.time}>
                <strong>{msg.author}:</strong> <span dangerouslySetInnerHTML={html}></span>
                <small className="time">
                <TimeAgo date={d} formatter={formatter} minPeriod={60}></TimeAgo></small>
                </div>
              );
            })
            :"Authorization error. Please check your internet connection."
          }
        </div>
        <Input 
        auth={this.authenticate}
        send={this.sendMessage}
        logout={this.logout}
        username={this.state.username}
        setTitle={() => this.setTitle("digiChat")}/>
      </div>
    );
  }
}

export default Chat;
