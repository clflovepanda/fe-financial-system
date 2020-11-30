<template>
  <el-container class="container pay">
    <el-container>
      <el-main>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="90px"
          label-position="left"
          class="demo-ruleForm income-form"
        >
          <el-form-item label="公司" prop="statement">
            <el-select v-model="ruleForm.statement" placeholder="请选择公司">
              <el-option label="1" value="notState"></el-option>
              <el-option label="2" value="willState"></el-option>
              <el-option label="3" value="stated"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支出编号" prop="id">
            <el-input v-model="ruleForm.id" placeholder="请输入支出编号"></el-input>
          </el-form-item>
          <el-form-item label="支出方式" prop="statement">
            <el-select v-model="ruleForm.statement" placeholder="请选择支出方式">
              <el-option label="1" value="notState"></el-option>
              <el-option label="2" value="willState"></el-option>
              <el-option label="3" value="stated"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="支出类型" prop="statement">
            <el-select v-model="ruleForm.statement" placeholder="请选择支出类型">
              <el-option label="1" value="notState"></el-option>
              <el-option label="2" value="willState"></el-option>
              <el-option label="3" value="stated"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="收款人" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入查找收款人"></el-input>
          </el-form-item>

          <el-form-item label="申请" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入查找申请"></el-input>
          </el-form-item>

          <el-form-item label="最新状态" prop="statement">
            <el-select v-model="ruleForm.statement" placeholder="请选择最新状态">
              <el-option label="1" value="notState"></el-option>
              <el-option label="2" value="willState"></el-option>
              <el-option label="3" value="stated"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工作流" prop="statement">
            <el-select v-model="ruleForm.statement" placeholder="请选择工作流">
              <el-option label="1" value="notState"></el-option>
              <el-option label="2" value="willState"></el-option>
              <el-option label="3" value="stated"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="用途" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入查找用途"></el-input>
          </el-form-item>

          <el-form-item label="创建时间" required>
            <el-date-picker
              v-model="ruleForm.proDate"
              type="daterange"
              range-separator="~"
              start-placeholder="请选择创建开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>

          <el-form-item class="button-wrap">
            <el-button type="primary" @click="handleFindClick()">查询</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>

        <el-row>
          <el-col :span="4" :offset="20">
            <el-button type="primary" @click="handleAddPay()">新增支出</el-button>
            <el-button type="primary" @click="handleExcel()">导出excel</el-button>
          </el-col>
        </el-row>

        <el-row class="money-show">
          <el-col :span="4">
            <span>已提交总计/元：</span>
            <span></span>
          </el-col>
          <el-col :span="4">
            <span>未财务审批/元:</span>
            <span></span>
          </el-col>
          <el-col :span="4">
            <span>已支付总计/元：</span>
            <span></span>
          </el-col>
          <el-col :span="4">
            <span>票据作废总计/元：</span>
            <span></span>
          </el-col>
          <el-col :span="4">
            <span>平借款总计/元：</span>
            <span></span>
          </el-col>
        </el-row>
        <el-table :data="listData" border style="width: 100%; margin-top: 20px">
          <el-table-column align="center" fixed prop="num" label="序号" width="120"></el-table-column>
          <el-table-column align="center" prop="id" label="支出编号"></el-table-column>
          <el-table-column align="center" prop="name" label="账户" width="120"></el-table-column>
          <el-table-column align="center" prop="proManager" label="支出方式"></el-table-column>
          <el-table-column align="center" prop="saleManager" label="支出类型"></el-table-column>
          <el-table-column align="center" prop="proPerson" label="用途"></el-table-column>
          <el-table-column align="center" prop="accountStatus" label="收款人单位" width="140"></el-table-column>
          <el-table-column align="center" prop="createTime" label="金额/元" width="120"></el-table-column>
          <el-table-column align="center" prop="num" label="创建时间" width="170"></el-table-column>
          <el-table-column align="center" prop="id" label="最新状态" width="140"></el-table-column>
          <el-table-column align="center" prop="num" label="最新状态时间" width="180"></el-table-column>
          <el-table-column align="center" prop="id" label="工作流" width="140"></el-table-column>
          <el-table-column align="center" prop="id" label="操作" width="140">
              <tempalte>
                  <span>打印</span>
                  <span>修改</span>
                  <span>删除</span>
                  <span>查看</span>
              </tempalte>
          </el-table-column>



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
      //   rules: {
      //     id: [{ required: true, message: "请输入项目编号", trigger: "blur" }],
      //     name: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
      //     proManager: [
      //       { required: true, message: "请输入项目经理姓名", trigger: "blur" },
      //     ],
      //     saleManager: [
      //       { required: true, message: "请输入销售经理姓名", trigger: "blur" },
      //     ],
      //     proPerson: [
      //       { required: true, message: "请输入项目成员姓名", trigger: "blur" },
      //     ],
      //     statement: [
      //       { required: true, message: "请选择结算单状态", trigger: "change" },
      //     ],
      //     projectStatus: [
      //       { required: true, message: "请选择项目状态", trigger: "change" },
      //     ],

      //     proDate: [
      //       {
      //         type: "date",
      //         required: true,
      //         message: "请选择日期",
      //         trigger: "change",
      //       },
      //     ],
      //     moneyStatus: [
      //       {
      //         required: true,
      //         message: "请选择销售提成发放状态",
      //         trigger: "change",
      //       },
      //     ],
      //   },
      listData: [],
    };
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
    handleAddPay() {},
    handleExcel() {},
  },
};
</script>

<style>
.pay .el-form-item {
  display: inline-block;
  vertical-align: top;
}

.money-show {
  background: #ccc;
  margin-top:20px;
}
.money-show span {
  line-height: 60px;
  color: #fff;
  margin-bottom: 20px;
}
</style>