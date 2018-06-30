import store from '../store';
export default (to, from, next) => {
  const id = Number(to.params.id);
  store.dispatch('openCard', {id, next});
};
