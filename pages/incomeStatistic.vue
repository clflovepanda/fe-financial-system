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
          <el-breadcrumb-item class="breadcrumb" :to="{ path: '/income' }"
            >到款管理</el-breadcrumb-item
          >
        </el-breadcrumb>
        <el-divider></el-divider>
        <SearchIncomeStatisticComponent />
        <el-divider></el-divider>
        <IncomeStatisticCardComponent />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import SearchIncomeStatisticComponent from "~/components/financialModule/incomeStatisticsPage/SearchIncomeStatisticComponent";
import IncomeStatisticCardComponent from "~/components/financialModule/incomeStatisticsPage/IncomeStatisticCardComponent";

export default {
  methods: {
    showNewIncomeDialog: function () {
      this.$store.commit("dialogSwitchData/showNewIncomeDialog", true);
    },
  },
};
</script>