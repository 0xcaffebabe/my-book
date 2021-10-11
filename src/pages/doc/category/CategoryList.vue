<template>
  <el-menu unique-opened  @open="handleOpen" :default-active="doc" :router="true">
    <CategoryTree :menuList="cateList"/>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import categoryService from '@/service/CategoryService'
import Category from '@/dto/Category'
import CategoryTree from './CategoryTree.vue'

interface Data {
  cateList: Category[]
}

export default defineComponent({
  props: {
    doc: String
  },
  components: {
    CategoryTree
  },
  setup() {
    
  },
  data() {
    return {
      cateList: [],
      activeMenu: ''
    } as Data
  },
  methods: {
    handleSelect(index: string){
      this.showDoc(index)
    },
    handleOpen(index: string) {
      if (index) {
        this.showDoc(index.substring(0, index.length - 1))
      }
    },
    showDoc(index: string) {
      this.$router.push('/doc/' + index)
    }
  },
  async created(){
    console.log(this.doc)
    this.cateList = await categoryService.getCategoryList()
  },
})
</script>

<style lang="less" scoped>

</style>
