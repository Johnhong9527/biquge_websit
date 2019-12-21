import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/public/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/public/view-book-chapter/:index/:aid',
    name: 'viewBookChapter',
    component: () =>
      import(
        /* webpackChunkName: "viewBookChapter" */ '../views/ViewBookChapters.vue'
      ),
  },
  {
    path: '/public/view-chapter/:index/:aid/:cid',
    name: 'viewChapter',
    component: () =>
      import(/* webpackChunkName: "viewChapter" */ '../views/ViewChapter.vue'),
  },
  {
    path: '/public/edit-chapter/:index/:aid/:cid',
    name: 'EditChapter',
    component: () =>
      import(/* webpackChunkName: "EditChapter" */ '../views/EditChapter.vue'),
  },

  {
    path: '/public/add-chapter',
    name: 'AddChapter',
    component: () =>
      import(/* webpackChunkName: "AddChapter" */ '../views/addChapter.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
