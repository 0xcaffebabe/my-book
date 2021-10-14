<template>
  <el-container>
    <el-aside width="200px">
      <div class="category-wrapper">
        <category-list ref="categoryList" :doc="doc"/>
      </div>
    </el-aside>
    <el-main class="main">
      <el-skeleton :rows="25" animated :loading="loading" :throttle="1000" style="max-width: 80%;">
        <template #default>
          <div class="markdown-section" v-html="contentHtml"></div>
        </template>
      </el-skeleton>
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

export default defineComponent({
  components: {
    CategoryList,
    ContentsList
  },
  data() {
    return {
      cateList: [] as Category[],
      file: new DocFileInfo() as DocFileInfo,
      contentsList: [] as Content[],
      doc: '' as string,
      loading: true as boolean
    };
  },
  computed: {
    contentHtml(): string {
      return DocService.renderMd(this.file.content)
    }
  },
  methods: {
    async showDoc(doc: string) {
      this.loading = true
      this.doc = doc
      this.file = await api.getDocFileInfo(doc)
      this.generateTOC()
      this.$nextTick(() => {
        this.registerLinkRouter()
      });
      this.loading = false
    },
    generateTOC(){
      this.contentsList = docService.getContent(this.contentHtml)
    },
    // 管理内页链接跳转行为
    registerLinkRouter(){
      const aList: NodeListOf<HTMLElement> = document.querySelectorAll('.markdown-section a');
      for(let i = 0;i<aList.length;i++) {
        const a = aList[i]
        a.onclick = (e: Event) => {
          const href = a.getAttribute("href")
          if (href?.startsWith("doc") || href?.startsWith("/doc")) {
            this.$router.push(href)
            e.preventDefault();
          }
        }
      }
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
    width: 280px;
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
    :deep(h1) {
      font-size: 32px;
    }
    :deep(h2) {
      font-size: 28px;
    }
    :deep(h3) {
      font-size: 24px;
    }
    :deep(h4) {
      font-size: 20px;
    }
    :deep(h5) {
      font-size: 16px;
    }
    :deep(h6) {
      font-size: 12px;
    }
    :deep(pre) {
      background-color: #282C34;
      border-radius: 5px;
      padding: 1.25rem 1.5rem;
      font-size: 16px;
    }
  }
</style>
