
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="breadcrumb">位置</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb">财务</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb" :to="{ path: '/description' }"
        >支出管理</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-table :data="getAllPay" border style="width: 100%; margin-top: 20px" id="out-table">
          <el-table-column align="center" prop="expenditureId" label="序号"></el-table-column>
          <el-table-column align="center" prop="numbering" label="支出编号"></el-table-column>
          <el-table-column align="center" prop="coName" label="公司" width="120"></el-table-column>
          <el-table-column align="center" prop="expenditureMethodId" label="支付方式">
            <template slot-scope="scope">
              {{getPayType(scope.row.expenditureMethodId)}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="支出类型">
            <template slot-scope="scope">
              {{getOutputType(scope.row.expenditureTypeId)}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="expenditurePurposeContent" label="用途"></el-table-column>
          <el-table-column align="center" prop="beneficiaryUnit" label="收款人单位" width="140"></el-table-column>
          <el-table-column align="center" prop="expenditureMoney" label="金额/元" width="120"></el-table-column>
          <el-table-column align="center" prop="username" label="申请人" width="120"></el-table-column>
          <el-table-column align="center" prop="ctime" label="创建时间" width="170"></el-table-column>
          <el-table-column align="center" prop="state" label="最新状态" width="140">

          </el-table-column>
          <el-table-column align="center" prop="utime" label="最新状态时间" width="180"></el-table-column>
          <el-table-column align="center" prop="expenditureAuditLogs" label="工作流" width="140">
            <template slot-scope="scope">
              {{getAuditType(scope.row.expenditureTypeId)}}
            </template>
          </el-table-column>
        </el-table>

  </div>
</template>

<script>
import axios from 'axios';
import Deposit from "~/components/projectListPage/Deposit.vue";
import CookieUtil from "~/utils/CookieUtil";
import {EnumAccount, EnumOutputType, EnumPayType, EnumAuditType} from "../utils/EnumUtil"

export default {
  computed: {
    getAllPay() {
      return this.$store.state.expenditureData.allExpenditureList;
    },
    getOutputType() {
      return function(value) {
        return EnumOutputType.getMsg(value);
      }
    },
    getPayType() {
      return function(value) {
        return EnumPayType.getMsg(value);
      }
    },
    getAuditType() {
      return function(value) {
        return EnumAuditType.getMsg(value);
      }
    },
  },
  methods: {
    
  },
  async asyncData(ctx) {
    if(!CookieUtil.existCookie("user_id")) {
      location.href = "/";
    }
    let expenditureResult = await axios.get("/api/expenditure/list").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data.data;
        }
      },
      () => {}
    );
    console.log("expenditure", expenditureResult);
    ctx.store.commit("expenditureData/setAllExpenditureList", expenditureResult);
  }
};

</script>