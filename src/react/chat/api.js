import Axios from 'axios';
import Parser from './parser';

const host = "https://digiops.me";
const common = "chat/api";
const roomid = 2;
const roomname = "thebois";

const endpoints = {
  auth: `${host}/${common}/obtain-auth-token/`,
  messages: `${host}/${common}/messages/${roomid}/`,
  post: `${host}/${common}/messages/${roomid}/post/`,
}

const api = {
  login: (uname, pass) => {
    return Axios.post(endpoints.auth, {
      username: uname,
      password: pass
    })
  },

  fetchMessages: (lastMessageId) => {
    return Axios({
      url: endpoints.messages,
      method: 'post',
      data: {last_id: lastMessageId},
      headers: {'Authorization': `Token ${localStorage.digiChatToken}`}
    })
    .then((res)=>{
      return res.data;
    })
    .catch((err)=>{
      console.log(err);
    });
  },

  postMessage: (content, username, target, lastMessageId) => {
    const now = String(new Date());
    const parsed_content = Parser(content);
    const msg_obj = {
      content: parsed_content,
      author: username,
      target: target,
      to: roomname,
      ctime: now,
      last_id: lastMessageId
    };
    return Axios({
      method: 'post',
      url: endpoints.post,
      headers: {'Authorization': `Token ${localStorage.digiChatToken}`},
      data: msg_obj
    })
  }
}

export default api;
