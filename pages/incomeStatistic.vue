
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="breadcrumb">位置</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb">财务</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb" :to="{ path: '/income' }"
        >到款管理</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-divider></el-divider>
    <SearchIncomeStatisticComponent />
    <el-divider></el-divider>
    <IncomeStatisticCardComponent />
  </div>
</template>

<script>
import SearchIncomeStatisticComponent from "~/components/financialModule/incomeStatisticsPage/SearchIncomeStatisticComponent";
import IncomeStatisticCardComponent from "~/components/financialModule/incomeStatisticsPage/IncomeStatisticCardComponent";
import CookieUtil from "~/utils/CookieUtil";
import axios from "axios";
import NetReqUser from "../network/NetReqUser";

export default {
  methods: {
    showNewIncomeDialog: function () {
      this.$store.commit("dialogSwitchData/showNewIncomeDialog", true);
    },
  },

  async asyncData(ctx) {
    if(!CookieUtil.existCookie("user_id")) {
      location.href = "/";
    }
    let nowUserRole = await NetReqUser.getNowUserRole();
    console.log("当前用户角色列表", nowUserRole);
    ctx.store.commit("userData/setNowUserRole", nowUserRole);
    let result = await axios.get("/api/statistics/receivement").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data.data;
        }
      },
      () => {}
    );
    console.log("statistics receivement", result);
    ctx.store.commit("statisticData/setIncomeStatistic", result);
  }
};
</script>