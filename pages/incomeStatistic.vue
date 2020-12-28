
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
  }
};
</script>