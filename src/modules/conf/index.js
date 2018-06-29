const serverUrl = 'http://localhost:5000/';

/**
 * Contains methods' paths of user API
 * @type {{login: string, signup: string, logout: string, user: string, updateUser: string, leaderBoard: string}}
 */
const userAPIMethods = {
  signin: 'users/auth',
  signup: 'users/create',
  logout: 'users/logout',
  user: 'users/info',
  usersList: 'users/list',
  updateUser: 'users/change',
  userCard: 'users/usercard'
};

export default {serverUrl, userAPIMethods};
