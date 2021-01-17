<template>
<div>
  <el-container class="container pay">
    <el-container>
      <el-main>
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
          <el-col :span="2" class="labelSty"><span class="labelSty">支出编号:</span></el-col>
          <el-col :span="3">
            <el-input v-model="ruleForm.numbering" placeholder="请输入支出编号"></el-input>
          </el-col>
          <el-col :span="2" class="labelSty"><span class="labelSty">支出方式:</span></el-col>
          <el-col :span="3">
            <el-select v-model="ruleForm.expenditureMethodId" placeholder="请选择支出方式">
              <el-option label="现金" value="1"></el-option>
              <el-option label="电汇" value="2"></el-option>
              <el-option label="差旅" value="3"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" class="labelSty"><span class="labelSty">支出类型:</span></el-col>
          <el-col :span="3">
            <el-select v-model="ruleForm.expenditureTypeId" placeholder="请选择支出类型">
              <el-option label="普通支出" value="1"></el-option>
              <el-option label="退押金" value="2"></el-option>
              <el-option label="押金及费用" value="3"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="rowSty">
          <!-- <el-col :span="2" class="labelSty"><span class="labelSty">收款人:</span></el-col>
          <el-col :span="3">
            <el-input v-model="ruleForm.imcomeName" placeholder="请输入查找收款人"></el-input>
          </el-col> -->
          <el-col :span="2" class="labelSty"><span class="labelSty">申请人:</span></el-col>
          <el-col :span="3">
            <el-input v-model="ruleForm.username" placeholder="请输入查找申请"></el-input>
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
          <el-col :span="2" class="labelSty"><span class="labelSty">工作流:</span></el-col>
          <el-col :span="3">
            <el-select v-model="ruleForm.expenditureAuditId" placeholder="请选择工作流">
              <el-select v-model="ruleForm.state" placeholder="请选择最新状态">
              <el-option label="已提交" value="1"></el-option>
              <el-option label="被驳回" value="3"></el-option>
              <el-option label="已支付" value="4"></el-option>
              <el-option label="作废" value="5"></el-option>
              <el-option label="凭借款" value="6"></el-option>
            </el-select>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="rowSty">
          <el-col :span="2" class="labelSty">
            <span class="labelSty">用途:</span>
            </el-col>
          <el-col :span="3">
            <el-input v-model="ruleForm.expenditurePurposeId" placeholder="请输入查找用途"></el-input>
          </el-col>
          <el-col :span="2" class="labelSty">
            <span class="labelSty">创建时间:</span>
          </el-col>
          <el-col :span="8">
            <el-date-picker
              v-model="daterange"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>

        <el-row>
          <el-col :span="8" :offset="16">
            <el-button type="primary" @click="showCreatePayDialog()">新增支出</el-button>
            <el-button type="primary" @click="handleExcel()">导出excel</el-button>
          </el-col>
        </el-row>

        <el-table :data="getProjectPay" border style="width: 100%; margin-top: 20px" id="out-table">
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
          <el-table-column align="center" prop="expenditurePurposeContent" label="用途">
            <template slot-scope="scope">
              {{getPurposeContent(scope)}}
            </template>
          </el-table-column>
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
              <el-button @click="audit(scope)" type="text" size="small">{{getAuditType(scope.row.state)}}</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="180">
              <template slot-scope="scope">
                <el-button @click="printPay(scope)" type="text" size="small" :disabled="scope.row.state>3">打印</el-button>
                <el-button @click="editPay(scope)" type="text" size="small" :disabled="scope.row.state>3">修改</el-button>
                <el-button @click="delPay(scope)" type="text" size="small" :disabled="scope.row.state>3">删除</el-button>
                <el-button @click="viewPay(scope)" type="text" size="small">查看</el-button>
                <!-- <el-button @click="printPay(scope)" type="text" size="small">查看</el-button> -->
              </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
  <CreatePayDialog :showCreatPay="showCreatePay" :editObj="editObj" :showType="showType"/>
  <AuditDialog />
  <PringPayDialog :showVis="showVis"/>
  </div>
</template>

<script>
import Table from "~/components/projectListPage/Table.vue";
import {EnumAccount, EnumOutputType, EnumPayType, EnumAuditType} from "../../utils/EnumUtil"
import CreatePayDialog from "~/components/projectListPage/CreatePayDialog.vue";
import AuditDialog from "~/components/projectListPage/AuditDialog.vue";
import PringPayDialog from "~/components/projectListPage/PringPayDialog.vue";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import axios from "axios";

export default {
  data() {
    return {
      ruleForm: {
        companyId: "",
        numbering: "",
        expenditureMethodId: "",
        expenditureTypeId: "",
        username: "",
        state: "",
        expenditureAuditId: "",
        expenditurePurposeId: "",
        startDt: "",
        endDt: "",
        projectId: ""
      },
      daterange: "",
      showVis: 0,
      showCreatePay: 0,
      editObj: {},
      showType: 1, //1创建，2修改，3删除
    };
  },
  computed: {
    getPurposeContent() {
      return function(scope) {
        return scope.row.expenditurePurposeId != null && scope.row.expenditurePurposeId > 0 ? 
        scope.row.expenditurePurposeName : scope.row.expenditurePurposeContent;
      }
    },
    getProjectPay() {
      console.log("project pay component", this.$store.state.projectData.projectPay);
      return this.$store.state.projectData.projectPay;
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
        if(value < 3) {
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
  },
  methods: {
    search() {
      this.ruleForm.projectId = this.$store.state.projectData.viewProjectId;
      if (this.daterange != "") {
          let st = this.dateRange[0];
          let et = this.dateRange[1];
          this.ruleForm.startDt = st.getTime();
          this.ruleForm.endDt = et.getTime();
        }
      axios.get("/api/expenditure/list", {
        params: this.ruleForm
      }).then(
        (rep) => {
          if (rep && rep.data) {
            console.log("pay data", rep.data.data);
            this.$store.commit("projectData/setProjectPay", rep.data.data);
          }
        },
        () => {}
      );
    },
    reset() {},
    handleFindClick() {
      console.log("查询项目");
    },
    showCreatePayDialog() {
      this.showType = 1;
      this.showCreatePay += 1;
      // this.$store.commit("dialogSwitchData/setCreatePayDialogShow", true);
    },
    handleExcel() {
      this.ruleForm.projectId = this.$store.state.projectData.viewProjectId;
      if (this.daterange != "") {
          let st = this.dateRange[0];
          let et = this.dateRange[1];
          this.ruleForm.startDt = st.getTime();
          this.ruleForm.endDt = et.getTime();
        }
      axios.get("/api/export/expenditure", {
        params: this.ruleForm
      }).then(
        (rep) => {
          if (rep && rep.data) {
            console.log("export excel expenditure", rep.data);
            window.location = rep.data.url;
          }
        },
        () => {}
      );
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

.labelSty {
  line-height: 40px;
  text-align: center;
}

.rowSty {
  margin-top: 10px;
}
</style>