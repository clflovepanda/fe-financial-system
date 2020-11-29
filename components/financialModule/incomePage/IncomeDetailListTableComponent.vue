<template>
  <div>
    <el-table
      :data="incomeListTable.listData"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column fixed prop="num" label="序号"></el-table-column>
      <el-table-column prop="account" label="到款账户"></el-table-column>
      <el-table-column prop="incomeType" label="到款种类"></el-table-column>
      <el-table-column prop="incomeFromType" label="汇款方类型"></el-table-column>
      <el-table-column prop="incomeFromName" label="汇款方"></el-table-column>
      <el-table-column prop="incomeMoney" label="到款金额/元"></el-table-column>
      <el-table-column prop="incomeDate" label="到款时间"></el-table-column>
      <el-table-column prop="needConfirmMoney" label="剩余认款金额/元"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
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