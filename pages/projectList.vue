<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="breadcrumb">位置</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb breadcrumb-actived">项目列表</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="2" class="labelSty"><span class="labelSty">项目编号：</span></el-col>
      <el-col :span="3">
        <el-input v-model="ruleForm.projectNo" placeholder="请输入项目编号"></el-input>
      </el-col>
      <el-col :span="2" class="labelSty"><span class="labelSty">项目名称：</span></el-col>
      <el-col :span="3">
        <el-input v-model="ruleForm.projectName" placeholder="请输入项目名称"></el-input>
      </el-col>
      <el-col :span="2" class="labelSty"><span class="labelSty">项目经理：</span></el-col>
      <el-col :span="3">
        <el-input v-model="ruleForm.managerName" placeholder="请输入项目经理姓名"></el-input>
      </el-col>
      <el-col :span="2" class="labelSty"><span class="labelSty">销售经理：</span></el-col>
      <el-col :span="3">
        <el-input v-model="ruleForm.salesName" placeholder="请输入销售经理姓名"></el-input>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="2" class="labelSty"><span class="labelSty">项目成员：</span></el-col>
      <el-col :span="3">
        <el-input v-model="ruleForm.userNames" placeholder="请输入销售经理姓名"></el-input>
      </el-col>
      <el-col :span="2" class="labelSty"><span class="labelSty">结算单：</span></el-col>
      <el-col :span="3">
        <el-select
          v-model="ruleForm.settlementState"
          placeholder="请选择销售提成发放状态"
        >
          <el-option
            v-for="item in getSetmentStateList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" class="labelSty"><span class="labelSty">项目状态：</span></el-col>
      <el-col :span="3">
        <el-select v-model="ruleForm.state" placeholder="请选择项目状态">
          <el-option
            v-for="item in getProjectTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" class="labelSty"><span class="labelSty">项目时间：</span></el-col>
      <el-col :span="3">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="3" class="labelSty"><span class="labelSty">销售提成发放状态：</span></el-col>
      <el-col :span="3">
        <el-select
          v-model="ruleForm.saleCommisState"
          placeholder="请选择销售提成发放状态"
        >
          <el-option
            v-for="item in getSaleSendTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-button type="primary" @click="submitForm">查询</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="4" :offset="20" style="text-align:right">
        <el-button class="add-project" type="primary" @click="handleAddClick()">新增项目</el-button>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="审核通过项目" name="checkedPro">
        <Table :passStatus="true" />
      </el-tab-pane>
      <el-tab-pane label="待审核及审核失败项目" name="notChecked">
        <Table :passStatus="false" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Table from "~/components/projectListPage/Table.vue";
import axios from "axios";
import {EnumProjectType,EnumSaleSendType,EnumSettlementState} from "../utils/EnumUtil";
import DateUtil from "../utils/DateUtil";
import CookieUtil from "~/utils/CookieUtil";

export default {
  data() {
    return {
      ruleForm: {
        projectNo: "",
        projectName: "",
        startDt: "",
        endDt: "",
        state: "",
        managerName: "",
        salesName: "",
        settlementState: "",
        saleCommisState: "",
        userNames: "",
      },
      dateRange: "",
      activeName: "checkedPro",
      listData: [],
    };
  },
  computed: {
    getProjectTypeList() {
      return EnumProjectType.list;
    },
    getSaleSendTypeList() {
      return EnumSaleSendType.list;
    },
    getSetmentStateList() {
      return EnumSettlementState.list;
    }
  },
  methods: {
    submitForm() {
      console.log("search project form", this.ruleForm);
      if (this.dateRange) {
        let st = this.dateRange[0];
        let et = this.dateRange[1];
        this.ruleForm.startDt = st.getTime();
        this.ruleForm.endDt = et.getTime();
      }
      axios.get("/api/project/list", {
        params: this.ruleForm
      }).then((res) => {
        if(res.data.code == 0) {
          this.$store.commit("projectData/setProjectList", res.data.data);
        }
      });

      if(!CookieUtil.existCookie("user_id")) {
        location.href = "/";
      }
    },
    resetForm() {
      console.log("reset");
      this.ruleForm.projectNo = "";
      this.ruleForm.projectName = "";
      this.ruleForm.startDt = "";
      this.ruleForm.endDt = "";
      this.ruleForm.state = "";
      this.ruleForm.managerName = "";
      this.ruleForm.salesName = "";
      this.ruleForm.settlementState = "";
      this.ruleForm.saleCommisState = "";
      this.ruleForm.userNames = "";
      this.dateRange = "";
      
    },
    handleTabClick(tab, event) {
    },
    handleAddClick() {
      console.log("新增项目");
      this.$router.push("/addNewProject");
    },
  },
  async asyncData(ctx) {
    if(!CookieUtil.existCookie("user_id")) {
      location.href = "/";
    }
    console.log("decode username", decodeURI(CookieUtil.getCookie("user_name")));
    ctx.store.commit("userData/setUserName", decodeURI(CookieUtil.getCookie("user_name")));
    // const loading = this.$loading({
    //       lock: true,
    //       text: 'Loading',
    //       spinner: 'el-icon-loading',
    //       background: 'rgba(0, 0, 0, 0.7)'
    //     });
    let result = await axios.get("/api/project/list").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data.data;
        }
      },
      () => {}
    );
    console.log("project list", result);
    ctx.store.commit("projectData/setProjectList", result);

    let projectPassListResult = await axios.get("/api/project/list?auditing_state=1&limit=5&offset=1").then(
      (rep) => {
        if (rep && rep.data) {
          return {
            data: rep.data.data,
            count: rep.data.count
          };
        }
      },
      () => {}
    );
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
    ctx.store.commit("projectData/setProjectPassList", tempPass);

    let projectRejectListResult = await axios.get("/api/project/list?auditing_state=2&limit=10&offset=1").then(
      (rep) => {
        if (rep && rep.data) {
          return {
            data: rep.data.data,
            count: rep.data.count
          };
        }
      },
      () => {}
    );
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
    ctx.store.commit("projectData/setProjectRejectList", tempReject);

    let userResult = await axios.get("/api/user/list").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data.data;
        }
      },
      () => {}
    );
    console.log("user list", userResult);
    ctx.store.commit("userData/setUserListTable", userResult);
    // loading.close();
  },
};
</script>

<style>
.breadcrumb.breadcrumb-actived .el-breadcrumb__inner.is-link {
  color: blue;
}
.project-list-form .el-form-item {
  display: inline-block;
  vertical-align: top;
}

.project-list-form .el-input {
  min-width: 140px;
}
.project-list-form .el-input__inner {
  padding: 0 5px;
}
.project-list-form .money-label .el-form-item__label {
  width: 140px !important;
}
.project-list-form .money-label .el-form-item__content {
  margin-left: 140px !important;
}
.project-list-form .money-label .el-input {
  width: 185px;
}
.project-list-form .button-wrap .el-form-item__content {
  margin-left: 15px !important;
}
/* .project-list .add-project.el-button--primary.el-button {
  position: relative;
  float: right;
  z-index: 999;
} */
.labelSty {
  line-height: 40px;
  text-align: center;
}

.rowSty {
  margin-top: 10px;
}
</style>