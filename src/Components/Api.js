import config from './config'

const api = {
  getUrl: (pageNumber) => {
     return [
      config.baseUrl,
      'access_token=', config.accessToken,
      '&sort=', config.sorting,
      '&page=', pageNumber].join('')
  },

  request: function (url) {
    return fetch(url).then((response) => response.json())
      .catch(error => console.log('Error', error));
  },

  getShots: function (pageNumber)  {
    return this.request(this.getUrl(pageNumber))
  }
}

export default api

