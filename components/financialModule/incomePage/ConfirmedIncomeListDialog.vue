<template>
  <el-dialog title="已认款金额" :visible.sync="confirmedIncomeDialogShow" width="80%">
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
          <ConfirmIncomeListTableComponent @closeDialog="childEvent"/>
        </el-row>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import IncomeDetailListTableComponent from "~/components/financialModule/incomePage/IncomeDetailListTableComponent";
import ConfirmIncomeListTableComponent from "~/components/financialModule/incomePage/ConfirmIncomeListTableComponent";

export default {
  data() {
    return {
      newIncomeDialogForm: {
        account: "",
        money: "",
        incomeType: "",
        incomeFromType: "",
      },
      confirmedIncomeDialogShow: false,
    };
  },
  computed: {
    partList() {
      return this.$store.state.partData.partList;
    },
    accountStatusList() {
      return this.$store.state.userData.accountStatusList;
    },
    isShowConfirmedIncomeDialog() {
      return this.$store.state.dialogSwitchData.confirmedIncomeDialogShow;
    },
  },
  watch: {
    confirmedIncomeDialogShow() {
      this.$store.commit(
        "dialogSwitchData/showConfirmedIncomeDialog",
        this.confirmedIncomeDialogShow
      );
    },
    isShowConfirmedIncomeDialog(val, oldVal) {
      this.confirmedIncomeDialogShow = val;
    },
  },
  methods: {
    createUser: function () {
      console.log("create user ...");
    },
    childEvent(data) {
      console.log(data);
      this.confirmedIncomeDialogShow = false;
    }
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