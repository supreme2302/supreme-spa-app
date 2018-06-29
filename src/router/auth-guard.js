import store from '../store';
import bus from '../modules/bus';
export default (to, from, next) => {
  if (store.getters.user) {
    next();
  } else {
    bus.on('onAuth', data => {
      const user = data.payload;
      if (user) {
        next();
      } else {
        next('/auth?authError=true');
      }
    });
  }
};
