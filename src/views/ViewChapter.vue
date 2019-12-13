<template>
  <el-row>
    <el-col :span="24">
      <!--      <h1 class="title">{{chapter.title}}</h1>-->
      <el-input type="text" v-model="chapter.title"></el-input>
    </el-col>
    <el-col :span="24">
      <!--      <div class="content" v-html="chapter.content"></div>-->
      <el-input :autosize="{ minRows: 2, maxRows: 20}" type="textarea" v-model="chapter.content"
      ></el-input>
      <el-button @click="test">test</el-button>
    </el-col>
  </el-row>
</template>
<script>
  import { mapMutations, mapState } from 'vuex';

  export default {
    name: 'view-chapter',
    created() {
      this.getChapter(this.$route.params);
    },
    methods: {
      ...mapMutations(['getChapter', 'setChapter']),
      test() {
        this.setChapter({
          content: this.chapter.content,
          title: this.chapter.title,
          ...this.$route.params,
        });
        this.$router.go(-1);
      },
    },
    computed: {
      ...mapState({
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
    white-space pre
    text-align left
    font-size: 19pt
    letter-spacing: 0.2em
    line-height: 150%
    padding-top: 15px
    width: 85%

</style>
