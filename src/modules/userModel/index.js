import http from '../http';
import route from '../conf';

/**
 * Class represents Model of User to store and manage user data
 */
let curUser = null;
export default class User {
  /**
   * Creates user and loads user data
   */
  constructor (data) {
    this.email = data.email;
    this.username = data.username;
    this.phone = data.phone;
    this.id = data.id;
    this.about = data.about;
    this.skills = data.skills;
  }

  /**
   * Authenticates user
   * @return {Promise<any>}
   */
  static auth () {
    // if (curUser) {
    //     resolve(curUser);
    // }
    return new Promise((resolve, reject) => {
      http.get(route.userAPIMethods.user, (err, resp) => {
        if (err) {
          if (err.status === 401) {
            curUser = null;
            return resolve(null);
          }
          return reject(err);
        }
        console.log(resp);
        resp.then(
          promiseValue => {
            curUser = new User(promiseValue);
            resolve(curUser);
          }
        );
      });
    });
  }

  /**
   * If user authorized
   * @return {boolean}
   */
  static isAuthorized () {
    return !!curUser;
  }

  /**
   * Returns current user
   * @return {User}
   */
  static getCurUser () {
    return curUser;
  }

  /**
   * Signs user in
   * @param userData
   * @return {Promise<any>}
   */
  static signIn (userData) {
    return new Promise((resolve, reject) => {
      http.post(route.userAPIMethods.signin, userData, (err, resp) => {
        if (err) {
          err
            .then(
              resErr => {
                reject(resErr.message);
              }
            );
          return;
        }
        resolve(User.auth());
      });
    });
  }

  /**
   * signs user Up
   * @param userData
   * @return {Promise<any>}
   */
  static signUp (userData) {
    return new Promise((resolve, reject) => {
      http.post(route.userAPIMethods.signup, userData, (err, resp) => {
        if (err) {
          err
            .then(
              resErr => {
                reject(resErr.message);
              }
            );
          return;
        }
        resolve(User.auth());
      });
    });
  }

  /**
   * logs user Off
   * @return {Promise<any>}
   */
  static logout () {
    return new Promise((resolve, reject) => {
      http.post(route.userAPIMethods.logout, {}, (err, resp) => {
        if (err) {
          err
            .then(
              resErr => {
                reject(resErr.message);
              }
            );
          return;
        }
        resolve(User.auth());
      });
    });
  }

  /**
   * Loads Rating of all Users
   * @param page
   * @param {function} callbackfn
   * @return {Promise<Response|never>}
   */
  static fetchUsers (page, callbackfn) {
    return http.get(route.userAPIMethods.usersList + '/' + page.toString(), callbackfn);
  }

  static changeProfile (userData) {
    return new Promise((resolve, reject) => {
      http.post(route.userAPIMethods.updateUser, userData, (err, resp) => {
        if (err) {
          err
            .then(
              resErr => {
                reject(resErr.message);
              }
            );
          return;
        }
        resolve(User.auth());
      });
    });
  }

  static changeAva (userData) {
    return new Promise((resolve, reject) => {
      http.post(route.userAPIMethods.userChava, userData, (err, resp) => {
        if (err) {
          err
            .then(
              resErr => {
                reject(resErr.message);
              }
            );
          return;
        }
        resolve(User.auth());
      });
    });
  }

  static getCard (id, callbackfn) {
    return http.get(route.userAPIMethods.userCard + '/' + id.toString(), callbackfn);
  }

  static sendSkillFilter (page, params, callbaclfn) {
    return http.get(route.userAPIMethods.skillFilter + '/' + page.toString() + params, callbaclfn);
  }
}
