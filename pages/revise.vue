<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="breadcrumb">位置</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb">项目列表</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb breadcrumb-actived">修改项目</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="4"><span class="labelSty"><i class="redStar">*</i>一级类目：</span></el-col>
      <el-col :span="6">
        <el-select v-model="createProductForm.dataSourceIdOne" placeholder="请选择一级类目" class="inpSty" @change="changeLevelOne">
          <el-option
            v-for="item in getLevelOneDataSourceList"
            :key="item.dataSourceId"
            :label="item.dataSourceName"
            :value="item.dataSourceId"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4"><span class="labelSty"><i class="redStar">*</i>二级类目：</span></el-col>
      <el-col :span="6">
        <el-select v-model="createProductForm.dataSourceId" placeholder="请选择一级类目" class="inpSty">
          <el-option
            v-for="item in getLevelTwoDataSourceList"
            :key="item.dataSourceId"
            :label="item.dataSourceName"
            :value="item.dataSourceId"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4"><span class="labelSty"><i class="redStar">*</i>项目周期：</span></el-col>
      <el-col :span="6" style="line-height:40px;text-align:left;font-size:18px">
        <el-date-picker
          v-model="rangeDate"
          type="daterange"
          range-separator="~"
          :start-placeholder="createProductForm.startDate"
          :end-placeholder="createProductForm.endDate"
          class="inpSty"
          style="width: 100%"
          @change="changeDate"
        ></el-date-picker>
      </el-col>
      <el-col :span="4" :offset="1">
        <span class="labelSty" style="text-align:left">工期：{{createProductForm.workTime}} 天</span>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4"><span class="labelSty"><i class="redStar">*</i>项目名称：</span></el-col>
      <el-col :span="3">
        <span style="display:inline-block; line-height: 40px">
          {{projectNamePartOne}}-
          {{projectNamePartTwo}}-
          {{projectNamePartThr}}-
        </span>
      </el-col>
      <el-col :span="3">
        <el-input
          v-model="createProductForm.tempName"
          placeholder="项目名称"
          class="inpSty"
        ></el-input>
      </el-col>
    </el-row>
    <!-- <el-row class="rowSty">
      <el-col :span="4"><span class="labelSty">预计收入金额/元：</span></el-col>
      <el-col :span="6">
        <el-input
          v-model="createProductForm.estincome"
          placeholder="预计收入金额/元"
          class="inpSty"
          :disabled="true"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4"><span class="labelSty">预计支出金额/元：</span></el-col>
      <el-col :span="6">
        <el-input
          v-model="createProductForm.budget"
          placeholder="预计支出金额/元"
          class="inpSty"
          :disabled="true"
        ></el-input>
      </el-col>
    </el-row> -->
    <el-row class="rowSty">
      <el-col :span="4"><span class="labelSty"><i class="redStar">*</i>项目所属公司：</span></el-col>
      <el-col :span="6">
        <el-select
          v-model="createProductForm.companyId"
          placeholder="请选择项目所属公司"
          class="inpSty"
        >
          <el-option
            v-for="item in companyList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4"><span class="labelSty"><i class="redStar">*</i>销售经理：</span></el-col>
      <el-col :span="6">
        <el-select
          v-model="createProductForm.salesId"
          placeholder="请选择销售经理"
          class="inpSty"
        >
          <el-option
            v-for="item in userList"
            :key="item.userId"
            :label="item.username"
            :value="item.userId"
            >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4"><span class="labelSty"><i class="redStar">*</i>项目经理：</span></el-col>
      <el-col :span="6">
        <el-select v-model="createProductForm.managerId" placeholder="请选择项目经理" class="inpSty">
          <el-option
            v-for="item in userList"
            :key="item.userId"
            :label="item.username"
            :value="item.userId"
            >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4"><span class="labelSty"><i class="redStar">*</i>项目成员：</span></el-col>
      <el-col :span="6">
        <el-select v-model="createProductForm.userIds" multiple placeholder="请选择项目成员" style="width: 100%">
          <el-option
            v-for="item in userList"
            :key="item.userId"
            :label="item.username"
            :value="item.userId"
            >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4"><span class="labelSty"><i class="redStar"></i>项目描述：</span></el-col>
      <el-col :span="6">
        <el-input
          v-model="createProductForm.description"
          placeholder="请输入项目描述"
          class="inpSty"
        ></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top:30px">
      <el-col :span="6" :offset="2">
        <el-button type="primary" @click="submitForm()" style="width: 100%">保存项目</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Table from "~/components/projectListPage/Table.vue";
