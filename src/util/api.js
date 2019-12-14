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
  delBook(params) {
    return axios.post('http://localhost:7001/delete-book', qs.stringify(params));
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
  // 插入新章节
  insertChapters(params) {
    return axios.post('http://localhost:7001/insert-chapters', qs.stringify(params));
  },
  // 创建章节列表
  creChapter(params) {
    return axios.post('http://localhost:7001/cre-chapter', qs.stringify(params));
  },
  // 删除章节--books
  delChapters(params) {
    return axios.post('http://localhost:7001/del-chapters', qs.stringify(params));
  },
  // 删除章节--chapters
  delChapter(params) {
    return axios.post('http://localhost:7001/del-chapter', qs.stringify(params));
  },
};
