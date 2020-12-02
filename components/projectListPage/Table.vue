<template>
  <el-table :data="listData" border style="width: 100%; margin-top: 20px">
    <el-table-column align="center" fixed prop="num" label="序号" width="120"></el-table-column>
    <el-table-column align="center" prop="id" label="项目编号"></el-table-column>
    <el-table-column align="center" prop="name" label="项目名称">
      <template slot-scope="scope">
        <el-button @click="handleProName(scope)" type="text" size="small">{{scope.row.name}}</el-button>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="proManager" label="项目经理"></el-table-column>
    <el-table-column align="center" prop="saleManager" label="销售经理"></el-table-column>
    <el-table-column align="center" prop="proPerson" label="项目成员"></el-table-column>
    <el-table-column align="center" prop="accountStatus" label="花费工时/时" width="120"></el-table-column>
    <el-table-column align="center" prop="createTime" label="项目创建时间" width="120"></el-table-column>
    <el-table-column align="center" prop="num" label="项目开始时间-结束时间" width="180"></el-table-column>
    <el-table-column align="center" prop="id" label="结算收入/结算支出" width="160"></el-table-column>
    <el-table-column align="center" prop="proManager" label="收付款收入/收付款支出" width="170"></el-table-column>
    <el-table-column align="center" prop label="收付款利润率" width="120"></el-table-column>
    <el-table-column align="center" prop="role" label="项目毛利率/%" width="120"></el-table-column>
    <el-table-column align="center" prop="accountStatus" label="销售提成发放状态" width="140"></el-table-column>
    <el-table-column align="center" prop="createTime" label="结算状态"></el-table-column>
    <el-table-column align="center" prop="createTime" label="项目状态"></el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ["passStatus"],
  data() {
    return {
      listData: [
        {
          id: 1,
          num: 1342343,
          name: "Panda",
          proManager: "动物园",
        },
      ],
    };
  },
  methods: {
    handleProName(val) {
      console.log(this.passStatus);
      this.$router.push("/viewProject");
    },
    handleProTime: (val) => {
      console.log(val);
    },
  },
};
</script>