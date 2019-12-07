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
      label="操作">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'home',
    methods: {
      handleClick(row) {
        console.log(row);
        // /view-book-chapter
        this.$router.push('/view-book-chapter');
      },
      editClick(row) {
        console.log(row);
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
        // tableData: [{
        //   date: '2016-05-02',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市普陀区金沙江路 1518 弄',
        //   zip: 200333,
        // }, {
        //   date: '2016-05-04',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市普陀区金沙江路 1517 弄',
        //   zip: 200333,
        // }, {
        //   date: '2016-05-01',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市普陀区金沙江路 1519 弄',
        //   zip: 200333,
        // }, {
        //   date: '2016-05-03',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市普陀区金沙江路 1516 弄',
        //   zip: 200333,
        // }],
      };
    },
    computed: {
      ...mapState({
        tableData: state => state.bookInfo,
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
