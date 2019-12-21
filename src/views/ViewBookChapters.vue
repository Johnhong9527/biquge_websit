<template>
  <el-row tabindex="1" style="padding: 10px">
    <el-col class="book-info" :span="24">
      <el-row type="flex" justify="end">
        <el-col :span="8" :xs="24">
          <el-button @click="back()" size="small">后退</el-button>
          <el-button @click="prevBook(-1)" size="small">上一本</el-button>
          <el-button @click="nextBook(1)" size="small">下一本</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :xs="24">
          <div class="avatar">
            <img :src="book.avatar ? 0 : 0" :alt="book.title" />
          </div>
        </el-col>
        <el-col :span="18" :xs="24">
          <el-row>
            <el-col :span="6" :xs="24">
              <div class="book-name text-left">{{ book.title }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="author text-left">作者：{{ book.author }}</div>
            </el-col>
            <el-col :span="12">
              <div class="status text-left">
                状态：{{ book.status > 0 ? '完结' : '连载中' }}
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="last-time text-left">
                最后更新：{{ book.last_time ? book.last_time : '空' }}
              </div>
            </el-col>
            <el-col :span="12">
              <div class="last-chapter text-left">
                更新章节：{{ book.last_chapter ? book.last_chapter : '空' }}
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="intro text-left">
                {{ book.intor ? book.intor : '空' }}
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="24">
      <div class="chapter-table">
        <el-table :data="book.chapters" border stripe style="width: 100%">
          <el-table-column prop="cid" width="100" label="章节ID">
          </el-table-column>
          <el-table-column prop="title" label="章节名"> </el-table-column>
          <el-table-column fixed="right" width="200" label="操作">
            <template slot-scope="scope" v-if="scope.row.cid">
              <el-button @click="viewClick(scope.row)" type="text" size="small"
                >查看</el-button
              >
              <el-button @click="editClick(scope.row)" type="text" size="small"
                >编辑</el-button
              >
              <el-button
                @click="addUp(scope.row, scope.$index)"
                type="text"
                size="small"
                >上加
              </el-button>
              <el-button
                @click="addDow(scope.row, scope.$index)"
                type="text"
                size="small"
                >下加
              </el-button>
              <el-button
                @click="delRow(scope.row, scope.$index)"
                type="text"
                size="small"
                >删除
              </el-button>
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
    </el-col>
  </el-row>
</template>
<script>
import { mapState, mapActions } from 'vuex';

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
    await this.getBook({
      ...this.$route.params,
      pageSize: this.pageSize,
      currentPage: this.currentPage,
    });
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        this.getBook({
          ...this.$route.params,
          pageSize: this.pageSize,
          currentPage: this.currentPage,
        });
      }
    },
  },
  computed: {
    ...mapState({
      dialogVisible: state => state.dialogVisible,
    }),
    ...mapState('mBook', {
      book: state => state.book,
      total: state => state.total,
      pageSize: state => state.pageSize,
      currentPage: state => state.currentPage,
    }),
  },
  methods: {
    // ...mapActions(['setChapter', 'getBook', 'setDialogVisible', 'delChapter']),
    ...mapActions('mBook', [
      'getBook',
      'setPageSize',
      'setCurrentPage',
      'nextBookPage',
    ]),
    ...mapActions('mChapter', ['setNewChapter']),
    viewChapter(item) {
      this.$router.push(
        `/view-chapter/${this.book.index}/${item.aid}/${item.cid}`,
      );
    },
    viewClick(item) {
      this.$router.push(
        `/view-chapter/${this.book.index}/${item.aid}/${item.cid}`,
      );
    },
    editClick(item) {
      console.log(item);
      this.$router.push(
        `/edit-chapter/${this.book.index}/${item.aid}/${item.cid}`,
      );
    },
    addUp(item, index) {
      this.setNewChapter({
        aid: item.aid,
        cid: item.cid,
        title: null,
        index,
        book_index: this.book.index,
      });
      this.$router.push('/add-chapter');
    },
    addDow(item, index) {
      this.setNewChapter({
        aid: item.aid,
        cid: item.cid,
        title: null,
        index: index + 1,
        book_index: this.book.index,
      });
      this.$router.push('/add-chapter');
    },
    delRow(item) {
      this.delChapter({
        ...item,
        index: this.book.index,
      });
    },
    // 上一本
    prevBook(index) {
      console.log(this.book.index + index);
      this.nextBookPage({
        page: this,
        index: this.book.index + index,
      });
    },
    // 下一本
    nextBook(index) {
      this.nextBookPage({
        page: this,
        index: this.book.index + index,
      });
    },
    // 每页条数
    async sizeChange(pageSize) {
      await this.getBook({
        ...this.$route.params,
        pageSize,
        currentPage: this.currentPage,
      });
    },
    // 当前页
    async currentChange(currentPage) {
      await this.getBook({
        ...this.$route.params,
        currentPage,
        pageSize: this.pageSize,
      });
    },
    back() {
      this.$router.go(-1);
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
.chapter-table
  height: calc(100vh - 270px)
  overflow-y: scroll;

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
