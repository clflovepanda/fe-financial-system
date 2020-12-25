<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: 贺朋展
 * @Date: 2020-12-25 13:44:27
 * @LastEditors: 贺朋展
 * @LastEditTime: 2020-12-25 18:58:23
-->
<template>
  <div>
    <el-table
      :data="incomeListTable"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column fixed prop="id" label="序号"></el-table-column>
      <el-table-column prop="companyName" label="到款账户"></el-table-column>
      <el-table-column prop="receivementTypeName" label="到款种类"></el-table-column>
      <el-table-column prop="remitterMethodName" label="汇款方类型"></el-table-column>
      <el-table-column prop="remitter" label="汇款方"></el-table-column>
      <el-table-column prop="receivementMoney" label="到款金额/元"></el-table-column>
      <el-table-column prop="receiveDate" label="到款时间"></el-table-column>
      <el-table-column prop="remaindSubscriptionTotalMoney" label="剩余认款金额/元"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
         <span v-if="scope.row.state==0">未认款</span>
         <span v-if="scope.row.state==1">已认款</span>
         <span v-if="scope.row.state==2">部分认款</span>
         <span v-if="scope.row.state==3">待做账</span>
         <span v-if="scope.row.state==4">已做账</span>

      </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    incomeListTable() {
      return this.$store.state.dialogSwitchData.incomeDetailValue;
    }
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    handleClick(scope) {
      console.log(scope);
    },
    handleEdit(scope) {
      console.log("edit " + scope.$index + " ...");
    },
    confirmMoney(scope) {
      console.log(scope);
      this.$store.commit(
        "dialogSwitchData/showConfirmIncomeDialog",
        true
      );
    },
  }
};
</script>