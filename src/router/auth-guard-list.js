import store from '../store';
export default (to, from, next) => {
  store.dispatch('fetchUsers');
  store.dispatch('getAllSkills');
  store.dispatch('getAllGenres');
  next();
}
