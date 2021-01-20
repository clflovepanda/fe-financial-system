
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
    <el-row>
      <el-col :span="3">
        <el-select v-model="form.companyId" placeholder="请选择公司">
          <el-option label="亚讯" value="1"></el-option>
          <el-option label="新锐" value="3"></el-option>
          <el-option label="医点通" value="4"></el-option>
          <el-option label="其它公司" value="6"></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-select v-model="form.staType" placeholder="统计方式">
          <el-option label="按年份统计" value="0"></el-option>
          <el-option label="按季度统计" value="1"></el-option>
          <el-option label="按月份统计" value="2"></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-select v-model="form.year" placeholder="请选择年份">
          <el-option label="2021" value="1"></el-option>
          <el-option label="2020" value="3"></el-option>
          <el-option label="2019" value="4"></el-option>
          <el-option label="2018" value="6"></el-option>
          <el-option label="2017" value="6"></el-option>
          <el-option label="2016" value="6"></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-select v-model="form.quarter" placeholder="请选择季度">
          <el-option label="第一季度" value="1"></el-option>
          <el-option label="第二季度" value="2"></el-option>
          <el-option label="第三季度" value="3"></el-option>
          <el-option label="第四季度" value="4"></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-select v-model="form.month" placeholder="请选择月份">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
          <el-option label="6" value="6"></el-option>
          <el-option label="7" value="7"></el-option>
          <el-option label="8" value="8"></el-option>
          <el-option label="9" value="9"></el-option>
          <el-option label="10" value="10"></el-option>
          <el-option label="11" value="11"></el-option>
          <el-option label="12" value="12"></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-select v-model="form.revenueTypeId" placeholder="请选择收入类型">
          <el-option
            v-for="item in gettypeList"
            :key="item.revenueTypeId"
            :label="item.revenueTypeName"
            :value="item.revenueTypeId"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-col :span="3">
        <el-select v-model="form.dataSourceIdOne" placeholder="请选择一级类目" @change="changeLevelOne">
          <el-option
            v-for="item in getLevelOneDataSourceList"
            :key="item.dataSourceId"
            :label="item.dataSourceName"
            :value="item.dataSourceId"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-select v-model="form.dataSourceId" placeholder="请选择二级类目">
          <el-option
            v-for="item in getLevelTwoDataSourceList"
            :key="item.dataSourceId"
            :label="item.dataSourceName"
            :value="item.dataSourceId"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-input
          v-model="form.tempName"
          placeholder="项目名称/编号"
        ></el-input>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-date-picker
          v-model="rangeDate"
          type="daterange"
          range-separator="~"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          class="inpSty"
          style="width: 100%"
          @change="changeDate"
        ></el-date-picker>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-button type="primary" @click="submitForm()" style="width:100%">查询</el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <IncomeStatisticCardComponent />
    <el-divider></el-divider>
    <el-table :data="getIncomeData" border style="width: 100%; margin-top: 20px" id="out-table">
          <el-table-column align="center" prop="year" label="年份"></el-table-column>
          <el-table-column align="center" prop="quarter" label="季度"></el-table-column>
          <el-table-column align="center" prop="month" label="月份" width="120"></el-table-column>
          <el-table-column align="center" prop="count" label="到款数量"></el-table-column>
          <el-table-column align="center" prop="money" label="到款金额"></el-table-column>
          <el-table-column align="center" prop="revenue" label="认款收入（元）"></el-table-column>
          <el-table-column align="center" prop="deposit" label="认款押金（元）" width="140"></el-table-column>
          <el-table-column align="center" prop="chainMoney" label="环比金额（元）" width="120"></el-table-column>
          <el-table-column align="center" prop="chainGrowth" label="环比增长速度" width="120"></el-table-column>
          <el-table-column align="center" prop="chainDevelopment" label="环比发展速度" width="170"></el-table-column>
          <el-table-column align="center" prop="percentYear" label="百分比（年）" width="140"></el-table-column>
          <el-table-column align="center" prop="percentTotal" label="百分比（总）" width="180"></el-table-column>
          <el-table-column align="center" label="操作" width="180">
              <template slot-scope="scope">
                <el-button @click="viewStatistic(scope)" type="text" size="small">查看</el-button>
                <el-button @click="exportStatistic(scope)" type="text" size="small">导出</el-button>
              </template>
          </el-table-column>
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
    changeLevelOne(){
      this.form.dataSourceId = "";
    },
    changeDate() {
      if(this.rangeDate && this.rangeDate != "") {
        this.form.startDt = this.rangeDate[0].getTime();
        this.form.endDt = this.rangeDate[1].getTime();
      }
    },
    viewStatistic(scope) {
      axios.get("/api/statistics/receivement/detail", {
        params: {
          year: scope.row.year,
          quarter: scope.row.quarter,
          month: scope.row.month,
          revenueTypeId: this.form.revenueTypeId,
          dataSourceId: this.form.dataSourceId,
          projectName: this.form.projectName,
          startDt: this.form.startDt,
          endDt: this.form.endDt
        }
      }).then(
        (rep) => {
          if (rep && rep.data) {
            this.$store.commit("statisticData/setIncomeStatisticDetail", rep.data.data);
            this.$router.push("/incomeStatisticDetail");
          }
        },
        () => {}
      );
    },
    exportStatistic(scope) {
      axios.get("/api/export/receivement/detail", {
        params: {
          year: scope.row.year,
          quarter: scope.row.quarter,
          month: scope.row.month
        }
      }).then(
        (rep) => {
          if (rep && rep.data) {
            window.location = rep.data.url;
          }
        },
        () => {}
      );
    },
    submitForm(){
      console.log(this.form);
      axios.get("/api/statistics/receivement", {
        params: this.form
      }).then(
        (rep) => {
          if (rep && rep.data) {
            this.$store.commit("statisticData/setIncomeStatistic", rep.data.data);
          }
        },
        () => {}
      );
    }
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