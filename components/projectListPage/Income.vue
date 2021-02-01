<template>
  <el-container class="container income">
    <el-container>
      <el-main>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="90px"
          label-position="left"
          class="demo-ruleForm income-form"
        >
          <el-form-item label="收入编号" prop="id">
            <el-input v-model="ruleForm.revenueNo" placeholder="请输入收入编号"></el-input>
          </el-form-item>
          <el-form-item label="汇款方类型" prop="statement">
            <el-select v-model="ruleForm.remitterMethodId" placeholder="请选择汇款方类型">
              <el-option label="企业" value="1"></el-option>
              <el-option label="个人" value="2"></el-option>
              <el-option label="未知" value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="认款类型" prop="statement">
            <el-select v-model="ruleForm.receivementTypeId" placeholder="请选择认款类型">
              <el-option
                v-for="item in getRevenueType"
                :key="item.revenueTypeId"
                :label="item.revenueTypeName"
                :value="item.revenueTypeId"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="认款时间">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="账户" prop="name">
            <el-select v-model="ruleForm.companyId" placeholder="请选择账户">
              <el-option label="亚讯" value="1"></el-option>
              <el-option label="新锐" value="3"></el-option>
              <el-option label="医点通" value="4"></el-option>
              <el-option label="其它公司" value="6"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="汇款方" prop="proManager">
            <el-input v-model="ruleForm.remitter" placeholder="请输入汇款方名称"></el-input>
          </el-form-item>
          <el-form-item label="认款人员" prop="saleManager">
            <el-input v-model="ruleForm.createUser" placeholder="请输入认款人员名称"></el-input>
          </el-form-item>

          <el-form-item class="button-wrap">
            <el-button type="primary" @click="handleFindClick()">查询</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-row style="margin-top:20px; background: lightgray; height: 40px; line-height: 40px; text-align:center">
          <el-col :span="4">全部收入/元：{{getStatistic.allRevenue == null ? 0 : getStatistic.allRevenue}}</el-col>
          <el-col :span="4">押金转收入/元： {{getStatistic.depositToRevenue == null ? 0 : getStatistic.depositToRevenue}} </el-col>
          <el-col :span="4">正常收入/元：{{getStatistic.revenue == null ? 0 : getStatistic.revenue}}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-table :data="revenueList" border style="width: 100%; margin-top: 20px">
          <el-table-column align="center" prop="id" label="序号" width="120"></el-table-column>
          <el-table-column align="center" prop="revenueNo" label="收入编号"></el-table-column>
          <el-table-column align="center" prop="coName" label="账户" width="120"></el-table-column>
          <el-table-column align="center" prop="remitterMethodName" label="汇款方类型"></el-table-column>
          <el-table-column align="center" prop="remitter" label="汇款方"></el-table-column>
          <el-table-column align="center" prop="revenueTypeName" label="认款类型"></el-table-column>
          <!-- <el-table-column align="center" prop="dataSourceName" label="项目二级类型" width="120"></el-table-column> -->
          <el-table-column align="center" prop="cnyMoney" label="认款金额/元" width="120"></el-table-column>
          <el-table-column align="center" prop="username" label="认款人员" width="140"></el-table-column>
          <el-table-column align="center" prop="ctime" label="认款时间" width="160"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Table from "~/components/projectListPage/Table.vue";
import axios from "axios";

export default {
  data() {
    return {
      dateRange: "",
      ruleForm: {
        projectId: "",
        revenueNo: "",
        remitterMethodId: "",
        receivementTypeId: "",
        companyId: "",
        remitter: "",
        createUser: ""
      },
      listData: [],
    };
  },
  computed: {
    revenueList() {
      return this.$store.state.incomeData.revenueList;
    },
    getStatistic() {
      return this.$store.state.incomeData.statistics;
    },
    getRevenueType() {
      return this.$store.state.expenditureData.expenditurePurposeType.revenueType;
    }
  },
  methods: {
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert("submit!");
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handleFindClick() {
      let params = JSON.parse(JSON.stringify(this.ruleForm));
      params.projectId = this.$store.state.projectData.viewProjectId;
      if (this.dateRange != "") {
        let st = this.dateRange[0];
        let et = this.dateRange[1];
        params.startDt = st.getTime();
        params.endDt = et.getTime();
      } 
      axios.get("/api/revenue/list", {
        params: params
      }).then(
        (rep) => {
          if (rep && rep.data) {
            console.log("pay data", rep.data.data);
            this.$store.commit("incomeData/setRevenueList", rep.data.data);
            this.$store.commit("incomeData/setRevenueStatistic", rep.data.statistic);
          }
        },
        () => {}
      );
    },
  },
};
</script>

<style>
.income{
    width:calc(100vw - 200px);
}
.income .el-form-item {
  display: inline-block;
  vertical-align: top;
}

.money-show {
  background: #ccc;
}
.money-show span {
  line-height: 60px;
  color: #fff;
  margin-bottom: 20px;
}

</style>
