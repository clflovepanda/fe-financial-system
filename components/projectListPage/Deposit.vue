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

          <el-form-item label="认款时间" required class="time">
            <el-date-picker
              v-model="ruleForm.proDate"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>

          <el-form-item class="button-wrap">
            <el-button type="primary" @click="handleFindClick()">查询</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>

        <el-row :class="[(projectDetail && checkNowUserRole('project_deposit_export') || !projectDetail && checkNowUserRole('deposit_export')) ? '':'disRoleMenu']">
          <el-col :span="4" :offset="20">
            <el-button type="primary" @click="handleExcel()" :disabled="projectDetail && getProjectDetailData.status == 6">导出excel</el-button>
          </el-col>
        </el-row>

        <el-row style="margin-top: 10px; height: 40px; background: lightgray; line-height: 40px; text-align:center">
          <el-col :span="6">
            <span>全部押金金额/元：</span>
            <span>{{statistics.allDeposit}}</span>
          </el-col>
          <el-col :span="6">
            <span>待退回总押金/元:</span>
            <span>{{statistics.approval}}</span>
          </el-col>
          <el-col :span="6">
            <span>退回审批中押金总金额/元：</span>
            <span>{{statistics.toBeReturned}}</span>
          </el-col>
          <el-col :span="6">
            <span>已退回押金总金额/元：</span>
            <span>{{statistics.returned}}</span>
          </el-col>
        </el-row>
        <el-table :data="listData" border style="width: 100%; margin-top: 20px" id="#out-table">
          <el-table-column align="center" prop="id" label="序号"></el-table-column>
          <el-table-column align="center" prop="revenueNo" label="押金编号"></el-table-column>
          <el-table-column align="center" prop="coName" label="到款账户"></el-table-column>
          <el-table-column align="center" prop="receivementTypeName" label="到款种类"></el-table-column>
          <el-table-column align="center" prop="remitter" label="汇款方"></el-table-column>
          <el-table-column align="center" prop="revenueTypeName"  label="认款类型"></el-table-column>
          <el-table-column align="center" prop="cnyMoney" label="认款金额/元"></el-table-column>
          <el-table-column align="center" prop="username" label="认款人"></el-table-column>
          <el-table-column align="center" prop="ctime" label="认款时间"></el-table-column>
          <el-table-column align="center" prop="toBeReturned" label="待退回金额/元">
            <template slot-scope="scope">
              {{getMoneyOne(scope.row)}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="returning" label="退回中押金/元"></el-table-column>
          <el-table-column align="center" prop="returned" label="已退回押金/元"></el-table-column>
          <el-table-column align="center" prop="id" label="操作" width="140">
            <template slot-scope="scope">
              <el-button  type="text" size="small" :disabled="scope.row.returned>0 || scope.row.revenueTypeName == '收回押金' || projectDetail && getProjectDetailData.status == 6" @click="backMoney(scope)" :class="[(projectDetail && checkNowUserRole('project_deposit_add') || !projectDetail && checkNowUserRole('deposit_add')) ? '':'disRoleMenu']">退押金</el-button>
              <el-button  type="text" size="small" :disabled="scope.row.revenueTypeName == '收回押金' || projectDetail && getProjectDetailData.status == 6" @click="depositeLog(scope)" :class="[(projectDetail && checkNowUserRole('project_deposit_detail') || !projectDetail && checkNowUserRole('deposit_detail')) ? '':'disRoleMenu']">操作记录</el-button>
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
                :total="total"
              ></el-pagination>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <CreatePayDialog :showCreatPay="showCreatePay" :editObj="editObj" :showType="showType"/>
    <DepositLogDialog />
  </el-container>
</template>

<script>
import Table from "~/components/projectListPage/Table.vue";
import CreatePayDialog from "~/components/projectListPage/CreatePayDialog.vue";
import DepositLogDialog from "~/components/projectListPage/DepositLogDialog.vue";
import axios from 'axios';
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  props: ["projectDetail"],
  data() {
    return {
      ruleForm: {
        id: "",
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
      },
      listData: [],
      total: 0,
      currentPage: 1,
      showCreatePay: 0,
      editObj: {},
      showType: 1, //1创建，2修改，3删除
      statistics:{}
    };
  },
  computed: {
    getProjectDetailData() {
      console.log(this.$store.state.projectData.projectDetail);
      return this.$store.state.projectData.projectDetail;
    },
    checkNowUserRole(){
      return function(name) {
        return this.$store.state.userData.nowUserRole.indexOf(name) > -1;
      }
    },
    getMoneyOne(){
      return function(row) {
        if(row.toBeReturned == null && row.returning == null && row.returned == null) {
          return row.cnyMoney;
        } else {
          return row.toBeReturned;
        }
      }
    },
    getDepositeData() {
      return this.$store.state.depositeData.depositeData;
    }
  },
  watch: {
    getDepositeData(val, oldVal) {
      this.listData = val;
    }
  },
  mounted(){
    this.getlistData(1);

  },

  methods: {
    handleSizeChange() {},
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getlistData(page);
    },
    depositeLog(scope) {
      console.log(scope.row);
      axios.get('/api/deposit/detail?revenueId=' + scope.row.id).then((res)=>{
        console.log(res)
        if(res.data.code === 0){
          this.$store.commit("depositeData/setDepositeLogData", res.data.data.expenditure);
        }
      });
      this.$store.commit("depositeData/setDepositeSelected", scope.row);
      if (this.$store.state.dialogSwitchData.showDepositLogDialog) {
        this.$store.commit("dialogSwitchData/setShowDepositLogDialog", false);
      } else {
        this.$store.commit("dialogSwitchData/setShowDepositLogDialog", true);
      }
    },
    backMoney(scope) {
      console.log("点击退押金", scope.row);
      this.$store.commit("expenditureData/setRevenueId", scope.row.id);
      this.$store.commit("projectData/setViewProjectId", scope.row.projectId);
      // this.$store.commit("dialogSwitchData/setCreatePayDialogShow", true);
      this.showType = 1;
      this.showCreatePay += 1;
    },
    showCreatePayDialog() {
      this.$store.commit("dialogSwitchData/setCreatePayDialogShow", true);
    },
    getlistData(page){
      if(!page) {
        page = 1;
      }
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
       + "&limit=5&offset=" + page
      axios.get('/api/deposit/list' + message).then((res)=>{
        console.log(res)
        if(res.data.code === 0){
          this.listData = res.data.data.deposit;
          this.total = res.data.data.count;
          this.statistics = res.data.data.statistic;
          console.log(this.statistics)
        }
      })
    },
    resetForm(formName) {
      this.ruleForm = {
        revenueNo: "",
        projectName: "",
        projectNo: "",
        companyId: "",
        receivementTypeId: "",
        remitter: "",
        createUser: "",
        proDate: ['','']
      };
      this.getlistData();
    },
    handleFindClick() {
      this.getlistData();
      console.log("查询项目");
    },
    handleAddPay() {},
    handleExcel() {
      console.log("导出Excel");
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
       + "&endDt=" + endDt;
      //  window.location = "/api/export/deposit" + message;
      axios.get('/api/export/deposit' + message).then((res)=>{
        if(res.data.code === 0){
          console.log("export deposit", res.data.url);
          window.location = res.data.url;
        }
      })

    },
  },
};
</script>

<style>
.deposit .el-form-item {
  display: inline-block;
  vertical-align: top;
}
.deposit .time .el-form-item__label{
    width:80px !important;
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
