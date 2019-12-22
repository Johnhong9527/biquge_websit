import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import qs from 'qs';

const serverPath =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:7001/'
    : 'http://localhost:7001/';

export default {
  getBookList(params) {
    return axios.get(`${serverPath}books`, { params });
  },
  getBook(params) {
    return axios.get(`${serverPath}book`, { params });
  },
  nextBook(params) {
    return axios.get(`${serverPath}next-book`, { params });
  },
  delBook(params) {
    return axios.post(`${serverPath}delete-book`, qs.stringify(params));
  },
  getChapter(params) {
    return axios.post(`${serverPath}get-chapter`, qs.stringify(params));
  },
  nextChapter(params) {
    return axios.post(`${serverPath}next-chapter`, qs.stringify(params));
  },
  setChapter(params) {
    return axios.post(`${serverPath}set-chapter`, qs.stringify(params));
  },
  editChapters(params) {
    return axios.post(`${serverPath}edit-chapters`, qs.stringify(params));
  },
  // 插入新章节
  insertChapters(params) {
    return axios.post(`${serverPath}insert-chapters`, qs.stringify(params));
  },
  // 创建章节列表
  creChapter(params) {
    return axios.post(`${serverPath}cre-chapter`, qs.stringify(params));
  },
  // 删除章节--books
  delChapters(params) {
    return axios.post(`${serverPath}del-chapters`, qs.stringify(params));
  },
  // 删除章节--chapters
  delChapter(params) {
    return axios.post(`${serverPath}del-chapter`, qs.stringify(params));
  },
};
