import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line no-unused-vars
import crypto from '../util/crypto';
import API from '../util/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // tabs
    editableTabsValue: '1',
    editableTabs: [{
      title: '书籍列表',
      name: '1',
      content: '/',
    }],
    tabIndex: 1,
    // aside
    menus: [
      {
        title: '书籍列表',
        name: '1',
        path: '/',
      },
      {
        title: '增加书籍',
        name: '2',
        path: '/about',
      },
    ],
  },
  mutations: {
    // api
    // eslint-disable-next-line no-unused-vars
    getBookList(state) {
      API.getBookList()
      .then((res) => {
        console.log(res);
      });
    },
    // aside tab pages
    // eslint-disable-next-line no-unused-vars
    addTab(state, tabs) {
      state.editableTabsValue = tabs.name;
      console.log();
      if (JSON.stringify(state.editableTabs)
      .indexOf(tabs.title) === -1) {
        state.editableTabs.push(tabs);
        // eslint-disable-next-line no-plusplus
        ++state.tabIndex;
      }
    },
    // eslint-disable-next-line no-unused-vars
    tabPage(state, name) {
      console.log(name);
      state.editableTabsValue = name;
      // router.push(tab.$attrs['data-content']);
    },
    // eslint-disable-next-line no-unused-vars
    goPage(state, tab, event) {
      // console.log(tab);
      state.editableTabsValue = `${tab}`;
    },
    removeTab(state, targetName) {
      const tabs = state.editableTabs;
      let activeName = state.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      state.editableTabsValue = activeName;
      // eslint-disable-next-line array-callback-return
      state.editableTabs = tabs.filter((tab) => {
        if (tab.name !== '1') {
          return tab.name !== targetName;
        }
        return true;
      });
    },
    // eslint-disable-next-line no-unused-vars
    edit(state, targetName, action) {
      console.log(targetName);
      console.log(action);
    },
    // 初始化 aside he tabs
    // name 为路由名称
    // initAsideAndTabs(state, path) {
    //   console.log(10, state);
    //   state.
    //   console.log(path);
    // },
  },
  actions: {},
  modules: {},
});
