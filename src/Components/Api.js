import config from './config'

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

  getShots: function (pageNumber, successCallback) {
    return this.request(this.getUrl(pageNumber))
      .then(data => successCallback(data));
  }
}

export default api
