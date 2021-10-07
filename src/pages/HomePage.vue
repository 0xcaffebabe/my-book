<template>
  <div class="container">
    <div class="banner">
      <div>This is {{ name }} homepage</div>
      <p>For instead gitbook</p>
      <el-button type="primary" round size="medium">开始</el-button>
      <el-button type="success" round size="medium">了解更多</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import api from '../api'

export default defineComponent({
  setup() {

  },
  data() {
    return {
      name: "my-book"
    }
  }
})
</script>

<style lang="less" scoped>
.container {
  display: flex;
  align-items: center;
  text-align: center;
  height: 668px;
  margin: 0 auto;
  .banner {
    width: 100%;
  }
}
</style>