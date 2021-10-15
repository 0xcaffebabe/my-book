<template>
  <el-container>
    <el-aside width="200px">
      <div class="category-wrapper">
        <keep-alive>
          <category-list ref="categoryList" :doc="doc" />
        </keep-alive>
      </div>
    </el-aside>
    <el-main class="main">
      <el-skeleton
        :rows="25"
        animated
        :loading="loading"
        :throttle="1000"
        style="max-width: 80%"
      >
        <template #default>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              :to="{ path: '/doc/' + docUrl2Id(chain.link) }"
              v-for="chain in categoryChainList"
              :key="chain.name"
              >{{ chain.name }}</el-breadcrumb-item
            >
          </el-breadcrumb>
          <div class="markdown-section" v-html="contentHtml"></div>
          <div style="text-align: center">
            <el-divider />
            <div class="footer-wrapper">
              <history-list />
            </div>
          </div>
        </template>
      </el-skeleton>
      <div class="toc-wrapper">
        <keep-alive>
          <contents-list :contentsList="contentsList" />
        </keep-alive>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, CreateComponentPublicInstance } from "vue";
import Category from "@/dto/Category";
import Content from "@/dto/Content";
import categoryService from "@/service/CategoryService";
import docService from "@/service/DocService";
import CategoryList from "./category/CategoryList.vue";
import ContentsList from "./contents/ContentsList.vue";
import HistoryList from "./history/HistoryList.vue";
import api from "@/api";
import DocFileInfo from "@/dto/DocFileInfo";
import DocService from "@/service/DocService";

export default defineComponent({
  components: {
    CategoryList,
    ContentsList,
    HistoryList,
  },
  data() {
    return {
      cateList: [] as Category[],
      file: new DocFileInfo() as DocFileInfo,
      contentsList: [] as Content[],
      doc: "" as string,
      loading: true as boolean,
    };
  },
  computed: {
    contentHtml(): string {
      return DocService.renderMd(this.file.content);
    },
    currentCategory(): Category {
      return this.$store.state.currentCategory;
    },
    categoryChainList(): Category[] {
      if (!this.currentCategory) {
        return [];
      }
      return this.getCategoryChain(this.currentCategory);
    },
  },
  methods: {
    docUrl2Id(url: string) {
      return docService.docUrl2Id(url);
    },
    getCategoryChain(value: Category) {
      const chainList: Category[] = [value];
      while (value.parent) {
        chainList.push(value.parent);
        value = value.parent;
      }
      return chainList.reverse();
    },
    async showDoc(doc: string) {
      docService.setDocReadRecrod(doc, window.scrollY);
      this.loading = true;
      this.doc = doc;
      this.file = await api.getDocFileInfo(doc);
      this.generateTOC();
      this.$nextTick(() => {
        this.registerLinkRouter();
      });
      this.loading = false;
    },
    generateTOC() {
      this.contentsList = docService.getContent(this.contentHtml);
    },
    // 管理内页链接跳转行为
    registerLinkRouter() {
      const aList: NodeListOf<HTMLElement> = document.querySelectorAll(
        ".markdown-section a"
      );
      for (let i = 0; i < aList.length; i++) {
        const a = aList[i];
        a.onclick = (e: Event) => {
          const href = a.getAttribute("href");
          if (href?.startsWith("doc") || href?.startsWith("/doc")) {
            this.$router.push(href);
            e.preventDefault();
          }
        };
      }
    },
    // 滚动监听
    registerScrollListener() {
      let timer: NodeJS.Timeout;
      document.addEventListener("scroll", (e) => {
        timer = setTimeout(() => {
          clearTimeout(timer);
          docService.setDocReadRecrod(this.doc, window.scrollY);
        }, 1000);
      });
    },
  },
  beforeRouteUpdate(to, from) {
    const doc = to.params.doc.toString();
    this.showDoc(doc);
    const categoryListRef: any = this.$refs.categoryList;
    categoryListRef.updateCurrentCategory(doc);
  },
  async created() {
    this.registerScrollListener();
    this.showDoc(this.$route.params.doc.toString());
    this.cateList = await categoryService.getCategoryList();
  },
});
</script>

<style lang="less" scoped>
.category-wrapper {
  position: fixed;
  overflow-y: scroll;
  height: calc(100% - 60px);
  width: 280px;
}
.main {
  padding-left: 14em;
  padding-bottom: 20px;
  // overflow-y: hidden;
}
.toc-wrapper {
  position: fixed;
  top: 80px;
  right: 16px;
  height: calc(100% - 60px);
}
.markdown-section {
  max-width: 72%;
  :deep(.img-wrapper img) {
    max-width: 60%;
  }
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
    background-color: #282c34;
    border-radius: 5px;
    padding: 1.25rem 1.5rem;
    font-size: 16px;
  }
}
.footer-wrapper {
  display: flex;
  justify-content: space-between;
}
</style>
