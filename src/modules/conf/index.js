const serverUrl = 'http://localhost:5002/';
// const serverUrl = 'https://supreme-rates-ex.ml/backend/';
// const serverUrl = 'https://supreme-back.herokuapp.com/';

/**
 * Contains methods' paths of user API
 * @type {{signin: string, signup: string, logout: string, user: string, updateUser: string, usersList: string, userCard: string}}
 */
const userAPIMethods = {
  signin: 'users/auth',
  signup: 'users/create',
  logout: 'users/logout',
  user: 'users/info',
  usersList: 'users/list',
  updateUser: 'users/change',
  userCard: 'users/usercard',
  userChava: 'users/chava',
  userGava: 'users/gava',
  skillFilter: 'users/listt'
};

export default {serverUrl, userAPIMethods};
