import store from '../store';
export default (to, from, next) => {
  store.dispatch('getAllSkills');
  store.dispatch('getAllGenres');
  next();
};
