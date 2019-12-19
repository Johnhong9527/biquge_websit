import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line no-unused-vars
import crypto from '../util/crypto';
// eslint-disable-next-line no-unused-vars
import API from '../util/api';
import homeModule from './module/home';
import bookModule from './module/book';
import TabsModule from './module/tabs';
import chapterModule from './module/chapter';
import state from './state';
import { mutations } from './mutations';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  // 开启严格模式
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
  modules: {
    home: homeModule,
    mBook: bookModule,
    tabs: TabsModule,
    mChapter: chapterModule,
  },
});
