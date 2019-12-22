import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(ElementUI);

Vue.config.productionTip = false;
// 全局守卫
// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
	next();
});
new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
