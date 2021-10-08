<template>
  <el-menu unique-opened :default-active="activeIndex">
    <CategoryTree :menuList="cateList"/>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import categoryService from '@/service/CategoryService'
import Category from '@/dto/Category'
import CategoryTree from './CategoryTree.vue'

interface Data {
  cateList: Category[],
  activeIndex: string
}

export default defineComponent({
  components: {
    CategoryTree
  },
  setup() {
    
  },
  data() {
    return {
      cateList: [],
      activeIndex: ''
    } as Data
  },
  async created(){
    this.cateList = await categoryService.getCategoryList()
  },
})
</script>

<style lang="less" scoped>

</style>
