import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import qs from 'qs';

export default {
  getBookList() {
    return axios.get('http://localhost:7001/books');
  },
  getBook(params) {
    return axios.get('http://localhost:7001/book', { params });
  },
  getChapter(params) {
    return axios.get('http://localhost:7001/get-chapter', { params });
  },
  setChapter(params) {
    return axios.post('http://localhost:7001/set-chapter', qs.stringify(params));
  },
  editChapters(params) {
    return axios.post('http://localhost:7001/edit-chapters', qs.stringify(params));
  },
};
