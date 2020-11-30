<template>
  <el-dialog title="确认做账" :visible.sync="confirmAccountingDialogShow" width="80%">
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
          <ConfirmIncomeListTableComponent />
        </el-row>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="22" :offset="1">
        <h2>做账信息</h2>
        <AccountingInfoComponent />
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import IncomeDetailListTableComponent from "~/components/financialModule/incomePage/IncomeDetailListTableComponent";
import ConfirmIncomeListTableComponent from "~/components/financialModule/incomePage/ConfirmIncomeListTableComponent";
import AccountingInfoComponent from "~/components/financialModule/incomePage/AccountingInfoComponent";

export default {
  data() {
    return {
      newIncomeDialogForm: {
        account: "",
        money: "",
        incomeType: "",
        incomeFromType: "",
      },
      confirmAccountingDialogShow: false,
    };
  },
  computed: {
    partList() {
      return this.$store.state.partData.partList;
    },
    accountStatusList() {
      return this.$store.state.userData.accountStatusList;
    },
    isShowConfirmAccountingDialog() {
      return this.$store.state.dialogSwitchData.confirmAccountingDialogShow;
    },
  },
  watch: {
    confirmAccountingDialogShow() {
      this.$store.commit(
        "dialogSwitchData/showConfirmAccountingDialog",
        this.confirmAccountingDialogShow
      );
    },
    isShowConfirmAccountingDialog(val, oldVal) {
      this.confirmAccountingDialogShow = val;
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