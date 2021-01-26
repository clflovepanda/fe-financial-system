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
    <SearchIncomeComponent />
    <el-divider></el-divider>
    <el-row>
      <el-col :span="2" :offset="22">
        <el-button
          type="primary"
          style="width: 90%"
          @click="showNewIncomeDialog"
           :class="[checkNowUserRole('receivement_add') ? '':'disRoleMenu']"
          >新增到款</el-button
        >
      </el-col>
    </el-row>
    <IncomeListTableComponent />
    <NewIncomeDialog />
    <ConfirmIncomeDialog />
    <EditIncomeDialog />
    <ConfirmAccountingDialog />
    <ConfirmDeleteIncomeDialog />
    <ConfirmedIncomeListDialog />
  </div>
</template>

<script>
import SearchIncomeComponent from "~/components/financialModule/incomePage/SearchIncomeComponent";
import IncomeListTableComponent from "~/components/financialModule/incomePage/IncomeListTableComponent";
import NewIncomeDialog from "~/components/financialModule/incomePage/NewIncomeDialog";
import ConfirmIncomeDialog from "~/components/financialModule/incomePage/ConfirmIncomeDialog";
import EditIncomeDialog from "~/components/financialModule/incomePage/EditIncomeDialog";
import ConfirmAccountingDialog from "~/components/financialModule/incomePage/ConfirmAccountingDialog";
import ConfirmDeleteIncomeDialog from "~/components/financialModule/incomePage/ConfirmDeleteIncomeDialog";
import ConfirmedIncomeListDialog from "~/components/financialModule/incomePage/ConfirmedIncomeListDialog";
import axios from "axios"
import CookieUtil from "~/utils/CookieUtil";
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
    let result = await axios.get("/api/receivement/list?offset=1&limit=5").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data;
        }
      },
      () => {}
    );
    if(!result || result == null) {
      result = {};
    }
    console.log("income list", result);
    ctx.store.commit("incomeData/setIncomeListTable", result);
  }
};
</script>
