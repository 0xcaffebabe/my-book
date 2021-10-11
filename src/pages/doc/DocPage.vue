<template>
  <el-container>
    <el-aside width="200px">
      <div class="category-wrapper">
        <category-list/>
      </div>
    </el-aside>
    <el-main class="main">
      <div class="markdown-section" v-html="content"></div>
      <div class="toc-wrapper">
        <contents-list :contentsList="contentsList"/>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, CreateComponentPublicInstance } from "vue"
import Category from "@/dto/Category"
import Content from '@/dto/Content'
import categoryService from "@/service/CategoryService"
import docService from '@/service/DocService'
import CategoryList from "./category/CategoryList.vue"
import ContentsList from "./contents/ContentsList.vue"

interface Data {
  cateList: Category[],
  content: string,
  contentsList: Content[]
}

export default defineComponent({
  components: {
    CategoryList,
    ContentsList
  },
  data() {
    return {
      cateList: [],
      content: "",
      contentsList: []
    } as Data;
  },
  methods: {
    async showDoc(doc: string) {
      this.content = await docService.getDocHtml(
        doc
      );
      this.generateTOC()
      console.log(docService.getContent(this.content))
      this.$nextTick(() => {
        const codeElmList = this.$el.querySelectorAll("code");
        for (let i = 0; i < codeElmList.length; i++) {
          codeElmList[i].innerHTML = docService.hightlightCode(
            codeElmList[i].innerHTML
          );
        }
      });
    },
    generateTOC(){
      this.contentsList = docService.getContent(this.content)
    }
  },
  beforeRouteUpdate(to, from){
    this.showDoc(to.params.doc.toString())
  },
  async created() {
    this.showDoc(this.$route.params.doc.toString())
    this.cateList = await categoryService.getCategoryList();
  },
});
</script>

<style lang="less" scoped>
  .category-wrapper {
    position:fixed;
    overflow-y: scroll;
    height: calc(100% - 60px);
  }
  .markdown-section {
    padding-left: 40px;
  }
  .toc-wrapper {
    position: fixed;
    top: 80px;
    right: 40px;
  }
</style>
