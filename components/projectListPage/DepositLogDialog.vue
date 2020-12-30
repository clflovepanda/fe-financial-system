<template>
  <el-dialog title="操作记录" :visible.sync="showDepositLogDialog" width="80%">
    <el-divider></el-divider>
    <h1>押金记录</h1>
    <el-table :data="depositLogData" border style="width: 100%; margin-top: 20px">
        <el-table-column align="center" type="index" label="ID"></el-table-column>
        <el-table-column align="center" prop="revenueNo" label="账户"></el-table-column>
        <el-table-column align="center" prop="coName" label="到款种类"></el-table-column>
        <el-table-column align="center" prop="receivementTypeName" label="汇款方"></el-table-column>
        <el-table-column align="center" prop="remitter" label="认款类型"></el-table-column>
        <el-table-column align="center" prop="remitter" label="认款金额/元"></el-table-column>
        <el-table-column align="center" prop="remitter" label="认款人"></el-table-column>
        <el-table-column align="center" prop="remitter" label="认款时间"></el-table-column>
    </el-table>
    <el-divider></el-divider>
    <h1>操作记录</h1>
    <el-table :data="actionLogData" border style="width: 100%; margin-top: 20px">
        <el-table-column align="center" type="index" label="ID"></el-table-column>
        <el-table-column align="center" prop="revenueNo" label="账户"></el-table-column>
        <el-table-column align="center" prop="coName" label="操作类型"></el-table-column>
        <el-table-column align="center" prop="receivementTypeName" label="操作方"></el-table-column>
        <el-table-column align="center" prop="remitter" label="操作类型"></el-table-column>
        <el-table-column align="center" prop="remitter" label="操作金额/元"></el-table-column>
        <el-table-column align="center" prop="remitter" label="操作人"></el-table-column>
        <el-table-column align="center" prop="remitter" label="操作时间"></el-table-column>
        <el-table-column align="center" prop="remitter" label="最新状态"></el-table-column>
        <el-table-column align="center" prop="remitter" label="操作"></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import axios from "axios";
import {EnumAccount} from "../../utils/EnumUtil";
export default {
  data() {
    return {
      showDepositLogDialog: false,
      depositLogData: [],
      actionLogData: []
    }
  },
  computed: {
    isShowCreatePayDialog() {
      return this.$store.state.dialogSwitchData.showDepositLogDialog;
    }
  },
  watch: {
    showDepositLogDialog() {
      this.$store.commit(
        "dialogSwitchData/setShowDepositLogDialog",
        this.showDepositLogDialog
      );
    },
    isShowCreatePayDialog(val, oldVal) {
      this.showDepositLogDialog = val;
    },
  },
  methods: {
    changeMethod() {
      if(this.createForm.expenditureMethodId == 2) {
        this.needShowRow = true;
      } else {
        this.needShowRow = false;
      }
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
  margin-top: 10px;
}

.showRow {
  display: block;
  margin-top: 10px;
}
.disShowRow {
  display: none;
  margin-top: 10px;
}
</style>