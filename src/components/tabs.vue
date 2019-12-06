<template>
  <div>
    <div style="margin-bottom: 20px;">
      <el-button
        size="small"
        @click="addTab(editableTabsValue)"
      >
        add tab
      </el-button>
    </div>
    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab"
             @tab-click="goPage">
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="item.name"
        :data-index="index"
        :label="item.title"
        :name="item.name"
      >
        {{item.content}}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
  /*
  使用vuex来传递 addTab 和 removeTab
   */
  export default {
    data() {
      return {
        editableTabsValue: '2',
        editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content',
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content',
        }],
        tabIndex: 2,
      };
    },
    methods: {
      addTab(targetName) {
        console.log(targetName);
        const newTabName = `${this.tabIndex + 1}`;
        this.editableTabs.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content',
        });
        this.editableTabsValue = newTabName;
      },
      removeTab(targetName) {
        const tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              const nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      },
      handleTabsEdit(targetName, action) {
        console.log(targetName, action);
      },
      goPage(item) {
        console.log(item);
      },
    },
  };
</script>
