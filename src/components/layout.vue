<template>
  <el-container style="height:100vh">
    <el-container>
      <el-aside width="200px">
        <j-aside></j-aside>
      </el-aside>
      <el-container>
        <j-tabs></j-tabs>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  import aside from '@/components/aside.vue';
  import tabs from '@/components/tabs.vue';

  export default {
    components: {
      jAside: aside,
      jTabs: tabs,
    },
  };
</script>

<style lang="stylus">
  .el-header, .el-footer {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    /*line-height: 60px;*/
  }

  .el-aside {
    background-color: #fff;
    color: #333;
    text-align: center;
    overflow-x: hidden;
    border-right-style: groove;
    /*line-height: 200px;*/
  }

  .el-main {
    background-color: #dddddd;
    color: #333;
    text-align: center;
  }
</style>
