import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    // redirect: '/public',
    name: 'home',
    component: Home,
  },
  {
    path: '/book/:index/:aid',
    name: 'Book',
    component: () =>
      import(/* webpackChunkName: "Book" */ '../views/book/view.vue'),
  },
  {
    path: '/create-book',
    name: 'CreateBook',
    component: () =>
      import(/* webpackChunkName: "CreateBook" */ '../views/book/create.vue'),
  },
  {
    path: '/chapter/:index/:aid/:cid',
    name: 'Chapter',
    component: () =>
      import(/* webpackChunkName: "Chapter" */ '../views/chapter/view.vue'),
  },
  {
    path: '/edit-chapter/:index/:aid/:cid',
    name: 'EditChapter',
    component: () =>
      import(/* webpackChunkName: "EditChapter" */ '../views/chapter/edit.vue'),
  },

  {
    path: '/create-chapter',
    name: 'AddChapter',
    component: () =>
      import(
        /* webpackChunkName: "AddChapter" */ '../views/chapter/create.vue'
      ),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/public' : '/',
  routes,
});

export default router;
