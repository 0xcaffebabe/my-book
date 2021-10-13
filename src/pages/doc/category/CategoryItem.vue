<template>
  <el-popover
        placement="right-start"
        :title="value.name"
        :width="200"
        trigger="hover"
        :hide-after="100"
        content="this is content, this is content, this is content"
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

<script lang="ts">
import Category from '@/dto/Category'
import { defineComponent } from 'vue'
import categoryService from '@/service/CategoryService'

export default defineComponent({
  props: {
    value: Category
  },
  setup() {
    
  },
  methods: {
    // 将doc链接转为 x-x-x 形式的id
    convert(link: string): string {
      return categoryService.docUrl2Id(link);
    },
  }
})
</script>

<style lang="less" scoped>

</style>