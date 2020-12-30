<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="breadcrumb">位置</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb">项目列表</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb">查看项目</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
      <el-tab-pane label="项目信息" name="1">
        <el-row class="button-wrap">
          <el-col :span="10" :offset="14">
            <el-button
              size="small"
              type="success"
              @click="dialogMoneyisSend = true"
              >销售提成1%已发放</el-button
            >
            <el-button
              size="small"
              type="success"
              @click="dialogMoneyisAllSend = true"
              >销售提成已全部发放</el-button
            >
            <el-button size="small" type="warning" @click="handleRevisePro()"
              >修改项目</el-button
            >
            <el-button size="small" type="danger"> 关闭项目 </el-button>
          </el-col>
        </el-row>
        <div class="project-info-wrap">
          <el-row class="project-info">
            <span class="info-title">项目信息</span>
            <el-button size="mini" type="primary" v-if="getProjectDetailData.status == 1">未开始</el-button>
            <el-button size="mini" type="primary" v-else-if="getProjectDetailData.status == 2">进行中</el-button>
            <el-button size="mini" type="primary" v-else-if="getProjectDetailData.status == 3">暂停</el-button>
            <el-button size="mini" type="primary" v-else-if="getProjectDetailData.status == 4">取消</el-button>
            <el-button size="mini" type="primary" v-else-if="getProjectDetailData.status == 5">已完成</el-button>
            <el-button size="mini" type="primary" v-else-if="getProjectDetailData.status == 6">已关闭</el-button>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <el-col :span="8">
              <label class="label-item" for>项目名称:</label>
              <span>{{getProjectDetailData.projectName}}</span>
            </el-col>
            <el-col :span="8">
              <label class="label-item" for>所属类目:</label>
              <span>{{getProjectDetailData.dataSourceName}}</span>
            </el-col>
            <el-col :span="8">
              <label class="label-item" for>项目编号:</label>
              <span>{{getProjectDetailData.code}}</span>
            </el-col>
          </el-row>
          <el-divider></el-divider>

          <el-row>
            <el-col :span="10">
              <label class="label-item" for>项目开始时间-结束时间:</label>
              <span>{{getProjectDetailData.date}}</span>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <el-col :span="8">
              <label class="label-item" for>项目所属公司:</label>
              <span>{{getProjectDetailData.company}}</span>
            </el-col>
            <el-col :span="8">
              <label class="label-item" for>销售经理:</label>
              <span>{{getProjectDetailData.salesName}}</span>
            </el-col>
            <el-col :span="8">
              <label class="label-item" for>项目经理:</label>
              <span>{{getProjectDetailData.projectLeader}}</span>
            </el-col>
          </el-row>
          <el-divider></el-divider>

          <el-row>
            <el-col :span="10">
              <label class="label-item" for>项目成员:</label>
              <span>{{getProjectDetailData.userNames}}</span>
            </el-col>
            <el-col :span="10">
              <label class="label-item" for>项目成员工时:</label>
              <span></span>
            </el-col>
          </el-row>
          <el-divider></el-divider>

          <el-row>
            <el-col :span="10">
              <label class="label-item" for>立项人:</label>
              <span>{{getProjectDetailData.createUserName}}</span>
            </el-col>
            <el-col :span="10">
              <label class="label-item" for>立项时间:</label>
              <span>{{getProjectDetailData.ctime}}</span>
            </el-col>
          </el-row>
          <el-divider></el-divider>

          <el-row>
            <el-col :span="8">
              <label class="label-item" for>项目审核人:</label>
              <span>{{getProjectDetailData.auditName}}</span>
            </el-col>
            <el-col :span="8">
              <label class="label-item" for>审核时间:</label>
              <span>{{getProjectDetailData.auditDate}}</span>
            </el-col>
            <el-col :span="8">
              <label class="label-item" for>审核状态:</label>
              <span>{{getProjectDetailData.auditState == 1 ? "审批通过" : "审批驳回"}}</span>
            </el-col>
          </el-row>
          <el-divider></el-divider>

          <el-row>
            <div class="label-item">项目描述：</div>
            <div class="desc">{{getProjectDetailData.description}}</div>
          </el-row>
        </div>
        <div class="project-info-wrap">
          <el-row>
            <span class="info-title">财务统计</span>
            <el-divider></el-divider>
          </el-row>
          <el-row>
            <el-col :span="10">
              <span class="label-item">预计收入金额/元：</span>
              <span>{{projectFinancial.estincome}}</span>
            </el-col>
            <el-col :span="10">
              <span class="label-item">预计支出金额/元：</span>
              <span>{{projectFinancial.budget}}</span>
            </el-col>
          </el-row>
          <el-divider></el-divider>

          <el-row>
            <el-col :span="10">
              <span class="label-item">实际收入金额/元：</span>
              <span>{{projectFinancial.actualIncome}}</span>
            </el-col>
            <el-col :span="10">
              <span class="label-item">实际支出金额/元：</span>
              <span>{{projectFinancial.actualExpenditure}}</span>
            </el-col>
          </el-row>
          <el-divider></el-divider>

          <el-row>
            <el-col :span="10">
              <span class="label-item">预收押金/元：</span>
              <span>{{projectFinancial.deposit}}</span>
            </el-col>
            <el-col :span="10">
              <span class="label-item">押金转收入金额/元：</span>
              <span>{{projectFinancial.deposit}}</span>
            </el-col>
          </el-row>
          <el-divider></el-divider>

          <el-row>
            <el-col :span="8">
              <span class="label-item">项目利润/元：</span>
              <span>{{projectFinancial.profit}}</span>
            </el-col>
            <el-col :span="8">
              <span class="label-item">毛利率/%：</span>
              <span>{{projectFinancial.rate}}</span>
            </el-col>
            <el-col :span="8">
              <span class="label-item">支出比/%:</span>
              <span>{{projectFinancial.expenditureRatio}}</span>
            </el-col>
          </el-row>
          <el-divider></el-divider>

          <el-row>
            <el-col :span="10">
              <span class="label-item">结算收入金额/元：</span>
              <span>{{projectFinancial.settlement}}</span>
            </el-col>
            <el-col :span="10">
              <span class="label-item">应收收入/元：</span>
              <span>{{projectFinancial.receivable}}</span>
            </el-col>
          </el-row>
          <el-divider></el-divider>
        </div>
      </el-tab-pane>
      <el-tab-pane label="工时分配" name="2">
        <el-button type="primary" @click="handleAddTime" style="margin-bottom:20px;">新增</el-button>
        <!-- <el-table
          border
          :data="$store.state.projectData.taskTimeList"
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column fixed prop="taskRelationId" label="ID"></el-table-column>
          <el-table-column align="center" prop="fullname" label="项目工时模板名称">
            <template slot-scope="scope">
              <el-button @click="handleProjectName(scope.row)" type="text" size="small">{{scope.row.templateName}}</el-button>
            </template>
          </el-table-column>
        </el-table> -->

        <el-tabs v-model="taskRelationId" type="card" closable  @tab-remove="removeTab" @tab-click="tabclick">
          <el-tab-pane  label="统计汇总" name="0" >
            <el-table
              border
              :data="templateList"
              style="width: 100%; margin-top: 20px"
            >
              <el-table-column fixed prop="projectName" label="项目名称"></el-table-column>
              <el-table-column fixed prop="relationName" label="项目工时模板名称"></el-table-column>
              <el-table-column fixed prop="templateName" label="模板名称"></el-table-column>
              <el-table-column fixed prop="username" label="人员"></el-table-column>
              <el-table-column fixed prop="amount" label="数量"></el-table-column>
              <el-table-column fixed prop="takeTime" label="单位工时"></el-table-column>
              <el-table-column fixed prop="completionTime" label="完成时间"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane
            v-for="item in taskTimeList"
            :key="item.taskRelationId"
            :label="item.templateName"
            :name="item.taskRelationId+''"
          >
            <el-button @click="addPersonnel">添加人员</el-button>

            <el-table
              border
              :data="templateList"
              style="width: 100%; margin-top: 20px"
            >
              <el-table-column fixed prop="projectName" label="项目名称"></el-table-column>
              <el-table-column fixed prop="relationName" label="项目工时模板名称"></el-table-column>
              <el-table-column fixed prop="templateName" label="模板名称"></el-table-column>
              <el-table-column fixed prop="username" label="人员"></el-table-column>
              <el-table-column fixed prop="amount" label="数量"></el-table-column>
              <el-table-column fixed prop="takeTime" label="单位工时"></el-table-column>
              <el-table-column fixed prop="completionTime" label="完成时间"></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        
      </el-tab-pane>
      <el-tab-pane label="收入" name="3">
        <Income />
      </el-tab-pane>
      <el-tab-pane label="支出" name="4">
        <Pay />
      </el-tab-pane>
      <el-tab-pane label="押金" name="5">
        <Deposit />
      </el-tab-pane>
      <el-tab-pane label="报价单" name="6">
        <PriceList />
      </el-tab-pane>
      <el-tab-pane label="项目合同" name="7">
        <AgreeMent />
      </el-tab-pane>
      <el-tab-pane label="结算单" name="8">
        <ProjectSettlement />
      </el-tab-pane>
      <el-tab-pane label="应收单" name="9">
        <ReceivableList />
      </el-tab-pane>
      <!-- <el-tab-pane label="工时统计" name="10">
        <el-row>
          <span>人员</span>
          <el-select v-model="userid" filterable placeholder="请选择">
            <el-option
              v-for="item in $store.state.projectData.getuserList"
              :key="item.userId"
              :label="item.username"
              :value="item.userId">
            </el-option>
          </el-select>
          <el-button type="primary" @click="selectUser">查询</el-button>
        </el-row>

        <el-table
          border
          :data="templateList"
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column fixed prop="projectName" label="项目名称"></el-table-column>
          <el-table-column fixed prop="relationName" label="项目工时模板名称"></el-table-column>
          <el-table-column fixed prop="templateName" label="模板名称"></el-table-column>
          <el-table-column fixed prop="username" label="人员"></el-table-column>
          <el-table-column fixed prop="amount" label="数量"></el-table-column>
          <el-table-column fixed prop="takeTime" label="单位工时"></el-table-column>
          <el-table-column fixed prop="completionTime" label="完成时间"></el-table-column>
           <el-table-column align="center" prop="" label="项目工时模板名称">
            <template slot-scope="scope">
              <el-button @click="handleProjectName(scope.row)" type="text" size="small">{{scope.row.templateName}}</el-button>
            </template>
          </el-table-column>
        </el-table>

        <p class="total">
          <span>总价格：{{templateTotal}}</span>
          <span>总工时：{{templateTotaltime}}</span>
        </p>
      </el-tab-pane> -->
    </el-tabs>

    <el-row>
      <el-col :span="3" :offset="10">
        <el-button class="add-project" type="primary" @click="handleBackList()"
          >返回项目列表</el-button
        >
      </el-col>
    </el-row>
    <AddNewProModal :show="dialogAddTime" @hideModal="handlehideModal" />
    <el-dialog
      title="销售提成1%已发放"
      :visible.sync="dialogMoneyisSend"
      width="30%"
    >
      <span class="show-notice"
        >请确认是否已经发放销售提成的1%，请谨慎操作</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSendMoney()"
          >确认发放</el-button
        >
        <el-button @click="dialogMoneyisSend = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>是否确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogdel">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="销售提成已全部发放"
      :visible.sync="dialogMoneyisAllSend"
      width="30%"
    >
      <span class="show-notice"
        >请确认是否已经发放销售全部提成，请谨慎操作</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSendAllMoney()"
          >确认发放</el-button
        >
        <el-button @click="dialogMoneyisAllSend = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- <el-dialog
      title="关闭项目"
      :visible.sync="dialogClose"
      width="30%"
      :before-close="handleClose"
    >
      <span class="show-notice">请确认是否已经发放销售全部提成，请谨慎操作</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSureClose()">确认发放</el-button>
        <el-button @click="dialogClose = false">取 消</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import AddNewProModal from "~/components/projectListPage/AddNewProModal.vue";
