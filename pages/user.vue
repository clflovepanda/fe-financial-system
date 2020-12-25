<template>
  <div>
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
    <CreateUserDialog />
    <EditUserDialog />
  </div>
</template>

<script>
import CreateUserDialog from "~/components/userPage/CreateUserDialog";
import SearchUserListComponent from "~/components/userPage/SearchUserListComponent";
import UserListTableComponent from "~/components/userPage/UserListTableComponent";
import EditUserDialog from "~/components/userPage/EditUserDialog";
import axios from "axios";
import CookieUtil from "~/utils/CookieUtil";

export default {
  methods: {
    showCreateUserDialog: function () {
      this.$store.commit("dialogSwitchData/showCreateUserDialog", true);
    },
  },
  async asyncData(ctx) {
    if(!CookieUtil.existCookie("user_id")) {
      location.href = "/";
    }
    console.log("初始化UserPage数据");
    let result = await axios.get("/api/user/list").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data.data;
        }
      },
      () => {}
    );
    ctx.store.commit("userData/setUserListTable", result);
  },
};
</script>