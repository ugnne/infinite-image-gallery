import config from './config'
// import axios from 'axios'

const api = {
  getUrl: function (pageNumber) {
    return [
      config.baseUrl,
      'access_token=', config.accessToken,
      '&sort=', config.sorting,
      '&page=', pageNumber].join('')
  },

  request: function (url) {
    let responseJSON = fetch(url).then(function (response) {
      return response.json()
    })
      .catch(error => {
        console.log('Error', error)
      });

    return responseJSON
  },

  getShots: function (pageNumber) {
    return this.request(this.getUrl(pageNumber))
  }
}

export default api

