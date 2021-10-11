<template>
  <el-container>
    <el-header>
      <el-affix :offset="0">
        <Header/>
      </el-affix>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './components/header/Header.vue'

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
    padding: 0;
  }
  .el-header {
    padding: 0;
    background-color: #fff;
  }
</style>
