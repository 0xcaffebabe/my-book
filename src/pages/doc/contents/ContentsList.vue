<template>
  <ul class="toc">
    <contents-tree :contentsList="contentsList" />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ContentsTree from "./ContentsTree.vue";

registerWindowScrollListener()

function registerWindowScrollListener(){
  document.addEventListener("scroll", (e) => {
      const idList = document.querySelectorAll(
        ".markdown-section h1, .markdown-section h2, .markdown-section h3, .markdown-section h4 .markdown-section h5, .markdown-section h6"
      );
      let node = null;
      for (let i = 0; i < idList.length; i++) {
        const elm = idList[i];
        if (elm instanceof HTMLElement) {
          if (window.scrollY > elm.offsetTop - 160){
            node = elm;
          }
        }
        // 滚动到顶部特殊处理
        if (window.scrollY == 0) {
          node = idList[0];
        }
      }
      if (node != null) {
        const previousNode = document.querySelector(".toc .active");
        if (previousNode !== null) {
          previousNode.classList.remove("active");
        }
        document.querySelector(`.toc a[href='#${node.id}']`)?.classList.add("active");
      }
    });
}

export default defineComponent({
  props: {
    contentsList: Array,
  },
  components: {
    ContentsTree,
  },
  setup() {
    
  },
});
</script>

<style lang="less" scoped>
.toc{
  max-width: 300px;
	overflow-y:auto;
	border-left: 1px solid #ccc;
  overflow-y:hidden;
  max-height: calc(100% - 100px);
}
.toc:hover {
  overflow-y:auto;
  max-width: 306px;
}
.toc :deep(a){
    color: rgb(116, 129, 141);
    text-decoration: none;
    font-weight: 400;
    font-size: 14px;
    text-decoration: none;
}
:deep(a:hover) {
  color: #3E90E8!important;
}
:deep(.active)  {
  color: #3E90E8!important;
}
ul, :deep(ul) {
  padding: 0 24px;
  list-style:none;
}
:deep(li) {
  padding: 4px 0;
}
:deep(li a:hover:before) {
  position:absolute;
  left:0;
  content:"🔎";
  border-left:3px solid #3E90E8;
}
:deep(li .active:before) {
  position:absolute;
  left:0;
  content:"🔎";
  border-left:3px solid #3E90E8;
}
.toc:first-child:before{
  content:"📋 目录列表";
  color: rgb(116, 129, 141);
}
</style>
