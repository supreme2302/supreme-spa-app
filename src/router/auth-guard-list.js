import store from '../store';
import route from '../modules/conf';
export default (to, from, next) => {
  store.dispatch('fetchUsers');
  store.dispatch('getAllSkills');
  store.dispatch('getAllGenres');
  next();
};
