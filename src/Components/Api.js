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
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };

      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    });
  },

  getShots: function (pageNumber, successCallback) {
    return this.request(this.getUrl(pageNumber)).then(response => JSON.parse(response))
      .then(data => successCallback(data));
  }
}

export default api
