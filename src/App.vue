<template>
  <div id="app">
    <layout></layout>
  </div>
</template>
<script>
import layout from '@/components/layout.vue';

export default {
  components: {
    layout,
  },
};
</script>
<style lang="stylus">
*
  padding: 0
  margin: 0

html
  -ms-overflow-style none
  overflow -moz-scrollbars-none

html::-webkit-scrollbar
  width 0px

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
</style>
