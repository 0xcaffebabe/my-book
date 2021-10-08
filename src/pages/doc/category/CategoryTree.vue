<template>
    <template v-for="value in this.menuList">
      <el-sub-menu :index="value.link" v-if="value.chidren" :key="value.link">
        <template #title>
          <span>{{ value.name }}</span>
        </template>
        <category-tree :menuList="value.chidren"></category-tree>
      </el-sub-menu>
      <el-menu-item :index="value.link" v-else :key="value.link">
        <template #title>
          <span>{{ value.name }}</span>
        </template>
      </el-menu-item>
    </template>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    menuList: Array
  },
  methods: {
    uuid(): string {
      return Math.random().toString()
    }
  },
  setup() {},
});
</script>

style
