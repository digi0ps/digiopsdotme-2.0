import Axios from 'axios';

const host = "http://localhost:8000";
const common = "chat/api";
const roomid = 1;

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
  fetchMessages: (token) => {
    return Axios({
      url: endpoints.messages,
      method: 'get',
      headers: {'Authorization': `Token ${token}`}
    })
    .then((res)=>{
      console.log(res);
      return res.data;
    })
    .catch((err)=>{
      console.log(err);
    });
  }
}

export default api;
