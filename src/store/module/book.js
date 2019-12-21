import API from '../../util/api';

export default {
  namespaced: true,
  state: {
    total: 0,
    pageSize: 5,
    currentPage: 1,
    book: {},
  },
  mutations: {
    getBook(state, book) {
      state.book = book;
      if (book.chapters.length < 3) {
        console.log(book.index, book.aid);
      }
    },
    setTotal(state, total) {
      state.total = total;
    },
    setPageSize(state, pageSize) {
      state.pageSize = pageSize;
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage;
    },
  },
  actions: {
    async getBook({ commit }, { index, aid, currentPage, pageSize }) {
      const book = await API.getBook({
        index,
        aid,
        currentPage,
        pageSize,
      });
      commit('getBook', book.data);
      commit('setTotal', book.data.total);
      commit('setPageSize', pageSize);
      commit('setCurrentPage', currentPage);
    },
    setTotal({ commit }, total) {
      commit('setTotal', total);
    },
    setPageSize({ commit }, pageSize) {
      commit('setPageSize', pageSize);
    },
    setCurrentPage({ commit }, currentPage) {
      commit('setCurrentPage', currentPage);
    },
    // eslint-disable-next-line
    async nextBookPage({ commit, state }, { page, index }) {
      if (index > -1) {
        const aid = await API.nextBook({
          index,
        });
        page.$router.push(`/view-book-chapter/${index}/${aid.data}`);
      }
    },
  },
};
