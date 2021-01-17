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
          v-if="checkNowUserRole('user_add')"
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
import NetReqUser from "../network/NetReqUser";

export default {
  computed: {
    checkNowUserRole(){
      return function(name) {
        return this.$store.state.userData.nowUserRole.indexOf(name) > -1;
      }
    },
    getRoleList() {
      return this.$store.state.roleData.roleListTable.listData;
    }
  },
  methods: {
    showCreateUserDialog: function () {
      this.$store.commit("dialogSwitchData/showCreateUserDialog", true);
    },
  },
  async asyncData(ctx) {
    if(!CookieUtil.existCookie("user_id")) {
      location.href = "/";
    }
    let nowUserRole = await NetReqUser.getNowUserRole();
    console.log("当前用户角色列表", nowUserRole);
    ctx.store.commit("userData/setNowUserRole", nowUserRole);
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

    let roleResult = await axios.get("/api/role/get").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data.data;
        }
      },
      () => {}
    );
    console.log("init role list", roleResult);
    ctx.store.commit("roleData/setRoleList", roleResult);
    
  },
};
</script>