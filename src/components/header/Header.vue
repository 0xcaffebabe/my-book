<template>
  <div class="header">
    <div class="header-wrapper">
      <div class="container">
        <div class="logo">
          <a href="#">
            {{ name }}
          </a>
        </div>
        <div class="content">
          <div>
            <el-button
              icon="el-icon-search"
              class="search"
              @click="$emit('search')"
              size="mini"
              round
            ></el-button>
          </div>
          <el-menu class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">Processing Center</el-menu-item>
            <el-sub-menu index="2">
              <template #title>Workspace</template>
              <el-menu-item index="2-1">item one</el-menu-item>
              <el-menu-item index="2-2">item two</el-menu-item>
              <el-menu-item index="2-3">item three</el-menu-item>
              <el-sub-menu index="2-4">
                <template #title>item four</template>
                <el-menu-item index="2-4-1">item one</el-menu-item>
                <el-menu-item index="2-4-2">item two</el-menu-item>
                <el-menu-item index="2-4-3">item three</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="3" disabled>Info</el-menu-item>
            <el-menu-item index="4">Orders</el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
  data() {
    return {
      name: "my-book" as string,
    };
  },
  created() {},
});
</script>


<style lang="less" scoped>
.header {
  border-bottom: 1px solid #ccc;
  padding: 0;
  background-color: #fff;
}
.header-wrapper {
  padding: 0 32px;
}
.container {
  display: flex;
  justify-content: space-between;
  .logo {
    display: flex;
    align-items: center;
    a {
      text-decoration: none;
      font-size: 1.3rem;
      font-weight: 600;
      color: #2c3e50;
      position: relative;
    }
  }
  .search {
    height: 24px;
    display: flex;
    align-items: center;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .content /deep/ .el-menu {
    border-bottom: none;
  }
}
</style>