import Income from "~/components/projectListPage/Income.vue";
import Pay from "~/components/projectListPage/Pay.vue";
import Deposit from "~/components/projectListPage/Deposit.vue";
import PriceList from "~/components/projectListPage/PriceList.vue";
import AgreeMent from "~/components/projectListPage/AgreeMent.vue";
import ReceivableList from "~/components/projectListPage/ReceivableList.vue";
import ProjectSettlement from "~/components/projectListPage/ProjectSettlement.vue";
import axios from "axios";
import CookieUtil from "~/utils/CookieUtil";

export default {
  data() {
    return {
      taskTimeList: [],
      centerDialogVisible: false,
      taskRelationId: 0,
      activeName: "1",
      dialogAddTime: false,
      dialogMoneyisSend: false,
      dialogMoneyisAllSend: false,
      closeStatus: true,
      projectDetail:{},
      projectFinancial: {},
      options: [],
      userid: '',
      templateList: [],
      templateTotal: 0,
      templateTotaltime: 0,
      editableTabs: [],
      targetName:0,
    };
  },
  computed: {
    getProjectDetailData() {
      console.log(this.$store.state.projectData.projectDetail);
      return this.$store.state.projectData.projectDetail;
    },
    getProjectFinancial() {
      console.log(this.$store.state.projectData.projectFinancial);
      return this.$store.state.projectData.projectFinancial;
    },
  },
  beforeRouteEnter(to, from, next){
    if(from.name=='addtasktime'){
      next(vm=>{
        vm.activeName = '2';
      });
    }else{
      next()
    }
    
    
  },
  watch: {
    "$store.state.projectData.taskTimeList": {
        deep: true,
        handler: function (newValue, oldValue) {
          this.taskTimeList = newValue;
        }

    },
    $router(newval,oldval){
      console.log(oldval)

    },
    getProjectDetailData(newVal, oldVal) {
      console.log("watch project detail", newVal);
      this.projectDetail = JSON.parse(JSON.stringify(newVal));
    },
    getProjectFinancial(newVal, oldVal) {
      console.log("watch project financial", newVal);
      this.projectFinancial = JSON.parse(JSON.stringify(newVal));
    }
  },
  mounted(){
      this.selectUser();
      this.taskTimeList = this.$store.state.projectData.taskTimeList;
  },
  methods: {
    addPersonnel() {
      let templateFlag = '';
      this.taskTimeList.map((item)=>{
        if(item.taskRelationId == this.taskRelationId){
          templateFlag = item.templateFlag;
        }
        

      })
      this.$router.push({
        path:'/addtasktime',
        query:{
          layer:templateFlag,
          taskRelationId: this.taskRelationId
        }
      })

    },
    handleEdit(scope) {
      console.log('c1111--',scope.row)

    },
    tabclick(targetName,item) {
      this.taskRelationId = targetName.name;
      this.selectUser()

    },
    centerDialogdel() {
      axios.get('/api/task/del?taskRelationId='+this.targetName).then((res) => {
        console.log('删除----',res)
        if(res.data.code === 0){
          this.$message.success('删除成功')
            this.centerDialogVisible = false;
          axios.get("/api/task/gettaskrelation?projectId="+this.$store.state.projectData.viewProjectId).then(
              (rep) => {
                if (rep && rep.data) {
                  this.taskTimeList = rep.data.data;
                  this.$store.commit("projectData/setTaskTimeList", rep.data.data);
                }
              },
              () => {}
            );
            
        }else{
          this.$message.error('删除失败')
        }
      })

    },
    removeTab(targetName) {
      this.centerDialogVisible = true;
      this.targetName = targetName;
    },
    selectUser() {
      axios.get('/api/task/list?userId='+this.userid+'&projectId='+this.$store.state.projectData.viewProjectId+'&taskRelationId='+this.taskRelationId).then((res) => {
        console.log('查询----',res)
        if(res.data.code === 0){
          this.templateList = res.data.data.task;
          this.templateTotal = res.data.data.total;
          this.templateTotaltime = res.data.data.totalTime;
        }
      })

    },
    handleProjectName(tab) {
      // this.$router.push("/addtasktime.jsp");
      this.$router.push("/addtasktime?layer="+tab.templateFlag + '&taskRelationId='+ tab.taskRelationId);
      
    },
    handleTabClick(tab, event) {
    },
    handleBackList() {
      this.$router.push("/projectList");
    },
    handleAddTime() {
      this.dialogAddTime = true;
    },
    handlehideModal() {
      this.dialogAddTime = false;
    },
    handleSendMoney() {
      // 发送请求  成功或失败弹窗
      this.dialogMoneyisSend = false;
    },
    handleSendAllMoney() {
      // 发送请求  成功或失败弹窗

      this.dialogMoneyisAllSend = false;
    },
    handleRevisePro(scope) {
      this.$router.push("/revise");

    },
    changeProStatus() {
      this.closeStatus = false;
    },
    handleSureClose() {
      this.han;
    },
  },
  created() {
    if (this.$store.state.projectData.viewProjectId == "") {
      this.$router.push("/projectList");
    }
  },
  async asyncData(ctx) {
    if(!CookieUtil.existCookie("user_id")) {
      location.href = "/";
    }
    //工时分配列表

     let result = await axios.get("/api/task/gettaskrelation?projectId="+ctx.store.state.projectData.viewProjectId).then(
      (rep) => {
        if (rep && rep.data) {
          return  rep.data.data;
        }
      },
      () => {}
    );

    ctx.store.commit("projectData/setTaskTimeList", result);

    let options = await axios.get("/api/task/getuser?projectId=" + ctx.store.state.projectData.viewProjectId).then(
      (rep) => {
        if (rep && rep.data) {
          return  rep.data.data;
        }
      },
      () => {}
    );
    ctx.store.commit("projectData/setgetuserlist", options);

    let dataSourceResult = await axios.get("/api/role/getparentdatasource").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data.data;
        }
      },
      () => {}
    );
    console.log("project data source", dataSourceResult);
    ctx.store.commit("projectData/setProjectDataSrouce", dataSourceResult);

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

    let cityResult = await axios.get("/api/common/getcity").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data.data;
        }
      },
      () => {}
    );
    console.log("city", cityResult);
    ctx.store.commit("expenditureData/setCity", cityResult);

    let revenueResult = await axios.get("/api/revenue/list").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data.data;
        }
      },
      () => {}
    );
    console.log("revenue", revenueResult);
    ctx.store.commit("incomeData/setRevenueList", revenueResult);
    
  },
};
</script>

<style>
.breadcrumb.breadcrumb-actived .el-breadcrumb__inner.is-link {
  color: blue;
}
.total{
  margin-top: 10px;
}
.add-project{
  margin-top: 20px;
}

.project-info-wrap {
  background: #eee;
  padding: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
}
.info-title {
  font-weight: bold;
  margin-right: 35px;
}
.label-item {
  color: #606266;
}
.desc {
  color: #606266;
  margin-top: 15px;
}
.pro-manager {
  padding: 5px;
  background: #fff;
  margin-left: 10px;
}
.view-project .el-input {
  width: 250px;
}
.show-notice {
  color: red;
}
</style>