<template>
  <el-drawer v-model="showDrawer">
    <template #title>
      <el-input v-model="input1" placeholder="Please input" />
    </template>
    <div class="search-result">
      <div v-for="result in resultList" :key="result.url">
        <h3>{{result.hilighedUrl}}</h3>
        <p>{{result.hilighedBody}}</p>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import searchService from '@/service/SearchService'
import SearchResult from '@/dto/SearchResult'

interface Data {
  showDrawer: boolean
  resultList: SearchResult[]
}

export default defineComponent({
  setup() {
    
  },
  data(){
    return {
      showDrawer: false,
      resultList: []
    } as Data
  },
  methods: {
    async show(){
      this.showDrawer = true
      this.resultList = await searchService.search('hello')
    },
    hide(){this.showDrawer = false},
  },
})
</script>

<style lang="less">
  .el-drawer__body {
    overflow-y: auto;
  }
</style>

<style lang="less" scoped>
  .search-result {
    width: 100%;
  }
</style>
