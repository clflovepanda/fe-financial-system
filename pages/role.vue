<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="breadcrumb">位置</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb">角色</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb" :to="{ path: '/role' }"
        >角色管理</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-divider></el-divider>

    <SearchRoleListComponent />

    <el-divider></el-divider>
    <el-row>
      <el-button type="primary" @click="showCreateRole">新建角色</el-button>
    </el-row>
    <RoleListTableComponent />
    <CreateRoleDialog />
  </div>
</template>

<script>
import SearchRoleListComponent from "~/components/rolePage/SearchRoleListComponent";
import RoleListTableComponent from "~/components/rolePage/RoleListTableComponent";
import CreateRoleDialog from "~/components/rolePage/CreateRoleDialog";
import EditRoleDialog from "~/components/rolePage/EditRoleDialog";
import axios from "axios";
import CookieUtil from "~/utils/CookieUtil";
import NetReqUser from "../network/NetReqUser";

export default {
  methods: {
    showCreateRole: function () {
      
      this.$store.commit("dialogSwitchData/showCreateRoleDialog", true);
    }
  },
  async asyncData(ctx) {
    if(!CookieUtil.existCookie("user_id")) {
      location.href = "/";
    }
    let nowUserRole = await NetReqUser.getNowUserRole();
    console.log("当前用户角色列表", nowUserRole);
    ctx.store.commit("userData/setNowUserRole", nowUserRole);
    console.log("初始化UserPage数据");
    let result = await axios.get("/api/role/get").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data.data;
        }
      },
      () => {}
    );
    console.log("init role list", result);
    ctx.store.commit("roleData/setRoleList", result);

    let listlevelResult = await axios.get("/api/permission/listlevel").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data.data;
        }
      },
      () => {}
    );
    console.log("role list level tree", listlevelResult);
    ctx.store.commit("roleData/setListLevelTree", listlevelResult);

    let roleTreeResult = await axios.get("/api/role/getparentdatasource").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data.data;
        }
      },
      () => {}
    );
    console.log("role tree", roleTreeResult);
    ctx.store.commit("roleData/setRoleTree", roleTreeResult);
  },
};
</script>