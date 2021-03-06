const serverUrl = 'http://localhost:5002/';
// const serverUrl = 'https://lingvomake.ml/supreme/';
// const address = 'lingvomake.ml';
const address = 'localhost:5002';

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
  skills: 'users/skills',
  genres: 'users/genres',
  commentsOfUser: 'users/get-comments',
  sendComment: 'users/add-comment',
  mediaChava: 'media/chava',
  mediaGava: 'media',
  allMessages: 'users/messages'
};

export default {serverUrl, userAPIMethods, address};
