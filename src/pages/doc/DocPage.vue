<template>
  <el-container>
    <el-aside width="200px"><category-list /></el-aside>
    <el-main>
      <div class="markdown-section" v-html="content"></div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, CreateComponentPublicInstance } from "vue"
import Category from "@/dto/Category"
import categoryService from "@/service/CategoryService"
import docService from '@/service/DocService'
import CategoryList from "./category/CategoryList.vue"

interface Data {
  cateList: Category[],
  content: string
}

export default defineComponent({
  components: {
    CategoryList,
  },
  setup() {
    const cateList: Category[] = []
  },
  data() {
    return {
      cateList: [],
      content: ''
    } as Data;
  },
  async created() {
    this.content = await docService.getDocHtml(this.$route.params.doc.toString())
    this.cateList = await categoryService.getCategoryList();
  },
});
</script>

<style lang="less" scoped>
</style>
