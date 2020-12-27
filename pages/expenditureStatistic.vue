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
    let result = await axios.get("/api/statistics/expenditure").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data.data;
        }
      },
      () => {}
    );
    console.log("statistics expenditure", result);
    ctx.store.commit("expenditureData/setExpenditureList", result);

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