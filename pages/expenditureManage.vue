
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="breadcrumb">位置</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb">财务</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb" :to="{ path: '/description' }"
        >支出管理</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-row>
          <el-col :span="2" class="labelSty"><span class="labelSty">公司:</span></el-col>
          <el-col :span="3">
            <el-select v-model="ruleForm.companyId" placeholder="请选择公司">
              <el-option label="亚讯" value="1"></el-option>
              <el-option label="医通捷" value="2"></el-option>
              <el-option label="新锐" value="3"></el-option>
              <el-option label="医点通" value="4"></el-option>
              <el-option label="现金到款" value="5"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" class="labelSty"><span class="labelSty">项目编号:</span></el-col>
          <el-col :span="3">
            <el-input v-model="ruleForm.projectNo" placeholder="请输入项目编号"></el-input>
          </el-col>
          <el-col :span="2" class="labelSty"><span class="labelSty">项目名称:</span></el-col>
          <el-col :span="3">
            <el-input v-model="ruleForm.projectName" placeholder="请输入项目名称"></el-input>
          </el-col>
          <el-col :span="2" class="labelSty"><span class="labelSty">支出方式:</span></el-col>
          <el-col :span="3">
            <el-select v-model="ruleForm.expenditureMethodId" placeholder="请选择支出方式">
              <el-option label="现金" value="1"></el-option>
              <el-option label="电汇" value="2"></el-option>
              <el-option label="差旅" value="3"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="2" class="labelSty"><span class="labelSty">申请人:</span></el-col>
          <el-col :span="3">
            <el-input v-model="ruleForm.username" placeholder="请输入申请人姓名"></el-input>
          </el-col>
          <el-col :span="2" class="labelSty"><span class="labelSty">最新状态:</span></el-col>
          <el-col :span="3">
            <el-select v-model="ruleForm.state" placeholder="请选择最新状态">
              <el-option label="未提交" value="0"></el-option>
              <el-option label="已提交" value="1"></el-option>
              <el-option label="审核中" value="2"></el-option>
              <el-option label="被驳回" value="3"></el-option>
              <el-option label="已支付" value="4"></el-option>
              <el-option label="作废" value="5"></el-option>
              <el-option label="平借款" value="6"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4" style="text-align:center">
            <el-button type="primary" @click="submitForm">查询</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-col>
        </el-row>
    <el-divider></el-divider>
    <el-row :class="[checkNowUserRole('expenditure_export') ? '':'disRoleMenu']">
      <el-button type="primary" @click="down">导出Excel</el-button>
    </el-row>
    <el-row style="margin-top:20px; background: lightgray; height: 40px; line-height: 40px; text-align:center">
        已提交总计/元：{{getStatistic.submitted}}&nbsp;&nbsp;&nbsp;&nbsp;
        财务未审批总计/元： {{getStatistic.notApproved}} &nbsp;&nbsp;&nbsp;&nbsp;
        已支付总计/元：{{getStatistic.paid}} &nbsp;&nbsp;&nbsp;&nbsp;
        票据作废总计/元：{{getStatistic.cancel}} &nbsp;&nbsp;&nbsp;&nbsp;
        平借款总计/元：{{getStatistic.flatLoan}}
    </el-row>
    <el-table :data="getAllPayList" border style="width: 100%; margin-top: 20px" id="out-table">
          <el-table-column align="center" prop="expenditureId" label="序号"></el-table-column>
          <el-table-column align="center" prop="numbering" label="支出编号"></el-table-column>
          <el-table-column align="center" prop="projectNo" label="项目编号"></el-table-column>
          <el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>
          <el-table-column align="center" prop="coName" label="公司" width="120"></el-table-column>
          <el-table-column align="center" prop="expenditureMethodId" label="支付方式">
            <template slot-scope="scope">
              {{getPayType(scope.row.expenditureMethodId)}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="支出类型">
            <template slot-scope="scope">
              {{getOutputType(scope.row.expenditureTypeId)}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="expenditurePurposeName" label="用途"></el-table-column>
          <el-table-column align="center" prop="beneficiaryUnit" label="收款人单位" width="140"></el-table-column>
          <el-table-column align="center" prop="expenditureMoney" label="金额/元" width="120"></el-table-column>
          <el-table-column align="center" prop="username" label="申请人" width="120"></el-table-column>
          <el-table-column align="center" prop="ctime" label="创建时间" width="170"></el-table-column>
          <el-table-column align="center" prop="state" label="最新状态" width="140">
            <template slot-scope="scope">
              {{getRealAuditType(scope.row.state)}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="utime" label="最新状态时间" width="180"></el-table-column>
          <el-table-column align="center" prop="expenditureAuditLogs" label="工作流" width="140" :class="[checkNowUserRole('expenditure_approval') ? '':'disRoleMenu']">
            <template slot-scope="scope">
              <el-button @click="audit(scope)" type="text" size="small">{{getAuditType(scope.row.state)}}</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="utime" label="操作" width="180">
            <template slot-scope="scope">
              <el-button @click="printPay(scope)" type="text" size="small" :disabled="scope.row.state>3" :class="[checkNowUserRole('expenditure_print') ? '':'disRoleMenu']">打印</el-button>
              <el-button @click="editPay(scope)" type="text" size="small" :disabled="scope.row.state>3" :class="[checkNowUserRole('expenditure_update') ? '':'disRoleMenu']">修改</el-button>
              <el-button @click="delPay(scope)" type="text" size="small" :disabled="scope.row.state>3" :class="[checkNowUserRole('expenditure_del') ? '':'disRoleMenu']">删除</el-button>
              <el-button @click="viewPay(scope)" type="text" size="small">查看</el-button>
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
                :total="getAllPayCount"
              ></el-pagination>
            </div>
          </el-col>
        </el-row>
  <CreatePayDialog :showCreatPay="showCreatePay" :editObj="editObj" :showType="showType"/>
  <AuditDialog />
  <PringPayDialog :showVis="showVis"/>
  </div>
</template>

<script>
import axios from 'axios';
import Deposit from "~/components/projectListPage/Deposit.vue";
import CookieUtil from "~/utils/CookieUtil";
import {EnumAccount, EnumOutputType, EnumPayType, EnumAuditType} from "../utils/EnumUtil"
import NetReqUser from "../network/NetReqUser";
import CreatePayDialog from "~/components/projectListPage/CreatePayDialog.vue";
import AuditDialog from "~/components/projectListPage/AuditDialog.vue";
import PringPayDialog from "~/components/projectListPage/PringPayDialog.vue";

export default {
  data() {
    return {
      ruleForm: {
        companyId: "",
        projectNo: "",
        projectName: "",
        expenditureMethodId: "",
        username: "",
        state: ""
      },
      currentPage: 1,
      showVis: 0,
      showCreatePay: 0,
      editObj: {},
      showType: 1, //1创建，2修改，3删除
      statistics: {}
    }
  },
  computed: {
    getStatistic() {
      return this.$store.state.expenditureData.allExpenditureList.statistics;
    },
    checkNowUserRole(){
      return function(name) {
        return this.$store.state.userData.nowUserRole.indexOf(name) > -1;
      }
    },
    getAllPayList() {
      return this.$store.state.expenditureData.allExpenditureList.list;
    },
    getAllPayCount() {
      return this.$store.state.expenditureData.allExpenditureList.total;
    },
    getOutputType() {
      return function(value) {
        return EnumOutputType.getMsg(value);
      }
    },
    getPayType() {
      return function(value) {
        return EnumPayType.getMsg(value);
      }
    },
    getAuditType() {
      return function(value) {
        if(value <= 3) {
          return "财务审批";
        }
        return EnumAuditType.getMsg(value);
      }
    },
    getRealAuditType() {
      return function(value) {
        return EnumAuditType.getMsg(value);
      }
    },
    auditDialogShow() {
      return this.$store.state.dialogSwitchData.auditDialogShow
    }
  },
  watch:{
    getAllPayList(val) {
      console.log("支付列表有变化", val);
    },
    auditDialogShow(val) {
      if (val == false) {
        this.submitForm();
      }
    }
  },
  methods: {
    down() {
      // this.ruleForm.projectId = this.$store.state.projectData.viewProjectId;
      // if (this.daterange != "") {
      //     let st = this.dateRange[0];
      //     let et = this.dateRange[1];
      //     this.ruleForm.startDt = st.getTime();
      //     this.ruleForm.endDt = et.getTime();
      //   }
      this.$message.success("请勿关闭浏览器，正在后台下载");
      axios.get("/api/export/expenditure", {
        params: this.ruleForm
      }).then(
        (rep) => {
          if (rep && rep.data) {
            console.log("export excel expenditure", rep.data);
            this.$message.success("下载成功");
            window.location = rep.data.url;
          }
        },
        () => {}
      );
    },
    handleSizeChange() {},
    handleCurrentChange(page) {
      this.currentPage = page;
      this.ruleForm.limit = 5;
      this.ruleForm.offset = this.currentPage;
      axios.get('/api/expenditure/list', {
        params: this.ruleForm
      }).then( (response) => {
          if(response.data.code == 0){
            console.log(response.data);
            this.$store.commit("expenditureData/setAllExpenditureList", response.data);
          }else{
            this.$message({
              message: response.data.msg,
              type: "error",
            });
          }
        })
    },
    handleView() {

    },
    submitForm() {
      this.ruleForm.limit = 5;
      this.ruleForm.offset = 1;
      axios.get('/api/expenditure/list', {
        params: this.ruleForm
      }).then( (response) => {
          if(response.data.code == 0){
            console.log(response.data);
            this.$store.commit("expenditureData/setAllExpenditureList", response.data);
          }else{
            this.$message({
              message: response.data.msg,
              type: "error",
            });
          }
        })
    },
    resetForm() {
      this.ruleForm.companyId = "";
      this.ruleForm.projectNo = "";
      this.ruleForm.projectName = "";
      this.ruleForm.expenditureMethodId = "";
      this.ruleForm.username = "";
      this.ruleForm.state = "";
    },
    printPay(scope) {
      console.log("即将打印的数据", scope);
      let printTemp = scope.row;
      this.$store.commit("projectData/setPringTemp", printTemp);
      let isShowPrint = this.$store.state.dialogSwitchData.printPayDialogShow;
      this.showVis = this.showVis + 1;
      // if (isShowPrint) {
      //   this.$store.commit("dialogSwitchData/setPrintPayDialogShow", false);
      // } else {
      //   this.$store.commit("dialogSwitchData/setPrintPayDialogShow", true);
      // }
    },
    editPay(scope) {
      this.showType = 2;
      this.showCreatePay += 1;
      this.editObj = scope.row;
    },
    delPay(scope) {
      console.log("删除", scope.row);
      axios.get("/api/expenditure/del?id=" + scope.row.expenditureId).then(
        (rep) => {
          if (rep && rep.data) {
            this.submitForm();
            // // this.ruleForm.projectId = this.$store.state.projectData.viewProjectId;
            // if (this.daterange != "") {
            //   let st = this.dateRange[0];
            //   let et = this.dateRange[1];
            //   this.ruleForm.startDt = st.getTime();
            //   this.ruleForm.endDt = et.getTime();
            // }
            // axios.get("/api/expenditure/list", {
            //   params: this.ruleForm
            // }).then(
            //   (resp) => {
            //     if (resp && resp.data) {
            //       this.$store.commit("projectData/setProjectPay", resp.data);
            //     }
            //   },
            //   () => {}
            // );
          }
        },
        () => {}
      );
    },
    viewPay(scope) {
      this.showType = 3;
      this.showCreatePay += 1;
      this.editObj = scope.row;
    },
    audit(scope) {
      console.log(scope.row);
      this.$store.commit("expenditureData/setAuditLog", scope.row);
      this.$store.commit("projectData/setPringTemp", scope.row);
      let isShow = this.$store.state.dialogSwitchData.auditDialogShow;
      if (isShow) {
        this.$store.commit("dialogSwitchData/setAuditDialogShow", false);
      } else {
        this.$store.commit("dialogSwitchData/setAuditDialogShow", true);
      }

    }
  },
  async asyncData(ctx) {
    if(!CookieUtil.existCookie("user_id")) {
      location.href = "/";
    }
    let nowUserRole = await NetReqUser.getNowUserRole();
    console.log("当前用户角色列表", nowUserRole);
    ctx.store.commit("userData/setNowUserRole", nowUserRole);
    let expenditureResult = await axios.get("/api/expenditure/list?limit=5&offset=1").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data;
        }
      },
      () => {}
    );
    console.log("expenditure", expenditureResult);
    ctx.store.commit("expenditureData/setAllExpenditureList", expenditureResult);

    let useTypeResult = await axios.get("/api/expenditure/gettype").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data.data;
        }
      },
      () => {}
    );
    console.log("user type", useTypeResult);
    ctx.store.commit("expenditureData/setExpenditurePurposeType", useTypeResult);
  }
};

</script>
