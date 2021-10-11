<template>
    <template v-for="value in this.menuList">
      <el-sub-menu :index="convert(value.link) + 'p'" v-if="value.chidren.length != 0" :key="convert(value.link) + 'p'">
        <template #title>
          <span>{{ value.name }}</span>
        </template>
        <el-menu-item :index="convert(value.link)" :key="convert(value.link)">
          <template #title>
            <span>{{ value.name }}</span>
          </template>
        </el-menu-item>
        <category-tree :menuList="value.chidren"></category-tree>
      </el-sub-menu>
      <el-menu-item :index="convert(value.link)" v-else :key="convert(value.link)">
        <template #title>
          <span>{{ value.name }}</span>
        </template>
      </el-menu-item>
    </template>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import categoryService from '@/service/CategoryService'

export default defineComponent({
  props: {
    menuList: Array
  },
  methods: {
    uuid(): string {
      return Math.random().toString()
    },
    // 将doc链接转为 x-x-x 形式的id
    convert(link: string): string {
      return categoryService.docUrl2Id(link)
    }
  },
  setup() {},
});
</script>
