<template>
  <el-row>
    <el-col class="book-info" :span="24">
      <el-row>
        <el-col :span="6" :xs="24">
          <div class="avatar"><img
            src="l" :alt="book.title"></div>
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
      <!--<el-row>
      <el-col class="chapter text-left" :span="8" :xs="24" :sm="12" :md="8"
              v-for="(item,index) in book.chapters"
              :key="item.title+index">
        <div class="content" @click="viewChapter(item)"
             :title="item.title">{{item.title}}
        </div>
      </el-col>
    </el-row>-->
      <el-table
        :data="book.chapters"
        border
        stripe
        style="width: 100%">
        <el-table-column
          prop="cid"
          width="60"
          label="章节ID">
        </el-table-column>
        <el-table-column
          prop="title"
          label="章节名">
        </el-table-column>
        <el-table-column
          prop="href"
          label="地址">
        </el-table-column>
        <el-table-column
          fixed="right"
          width="200"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="viewClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="addUp(scope.row,scope.$index)" type="text" size="small">上加
            </el-button>
            <el-button @click="addDow(scope.row,scope.$index)" type="text" size="small">下加
            </el-button>
            <el-button @click="delRow(scope.row,scope.$index)" type="text" size="small">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <addChapter :chapterInfo="chapterInfo"/>
  </el-row>
</template>
<script>
  import { mapState, mapMutations } from 'vuex';
  import addChapter from '../components/addChapter.vue';

  export default {
    name: 'view-book-chapters',
    data() {
      return {
        chapters: [],
        chapters_key: '',
        chapterInfo: {},
      };
    },
    async created() {
      await this.getBook(this.$route.params);
    },
    // beforeRouteEnter(to, from, next) {
    //   if (from.name === 'viewChapter') {
    //     // eslint-disable-next-line no-restricted-globals
    //     // location.reload();
    //   }
    //   next();
    // },
    components: {
      addChapter,
    },
    computed: {
      ...mapState({
        book: state => state.book,
        dialogVisible: state => state.dialogVisible,
      }),
    },
    methods: {
      ...mapMutations(['setChapter', 'getBook', 'setDialogVisible', 'delChapter']),
      viewChapter(item) {
        this.$router.push(`/view-chapter/${this.book.index}/${item.aid}/${item.cid}`);
      },
      getChapter() {

      },
      viewClick(item) {
        this.$router.push(`/view-chapter/${this.book.index}/${item.aid}/${item.cid}`);
      },
      editClick(item) {
        console.log(item);
        this.$router.push(`/edit-chapter/${this.book.index}/${item.aid}/${item.cid}`);
      },
      addUp(item, index) {
        this.chapterInfo = {
          aid: item.aid,
          cid: null,
          title: null,
          index,
          book_index: this.book.index,
        };
        this.setDialogVisible(true);
      },
      addDow(item, index) {
        // eslint-disable-next-line no-param-reassign
        index += 1;
        this.chapterInfo = {
          aid: item.aid,
          cid: null,
          title: null,
          index,
          book_index: this.book.index,
        };
        this.setDialogVisible(true);
      },
      delRow(item) {
        this.delChapter({
          ...item,
          index: this.book.index,
        });
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
