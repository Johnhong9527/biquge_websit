<template>
  <el-row>
    <el-col class="book-info" :span="24">
      <el-row>
        <el-col :span="6" :xs="24">
          <div class="avatar"><img
            src="https://www.biquge.com.cn/files/article/image/32/32883/32883s.jpg" alt=""></div>
        </el-col>
        <el-col :span="18" :xs="24">
          <el-row>
            <el-col :span="6" :xs="24">
              <div class="book-name text-left">{{book.title}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="author text-left">作者：{{book.author}}</div>
            </el-col>
            <el-col :span="12">
              <div class="status text-left">状态：{{book.status ? book.status : '连载中'}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="last-time text-left">最后更新：{{book.last_time ? book.last_time : '空'}}</div>
            </el-col>
            <el-col :span="12">
              <div class="last-chapter text-left">更新章节：{{book.last_chapter ? book.last_chapter :
                '空'}}
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="intro text-left">{{book.intor ? book.intor : '空'}}</div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="24">
      <el-row>
        <el-col class="chapter text-left" :span="8" :xs="24" :sm="12" :md="8"
                v-for="(item,index) in book.list"
                :key="item.title+index"
        >
          <div class="content" @click="viewChapter(item)" :title="item.title">{{item.title}}</div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    name: 'view-book-chapters',
    created() {
      // console.log(this.$route.params.aid);
      console.log(this.$store.state.book);
    },
    computed: {
      ...mapState({
        book: state => state.book,
      }),
    },
    methods: {
      ...mapMutations(['setChapter']),
      viewChapter(item) {
        this.$router.push(`/view-chapter/${item.aid}/${item.cid}`);
      },
    },
  };
</script>

<style lang="stylus">
  .book-info
    margin-bottom 15px

  .avatar
    img
      border: medium none;
      height: 150px;
      width: 120px;
      margin: 3px;

  .book-name
    font-family "黑体"
    font-size 28px
    font-weight 700
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

  .intro
    margin-top 15px
    padding-top 5px
    border-top 1px dashed

  .chapter
    /*font-size 12px*/
  .text-left
    text-align left

    .content
      width 70%
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display inline-block

      &:hover
        text-decoration underline
        cursor pointer
</style>
