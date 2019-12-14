<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :destroy-on-close="true"
    :before-close="handleClose">
    <el-form :model="chapterInfo">
      <el-form-item label="书籍ID" :label-width="formLabelWidth">
        <el-input v-model="chapterInfo.aid" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="章节ID" :label-width="formLabelWidth">
        <el-input v-model="chapterInfo.cid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="章节名" :label-width="formLabelWidth">
        <el-input v-model="chapterInfo.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="正文" :label-width="formLabelWidth">
        <el-input v-model="chapterInfo.content" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="章节地址" :label-width="formLabelWidth">
        <el-input v-model="chapterInfo.href" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button @click="save" type="primary">保 存</el-button>
  </span>
  </el-dialog>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    name: 'addChapter',
    data() {
      return {
        formLabelWidth: '80px',
        form: {},
        isAdd: false,
      };
    },
    created() {
      if (this.chapterInfo.cid === '') {
        this.isAdd = true;
      }
    },
    props: {
      chapterInfo: Object,
    },
    methods: {
      ...mapMutations(['setDialogVisible', 'addChapter']),
      // eslint-disable-next-line no-unused-vars
      handleClose(done) {
        return false;
        // this.$confirm('确认关闭？')
        // // eslint-disable-next-line no-unused-vars
        // .then((_) => {
        //   done();
        // })
        // // eslint-disable-next-line no-unused-vars
        // .catch((_) => {
        // });
      },
      close() {
        this.setDialogVisible(false);
      },
      save() {
        // this.setDialogVisible(false);
        this.addChapter(this.chapterInfo);
        console.log(59);
      },
    },
    computed: {
      dialogVisible: {
        get() {
          return this.$store.state.dialogVisible;
        },
        set(value) {
          this.setDialogVisible(value);
        },
      },
    },
  };
</script>

<style lang="stylus">
  .dialog-footer
    text-align center
    display block
    width: 100%
    height auto
</style>
