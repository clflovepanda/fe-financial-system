
<template>
  <div>
    <el-table
      :data="incomeListTable"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column fixed prop="id" label="ID"></el-table-column>
      <el-table-column prop="username" label="认款用户"></el-table-column>
      <el-table-column prop="receivementMoney" label="认款金额/元"></el-table-column>
      <el-table-column prop="ctime" label="认款时间"></el-table-column>
      <el-table-column prop="projectName" label="认款项目"></el-table-column>
      <el-table-column prop="dataSourceName" label="项目二级类型"></el-table-column>
      <el-table-column prop="revenueTypeName" label="收入类型"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="remark" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="delsublog(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
    };
  },
  computed: {
     incomeListTable() {

      return this.$store.state.dialogSwitchData.receivementListValue;
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
    delsublog(scope) {
      axios.get("/api/receivement/delsublog?id=" + scope.row.id).then(
          (rep) => {
            if (rep && rep.data) {
              console.log(rep);
            }
          },
          () => {}
        );
    }
  }
};
</script>