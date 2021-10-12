<template>
  <template v-for="value in this.menuList">
    <el-sub-menu
      :index="convert(value.link) + 'p'"
      v-if="value.chidren.length != 0"
      :key="convert(value.link) + 'p'"
    >
      <template #title>
        <div>
          <span>{{ value.name }}</span>
          <el-badge
            :max="500"
            :value="childrenSize(value)"
            class="item"
            type="primary"
            style="margin-left: 8px"
          />
        </div>
      </template>
      <el-popover
        placement="right-start"
        :title="value.name"
        :width="200"
        trigger="hover"
        :hide-after="100"
        content="this is content, this is content, this is content"
      >
        <template #reference>
          <el-menu-item :index="convert(value.link)" :key="convert(value.link)">
            <template #title>
              <span>{{ value.name }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-popover>

      <category-tree :menuList="value.chidren"></category-tree>
    </el-sub-menu>
    <el-popover
      placement="right-start"
      :title="value.name"
      :width="200"
      trigger="hover"
      :hide-after="100"
      content="this is content, this is content, this is content"
      v-else
      :key="convert(value.link)"
    >
      <template #reference>
        <el-menu-item :index="convert(value.link)">
          <template #title>
            <span>{{ value.name }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-popover>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import categoryService from "@/service/CategoryService";
import Category from "@/dto/Category";

export default defineComponent({
  props: {
    menuList: Array,
  },
  methods: {
    uuid(): string {
      return Math.random().toString();
    },
    // 将doc链接转为 x-x-x 形式的id
    convert(link: string): string {
      return categoryService.docUrl2Id(link);
    },
    childrenSize(value: Category): number {
      if (value.chidren.length == 0) {
        return 0;
      }
      let size: number = value.chidren.length;
      for (let i of value.chidren) {
        size += this.childrenSize(i);
      }
      return size;
    },
  },
  setup() {},
});
</script>

<style lang="less" scoped>
.el-menu-item.is-active {
  transition: all 0.2s;
  border-left: 4px solid #409eef;
  padding-left: 36px !important;
}
</style>