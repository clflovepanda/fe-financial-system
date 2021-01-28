<template>
<div>

  <el-table :data="getNewProjectList" border style="width: 100%; margin-top: 20px">
    <el-table-column align="center" fixed prop="projectId" label="序号" width="120"></el-table-column>
    <el-table-column align="center" prop="code" label="项目编号"></el-table-column>
    <el-table-column align="center" prop="name" label="项目名称">
      <template slot-scope="scope">
        <el-button @click="handleProjectName(scope.row)" type="text" size="small">{{scope.row.name}}</el-button>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="managerName" label="项目经理"></el-table-column>
    <el-table-column align="center" prop="salesName" label="销售经理"></el-table-column>
    <el-table-column align="center" prop="userNames" label="项目成员"></el-table-column>
    <el-table-column align="center" prop="takeTime" label="花费工时/时"></el-table-column>
    <el-table-column align="center" prop="ctime" label="项目创建时间"></el-table-column>
    <el-table-column align="center" prop="startDate" label="项目开始时间"></el-table-column>
    <el-table-column align="center" prop="endDate" label="项目结束时间"></el-table-column>
    <el-table-column align="center" prop="settlementIncome" label="结算收入"></el-table-column>
    <el-table-column align="center" prop="relRevenue" label="大收"></el-table-column>
    <el-table-column align="center" prop="relExpenditure" label="大支"></el-table-column>
    <el-table-column align="center" prop="projectProfit" label="项目毛利润"></el-table-column>
    <el-table-column align="center" prop="projectRate" label="项目毛利率/%">
      <template slot-scope="scope">
        <span>{{scope.row.projectRate}} %</span>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="saleCommisState" label="销售提成发放状态">
      <template slot-scope="scope">
        <span v-if="scope.row.saleCommisState == 0">未发放</span>
        <span v-if="scope.row.saleCommisState == 1">部分发放</span>
        <span v-if="scope.row.saleCommisState == 2">全部发放</span>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="settlementState" label="结算状态">
      <template slot-scope="scope">
        {{scope.row.settlementState == 0 ? "未结算" : "已结算"}}
      </template>
    </el-table-column>
    <el-table-column align="center" prop="state" label="项目状态">
      <template slot-scope="scope">
        <span v-if="scope.row.state == 1">待审核</span>
        <span v-if="scope.row.state == 2">已生效</span>
        <span v-if="scope.row.state == 3">已驳回</span>
        <span v-if="scope.row.state == 4">取消</span>
        <span v-if="scope.row.state == 5">已完成</span>
        <span v-if="scope.row.state == 6">已关闭</span>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="" width="120" label="操作" v-if="passStatus != 1">
      <template slot-scope="scope">
        <a v-if="passStatus != 1 && checkNowUserRole('project_audit')" href="#" @click="audit(scope, 1)">通过</a>
        <a v-if="passStatus != 1 && checkNowUserRole('project_notaudit')" href="#" @click="audit(scope, 2)">拒绝</a>
      </template>
    </el-table-column>
  </el-table>
  <el-row style="margin-top:20px">
    <el-col :span="24" style="text-align:right">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 50]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="getTotal">
    </el-pagination>
    </el-col>
  </el-row>
</div>
</template>

<script>
import NetReqUser from "../../network/NetReqUser"
import axios from "axios";

