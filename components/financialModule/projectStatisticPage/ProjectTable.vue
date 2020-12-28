<template>
  <div>
    <el-table :data="getProjectTable" border style="width: 100%; margin-top: 20px">
        <el-table-column align="center" prop="projectId" label="序号" width="120"></el-table-column>
        <el-table-column align="center" prop="code" label="编号" width="120"></el-table-column>
        <el-table-column align="center" prop="name" label="名称" width="120"></el-table-column>
        <el-table-column align="center" prop="managerName" label="负责人"></el-table-column>
        <el-table-column align="center" prop="estincome" label="报价（未完成）"></el-table-column>
        <el-table-column align="center" prop="settlementIncome" label="结算收入（已完成）"></el-table-column>
        <el-table-column align="center" prop="relRevenue" label="实际收入"></el-table-column>
        <el-table-column align="center" prop="receivable" label="应收收入"></el-table-column>
      </el-table>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },
  computed: {
      getProjectTable() {
        if (this.$store.state.statisticData.projectStatistic) {
          return this.$store.state.statisticData.projectStatistic.projcet;
        } else {
          return []
        }
      }
  },
  watch: {},
  methods: {
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
