<template>
  <el-dialog title="操作记录" :visible.sync="showDepositLogDialog" width="80%">
    <el-divider></el-divider>
    <h1>押金记录</h1>
    <el-table :data="depositLogData" border style="width: 100%; margin-top: 20px">
        <el-table-column align="center" prop="id" label="ID"></el-table-column>
        <el-table-column align="center" prop="coName" label="账户"></el-table-column>
        <el-table-column align="center" prop="receivementTypeName" label="到款种类"></el-table-column>
        <el-table-column align="center" prop="remitter" label="汇款方"></el-table-column>
        <el-table-column align="center" prop="remitter" label="认款类型"></el-table-column>
        <el-table-column align="center" prop="cnyMoney" label="认款金额/元"></el-table-column>
        <el-table-column align="center" prop="username" label="认款人"></el-table-column>
        <el-table-column align="center" prop="ctime" label="认款时间"></el-table-column>
    </el-table>
    <el-divider></el-divider>
    <h1>操作记录</h1>
    <el-table :data="actionLogData" border style="width: 100%; margin-top: 20px">
        <el-table-column align="center" prop="expenditureId" label="ID"></el-table-column>
        <el-table-column align="center" prop="coName" label="账户"></el-table-column>
        <el-table-column align="center" prop="expenditureMethodId" label="操作种类">
          <template slot-scope="scope">
            <span v-if="scope.row.expenditureMethodId == 1">现金</span>
            <span v-if="scope.row.expenditureMethodId == 2">电汇</span>
            <span v-if="scope.row.expenditureMethodId == 3">差旅</span>
          </template>
        </el-table-column><!--1现金 2电汇 3差旅-->
        <el-table-column align="center" prop="beneficiaryUnit" label="操作方"></el-table-column>
        <el-table-column align="center" prop="expenditureTypeId" label="操作类型">
          <template slot-scope="scope">
            <span v-if="scope.row.expenditureTypeId == 1">普通支出</span>
            <span v-if="scope.row.expenditureTypeId == 2">退押金</span>
            <span v-if="scope.row.expenditureTypeId == 3">押金及费用</span>
          </template>
        </el-table-column><!--1普通支出 2退押金 3押金及费用-->
        <el-table-column align="center" prop="expenditureMoney" label="操作金额/元"></el-table-column>
        <el-table-column align="center" prop="username" label="操作人"></el-table-column>
        <el-table-column align="center" prop="ctime" label="操作时间"></el-table-column>
        <el-table-column align="center" prop="state" label="最新状态">
          <template slot-scope="scope">
            <span v-if="scope.row.state == 4">已退回</span>
            <span v-else>退回中</span>
          </template>
        </el-table-column><!--4已退回，其它退回中-->
        <el-table-column align="center" prop="remitter" label="操作">
          <template slot-scope="scope">
            <el-button  type="text" size="small" @click="del(scope)">删除</el-button>
          </template>
        </el-table-column>
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
    }
  },
  computed: {
    isShowDepositLogDialog() {
      return this.$store.state.dialogSwitchData.showDepositLogDialog;
    },
    actionLogData() {
      return this.$store.state.depositeData.depositeLogData;
    },
    depositLogData() {
      return [this.$store.state.depositeData.depositeSelected];
    }
  },
  watch: {
    showDepositLogDialog() {
      this.$store.commit(
        "dialogSwitchData/setShowDepositLogDialog",
        this.showDepositLogDialog
      );
    },
    isShowDepositLogDialog(val, oldVal) {
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
    del(scope) {
      console.log("删除 押金 操作记录", scope);
      axios.get('/api/deposit/del?expenditureId=' + scope.row.expenditureId).then((res)=>{
        if(res.data.code == 0){
          axios.get("/api/deposit/list?projectId=" + scope.row.projectId).then(
            (rep) => {
              if (rep && rep.data) {
                if (rep.data.code == 0) {
                  console.log(rep.data.data);
                  this.$store.commit("depositeData/setDepositeData", rep.data.data.deposit);
                } else {
                  this.$message.error(rep.data.msg);
                }
                
              }
            },
            () => {}
          );
          axios.get("/api/expenditure/list?projectId=" + scope.row.projectId).then(
            (rep) => {
              if (rep && rep.data) {
                if (rep.data.code == 0) {
                  this.$store.commit("projectData/setProjectPay", rep.data.data);
                } else {
                  this.$message.error(rep.data.msg);
                }
                
              }
            },
            () => {}
          );
          this.showDepositLogDialog = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
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