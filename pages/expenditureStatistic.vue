<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="breadcrumb">位置</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb">财务</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb" :to="{ path: '/income' }">支出统计</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <SearchExpenditureStatistic />
    <el-divider></el-divider>
    <ExpenditureTable />
  </div>
</template>

<script>
import ExpenditureTable from "~/components/financialModule/expenditureStatisticPage/ExpenditureTable";
import SearchExpenditureStatistic from "~/components/financialModule/expenditureStatisticPage/SearchExpenditureStatistic";
import CookieUtil from "~/utils/CookieUtil";
import axios from "axios";
import NetReqUser from "../network/NetReqUser";

export default {
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
    let result = await axios.get("/api/statistics/expenditure?limit=5&offset=1").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data;
        }
      },
      () => {}
    );
    let temp = {
      list: result.data,
      total: result.count
    }
    console.log("statistics expenditure", temp);
    ctx.store.commit("expenditureData/setExpenditureList", temp);

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