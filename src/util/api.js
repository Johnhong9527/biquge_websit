import axios from 'axios';


export default {
  getBookList() {
    return axios.get('http://localhost:8080/static/data.json');
  },
};
