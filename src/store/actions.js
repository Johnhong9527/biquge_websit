import API from '../util/api';

export default {
  async getBookList({ commit }, { currentPage, pageSize }) {
    try {
      const books = await API.getBookList({
        currentPage,
        pageSize,
      });
      const { total, data } = books.data;
      // commit('getBookList', books.data.data);
      commit('home/setTotal', total);
      commit('home/setTableData', data);
    } catch (e) {
      console.log(e);
    }
  },
};
