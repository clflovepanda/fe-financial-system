<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="breadcrumb">位置</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb">项目列表</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb">查看项目</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
      <el-tab-pane label="项目信息" name="first">
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
      <el-tab-pane label="工时分配" name="second">
        <el-row>
          <el-col :offset="22">
            <el-button size="small" type="primary" @click="handleAddTime()"
              >新增工时</el-button
            >
          </el-col>
        </el-row>
        <div class="project-info-wrap">
          <el-row>
            <span class="info-title">已添加工时</span>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <el-col :span="6">
              <span>王大龙</span>
              <span class="pro-manager">项目经理</span>
            </el-col>
            <el-col :span="6">
              <span>数量：</span>
              <span></span>
            </el-col>
            <el-col :span="6">
              <span>工时：</span>
              <span></span>
            </el-col>
            <el-col :span="6">
              <span>完成实时间：</span>
              <span></span>
            </el-col>
          </el-row>
          <el-divider></el-divider>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收入" name="third">
        <!-- <Income /> -->
      </el-tab-pane>
      <el-tab-pane label="支出" name="fourth">
        <Pay />
      </el-tab-pane>
      <el-tab-pane label="押金" name>
        <!-- <Deposit /> -->
      </el-tab-pane>
      <el-tab-pane label="报价单" name>
        <!-- <PriceList /> -->
      </el-tab-pane>
      <el-tab-pane label="项目合同" name>
        <!-- <AgreeMent /> -->
      </el-tab-pane>
      <el-tab-pane label="结算单" name>结算单</el-tab-pane>
      <el-tab-pane label="应收单" name>
        <!-- <ReceivableList /> -->
      </el-tab-pane>
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
import axios from "axios";
import CookieUtil from "~/utils/CookieUtil";

export default {
  data() {
    return {
      activeName: "first",
      dialogAddTime: false,
      dialogMoneyisSend: false,
      dialogMoneyisAllSend: false,
      closeStatus: true,
      projectDetail:{},
      projectFinancial: {}
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
    }
  },
  watch: {
    getProjectDetailData(newVal, oldVal) {
      console.log("watch project detail", newVal);
      this.projectDetail = JSON.parse(JSON.stringify(newVal));
    },
    getProjectFinancial(newVal, oldVal) {
      console.log("watch project financial", newVal);
      this.projectFinancial = JSON.parse(JSON.stringify(newVal));
    }
  },
  methods: {
    handleTabClick(tab, event) {
      console.log(tab, event);
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
    handleRevisePro() {
      this.$router.push("/revise");
    },
    changeProStatus() {
      this.closeStatus = false;
    },
    handleSureClose() {
      this.han;
    },
  },
  async asyncData(ctx) {
    if(!CookieUtil.existCookie("user_id")) {
      location.href = "/";
    }
    let result = await axios.get("/api/expenditure/list").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data.data;
        }
      },
      () => {}
    );
    console.log("pay data", result);
    ctx.store.commit("projectData/setProjectPay", result);
  },
};
</script>

<style>
.breadcrumb.breadcrumb-actived .el-breadcrumb__inner.is-link {
  color: blue;
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