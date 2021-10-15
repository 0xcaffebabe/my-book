<template>
  <div class="block">
    <p style="text-align:left">更新历史</p>
    <el-timeline>
      <el-timeline-item
        v-for="(commit, index) in file.commitList"
        :key="index"
        :timestamp="commit.date"
      >
        <p class="history-message">{{ commit.message }}</p>
      </el-timeline-item>
      <el-timeline-item v-if="file.hasMoreCommit">
        <p class="history-message"><a href="#">全部历史({{file.totalCommits}}条)</a></p>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts">
import DocFileInfo from '@/dto/DocFileInfo'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    file: DocFileInfo
  },
  setup() {
    
  },
  data() {
    return {
      
    }
  }
})
</script>

<style lang="less" scoped>
.history-message {
  text-align:left;
  padding:0;
  margin: 0;
}
</style>