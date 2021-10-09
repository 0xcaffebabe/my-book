<template>
  <el-menu unique-opened @select="handleSelect" @open="handleOpen">
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
  components: {
    CategoryTree
  },
  setup() {
    
  },
  data() {
    return {
      cateList: []
    } as Data
  },
  methods: {
    handleSelect(index: string){
      this.showDoc(index)
    },
    handleOpen(index: string) {
      this.showDoc(index)
    },
    showDoc(index: string) {
      let uri = decodeURI(index)
      let doc = uri.split('/').splice(1).join('-').replace('.md', '')
      this.$router.push('/doc/' + doc)
    }
  },
  async created(){
    this.cateList = await categoryService.getCategoryList()
  },
})
</script>

<style lang="less" scoped>

</style>
