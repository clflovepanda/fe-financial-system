<template>
  <el-container class="container">
    <el-header class="headerContent">
      <HeaderBar />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Menu />
      </el-aside>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item class="breadcrumb">位置</el-breadcrumb-item>
          <el-breadcrumb-item class="breadcrumb">角色</el-breadcrumb-item>
          <el-breadcrumb-item class="breadcrumb" :to="{ path: '/role' }" >角色管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>

        <SearchRoleListComponent />

        <el-divider></el-divider>

        <RoleListTableComponent />

      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import SearchRoleListComponent from '~/components/rolePage/SearchRoleListComponent';
import RoleListTableComponent from '~/components/rolePage/RoleListTableComponent';

export default {
  methods: {
    showCreateUserDialog: function() {
      this.$store.commit("dialogSwitchData/showCreateUserDialog", true);
    }
  }
};

</script>