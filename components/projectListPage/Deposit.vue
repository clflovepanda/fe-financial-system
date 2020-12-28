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
            <el-input v-model="ruleForm.revenueNo" placeholder="请输入押金编号"></el-input>
          </el-form-item>
            <el-form-item label="项目名称" prop="name">
            <el-input v-model="ruleForm.projectName" placeholder="请输入项目名称"></el-input>
          </el-form-item>

            <el-form-item label="项目编号" prop="proId">
            <el-input v-model="ruleForm.projectNo" placeholder="请输入项目编号"></el-input>
          </el-form-item>

          <el-form-item label="到款账户" prop="">
            <el-select v-model="ruleForm.companyId" placeholder="请选择到款账户">
              <el-option v-for="item in $store.state.incomeData.accountList" :key="item.value" :label="item.label" :value="item.value" ></el-option>
            </el-select>
          </el-form-item>
        
          <el-form-item label="到款种类" prop="">
            <el-select v-model="ruleForm.receivementTypeId" placeholder="请选择到款种类">
              <el-option v-for="item in $store.state.incomeData.incomeTypeList" :key="item.value" :label="item.label" :value="item.value" ></el-option>
            </el-select>
          </el-form-item>

          

          <el-form-item label="汇款方" prop="person">
            <el-input v-model="ruleForm.remitter" placeholder="请输入查找汇款方"></el-input>
          </el-form-item>

          <el-form-item label="认款人" prop="name">
            <el-input v-model="ruleForm.createUser" placeholder="请输入查找认款人"></el-input>
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
          <el-table-column align="center" type="index" label="序号" width="120"></el-table-column>
          <el-table-column align="center" prop="revenueNo" label="押金编号"></el-table-column>
          <el-table-column align="center" prop="coName" label="到款账户" width="120"></el-table-column>
          <el-table-column align="center" prop="receivementTypeName" label="到款种类"></el-table-column>
          <el-table-column align="center" prop="remitter" label="汇款方"></el-table-column>
          <el-table-column align="center" prop="remitter"  label="认款类型">
            <!-- <template slot-scope="scope">
              <div>
                  <span>押金</span>
              </div>
                
            </template> -->
          </el-table-column>
          <el-table-column align="center" prop="cnyMoney" label="认款金额/元" width="140"></el-table-column>
          <el-table-column align="center" prop="username" label="认款人" width="120"></el-table-column>
          <el-table-column align="center" prop="ctime" label="认款时间" width="170"></el-table-column>
          <el-table-column align="center" prop="toBeReturned" label="待退回金额/元" width="140"></el-table-column>
          <el-table-column align="center" prop="returning" label="退回中押金/元" width="180"></el-table-column>
          <el-table-column align="center" prop="returned" label="已退回押金/元" width="140"></el-table-column>
          <el-table-column align="center" prop="id" label="操作" width="140">
            <template slot-scope="scope">
              <el-button  type="text" size="small" :disabled="scope.row.toBeReturned==0">退押金</el-button>
              <el-button  type="text" size="small">操作记录</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Table from "~/components/projectListPage/Table.vue";
import axios from 'axios';
export default {
  data() {
    return {
      ruleForm: {
        revenueNo: "",
        projectName: "",
        projectNo: "",
        companyId: "",
        receivementTypeId: "",
        remitter: "",
        createUser: "",
        proDate: ['','']
      },

        rules: {
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
        },
      listData: [],
    };
  },
  mounted(){
    this.getlistData();

  },

  methods: {
    getlistData(){
      let startDt = this.ruleForm.proDate[0]?new Date(this.ruleForm.proDate[0]).getTime():''
      let endDt = this.ruleForm.proDate[1]?new Date(this.ruleForm.proDate[1]).getTime():''
      let project = ''
      if(this.$route.name != 'depositmanage'){
        project = '&projectId=' + this.$store.state.projectData.viewProjectId
      }
      let message = 
       "?revenueNo=" + this.ruleForm.revenueNo 
       + project
       + "&projectName=" + this.ruleForm.projectName 
       + "&projectNo=" + this.ruleForm.projectNo 
       + "&companyId=" + this.ruleForm.companyId 
       + "&receivementTypeId=" + this.ruleForm.receivementTypeId 
       + "&remitter=" + this.ruleForm.remitter 
       + "&createUser=" + this.ruleForm.createUser 
       + "&startDt=" + startDt
       + "&endDt=" + endDt
      axios.get('/api/deposit/list' + message).then((res)=>{
        console.log(res)
        if(res.data.code === 0){
          this.listData = res.data.data.deposit;
        }
      })

    },
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
      this.getlistData();
    },

    handleFindClick() {
      this.getlistData();
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