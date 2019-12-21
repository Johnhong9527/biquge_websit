export default {
  namespaced: true,
  state: {
    total: 0,
    pageSize: 5,
    currentPage: 1,
    bookList: [],
  },
  mutations: {
    setTotal(state, total) {
      state.total = total;
    },
    setPageSize(state, pageSize) {
      state.pageSize = pageSize;
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage;
    },
    setBookList(state, books) {
      state.bookList = books;
    },
  },
  actions: {
    setTotal({ commit }, total) {
      commit('setTotal', total);
    },
    setPageSize({ commit }, pageSize) {
      commit('setPageSize', pageSize);
    },
    setCurrentPage({ commit }, currentPage) {
      commit('setCurrentPage', currentPage);
    },
    setBookList({ commit }, books) {
      commit('setBookList', books);
    },
  },
  getters: {},
};
