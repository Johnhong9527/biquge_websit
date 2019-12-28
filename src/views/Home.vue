<template>
  <div>
    <div class="books-table">
      <el-table :data="bookList" border style="width: 100%">
        <el-table-column fixed prop="index" label="索引"> </el-table-column>
        <el-table-column prop="aid" label="书籍ID"> </el-table-column>
        <el-table-column prop="title" label="书名"> </el-table-column>
        <el-table-column prop="author" label="作者"> </el-table-column>
        <el-table-column prop="length" label="章节数"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button @click="editClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button @click="delClick(scope.row)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pageSize"
      :pager-count="5"
      :current-page="currentPage"
      layout="sizes, prev, pager, next, jumper"
      @size-change="sizeChange"
      @current-change="currentChange"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'home',
  methods: {
    ...mapActions(['getBookList']),
    ...mapActions('home', ['setTotal', 'setPageSize', 'setCurrentPage']),
    handleClick(row) {
      this.$store.commit('mBook/setCurrentPage', 1);
      this.$router.push(`/book/${row.index}/${row.aid}`);
    },
    // eslint-disable-next-line
    editClick(row) {
      // console.log('editClick', row);
      // this.getBook(row);
    },
    // eslint-disable-next-line
    delClick(row) {
      // console.log('delClick', row);
      // this.delBook(row);
    },
    // 每页条数
    async sizeChange(pageSize) {
      this.setPageSize(pageSize);
      await this.getBookList({
        currentPage: this.currentPage,
        pageSize,
      });
    },
    // 当前页
    async currentChange(currentPage) {
      this.setCurrentPage(currentPage);
      await this.getBookList({
        currentPage,
        pageSize: this.pageSize,
      });
    },
  },
  created() {},
  async mounted() {
    // console.log(this.pageSize);
    await this.getBookList({
      pageSize: this.pageSize,
      currentPage: this.currentPage,
    });
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('home', {
      total: state => state.total,
      pageSize: state => state.pageSize,
      currentPage: state => state.currentPage,
      bookList: state => state.bookList,
    }),
  },
};
</script>
<style lang="stylus">
.el-table .cell
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
.books-table
  height: calc(100vh - 250px);
  overflow-y: scroll;
</style>
