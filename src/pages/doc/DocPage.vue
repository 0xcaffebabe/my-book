<template>
  <el-container>
    <el-aside width="200px"><category-list /></el-aside>
    <el-main>Main</el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, CreateComponentPublicInstance } from "vue";
import Category from "@/dto/Category";
import categoryService from "@/service/CategoryService";
import CategoryList from "./category/CategoryList.vue";

interface Data {
  cateList: Category[];
}

export default defineComponent({
  components: {
    CategoryList,
  },
  setup() {
    const cateList: Category[] = [];
  },
  data() {
    return {
      cateList: [],
    } as Data;
  },
  async created() {
    console.log(this.$route.params.doc);
    this.cateList = await categoryService.getCategoryList();
  },
});
</script>

<style lang="less" scoped>
</style>
