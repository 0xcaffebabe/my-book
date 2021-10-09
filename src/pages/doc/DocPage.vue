<template>
  <el-container>
    <el-aside width="200px">
      <category-list />
    </el-aside>
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
  data() {
    return {
      cateList: [],
      content: "",
    } as Data;
  },
  methods: {
    async showDoc(doc: string) {
      this.content = await docService.getDocHtml(
        doc
      );
      this.$nextTick(() => {
        const codeElmList = this.$el.querySelectorAll("code");
        for (let i = 0; i < codeElmList.length; i++) {
          codeElmList[i].innerHTML = docService.hightlightCode(
            codeElmList[i].innerHTML
          );
        }
      });
    },
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
</style>
