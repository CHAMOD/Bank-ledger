import axios from "axios";
const resourceUrl = "http://localhost:8080";


const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, PATCH, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
  'Access-Control-Allow-Credentials': true
}
const UserAPI = {

  login: function (user) {

    console.log(user)
    return axios.post("http://localhost:8080/login", user, {
      headers: headers
    },
      { withCredentials: true },
      { crossorigin: true }).catch(error => {
          console.log(error);
        });
  },
  logout: function () {
    return axios.get(resourceUrl + `/logout`, {
      headers: headers
    },
      { withCredentials: true },
      { crossorigin: true }).catch(error => {
      console.log(error);
    });
  },
  getProfile: function (userName) {
    return axios.get(resourceUrl + `/users/${userName}`, {
      headers: headers
    },
      { withCredentials: true },
      { crossorigin: true }).catch(error => {
      console.log(error);
    });
  },
  addUser: function (user) {
    return axios.get(resourceUrl + `/adduser`,  {params: user},{
      headers: headers
    },
      { withCredentials: true },
      { crossorigin: true }).catch(error => {
      console.log(error);
    });
  },
  getAllUsers: function () {
    return axios.get(resourceUrl + `/users`).catch(error => {
      console.log(error);
    });
  }
  
};

export default UserAPI;
