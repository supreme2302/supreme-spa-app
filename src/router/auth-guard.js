import store from '../store';
import bus from '../modules/bus';
export default (to, from, next) => {
  if (store.getters.user) {
    store.dispatch('getAllSkills');
    store.dispatch('getAllGenres');
    next();
  } else {
    bus.on('onAuth', data => {
      const user = data.payload;
      if (user) {
        store.dispatch('getAllSkills');
        store.dispatch('getAllGenres');
        next();
      } else {
        next('/auth?authError=true');
      }
    });
  }
};
