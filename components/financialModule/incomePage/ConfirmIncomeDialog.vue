<template>
  <el-dialog title="认款" :visible.sync="confirmIncomeDialogShow" width="80%">
    <el-row>
      <el-col :span="22" :offset="1">
        <h2>到款信息</h2>
        <el-row>
          <IncomeDetailListTableComponent />
        </el-row>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="22" :offset="1">
        <h2>已认款列表</h2>
        <el-row>
          <IncomeDetailListTableComponent />
        </el-row>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="22" :offset="1">
        <h2>本次认款</h2>
        <NowIncomeComponent />
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import IncomeDetailListTableComponent from "~/components/financialModule/incomePage/IncomeDetailListTableComponent";
import NowIncomeComponent from "~/components/financialModule/incomePage/NowIncomeComponent";

export default {
  data() {
    return {
      newIncomeDialogForm: {
        account: "",
        money: "",
        incomeType: "",
        incomeFromType: "",
      },
      confirmIncomeDialogShow: false,
    };
  },
  computed: {
    partList() {
      return this.$store.state.partData.partList;
    },
    accountStatusList() {
      return this.$store.state.userData.accountStatusList;
    },
    isShowConfirmIncomeDialog() {
      return this.$store.state.dialogSwitchData.confirmIncomeDialogShow;
    },
  },
  watch: {
    confirmIncomeDialogShow() {
      this.$store.commit(
        "dialogSwitchData/showConfirmIncomeDialog",
        this.confirmIncomeDialogShow
      );
    },
    isShowConfirmIncomeDialog(val, oldVal) {
      this.confirmIncomeDialogShow = val;
    },
  },
  methods: {
    createUser: function () {
      console.log("create user ...");
    },
  },
};
</script>

<style>
.labelSty {
  line-height: 40px;
  text-align: center;
}

.rowSty {
  margin-top: 15px;
}
</style>