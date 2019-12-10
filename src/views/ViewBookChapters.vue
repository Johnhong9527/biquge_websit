<template>
  <el-row>
    <el-col :span="24">
      <el-row>
        <el-col :span="6">
          <div class="avatar">avatar</div>
        </el-col>
        <el-col :span="18">
          <el-row>
            <el-col :span="6">
              <div class="book-name">书名</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="author">作者</div>
            </el-col>
            <el-col :span="12">
              <div class="status">状态</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="last-time">最后更新时间</div>
            </el-col>
            <el-col :span="12">
              <div class="last-chapter">最后更新章节</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="intro">0</div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="24">
      章节列表
    </el-col>
  </el-row>
</template>
<script>
  export default {
    name: 'view-book-chapters',
    created() {
      console.log(this.$route.params.aid);
      console.log(this.$store.state);
    },
  };
</script>

<style lang="stylus">
  .book-name
    font-family "黑体"
    font-size 28px
    font-weight 700
</style>
