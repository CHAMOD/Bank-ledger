import axios from "axios";
const resourceUrl = "http://localhost:8080";


const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, PATCH, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
  'Access-Control-Allow-Credentials': true
}
const AccountAPI = {

  addAccount: function (account) {
    return axios.get(resourceUrl + `/addaccount`,  {params: account},{
      headers: headers
    },
      { withCredentials: true },
      { crossorigin: true }).catch(error => {
      console.log(error);
    });
  },
  addDeposit: function (deposit) {
    return axios.get(resourceUrl + `/depositmoney`,  {params: deposit},{
      headers: headers
    },
      { withCredentials: true },
      { crossorigin: true }).catch(error => {
      console.log(error);
    });
  },
  addWithdraw: function (withdraw) {
    return axios.get(resourceUrl + `/withdrawmoney`,  {params: withdraw},{
      headers: headers
    },
      { withCredentials: true },
      { crossorigin: true }).catch(error => {
      console.log(error);
    });
  },
  getTransactions: function () {
    return axios.get(resourceUrl + `/transactions`, {
      headers: headers
    },
      { withCredentials: true },
      { crossorigin: true }).catch(error => {
      console.log(error);
    }).catch(error => {
      console.log(error);
    });
  }
  ,
  getAllAccounts: function () {
    return axios.get(resourceUrl + `/accounts`, {
      headers: headers
    },
      { withCredentials: true },
      { crossorigin: true }).catch(error => {
      console.log(error);
    }).catch(error => {
      console.log(error);
    });
  }
  
};

export default AccountAPI;
