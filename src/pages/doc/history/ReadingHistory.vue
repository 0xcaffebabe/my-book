<template>
  <el-drawer v-model="showDrawer" size="20%" title="阅读历史">
    <div class="history-list">
      <el-timeline>
        <el-timeline-item
          v-for="item in 20"
          :key="item"
          timestamp="2021-10-15 22:00:02"
        >
          <a href="#">软件工程-软件设计-设计原则</a>
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
  data() {
    return {
      showDrawer: false as boolean,
    };
  },
  methods: {
    show() {
      this.showDrawer = true;
    },
    hide() {
      this.showDrawer = false;
    },
  },
});
</script>

<style lang="less" scoped>
.history-list {
  a {
    text-decoration: none;
    color: #74818d;
    font-weight: 400;
    font-size: 14px;
  }
  a:hover {
    color: #3E90E8 !important;
  }
  :deep(.el-timeline-item:hover .el-timeline-item__node) {
    background-color: #3E90E8 !important;
    border-color: #3E90E8 !important;
  }
}
</style>
