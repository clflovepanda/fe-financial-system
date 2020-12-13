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

    <RoleListTableComponent />
  </div>
</template>

<script>
import SearchRoleListComponent from "~/components/rolePage/SearchRoleListComponent";
import RoleListTableComponent from "~/components/rolePage/RoleListTableComponent";
import axios from "axios";

export default {
  methods: {
    showCreateUserDialog: function () {
      this.$store.commit("dialogSwitchData/showCreateUserDialog", true);
    },
  },
  async asyncData(ctx) {
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
  },
};
</script>