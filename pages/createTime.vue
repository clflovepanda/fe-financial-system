<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="breadcrumb">位置</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb">项目列表</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb">查看项目</el-breadcrumb-item>

      <el-breadcrumb-item
        class="breadcrumb breadcrumb-actived"
        :to="{ path: '/createTime' }"
        >新增工时</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="90px"
      label-position="left"
      class="demo-ruleForm project-list-form"
    ></el-form>
    <el-divider></el-divider>
    <el-button class="add-project" type="primary" @click="handleAddClick()"
      >保存</el-button
    >
  </div>
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
      console.log("新增项目");
      this.$router.push("/addNewProject");
    },
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
</style>