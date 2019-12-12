<template>
  <el-row>
    <el-col :span="24">
      <h1 class="title">{{chapter.title}}</h1>
    </el-col>
    <el-col :span="24">
      <div class="content" v-html="chapter.content"></div>
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
      ...mapMutations(['getChapter']),
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
