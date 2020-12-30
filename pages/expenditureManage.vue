
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
              <el-option label="凭借款" value="6"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4" style="text-align:center">
            <el-button type="primary" @click="submitForm">搜索</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-col>
        </el-row>
    <el-divider></el-divider>
    <el-table :data="getAllPay" border style="width: 100%; margin-top: 20px" id="out-table">
          <el-table-column align="center" prop="expenditureId" label="序号"></el-table-column>
          <el-table-column align="center" prop="numbering" label="支出编号"></el-table-column>
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
          <el-table-column align="center" prop="expenditurePurposeContent" label="用途"></el-table-column>
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
          <el-table-column align="center" prop="expenditureAuditLogs" label="工作流" width="140">
            <template slot-scope="scope">
              <el-button @click="handleView(scope)" type="text" size="small">{{getAuditType(scope.row.expenditureTypeId)}}</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="utime" label="操作" width="180">
            <template slot-scope="scope">
              <el-button @click="handleView(scope)" type="text" size="small">打印</el-button>
              <el-button @click="handleView(scope)" type="text" size="small">修改</el-button>
              <el-button @click="handleView(scope)" type="text" size="small">删除</el-button>
              <el-button @click="handleView(scope)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>

  </div>
</template>

<script>
import axios from 'axios';
import Deposit from "~/components/projectListPage/Deposit.vue";
import CookieUtil from "~/utils/CookieUtil";
import {EnumAccount, EnumOutputType, EnumPayType, EnumAuditType} from "../utils/EnumUtil"

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
    }
  },
  computed: {
    getAllPay() {
      return this.$store.state.expenditureData.allExpenditureList;
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
        return EnumAuditType.getMsg(value);
      }
    },
    getRealAuditType() {
      return function(value) {
        return EnumAuditType.getMsg(value);
      }
    },
  },
  methods: {
    handleView() {
      
    },
    submitForm() {
      axios.get('/api/expenditure/list', {
        params: this.ruleForm
      }).then( (response) => {
          if(response.data.code == 0){
            this.$store.commit("expenditureData/setAllExpenditureList", response.data.data);
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
      this.ruleForm.numbering = "";
      this.ruleForm.keyWord = "";
      this.ruleForm.expenditureMethodId = "";
      this.ruleForm.username = "";
      this.ruleForm.state = "";
    }
  },
  async asyncData(ctx) {
    if(!CookieUtil.existCookie("user_id")) {
      location.href = "/";
    }
    let expenditureResult = await axios.get("/api/expenditure/list").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data.data;
        }
      },
      () => {}
    );
    console.log("expenditure", expenditureResult);
    ctx.store.commit("expenditureData/setAllExpenditureList", expenditureResult);
  }
};

</script>