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
            <el-input v-model="ruleForm.id" placeholder="请输入收入编号"></el-input>
          </el-form-item>
          <el-form-item label="汇款方类型" prop="statement">
            <el-select v-model="ruleForm.statement" placeholder="请选择汇款方类型">
              <el-option label="企业" value="notState"></el-option>
              <el-option label="个人" value="willState"></el-option>
              <el-option label="未知" value="stated"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="认款类型" prop="statement">
            <el-select v-model="ruleForm.statement" placeholder="请选择认款类型">
              <el-option label="1" value="notState"></el-option>
              <el-option label="2" value="willState"></el-option>
              <el-option label="3" value="stated"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="认款时间" required>
            <el-date-picker
              v-model="ruleForm.proDate"
              type="daterange"
              range-separator="~"
              start-placeholder="请选择认款开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="账户" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入查找账户"></el-input>
          </el-form-item>
          <el-form-item label="汇款方" prop="proManager">
            <el-input v-model="ruleForm.proManager" placeholder="请输入汇款方名称"></el-input>
          </el-form-item>
          <el-form-item label="认款人员" prop="saleManager">
            <el-input v-model="ruleForm.saleManager" placeholder="请输入认款人员名称"></el-input>
          </el-form-item>

          <el-form-item class="button-wrap">
            <el-button type="primary" @click="handleFindClick()">查询</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>

        <!-- <el-row class="money-show">
          <el-col :span="6">
            <span>全部收入/元：</span>
            <span></span>
          </el-col>
          <el-col :span="6">
            <span>押金转收入/元:</span>
            <span></span>
          </el-col>
          <el-col :span="6">
            <span>正常收入/元：</span>
            <span></span>
          </el-col>
          <el-col :span="6">
            <span>收回押金/元：</span>
            <span></span>
          </el-col>
        </el-row> -->
        <el-table :data="revenueList" border style="width: 100%; margin-top: 20px">
          <el-table-column align="center" prop="id" label="序号" width="120"></el-table-column>
          <el-table-column align="center" prop="revenueNo" label="收入编号"></el-table-column>
          <el-table-column align="center" prop="coName" label="账户" width="120"></el-table-column>
          <el-table-column align="center" prop="remitterMethodName" label="汇款方类型"></el-table-column>
          <el-table-column align="center" prop="remitter" label="汇款方"></el-table-column>
          <el-table-column align="center" prop="receivementTypeName" label="认款类型"></el-table-column>
          <el-table-column align="center" prop="dataSourceName" label="项目二级类型" width="120"></el-table-column>
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

export default {
  data() {
    return {
      ruleForm: {
        id: "",
        name: "",
        proManager: "",
        saleManager: "",
        proPerson: "",
        statement: "",
        projectStatus: "",
        proDate: "",
        moneyStatus: "",
      },
      listData: [],
    };
  },
  computed: {
    revenueList() {
      return this.$store.state.incomeData.revenueList;
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
      console.log("查询项目");
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