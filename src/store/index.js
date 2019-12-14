import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line no-unused-vars
import crypto from '../util/crypto';
// eslint-disable-next-line no-unused-vars
import API from '../util/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // components
    dialogVisible: false,
    // book
    book: {},
    bookList: [],
    chapter: {},
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
    // addChapter
    // eslint-disable-next-line no-unused-vars,no-empty-function
    async addChapter(state, params) {
      if (params.cid && params.title) {
        // eslint-disable-next-line radix,no-param-reassign
        params.cid = Number.parseInt(params.cid);
        await API.creChapter(params);
        await API.insertChapters(params);
      } else {
        alert('创建失败');
      }
      state.dialogVisible = false;
    },
    async delChapter(state, params) {
      const data = {
        aid: params.aid,
        cid: params.cid,
        index: params.index,
      };
      await API.delChapter(data);
      await API.delChapters(data);
    },
    // eslint-disable-next-line no-unused-vars
    async delBook(state, params) {
      console.log('关闭删除功能', params);
      // await API.delBook(params);
    },
    // eslint-disable-next-line no-unused-vars
    async getBookList(state) {
      try {
        const books = await API.getBookList();
        // eslint-disable-next-line array-callback-return
        books.data.map((el) => {
          // eslint-disable-next-line no-param-reassign
          el.title = crypto.aesEncrypt(el.title);
          // console.log(typeof el.title);
        });
        state.bookList = books.data;
      } catch (e) {
        console.log(e);
      }
    },
    // eslint-disable-next-line no-unused-vars
    async getBook(state, params) {
      try {
        const getBook = await API.getBook(params);
        state.book = getBook.data;
      } catch (e) {
        console.log(e);
      }
    },
    async getChapter(state, params) {
      try {
        const getChapter = await API.getChapter(params);
        state.chapter = getChapter.data;
      } catch (e) {
        console.log(e);
      }
    },
    // eslint-disable-next-line no-unused-vars
    async setChapter(state, params) {
      try {
        let { content } = params;
        // 处理数据
        if (content.indexOf('&nbsp;&nbsp;&nbsp;&nbsp;') > -1) {
          // eslint-disable-next-line no-const-assign
          content = content.replace('<p>', '')
          .replace('</p>', '');
          const arr = content.split('&nbsp;&nbsp;&nbsp;&nbsp;');
          // eslint-disable-next-line camelcase,no-unused-vars
          let new_content = '';
          arr.forEach((el) => {
            if (el !== '') {
              // eslint-disable-next-line camelcase
              new_content += `<p>${el}</p>`;
            }
          });
          // eslint-disable-next-line camelcase,no-param-reassign
          params.content = new_content;
        }
        console.log('params.content', params.content);
        await API.setChapter(params);
        await API.editChapters({
          aid: params.aid,
          cid: params.cid,
          index: params.index,
          title: params.title,
        });
        const getBook = await API.getBook({
          index: params.index,
          aid: params.aid,
        });
        state.book = getBook.data;
        // state.chapter.title = params.title;
        // state.chapter.content = params.content;
      } catch (e) {
        console.log(e);
      }
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
    // set dialogVisible
    setDialogVisible(state, value) {
      state.dialogVisible = value;
    },
  },
  actions: {},
  modules: {},
});
