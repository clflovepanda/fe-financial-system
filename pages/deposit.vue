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
          <el-breadcrumb-item class="breadcrumb">财务</el-breadcrumb-item>
          <el-breadcrumb-item class="breadcrumb" :to="{ path: '/deposit' }"
            >押金管理
            </el-breadcrumb-item>
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
import axios from 'axios';
import CookieUtil from "~/utils/CookieUtil";
import NetReqUser from "../network/NetReqUser";

export default {

  methods: {
    showCreateUserDialog: function() {
      this.$store.commit("dialogSwitchData/showCreateUserDialog", true);
    }
  },
  async asyncData(ctx) {
    console.log("初始化UserPage数据");
    if(!CookieUtil.existCookie("user_id")) {
      location.href = "/";
    }
    let nowUserRole = await NetReqUser.getNowUserRole();
    console.log("当前用户角色列表", nowUserRole);
    ctx.store.commit("userData/setNowUserRole", nowUserRole);
    let result = await axios.get("/api/searchUserList").then((rep)=>{
      if(rep && rep.data) {
        return rep.data.data;
      }
    }, ()=>{});
    ctx.store.commit("userData/setUserListTable", result);
  }
};

</script>