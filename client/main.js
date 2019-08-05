import Vue from 'vue';
import VueMeteorTracker from 'vue-meteor-tracker';   
import App from './App.vue';
import router from './router'
import store from './store/store.js'
import './main.html';
import Vant from 'vant';
import 'vant/lib/index.css';

// 注册组件
Vue.use(VueMeteorTracker); 


Vue.use(Vant);
Vue.use(store)
Meteor.startup(() => {
  new Vue({
    el: '#app',
    router,
    store,
    ...App,
  });
});