<template>
  <el-container>
    <el-header>
      <Header/>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './header/Header.vue'

export default defineComponent({
  components: {
    Header
  },
  setup() {

  },
  data() {
    return {}
  }
})
</script>

<style lang="less" scoped>
  .el-container {
    height: 100%;
  }
  .el-main {
    height: 100%;
  }
  .el-header {
    padding: 0;
  }
</style>
