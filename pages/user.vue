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
          <el-breadcrumb-item class="breadcrumb">用户</el-breadcrumb-item>
          <el-breadcrumb-item class="breadcrumb" :to="{ path: '/user' }"
            >用户管理</el-breadcrumb-item
          >
        </el-breadcrumb>
        <el-divider></el-divider>
        <SearchUserListComponent />
        <el-divider></el-divider>
        <el-row>
          <el-col :span="2" :offset="22">
            <el-button
              type="primary"
              style="width: 90%"
              @click="showCreateUserDialog"
              >新建用户</el-button
            >
          </el-col>
        </el-row>
        <UserListTableComponent />
      </el-main>
    </el-container>
    <CreateUserDialog />
    <EditUserDialog />
  </el-container>
</template>

<script>

import CreateUserDialog from '~/components/userPage/CreateUserDialog';
import SearchUserListComponent from '~/components/userPage/SearchUserListComponent';
import UserListTableComponent from '~/components/userPage/UserListTableComponent';
import EditUserDialog from '~/components/userPage/EditUserDialog';

export default {

  methods: {
    showCreateUserDialog: function() {
      this.$store.commit("dialogSwitchData/showCreateUserDialog", true);
    }
  },
  async asyncData() {
    console.log("初始化UserPage数据");
  }
};

</script>