<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="breadcrumb">位置</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb">财务</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb" :to="{ path: '/income' }">支出统计</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <SearchProjectStatistic />
    <el-divider></el-divider>
    <el-row>
      <el-button :class="[checkNowUserRole('statistic_project_export') ? '':'disRoleMenu']">导出Excel</el-button>
    </el-row>
    <ProjectTable />
  </div>
</template>

<script>
import ProjectTable from "~/components/financialModule/projectStatisticPage/ProjectTable";
import SearchProjectStatistic from "~/components/financialModule/projectStatisticPage/SearchProjectStatistic";
import CookieUtil from "~/utils/CookieUtil";
import axios from "axios";
import NetReqUser from "../network/NetReqUser";

export default {
  computed:{
    checkNowUserRole(){
      return function(name) {
        return this.$store.state.userData.nowUserRole.indexOf(name) > -1;
      }
    },
  },
  methods: {
    // showNewIncomeDialog: function () {
    //   this.$store.commit("dialogSwitchData/showNewIncomeDialog", true);
    // },
  },
  async asyncData(ctx) {
    if(!CookieUtil.existCookie("user_id")) {
      location.href = "/";
    }
    let nowUserRole = await NetReqUser.getNowUserRole();
    console.log("当前用户角色列表", nowUserRole);
    ctx.store.commit("userData/setNowUserRole", nowUserRole);
    let result = await axios.get("/api/statistics/project").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data.data;
        }
      },
      () => {}
    );
    console.log("statistics project", result);
    ctx.store.commit("statisticData/setProjectStatistic", result);

    let getparentdatasourceResult = await axios.get("/api/role/getparentdatasource").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data.data;
        }
      },
      () => {}
    );
    console.log("project data source", getparentdatasourceResult);
    ctx.store.commit("projectData/setProjectDataSrouce", getparentdatasourceResult);
  },
};
</script>