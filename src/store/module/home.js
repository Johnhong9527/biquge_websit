export default {
  namespaced: true,
  state: {
    total: 0,
    pageSize: 5,
    currentPage: 1,
    tableData: [],
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
    setTableData(state, tableData) {
      state.tableData = tableData;
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
    setTableData({ commit }, tableData) {
      commit('setTableData', tableData);
    },
  },
  getters: {},
};
