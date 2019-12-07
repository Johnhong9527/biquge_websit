<template>
  <div>
    <el-col>
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        @select="goto"
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item v-for="(item,index) in memus" :index="index+1+''" :key="item.title">
          <i class="el-icon-setting"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    data() {
      return {
        name: 'aside',
        memus: '',
        // defaultActive: '',
      };
    },
    created() {
      this.memus = this.$store.state.menus;
      // this.defaultActive = this.$store.state.editableTabsValue;
    },
    computed: {
      // ...mapState
      defaultActive() {
        return this.$store.state.editableTabsValue;
      },
    },
    methods: {
      ...mapMutations({
        add: 'addTab',
      }),
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      // eslint-disable-next-line no-unused-vars
      goto(key, keyPath) {
        const tab = this.memus[key - 1];
        this.add(tab);
        if (this.$route.path !== tab.path) {
          this.$router.push(tab.path);
        }
      },
    },
  };
</script>

<style lang="stylus">

</style>
