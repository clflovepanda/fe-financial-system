<template>
  <div>
    <el-table
      :data="incomeListTable.listData"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        fixed
        prop="num"
        label="序号"
        width="120"
      ></el-table-column>
      <el-table-column prop="account" label="到款账户"></el-table-column>
      <el-table-column prop="incomeType" label="到款种类"></el-table-column>
      <el-table-column prop="incomeFromType" label="汇款方类型"></el-table-column>
      <el-table-column prop="incomeFromName" label="汇款方"></el-table-column>
      <el-table-column prop="incomeMoney" label="到款金额/元"></el-table-column>
      <el-table-column prop="incomeDate" label="到款时间"></el-table-column>
      <el-table-column prop="confirmMoney" label="已认款金额"></el-table-column>
      <el-table-column prop="lastConfirmDate" label="最新认款时间"></el-table-column>
      <el-table-column prop="needConfirmMoney" label="剩余认款金额/元"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column fixed="right" label="操作" width="280">
        <template slot-scope="scope">
          <el-button @click="confirmMoney(scope)" type="text" size="small">认款</el-button>
          <el-button @click="editConfirm(scope)" type="text" size="small">修改</el-button>
          <el-button @click="confirmAccounting(scope)" type="text" size="small">确认做账</el-button>
          <el-button @click="deleteIncome(scope)" type="text" size="small">删除</el-button>
          <el-button @click="confirmList(scope)" type="text" size="small">已认款记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="12" :offset="12">
        <div class="block" style="margin-top: 30px">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="incomeListTable.currentPage"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="incomeListTable.total"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
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
      this.$store.commit("dialogSwitchData/showConfirmIncomeDialog", true);
    },
    editConfirm(scope) {
      this.$store.commit("dialogSwitchData/showEditIncomeDialog", true);
    },
    confirmAccounting(scope) {
      this.$store.commit("dialogSwitchData/showConfirmAccountingDialog", true);
    },
    deleteIncome(scope) {
      this.$store.commit("dialogSwitchData/showDeleteIncomeDialog", true);
    },
    confirmList(scope) {
      this.$store.commit("dialogSwitchData/showConfirmedIncomeDialog", true);
    }
  }
};
</script>