import store from '../store';
import bus from '../modules/bus';
export default (to, from, next) => {
  const id = to.params.id.replace('"', '').toString();
  console.log('g chat ', id);
  if (store.getters.user) {
    // store.dispatch('openCard', {id, next});
    next();
  } else {
    bus.on('onAuth', data => {
      const user = data.payload;
      if (user) {
        // store.dispatch('openCard', {id, next});
        next();
      } else {
        next('/auth?authError=true');
      }
    });
  }
};
