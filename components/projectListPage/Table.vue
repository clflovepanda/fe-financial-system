<template>
  <el-table :data="getProjectList" border style="width: 100%; margin-top: 20px">
    <el-table-column align="center" fixed prop="projectId" label="序号" width="120"></el-table-column>
    <el-table-column align="center" prop="code" label="项目编号"></el-table-column>
    <el-table-column align="center" prop="fullname" label="项目名称">
      <template slot-scope="scope">
        <el-button @click="handleProjectName(scope.row)" type="text" size="small">{{scope.row.fullname}}</el-button>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="managerName" label="项目经理"></el-table-column>
    <el-table-column align="center" prop="salesName" label="销售经理"></el-table-column>
    <el-table-column align="center" prop="userNames" label="项目成员"></el-table-column>
    <el-table-column align="center" prop="takeTime" label="花费工时/时" width="120"></el-table-column>
    <el-table-column align="center" prop="ctime" label="项目创建时间" width="120"></el-table-column>
    <el-table-column align="center" prop="startDate" label="项目开始时间" width="180"></el-table-column>
    <el-table-column align="center" prop="endDate" label="项目结束时间" width="180"></el-table-column>
    <el-table-column align="center" prop="id" label="结算收入/结算支出" width="160">
      <template slot-scope="scope">
        {{scope.row.settlementIncome}}/{{scope.row.settlementExpenses}}
      </template>
    </el-table-column>
    <el-table-column align="center" prop="proManager" label="收付款收入/收付款支出" width="170">
      <template slot-scope="scope">
        {{scope.row.paymentIncome}}/{{scope.row.paymentExpenses}}
      </template>
    </el-table-column>
    <el-table-column align="center" prop="" label="收付款利润率" width="120"></el-table-column>
    <el-table-column align="center" prop="" label="项目毛利率/%" width="120"></el-table-column>
    <el-table-column align="center" prop="saleCommisState" label="销售提成发放状态" width="140"></el-table-column>
    <el-table-column align="center" prop="settlementState" label="结算状态">
      <template slot-scope="scope">
        {{scope.row.settlementState == 0 ? "未结算" : "已结算"}}
      </template>
    </el-table-column>
    <el-table-column align="center" prop="state" label="项目状态"></el-table-column>
  </el-table>
</template>

<script>
import NetReqUser from "../../network/NetReqUser"
import axios from "axios";

export default {
  props: ["passStatus"],
  data() {
    return {
    };
  },
  computed: {
    getProjectList() {
      if(this.passStatus) {
        return this.$store.state.projectData.projectList.filter(function(item) {
          if (item.auditingState == 1) {
            return item;
          }
        });
      } else {
        return this.$store.state.projectData.projectList.filter(function(item) {
          if (item.auditingState != 1) {
            return item;
          }
        });
      }
    }
  },
  methods: {
    handleProjectName(val) {
      // this.$store.commit("projectData/setViewProjectId", val.projectId);
      (async function(ts){
        let result = await axios.get("/api/project/project_detail?id=" + val.projectId).then(
          (rep) => {
            if (rep && rep.data) {
              return rep.data.data;
            }
          },
          () => {}
        );
        console.log("project detail", result);
        ts.generateProjectDetail(result);
        ts.generateProjectFinancial(result);

        let expenditureResult = await axios.get("/api/expenditure/list?projectId=" + val.projectId).then(
          (rep) => {
            if (rep && rep.data) {
              return rep.data.data;
            }
          },
          () => {}
        );
        console.log("pay data", expenditureResult);
        ts.$store.commit("projectData/setProjectPay", expenditureResult);

        let quotationResult = await axios.get("/api/quotation/list?projectId=" + val.projectId).then(
          (rep) => {
            if (rep && rep.data) {
              return rep.data.data;
            }
          },
          () => {}
        );
        console.log("quotation data", quotationResult);
        ts.$store.commit("projectData/setQuotationList", quotationResult);

        let contractResult = await axios.get("/api/contract/list?projectId=" + val.projectId).then(
          (rep) => {
            if (rep && rep.data) {
              return rep.data.data;
            }
          },
          () => {}
        );
        console.log("contract data", contractResult);
        ts.$store.commit("projectData/setContractList", contractResult);

        let settlementResult = await axios.get("/api/settlement/list?projectId=" + val.projectId).then(
          (rep) => {
            if (rep && rep.data) {
              return rep.data.data;
            }
          },
          () => {}
        );
        console.log("settlement data", settlementResult);
        ts.$store.commit("projectData/setSettlementList", settlementResult);

      })(this);
      this.$router.push("/viewProject");
    },
    generateProjectDetail(detail) {
      let projectDetail = {
        projectName: "",
        className: "",
        code: "",
        date: "",
        salesName: "",
        projectLeader: "",
        userNames: "",
        company: "",
        createUserName: "",
        ctime: "",
        auditName: "",
        auditDate: ""
      };
      if(detail && detail.projectEntities && detail.projectEntities.length > 0) {
        let projectEntity = detail.projectEntities[0];
        projectDetail.projectName = projectEntity.name;
        projectDetail.className = "";
        projectDetail.code = projectEntity.code;
        projectDetail.date = projectEntity.startDate + "~" + projectEntity.endDate;
        projectDetail.company = projectEntity.company;
        projectDetail.createUserName = projectEntity.createUserName;
        projectDetail.ctime = projectEntity.ctime;
        projectDetail.description = projectEntity.description;
        projectDetail.status = projectEntity.state;
        projectDetail.dataSourceName = projectEntity.dataSourceName;
        if (detail.projectUserEntities && detail.projectUserEntities.length > 0) {
          for (let i = 0 ; i < detail.projectUserEntities.length ; i ++) {
            //1：销售负责人；2：项目负责人；3：项目成员
            if(detail.projectUserEntities[i].type == 1) {
              projectDetail.salesName = detail.projectUserEntities[i].username;
            }
            if(detail.projectUserEntities[i].type == 2) {
              projectDetail.projectLeader = detail.projectUserEntities[i].username;
            }
            if(detail.projectUserEntities[i].type == 3) {
              projectDetail.userNames += detail.projectUserEntities[i].username + "; ";
            }
          }
        }
        if (detail.projectAuditLog) {
          projectDetail.auditName = detail.projectAuditLog.createUserName;
          projectDetail.auditDate = detail.projectAuditLog.ctime;
          projectDetail.auditState = detail.projectAuditLog.state;
        }
      }
      this.$store.commit("projectData/setProjectDetail", projectDetail);
    },
    generateProjectFinancial(detail) {
      if (detail.financial) {
        console.log("project financial", detail.financial);
        this.$store.commit("projectData/setProjectFinancial", detail.financial);
      }
    },
    handleProTime: (val) => {
    },
  },
};
</script>