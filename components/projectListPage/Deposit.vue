<template>
  <el-container class="container deposit">
    <el-container>
      <el-main>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="90px"
          label-position="left"
          class="demo-ruleForm deposit-form"
        >
  <el-form-item label="押金编号" prop="id">
            <el-input v-model="ruleForm.id" placeholder="请输入押金编号"></el-input>
          </el-form-item>
            <el-form-item label="项目名称" prop="name">
            <el-input v-model="ruleForm.id" placeholder="请输入项目名称"></el-input>
          </el-form-item>

            <el-form-item label="项目编号" prop="proId">
            <el-input v-model="ruleForm.id" placeholder="请输入项目编号"></el-input>
          </el-form-item>

          <el-form-item label="到款账户" prop="statement">
            <el-select v-model="ruleForm.statement" placeholder="请选择到款账户">
              <el-option label="1" value="notState"></el-option>
              <el-option label="2" value="willState"></el-option>
              <el-option label="3" value="stated"></el-option>
            </el-select>
          </el-form-item>
        
          <el-form-item label="到款种类" prop="statement">
            <el-select v-model="ruleForm.statement" placeholder="请选择到款种类">
              <el-option label="1" value="notState"></el-option>
              <el-option label="2" value="willState"></el-option>
              <el-option label="3" value="stated"></el-option>
            </el-select>
          </el-form-item>

          

          <el-form-item label="汇款方" prop="person">
            <el-input v-model="ruleForm.name" placeholder="请输入查找汇款方"></el-input>
          </el-form-item>

          <el-form-item label="认款人" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入查找认款人"></el-input>
          </el-form-item>


          <el-form-item label="请选择认款时间" required class="time">
            <el-date-picker
              v-model="ruleForm.proDate"
              type="daterange"
              range-separator="~"
              start-placeholder="请选择开始日期"
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
            <el-button type="primary" @click="handleExcel()">导出excel</el-button>
          </el-col>
        </el-row>

        <el-row class="money-show">
          <el-col :span="4">
            <span>全部押金金额/元：</span>
            <span></span>
          </el-col>
          <el-col :span="4">
            <span>待退回总押金/元:</span>
            <span></span>
          </el-col>
          <el-col :span="4">
            <span>退回审批中押金总金额//元：</span>
            <span></span>
          </el-col>
          <el-col :span="4">
            <span>已退回押金总金额/元：</span>
            <span></span>
          </el-col>
          <el-col :span="4">
            <span>押金转收入总金额/元：</span>
            <span></span>
          </el-col>
        </el-row>
        <el-table :data="listData" border style="width: 100%; margin-top: 20px">
          <el-table-column align="center" fixed prop="num" label="序号" width="120"></el-table-column>
          <el-table-column align="center" prop="id" label="押金编号"></el-table-column>
          <el-table-column align="center" prop="name" label="到款账户" width="120"></el-table-column>
          <el-table-column align="center" prop="proManager" label="到款种类"></el-table-column>
          <el-table-column align="center" prop="saleManager" label="汇款方"></el-table-column>
          <el-table-column align="center" prop="proPerson" label="认款类型"></el-table-column>
          <el-table-column align="center" prop="accountStatus" label="认款金额/元" width="140"></el-table-column>
          <el-table-column align="center" prop="createTime" label="认款人" width="120"></el-table-column>
          <el-table-column align="center" prop="num" label="认款时间" width="170"></el-table-column>
          <el-table-column align="center" prop="id" label="待退回金额/元" width="140"></el-table-column>
          <el-table-column align="center" prop="num" label="退回中押金/元" width="180"></el-table-column>
          <el-table-column align="center" prop="id" label="已退回押金/元" width="140"></el-table-column>
          <el-table-column align="center" prop="id" label="操作" width="140">
              <tempalte>
                  <span>退押金</span>
                  <span>操作记录</span>
                
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
.deposit .el-form-item {
  display: inline-block;
  vertical-align: top;
}
.deposit .time .el-form-item__label{
    width:130px !important;
}
.deposit .time .el-form-item__content{
    margin-left:140px;
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