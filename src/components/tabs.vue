<template>
  <div style="width: 100%">
    <el-tabs v-model="editableTabsValue" @tab-remove="removeTab"
             @tab-click="goPage"
             @edit="edit"
             closable
             lazy
    >
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="item.name+index"
        :data-index="index"
        :data-content="item.content"
        :label="item.title"
        :name="item.name"
      >
      </el-tab-pane>
      <div class="j-router" tabindex="1">
        <router-view></router-view>
      </div>
    </el-tabs>
  </div>
</template>

<script>
  /*
  使用vuex来传递 addTab 和 removeTab
   */
  import { mapState, mapMutations } from 'vuex';

  export default {
    created() {
      // this.editableTabsValue = this.$store.state.editableTabsValue;
    },
    data() {
      return {};
    },
    methods: {
      ...mapMutations({
        tabPage: 'tabPage',
        removeTab: 'removeTab',
        edit: 'edit',
      }),
      // eslint-disable-next-line no-unused-vars
      goPage(tab, event) {
        Object.keys(this.menus)
        .forEach((index) => {
          if (this.menus[index].name === tab.name) {
            const { path, name } = this.menus[index];
            this.tabPage(name);
            if (this.$route.path !== path) {
              this.$router.push(path);
            }
          }
        });
      },
    },
    computed: {
      ...mapState({
        editableTabs: state => state.editableTabs,
        tabIndex: state => state.tabIndex,
        menus: state => state.menus,
      }),
      editableTabsValue: {
        get() {
          return this.$store.state.editableTabsValue;
        },
        set(value) {
          this.$store.commit('tabPage', value);
        },
      },
    },
  };
</script>
<style lang="stylus">
  .j-router
    height calc(100vh - 100px)
    overflow-y scroll
    padding 0 15px
</style>
