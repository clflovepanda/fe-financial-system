<template>
  <div>
    <el-table
      :data="incomeListTable.listData"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column fixed prop="num" label="ID"></el-table-column>
      <el-table-column prop="account" label="认款用户"></el-table-column>
      <el-table-column prop="confirmIncomeMoney" label="认款金额/元"></el-table-column>
      <el-table-column prop="confirmIncomeDate" label="认款时间"></el-table-column>
      <el-table-column prop="confirmIncomeProject" label="认款项目"></el-table-column>
      <el-table-column prop="confirmIncomeProjectSub" label="项目二级类型"></el-table-column>
      <el-table-column prop="incomeType" label="收入类型"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
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
      return this.$store.state.incomeData.incomeListTable;
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