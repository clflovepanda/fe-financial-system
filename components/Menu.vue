<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
  >
    <nuxt-link to="/projectList">
      <el-menu-item index="1">
        <i class="el-icon-s-order"></i>
        <span slot="title">项目列表</span>
      </el-menu-item>
    </nuxt-link>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>财务报表</span>
      </template>
      <el-menu-item-group>
        <nuxt-link to="/income">
          <el-menu-item index="3-1">到款管理</el-menu-item>
        </nuxt-link>
        <nuxt-link to="/incomeStatistic">
        <el-menu-item index="3-2">到款统计</el-menu-item>
        </nuxt-link>
        <el-menu-item index="3-3">押金管理</el-menu-item>
        <el-menu-item index="3-4">支出管理</el-menu-item>
        <el-menu-item index="3-5">发票应收</el-menu-item>
        <el-menu-item index="3-6">支出统计</el-menu-item>
        <el-menu-item index="3-7">项目统计</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <nuxt-link to="/user">
      <el-menu-item index="4">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
    </nuxt-link>
    <nuxt-link to="/role">
      <el-menu-item index="5">
        <i class="el-icon-s-opportunity"></i>
        <span slot="title">角色管理</span>
      </el-menu-item>
    </nuxt-link>
  </el-menu>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
</style>