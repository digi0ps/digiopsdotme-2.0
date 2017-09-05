import Axios from 'axios';

const host = "https://digiops.me";
const common = "chat/api";
const roomid = 2;
const roomname = "thebois";

const endpoints = {
  auth: `${host}/${common}/obtain-auth-token/`,
  messages: `${host}/${common}/messages/${roomid}/`
}

const api = {
  login: (uname, pass) => {
    return Axios.post(endpoints.auth, {
      username: uname,
      password: pass
    })
  },

  fetchMessages: () => {
    return Axios({
      url: endpoints.messages,
      method: 'get',
      headers: {'Authorization': `Token ${localStorage.digiChatToken}`}
    })
    .then((res)=>{
      return res.data;
    })
    .catch((err)=>{
      console.log(err);
    });
  },

  postMessage: (content, username, target) => {
    const msg_obj = {
      content: content,
      author: username,
      target: target,
      to: roomname
    };
    return Axios({
      method: 'post',
      url: endpoints.messages,
      headers: {'Authorization': `Token ${localStorage.digiChatToken}`},
      data: msg_obj
    })
  }
}

export default api;
