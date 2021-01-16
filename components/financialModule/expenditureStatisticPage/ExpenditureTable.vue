<template>
  <div>
    <el-table :data="getExpenditureTableList" border style="width: 100%; margin-top: 20px">
        <el-table-column align="center" prop="expenditureId" label="序号" width="120"></el-table-column>
        <el-table-column align="center" prop="coName" label="公司"></el-table-column>
        <el-table-column align="center" prop="numbering" label="编号" width="120"></el-table-column>
        <el-table-column align="center" prop="project.name" label="部门/项目" width="120"></el-table-column>
        <el-table-column align="center" prop="beneficiaryUnit" label="收款人单位"></el-table-column>
        <el-table-column align="center" prop="expenditureTypeEntity.expenditureTypeName" label="方式"></el-table-column>
        <el-table-column align="center" prop="expenditurePurposeContent" label="用途"></el-table-column>
        <el-table-column align="center" prop="expenditureMoney" label="金额"></el-table-column>
        <el-table-column align="center" prop="username" label="申请人"></el-table-column>
        <el-table-column align="center" label="状态" width="140">
          <tempalte slot-scope="scope">
            <span v-if="scope.row.state == 0">未提交</span>
            <span v-if="scope.row.state == 1">已提交</span>
            <span v-if="scope.row.state == 2">审核中</span>
            <span v-if="scope.row.state == 3">被驳回</span>
            <span v-if="scope.row.state == 4">已支付</span>
            <span v-if="scope.row.state == 5">作废</span>
            <span v-if="scope.row.state == 6">平借款</span>
          </tempalte>
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
            :total="getExpenditureTableTotal"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    getExpenditureTableList() {
        return this.$store.state.expenditureData.expenditureList.list;
    },
    getExpenditureTableTotal() {
        return this.$store.state.expenditureData.expenditureList.total;
    },
  },
  watch: {
    // getExpenditureTableList(val) {
    //   this.currentPage = 1;
    // }
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange(page) {
      let params = JSON.parse(JSON.stringify(this.$store.state.expenditureData.searchParams));
      params.limit = 5;
      params.offset = page;
      axios.get("/api/statistics/expenditure", {
        params: params
      }).then(
        (rep) => {
          if (rep && rep.data) {
            let temp = {
              list: rep.data.data,
              total: rep.data.count
            }
            console.log("statistics expenditure", temp);
            this.$store.commit("expenditureData/setExpenditureList", temp);
          }
        },
        () => {}
      );
    },

  },
  mounted() {
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
</style>
