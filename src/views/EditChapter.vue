<template>
  <el-row class="chapter-box">
    <el-col :span="24">
      <el-input type="text" v-if="title" v-model="title">
        <template slot="prepend">章节名</template>
      </el-input>
      <br />
      <br />
    </el-col>
    <el-col :span="24" v-if="chapter && chapter.content" :key="tinymceKey">
      <!-- <tinymce v-model="chapter.content" :key="tinymceKey" :height="500" /> -->
      <tinymce :value="content" @input="setContent" :height="500" />
      <br />
      <el-button @click="back">后退</el-button>
      <el-button @click="save">保存</el-button>
    </el-col>
  </el-row>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import Tinymce from '../components/Tinymce/index.vue';

export default {
  name: 'view-chapter',
  async created() {
    await this.getChapter(this.$route.params);
    this.tinymceKey = Date.parse(new Date());
    console.log(this.tinymceKey);
  },
  data() {
    return {
      tinymceKey: '',
    };
  },
  components: { Tinymce },
  methods: {
    ...mapActions('mChapter', [
      'getChapter',
      'setChapter',
      'setContent',
      'setTitle',
    ]),

    save() {
      this.setChapter({
        ...this.$route.params,
        ...this.chapter,
        content: this.content,
        title: this.title,
      });
      // this.$router.go(-1);
    },
    back() {
      this.$router.go(-1);
    },
  },
  computed: {
    ...mapState('mChapter', {
      chapter: state => state.chapter,
      content: state => state.content,
    }),
    // content: {
    //   get() {
    //     return this.$store.state.mChapter.content;
    //   },
    //   set(value) {
    //     this.setContent(value);
    //   },
    // },
    title: {
      get() {
        return this.$store.state.mChapter.title;
      },
      set(value) {
        this.setTitle(value);
      },
    },
  },
};
</script>

<style lang="stylus" scoped>
.title
  font-size: 19pt
  padding-top: 10px;
  text-align: center
.chapter-box
  padding 20px 10px 0
.content
  /*white-space pre*/
  text-align left
  font-size: 10pt
  letter-spacing: 0.2em
  line-height: 150%
  padding-top: 15px
  width: 85%
</style>
