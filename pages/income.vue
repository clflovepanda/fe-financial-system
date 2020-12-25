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

export default {
  methods: {
    showNewIncomeDialog: function () {
      this.$store.commit("dialogSwitchData/showNewIncomeDialog", true);
    },
  },
  async asyncData(ctx) {
    let result = await axios.get("/api/receivement/list").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data.data;
        }
      },
      () => {}
    );
    if(!result || result == null) {
      result = [];
    }
    ctx.store.commit("incomeData/setIncomeListTable", result);
  }
};
</script>