import axios from "axios";
import {EnumAccount} from "../utils/EnumUtil";
import CookieUtil from "~/utils/CookieUtil";

export default {
  data() {
    return {
      createProductForm: {
        dataSourceIdOne:"",
        dataSourceId:"",
        dataSourceName: "",
        startDate: "",
        endDate: "",
        workTime: "",
        tempName: "",
        estincome: "",
        budget: "",
        companyId: "",
        description: "",
        managerId: "",
        salesId: "",
        userIds: [],
        projectId: ""
      },
      rangeDate: ""
    };
  },
  computed: {
    projectNamePartOne(){
      if(this.createProductForm.dataSourceId == null || this.createProductForm.dataSourceId == "") {
        return "年份"
      }
      let levelTwo = this.getLevelTwoDataSourceList;
      for (let i = 0 ; i < levelTwo.length ; i ++) {
        if (levelTwo[i].dataSourceId == this.createProductForm.dataSourceId) {
          return levelTwo[i].dataSourceName.substring(0, 4);
        }
      }
    },
    projectNamePartTwo(){
      if (this.createProductForm.dataSourceIdOne == null || this.createProductForm.dataSourceIdOne == "") {
        return "类目";
      }
      let levelOne = this.getLevelOneDataSourceList;
      for (let i = 0 ; i < levelOne.length ; i ++) {
        if (levelOne[i].dataSourceId == this.createProductForm.dataSourceIdOne) {
          return levelOne[i].dataSourceName;
        }
      }
    },
    projectNamePartThr(){
      if (this.rangeDate == null || this.rangeDate == "") {
        return "月份";
      }
      if (this.rangeDate[0].getMonth() + 1 < 10) {
        return "0" + (this.rangeDate[0].getMonth() + 1);
      } else {
        return this.rangeDate[0].getMonth() + 1;  
      }
    },
    getProjectDetailData() {
      return this.$store.state.projectData.editProject;
    },
    userList() {
      return this.$store.state.userData.userListTable.listData;
    },
    companyList() {
      return EnumAccount.list;
    },
    getLevelOneDataSourceList() {
      return this.$store.state.projectData.projectDataSource;
    },
    getLevelTwoDataSourceList() {
      let levelOne = this.$store.state.projectData.projectDataSource;
      for (let i = 0 ; levelOne && i < levelOne.length ; i ++) {
        if(levelOne[i].dataSourceId == this.createProductForm.dataSourceIdOne) {
          return levelOne[i].son; 
        }
      }
      return [];
    }
  },
  watch:{
  },
  methods: {
    changeLevelOne(){
      this.createProductForm.dataSourceId = "";
      this.createProductForm.dataSourceName = "";
    },
    submitForm(formName) {
      console.log(this.createProductForm);
      if(this.createProductForm.dataSourceId == "" || this.createProductForm.dataSourceId == null) {
        this.$message.error('缺少二级类目');
        return;
      }
      if(this.createProductForm.startDate == "" || this.createProductForm.startDate == null
      || this.createProductForm.endDate == "" || this.createProductForm.endDate == null) {
        this.$message.error('缺少项目周期');
        return;
      }
      if(this.createProductForm.tempName == "" || this.createProductForm.tempName == null) {
        this.$message.error('缺少项目名称');
        return;
      }
      if(this.createProductForm.companyId == "" || this.createProductForm.companyId == null) {
        this.$message.error('缺少项目所属公司');
        return;
      }
      if(this.createProductForm.salesId == "" || this.createProductForm.salesId == null) {
        this.$message.error('缺少销售经理');
        return;
      }
      if(this.createProductForm.managerId == "" || this.createProductForm.managerId == null) {
        this.$message.error('缺少项目经理');
        return;
      }
      if(this.createProductForm.userIds == "" || this.createProductForm.userIds == null || this.createProductForm.length == 0) {
        this.$message.error('缺少项目成员');
        return;
      }
      let levelTwo = this.getLevelTwoDataSourceList;
      for (let i = 0 ; i < levelTwo.length ; i ++) {
        if (levelTwo[i].dataSourceId == this.createProductForm.dataSourceId) {
          this.createProductForm.dataSourceName = levelTwo[i].dataSourceName;
        }
      }
      this.createProductForm.name = this.projectNamePartOne + "-" + this.projectNamePartTwo + "-" + this.projectNamePartThr + "-" + this.createProductForm.tempName;
      axios
        .post("/api/project/update", {
          project: this.createProductForm,
        })
        .then(
          (response) => {
            console.log(response);
            if(response.data.code == 0) {
              this.$router.push("/projectList");
            } else {
              this.$message.error(response.data.msg);
            }
            
          },
          () => {}
        );
    },
    changeDate() {
      if(this.rangeDate && this.rangeDate != "") {
        this.createProductForm.startDate = "" + this.rangeDate[0].getTime();
        this.createProductForm.endDate = "" + this.rangeDate[1].getTime();
        this.createProductForm.workTime = Math.floor((this.rangeDate[1].getTime() - this.rangeDate[0].getTime()) / 86400000) + 1;
      }
      
    }
  },
  created() {
    console.log(this.userList);
    if(this.userList == null || this.userList == "" || this.userList.length == 0) {
      this.$router.push("/projectList");
    }
    console.log("getProjectDetailData", this.$store.state.projectData.editProject);
    this.createProductForm.projectId = this.$store.state.projectData.editProject.projectEntities[0].projectId;
    this.createProductForm.dataSourceIdOne = this.$store.state.projectData.editProject.dataSourceId;
    this.createProductForm.dataSourceId = this.$store.state.projectData.editProject.projectEntities[0].dataSourceId;
    this.createProductForm.dataSourceName = this.$store.state.projectData.editProject.projectEntities[0].dataSourceName;
    this.createProductForm.startDate = this.$store.state.projectData.editProject.projectEntities[0].startDate;
    this.createProductForm.endDate = this.$store.state.projectData.editProject.projectEntities[0].endDate;
    this.rangeDate = [new Date(this.createProductForm.startDate), new Date(this.createProductForm.endDate)];
    let originProjectName = this.$store.state.projectData.editProject.projectEntities[0].name;
    let firstIdx = originProjectName.indexOf("-");
    let secondIdx = originProjectName.indexOf("-", firstIdx + 1);
    let thirdIdx = originProjectName.indexOf("-", secondIdx + 1);
    this.createProductForm.tempName = originProjectName.substring(thirdIdx + 1, originProjectName.length);
    // this.createProductForm.name = this.$store.state.projectData.editProject.projectEntities[0].name;
    this.createProductForm.estincome = this.$store.state.projectData.editProject.projectEntities[0].estincome;
    this.createProductForm.budget = this.$store.state.projectData.editProject.projectEntities[0].budget;
    this.createProductForm.companyId = this.$store.state.projectData.editProject.companyId;
    this.createProductForm.description = this.$store.state.projectData.editProject.projectEntities[0].description;
    //1 销售经理，2项目经理，3成员
    let managerId = "";
    let salesId = "";
    let userIds = [];
    for (let i = 0 ; i < this.$store.state.projectData.editProject.projectUserEntities.length ; i ++) {
      if(this.$store.state.projectData.editProject.projectUserEntities[i].type == 1) {
        salesId = this.$store.state.projectData.editProject.projectUserEntities[i].userId;
      }
      if(this.$store.state.projectData.editProject.projectUserEntities[i].type == 2) {
        managerId = this.$store.state.projectData.editProject.projectUserEntities[i].userId;
      }
      if(this.$store.state.projectData.editProject.projectUserEntities[i].type == 3) {
        userIds.push(this.$store.state.projectData.editProject.projectUserEntities[i].userId);
      }
    }
    console.log("managerId", managerId);
    console.log("salesId", salesId);
    console.log("userIds", userIds);
    this.createProductForm.managerId = managerId;
    this.createProductForm.salesId = salesId;
    this.createProductForm.userIds = userIds;

    let workTime = Math.floor((new Date(this.createProductForm.endDate).getTime() - new Date(this.createProductForm.startDate).getTime()) / 86400000) + 1;
    this.createProductForm.workTime = workTime;
  },
  async asyncData(ctx) {
    if(!CookieUtil.existCookie("user_id")) {
      location.href = "/";
    }
    let result = await axios.get("/api/role/getparentdatasource").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data.data;
        }
      },
      () => {}
    );
    console.log("project data source", result);
    ctx.store.commit("projectData/setProjectDataSrouce", result);
  },
};
</script>

<style>
.breadcrumb.breadcrumb-actived .el-breadcrumb__inner.is-link {
  color: blue;
}
/* .add-project-list .el-form-item {
  display: inline-block;
  vertical-align: top;
} */

.add-project-list .el-input {
  width: 310px;
}
.add-project-list .time {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
  margin-left: 15px;
}
.add-project-list .set-time {
  color: blue;
  cursor: pointer;
}
.labelSty {
  line-height: 40px;
  text-align: center;
}

.rowSty {
  margin-top: 10px;
}

.inpSty {
  width: 100%
}

.redStar {
  display:inline-block;
  color:red;
  width:10px
}
</style>