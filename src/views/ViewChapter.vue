<template>
  <el-row>
    <el-col :span="24">
      <h1 class="title">{{ chapter.title }}</h1>
    </el-col>
    <el-col :span="24">
      <div class="content" :key="tinymceKey" v-html="chapter.content"></div>
      <br />
      <el-button @click="back">后退</el-button>
      <el-button @click="edit">编辑</el-button>
    </el-col>
  </el-row>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'view-chapter',
  data() {
    return {
      tinymceKey: '',
    };
  },
  created() {
    this.getChapter(this.$route.params);
  },
  mounted() {
    this.tinymceKey = Date.parse(new Date());
  },
  methods: {
    ...mapActions('mChapter', ['getChapter']),
    edit() {
      this.$router.push(
        `/edit-chapter/${this.$route.params.index}/${this.$route.params.aid}/${this.$route.params.cid}`,
      );
    },
    back() {
      this.$router.go(-1);
    },
  },
  computed: {
    ...mapState('mChapter', {
      chapter: state => state.chapter,
    }),
  },
};
</script>

<style lang="stylus">
.title
  font-size: 19pt
  padding-top: 10px;
  text-align: center

.content
  text-align: left
  font-size: 10pt
  letter-spacing: 0.2em
  padding-top: 15px
  margin-left: 5%
  width: 90%
  overflow-y: scroll
  height: calc(100vh - 200px)
  padding: 15px
  border 1px solid #ddd

  & > p
    margin-bottom: 10px
    padding: 0 20px
</style>
