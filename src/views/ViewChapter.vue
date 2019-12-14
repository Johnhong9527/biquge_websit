<template>
  <el-row>
    <el-col :span="24">
      <!--      <h1 class="title">{{chapter.title}}</h1>-->
      <el-input type="text" v-model="chapter.title"/>
    </el-col>
    <el-col :span="24">
      <!--      <div class="content" v-html="chapter.content"></div>-->
      <!--<el-input :autosize="{ minRows: 2, maxRows: 20}"
                type="textarea"
                class="content"
                v-model="chapter.content"></el-input>-->
      <tinymce v-model="chapter.content" :height="500"/>
      <br>
      <el-button @click="save">保存</el-button>
    </el-col>
  </el-row>
</template>
<script>
  import { mapMutations, mapState } from 'vuex';
  import Tinymce from '../components/Tinymce/index.vue';

  export default {
    name: 'view-chapter',
    created() {
      this.getChapter(this.$route.params);
    },
    // eslint-disable-next-line vue/no-unused-components
    components: { Tinymce },
    methods: {
      ...mapMutations(['getChapter', 'setChapter']),
      save() {
        // console.log(this.chapter.content);
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
    font-size: 10pt
    letter-spacing: 0.2em
    line-height: 150%
    padding-top: 15px
    width: 85%

</style>