export default {
  props: ["passStatus"],
  data() {
    return {
      currentPage: 1
    };
  },
  computed: {
    checkNowUserRole(){
      return function(name) {
        return this.$store.state.userData.nowUserRole.indexOf(name) > -1;
      }
    },
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
    },
    getNewProjectList() {
      if(this.passStatus) {
        return this.$store.state.projectData.projectPassTable.list;
      } else {
        return this.$store.state.projectData.projectRejectTable.list;
      }
    },
    getTotal() {
      if(this.passStatus) {
        return this.$store.state.projectData.projectPassTable.total;
      } else {
        return this.$store.state.projectData.projectRejectTable.total;
      }
    }
  },
  methods: {
    handleCurrentChange(data){
      if (this.passStatus) {
        this.$store.commit("projectData/setProjectPassPageAndSize", {pageNum: data});
        let temp = {
          pageSize: this.$store.state.projectData.projectPassTable.pageSize,
          pageNum: this.$store.state.projectData.projectPassTable.pageNum
        }
        axios.get("/api/project/list?auditing_state=1&limit=" + temp.pageSize + "&offset=" + temp.pageNum).then(
          (rep) => {
            if (rep && rep.data) {
              let tempPass = {
                list: rep.data.data,
                total: rep.data.count,
                pageSize: temp.pageSize,
                pageNum: temp.pageNum,
              }
              this.$store.commit("projectData/setProjectPassList", tempPass);
            }
          },
          () => {}
        );
      } else {
        console.log("拒绝");
        this.$store.commit("projectData/setProjectRejectPageAndSize", {pageNum: data});
        let temp = {
          pageSize: this.$store.state.projectData.projectRejectTable.pageSize,
          pageNum: this.$store.state.projectData.projectRejectTable.pageNum
        }
        axios.get("/api/project/list?auditing_state=2&limit=" + temp.pageSize + "&offset=" + temp.pageNum).then(
          (rep) => {
            if (rep && rep.data) {
              let tempReject = {
                list: rep.data.data,
                total: rep.data.count,
                pageSize: temp.pageSize,
                pageNum: temp.pageNum,
              }
              this.$store.commit("projectData/setProjectRejectList", tempReject);
            }
          },
          () => {}
        );
      }
    },
    handleSizeChange(data){
      console.log(data);
    },
    audit(scope, state) {
      let param = {
        id: scope.row.projectId,
        auditing_state: state
      }
      axios.get("/api/project/project_audit", {
        params: param
      }).then(
          (rep) => {
            if (rep.data.code == 0) {
              if (state == 1) {
                this.$message.success("项目审核成功")
              }
              if (state == 2) {
                this.$message.success("项目已驳回")
              }
            } else {
              this.$message.error("接口有误，请联系后台处理")
              return ;
            }
            axios.get("/api/project/list?auditing_state=1&limit=5&offset=1").then(
              (rep) => {
                if (rep && rep.data) {
                  let projectPassListResult = {
                    data: rep.data.data,
                    count: rep.data.count
                  };
                  console.log("project pass list", projectPassListResult);
                  if(projectPassListResult == null) {
                    projectPassListResult = {
                      data: [],
                      total: 0
                    }
                  }
                  let tempPass = {
                    list: projectPassListResult.data,
                    total: projectPassListResult.count,
                    pageSize: 5,
                    pageNum: 1,
                  }
                  this.$store.commit("projectData/setProjectPassList", tempPass);

                }
              },
              () => {}
            );

            axios.get("/api/project/list?auditing_state=2&limit=10&offset=1").then(
              (rep) => {
                if (rep && rep.data) {
                  let projectRejectListResult = {
                    data: rep.data.data,
                    count: rep.data.count
                  };
                  console.log("project reject list", projectRejectListResult);
                  if (projectRejectListResult == null) {
                    projectRejectListResult = {
                      data: [],
                      total: 0
                    }
                  }
                  let tempReject = {
                    list: projectRejectListResult.data,
                    total: projectRejectListResult.count,
                    pageSize: 5,
                    pageNum: 1
                  }
                  this.$store.commit("projectData/setProjectRejectList", tempReject);
                }
              },
              () => {}
            );
          },
          () => {}
        );
    },
    handleProjectName(val) {
      this.$store.commit("projectData/setViewProjectId", val.projectId);
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
        ts.$store.commit("projectData/setEditProject", result);

        let expenditureResult = await axios.get("/api/expenditure/list?projectId=" + val.projectId).then(
          (rep) => {
            if (rep && rep.data) {
              return rep.data;
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

        let receivableResult = await axios.get("/api/invoice/list?projectId=" + val.projectId).then(
          (rep) => {
            if (rep && rep.data) {
              return rep.data.data;
            }
          },
          () => {}
        );
        console.log("receivable data", receivableResult);
        ts.$store.commit("projectData/setReceivableList", receivableResult);
      })(this);
      this.$router.push("/viewProject?projectId=" + val.projectId);
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
        auditDate: "",
        saleCommisState: "",
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
        projectDetail.saleCommisState = projectEntity.saleCommisState;
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
          projectDetail.auditState = detail.projectAuditLog.auditType;
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
