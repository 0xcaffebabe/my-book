<template>
  <el-menu unique-opened  @open="handleOpen" @select="handleSelect" :default-active="doc" :router="true">
    <CategoryTree :menuList="cateList"/>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import categoryService from '@/service/CategoryService'
import docService from '@/service/DocService'
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
    handleOpen(index: string) {
      if (index) {
        this.showDoc(index.substring(0, index.length - 1))
      }
    },
    showDoc(index: string) {
      this.$router.push('/doc/' + index)
    },
    findCategoryById(doc: string){
      const arr = doc.split('-')
      const cateList = [...this.cateList]
      while(cateList.length > 0) {
        const cate = cateList.pop()
        if (docService.docUrl2Id(cate!.link) == doc) {
          return cate
        }
        cateList.push(...cate!.chidren)
      }
      return null
    }
  },
  async created(){
    this.cateList = await categoryService.getCategoryList()
    const currentCate = this.findCategoryById(this.doc!)
    if (!currentCate) {
      console.warn(`${this.doc} 无法找寻到相关目录!`)
    }else {
      this.$store.state.currentCategory = currentCate
    }
  },
})
</script>

<style lang="less" scoped>

</style>
