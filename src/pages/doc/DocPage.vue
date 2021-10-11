<template>
  <el-container>
    <el-aside width="200px">
      <div class="category-wrapper">
        <category-list ref="categoryList" :doc="doc"/>
      </div>
    </el-aside>
    <el-main class="main">
      <div class="markdown-section" v-html="contentHtml"></div>
      <div class="toc-wrapper">
        <contents-list :contentsList="contentsList"/>
      </div>
      <el-footer style="text-align:center">
        <el-divider/>
      </el-footer>
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
import api from '@/api'
import DocFileInfo from "@/dto/DocFileInfo"
import DocService from "@/service/DocService"

interface Data {
  cateList: Category[],
  file: DocFileInfo,
  contentsList: Content[]
  doc: string
}

export default defineComponent({
  components: {
    CategoryList,
    ContentsList
  },
  data() {
    return {
      cateList: [],
      file: new DocFileInfo(),
      contentsList: [],
      doc: ''
    } as Data;
  },
  computed: {
    contentHtml(): string {
      return DocService.renderMd(this.file.content)
    }
  },
  methods: {
    async showDoc(doc: string) {
      this.doc = doc
      this.file = await api.getDocFileInfo(doc)
      this.generateTOC()
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
      this.contentsList = docService.getContent(this.contentHtml)
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
  .main {
    padding-left: 14em;
    padding-bottom: 0;
  }
  .toc-wrapper {
    position: fixed;
    top: 80px;
    right: 40px;
  }
  .markdown-section {
    max-width: 80%;
  }
</style>
