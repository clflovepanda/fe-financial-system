<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
     <nuxt-link to="/projectList">
      <el-menu-item index="1">
        <i class="el-icon-location"></i>
        <span slot="title">项目列表</span>
      </el-menu-item>
    </nuxt-link>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <i class="el-icon-document"></i>
      <span slot="title">财务系统</span>
    </el-menu-item>
    <nuxt-link to="/user">
      <el-menu-item index="4">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
    </nuxt-link>
    <nuxt-link to="/role">
      <el-menu-item index="4">
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
    }
  }
};
</script>

<style>
</style>