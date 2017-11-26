import config from './config'
import axios from 'axios'

const api = {
  getUrl: function (pageNumber) {
    return [
      config.baseUrl,
      'access_token=', config.accessToken,
      '&sort=', config.sorting,
      '&page=', pageNumber].join('')
  },

  request: function(url) {
    let responseJSON = axios.get(url)
     .then(response => response.data)
     .catch(error => {
       console.log('Error', error);
     });
     return responseJSON
   },

  getShots: function (pageNumber, successCallback) {
    return this.request(this.getUrl(pageNumber))
      .then(data => successCallback(data));
  }
}

export default api

