import config from '../conf';

/**
 * Class represents interface for working with HTTP
 */
class HttpService {
  /**
   * GET request
   * @param url
   * @param  {function} callbackfn
   * @return {Promise<Response | never>}
   */
  static get (url, callbackfn) {
    return this.request('GET', url)
      .then(
        response => {
          if (response.status === 200) {
            try {
              callbackfn(null, response.json());
            } catch (err) {
              console.error('get error: ', err);
            }
          } else {
            callbackfn(response, null);
          }
        }
      );
  }

  /**
   * POST request
   * @param url
   * @param body
   * @param  {function} callbackfn
   * @return {Promise<Response | never>}
   */
  static post (url, body, callbackfn) {
    return this.request('POST', url, body)
      .then(
        response => {
          if (response.status < 300) {
            try {
              callbackfn(null, response.json());
            } catch (err) {
              console.error('post error: ', err);
              callbackfn(err);
            }
          } else {
            callbackfn(response.json());
          }
        }
      );
  }

  /**
   * Generic request
   * @param requestMethod
   * @param url
   * @param body
   * @return {Promise<Response>}
   */
  static request (requestMethod, url, body) {
    const headers = new Headers();
    if (requestMethod === 'POST') {
      if (url !== 'media/chava') {
        headers.append('Content-Type', 'application/json; charset=utf-8');
      }
    }

    const req = {
      method: requestMethod,
      headers: headers,
      body: body,
      credentials: 'include'
    };
    // return fetch(url, req);
    return fetch(`${config.serverUrl}${url}`, req);
  }
}

export default HttpService;
