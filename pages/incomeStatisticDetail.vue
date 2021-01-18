
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="breadcrumb">位置</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb">财务</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb">到款管理</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb">查看详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-table :data="getIncomeDataDetail" border style="width: 100%; margin-top: 20px" id="out-table">
          <el-table-column align="center" prop="id" label="ID"></el-table-column>
          <el-table-column align="center" prop="coName" label="账户"></el-table-column>
          <el-table-column align="center" prop="remitter" label="汇款方"></el-table-column>
          <el-table-column align="center" prop="receivementTypeName" label="到款种类"></el-table-column>
          <el-table-column align="center" prop="receivementMoney" label="到款人民币"></el-table-column>
          <el-table-column align="center" prop="foreignMoney" label="到款外币"></el-table-column>
          <el-table-column align="center" prop="receiveDate" label="到款时间"></el-table-column>
          <el-table-column align="center" prop="remark" label="到款备注"></el-table-column>
          <el-table-column align="center" prop="voucherNo" label="凭证号"></el-table-column>
          <el-table-column align="center" prop="projectName" label="认款名称"></el-table-column>
          <el-table-column align="center" prop="projectNo" label="认款编号"></el-table-column>
          <el-table-column align="center" prop="revenueTypeName" label="收入类型"></el-table-column>
          <el-table-column align="center" prop="dataSourceName" label="收入属性"></el-table-column>
          <el-table-column align="center" prop="revenueDept" label="收入部门"></el-table-column>
          <el-table-column align="center" prop="cnyMoney" label="收入"></el-table-column>
          <el-table-column align="center" prop="deposit" label="押金"></el-table-column>
          <el-table-column align="center" prop="username" label="认款人"></el-table-column>
          <el-table-column align="center" prop="nvoice" label="发票"></el-table-column>
          <el-table-column align="center" prop="ctime" label="时间"></el-table-column>
        </el-table>

  </div>
</template>

<script>
import SearchIncomeStatisticComponent from "~/components/financialModule/incomeStatisticsPage/SearchIncomeStatisticComponent";
import IncomeStatisticCardComponent from "~/components/financialModule/incomeStatisticsPage/IncomeStatisticCardComponent";
import CookieUtil from "~/utils/CookieUtil";
import axios from "axios";
import NetReqUser from "../network/NetReqUser";

export default {
  data() {
    return {
      form: {
        companyId: "",
        staType: "",
        year: "",
        quarter: "",
        month: "",
        revenueTypeId: "",
        dataSourceIdOne: "",
        dataSourceId: "",
        projectName: "",
        startDt: "",
        endDt: ""
      },
      rangeDate: "",
    };
  },
  computed:{
    getIncomeDataDetail(){
      return this.$store.state.statisticData.incomeStatisticDetail;
    },
    gettypeList(){
      return this.$store.state.rootData.revenueTypeList;
    },
    getIncomeData(){
      return this.$store.state.statisticData.incomeStatistic;
    },
    getLevelOneDataSourceList() {
      return this.$store.state.projectData.projectDataSource;
    },
    getLevelTwoDataSourceList() {
      let levelOne = this.$store.state.projectData.projectDataSource;
      for (let i = 0 ; levelOne && i < levelOne.length ; i ++) {
        if(levelOne[i].dataSourceId == this.form.dataSourceIdOne) {
          return levelOne[i].son; 
        }
      }
      return [];
    }
  },
  methods: {
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
    let dataSourceResult = await axios.get("/api/role/getparentdatasource").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data.data;
        }
      },
      () => {}
    );
    console.log("project data source", dataSourceResult);
    ctx.store.commit("projectData/setProjectDataSrouce", dataSourceResult);
    
    let revenueTypeResult = await axios.get("/api/revenue/gettype").then(
      (rep) => {
        console.log(rep);
        if (rep && rep.data) {
          return rep.data.data;
        }
      },
      () => {}
    );
    ctx.store.commit("rootData/setRevenueTypeList", revenueTypeResult);
  }
};
</script>