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
      </el-main>
    </el-container>
    <NewIncomeDialog />
    <ConfirmIncomeDialog />
  </el-container>
</template>

<script>
import SearchIncomeComponent from "~/components/financialModule/incomePage/SearchIncomeComponent";
import IncomeListTableComponent from "~/components/financialModule/incomePage/IncomeListTableComponent";
import NewIncomeDialog from "~/components/financialModule/incomePage/NewIncomeDialog";
import ConfirmIncomeDialog from "~/components/financialModule/incomePage/ConfirmIncomeDialog";

export default {
  methods: {
    showNewIncomeDialog: function () {
      this.$store.commit("dialogSwitchData/showNewIncomeDialog", true);
    },
  },
};
</script>