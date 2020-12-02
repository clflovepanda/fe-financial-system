<template>
  <el-container class="container project-list">
    <el-header class="headerContent">
      <HeaderBar />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Menu />
      </el-aside>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item class="breadcrumb">位置</el-breadcrumb-item>
          <el-breadcrumb-item
            class="breadcrumb breadcrumb-actived"
            :to="{ path: '/projectList' }"
          >项目列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="90px"
          label-position="left"
          class="demo-ruleForm project-list-form"
        >
          <el-form-item label="项目编号" prop="id">
            <el-input v-model="ruleForm.id" placeholder="请输入项目编号"></el-input>
          </el-form-item>
          <el-form-item label="项目名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入项目名称"></el-input>
          </el-form-item>
          <el-form-item label="项目经理" prop="proManager">
            <el-input v-model="ruleForm.proManager" placeholder="请输入项目经理姓名"></el-input>
          </el-form-item>
          <el-form-item label="销售经理" prop="saleManager">
            <el-input v-model="ruleForm.saleManager" placeholder="请输入销售经理姓名"></el-input>
          </el-form-item>
          <el-form-item label="项目成员" prop="proPerson">
            <el-input v-model="ruleForm.proPerson" placeholder="请输入项目成员姓名"></el-input>
          </el-form-item>

          <el-form-item label="结算单" prop="statement">
            <el-select v-model="ruleForm.statement" placeholder="请选择结算单状态">
              <el-option label="未结算" value="notState"></el-option>
              <el-option label="待结算" value="willState"></el-option>
              <el-option label="已结算" value="stated"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="项目状态" prop="projectStatus">
            <el-select v-model="ruleForm.projectStatus" placeholder="请选择项目状态">
              <el-option label="未开始" value="notStart"></el-option>
              <el-option label="进行中" value="pending"></el-option>
              <el-option label="已暂停" value="stoped"></el-option>
              <el-option label="已取消" value="cancel"></el-option>
              <el-option label="已完成" value="fulfil"></el-option>
              <el-option label="已关闭" value="colsed"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="项目时间" required>
            <el-date-picker
              v-model="ruleForm.proDate"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="销售提成发放状态" prop="moneyStatus" class="money-label">
            <el-select v-model="ruleForm.moneyStatus" placeholder="请选择销售提成发放状态">
              <el-option label="未发放" value="notExtend"></el-option>
              <el-option label="部分发放" value="someExtend"></el-option>
              <el-option label="全部发放" value="allExtend"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="button-wrap">
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <el-button class="add-project" type="primary" @click="handleAddClick()">新增项目</el-button>

        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="审核通过项目" name="checkedPro">
            <Table :passStatus="true" />
          </el-tab-pane>
          <el-tab-pane label="待审核及审核失败项目" name="notChecked">
            <Table :passStatus="false"/>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Table from "~/components/projectListPage/Table.vue";

export default {
  data() {
    return {
      ruleForm: {
        id: "",
        name: "",
        proManager: "",
        saleManager: "",
        proPerson: "",
        statement: "",
        projectStatus: "",
        proDate: "",
        moneyStatus: "",
      },
      rules: {
        id: [{ required: true, message: "请输入项目编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
        proManager: [
          { required: true, message: "请输入项目经理姓名", trigger: "blur" },
        ],
        saleManager: [
          { required: true, message: "请输入销售经理姓名", trigger: "blur" },
        ],
        proPerson: [
          { required: true, message: "请输入项目成员姓名", trigger: "blur" },
        ],
        statement: [
          { required: true, message: "请选择结算单状态", trigger: "change" },
        ],
        projectStatus: [
          { required: true, message: "请选择项目状态", trigger: "change" },
        ],

        proDate: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        moneyStatus: [
          {
            required: true,
            message: "请选择销售提成发放状态",
            trigger: "change",
          },
        ],
      },
      activeName: "checkedPro",
      listData: [],
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleTabClick(tab, event) {
      console.log(tab, event);
    },
    handleAddClick() {
        console.log('新增项目');
        this.$router.push('/addNewProject');
    }
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
.project-list .add-project.el-button--primary.el-button {
  position: relative;
  float: right;
  z-index: 999;
}
</style>