import Vue from 'vue';
import VueMeteorTracker from 'vue-meteor-tracker';
import App from './App.vue';
import router from './router'
import store from './store/store.js'
import './main.html';
import Vant from 'vant';
import { Lazyload,Panel } from 'vant';
import 'vant/lib/index.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'
import './sourse/moment'
moment.locale('zh-cn');
Vue.prototype.$moment=moment

// 注册组件
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.use(VueMeteorTracker);
Vue.use(Lazyload);
Vue.use(Panel);
Router.route('/', {
  onBeforeAction: function () {
    this.next()
  },
}, function () {
});//解决空路由问题

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