import axios from 'axios'

// ADICIONAR A URL DA API NO ARQUIVO .ENV
// SE NECESSÁRIO FAZER VÁRIOS .ENV CONFORME OS AMBIENTES: PROD, DEV E QA

axios.interceptors.response.use((response) => {
  if(response.headers['set-authorization']) {
    const tokenName = 'token';
    const tokenValue = response.headers['set-authorization'];
    localStorage.setItem(tokenName, tokenValue)
  }
  return response
}, (error) => {
  if (error.response.status === 401)
    window.location.href = window.location.origin
  else
    return error.response
})

axios.interceptors.request.use((request) => {
  if(!request.headers['Content-Type']) {
    request.headers['Content-Type'] = 'application/json';
  }
  if(!request.headers['Accept']) {
    request.headers['Accept'] = 'application/json';
  }
  if(localStorage.getItem('token')) {
    request.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
  }
  return request
})

export default {
  async get(url, headers, apiurl) {
    try {
      const prodUrl = apiurl ? apiurl : process.env.REACT_APP_URL;
      const response = await axios.get(prodUrl + url, headers);
      return response;
    } catch(e) {
      return e;
    }
  },
  async post(url, data, headers, apiurl) {
    try {
      const prodUrl = apiurl ? apiurl : process.env.REACT_APP_URL;
      const response = await axios.post(prodUrl + url, data, headers)
      return response;
    } catch(e) {
      return e;
    }
  },
  async put(url, data, headers, apiurl) {
    try {
      const prodUrl = apiurl ? apiurl : process.env.REACT_APP_URL;
      const response = await axios.put(prodUrl + url, data, headers)
      return response;
    } catch(e) {
      return e;
    }
  },
  async delete(url, data, headers, apiurl){
    try {
      const prodUrl = apiurl ? apiurl : process.env.REACT_APP_URL;
      const response = await axios.delete(prodUrl + url, data, headers)
      return response;
    } catch(e) {
      return e;
    }
  }
}
