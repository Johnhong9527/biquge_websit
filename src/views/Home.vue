<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="index"
      label="索引"
    >
    </el-table-column>
    <el-table-column
      prop="aid"
      label="书籍ID">
    </el-table-column>
    <el-table-column
      prop="title"
      label="书名">
    </el-table-column>
    <el-table-column
      prop="author"
      label="作者">
    </el-table-column>
    <el-table-column
      prop="length"
      label="章节数">
    </el-table-column>
    <el-table-column
      fixed="right"
      width="150"
      label="操作">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
        <el-button @click="delClick(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    name: 'home',
    methods: {
      ...mapMutations(['addTab', 'delBook']),
      handleClick(row) {
        // console.log(row);
        // this.getBook(row);
        // /view-book-chapter
        this.$router.push(`/view-book-chapter/${row.index}/${row.aid}`);
      },
      editClick(row) {
        this.getBook(row);
      },
      delClick(row) {
        this.delBook(row);
      },
    },
    created() {
      this.$store.commit('getBookList');
    },
    data() {
      return {
        /*
        * aid
        * index
        * author
        * length --> 章节总数
        * title --> 加密
        * last_time --> 最后更新时间
        * first_time -->  第一次入库时间
        * */
      };
    },
    computed: {
      ...mapState({
        tableData: state => state.bookList,
      }),
    },
  };
</script>
<style lang="stylus">
  .el-table .cell
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
</style>
