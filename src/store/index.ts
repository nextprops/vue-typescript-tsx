import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({

}) as any;

export const resetStore = () => {
  for (const key in store.state) {
    if (store.state.hasOwnProperty(key)) {
      store.dispatch(key + '/INIT');
    }
  }
};

export default store;