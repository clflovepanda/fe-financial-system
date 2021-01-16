<template>
  <div>
    <el-table
      :data="incomeListTable.listData"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        fixed
        label="序号"
        width="120"
        prop="id"
      ></el-table-column>
      <el-table-column prop="companyName" label="到款账户"></el-table-column>
      <el-table-column prop="receivementTypeName" label="到款种类"></el-table-column>
      <el-table-column prop="remitterMethodName" label="汇款方类型"></el-table-column>
      <el-table-column prop="remitter" label="汇款方"></el-table-column>
      <el-table-column prop="receivementMoney" label="到款金额/元"></el-table-column>
      <el-table-column prop="receiveDate" label="到款时间"></el-table-column>
      <el-table-column prop="hadSubscriptionTotalMoney" label="已认款金额"></el-table-column>
      <el-table-column prop="latestSubscriptionTime" label="最新认款时间"></el-table-column>
      <el-table-column prop="remaindSubscriptionTotalMoney" label="剩余认款金额/元"></el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
         <span v-if="scope.row.state==0">未认款</span>
         <span v-if="scope.row.state==1">已认款</span>
         <span v-if="scope.row.state==2">部分认款</span>
         <span v-if="scope.row.state==3">待做账</span>
         <span v-if="scope.row.state==4">已做账</span>

      </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="280">
        <template slot-scope="scope">
          <el-button @click="confirmMoney(scope)" type="text" :disabled="scope.row.state>2" size="small">认款</el-button>
          <el-button @click="editConfirm(scope)" type="text" size="small"  :disabled="scope.row.state == 4">修改</el-button>
          <el-button @click="confirmAccounting(scope)" type="text" size="small" :disabled="scope.row.state == 4">确认做账</el-button>
          <el-button @click="deleteIncome(scope)" type="text" size="small" :disabled="scope.row.state == 4">删除</el-button>
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
            :current-page.sync="currentPage"
            :page-size="5"
            layout="total, prev, pager, next, jumper"
            :total="incomeListTable.total"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      currentPage: 1
    };
  },
  computed: {
    incomeListTable() {
      console.log("incomeListTable", this.$store.state.incomeData.incomeListTable);
      return this.$store.state.incomeData.incomeListTable;
    }
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange(page) {
      this.currentPage = page;
      axios.get("/api/receivement/list?offset=" + page + "&limit=5").then(
        (rep) => {
          if (rep && rep.data) {
            if(!rep.data || rep.data == null) {
              return;
            }
            this.$store.commit("incomeData/setIncomeListTable", rep.data);
          }
        },
        () => {}
      );
    },
    handleClick(scope) {
      console.log(scope);
    },
    handleEdit(scope) {
      console.log("edit " + scope.$index + " ...");
    },
    async confirmMoney(scope) {
      this.$store.commit("dialogSwitchData/showConfirmIncomeDialog", true);
      // 操作认款时获取某一项信息
      this.$store.commit("dialogSwitchData/incomeDetailSubscription", [scope.row]);

      //认款弹框列表
     let response = await axios.get('/api/receivement/getsublog?receivementId='+[scope.row][0].id)
      this.$store.commit("dialogSwitchData/receivementList",response.data.data);
      
    },
    editConfirm(scope) {
      this.$store.commit("dialogSwitchData/incomeDetailSubscription", [scope.row]);
      this.$store.commit("dialogSwitchData/showEditIncomeDialog", true);
    },
    async confirmAccounting(scope) {
      this.$store.commit("dialogSwitchData/incomeDetailSubscription", [scope.row]);

      let response = await axios.get('/api/receivement/getsublog?receivementId='+[scope.row][0].id)
      this.$store.commit("dialogSwitchData/receivementList",response.data.data);
      this.$store.commit("dialogSwitchData/showConfirmAccountingDialog", true);
    },
    deleteIncome(scope) {
      this.$store.commit("dialogSwitchData/incomeDetailSubscription", [scope.row]);
      this.$store.commit("dialogSwitchData/showDeleteIncomeDialog", true);
      // console.log(this.$store.state.dialogSwitchData)
    },
    async confirmList(scope) {
      this.$store.commit("dialogSwitchData/incomeDetailSubscription", [scope.row]);
      //认款弹框列表
     let response = await axios.get('/api/receivement/getsublog?receivementId='+[scope.row][0].id)
     this.$store.commit("dialogSwitchData/receivementList",response.data.data);
      this.$store.commit("dialogSwitchData/showConfirmedIncomeDialog", true);
    }
  },
};
</script>