<template>
  <el-container class="container add-project-list">
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
          <el-breadcrumb-item class="breadcrumb">项目列表</el-breadcrumb-item>
          <el-breadcrumb-item
            class="breadcrumb breadcrumb-actived"
            :to="{ path: '/addNewProject' }"
          >新增项目</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="130px"
          label-position="left"
          class="demo-ruleForm add-project-form"
        >
          <el-form-item label="一级类目" prop="id">
            <el-input v-model="ruleForm.id" placeholder="请输入一级类目"></el-input>
          </el-form-item>
          <el-form-item label="二级类目" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入二级类目"></el-input>
          </el-form-item>
          <el-form-item label="项目周期" prop="proManager">
            <el-date-picker
              v-model="ruleForm.proDate"
              type="daterange"
              range-separator="~"
              start-placeholder="请选择项目开始时间"
              end-placeholder="结束时间"
            ></el-date-picker>
            <span class="time">工期：</span>
            <el-input v-model="ruleForm.id" placeholder="根据选定的项目开始时间-结束时间自动生成"></el-input>
          </el-form-item>

          <el-form-item label="项目名称" prop="saleManager">
            <el-input v-model="ruleForm.saleManager" placeholder="请输入销售经理姓名"></el-input>
          </el-form-item>

          <el-form-item label="预计收入金额/元" prop="proPerson">
            <el-input v-model="ruleForm.proPerson" placeholder="请输入预计收入金额"></el-input>
          </el-form-item>
          <el-form-item label="预计支出金额/元" prop="proPerson">
            <el-input v-model="ruleForm.proPerson" placeholder="请输入预计支出金额"></el-input>
          </el-form-item>

          <el-form-item label="项目所属公司" prop="statement">
            <el-select v-model="ruleForm.statement" placeholder="请选择项目所属公司">
              <el-option label="未结算" value="notState"></el-option>
              <el-option label="待结算" value="willState"></el-option>
              <el-option label="已结算" value="stated"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="销售经理" prop="statement">
            <el-select v-model="ruleForm.statement" placeholder="请选择销售经理">
              <el-option label="未结算" value="notState"></el-option>
              <el-option label="待结算" value="willState"></el-option>
              <el-option label="已结算" value="stated"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="项目经理" prop="statement">
            <el-select v-model="ruleForm.statement" placeholder="请选择项目经理">
              <el-option label="未结算" value="notState"></el-option>
              <el-option label="待结算" value="willState"></el-option>
              <el-option label="已结算" value="stated"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="项目成员" prop="statement">
            <el-select v-model="ruleForm.statement" placeholder="请选择项目成员">
              <el-option label="未结算" value="notState"></el-option>
              <el-option label="待结算" value="willState"></el-option>
              <el-option label="已结算" value="stated"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="项目成员工时" prop="proPerson">
            <span class="set-time" @click="handleSetTime()">设置工时</span>
            <el-input v-model="ruleForm.proPerson" placeholder disabled></el-input>
          </el-form-item>

          <el-form-item label="项目描述" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入项目描述"></el-input>
          </el-form-item>

          <el-form-item class="button-wrap">
            <el-button @click="resetForm('ruleForm')">取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">创建项目</el-button>
          </el-form-item>
        </el-form>
        <!-- <el-divider></el-divider> -->
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
      //   this.$router.push("/projectList");
    },
    handleSetTime() {
      console.log("set time");
    },
  },
};
</script>

<style>
.breadcrumb.breadcrumb-actived .el-breadcrumb__inner.is-link {
  color: blue;
}
.add-project-list .el-form-item {
  /* display: inline-block;
  vertical-align: top; */
}

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
/* .project-list-form .el-input__inner {
  padding: 0 5px;
} */
/* .project-list-form .money-label .el-form-item__label {
  width: 140px !important;
} */
/* .project-list-form .money-label .el-form-item__content {
  margin-left: 140px !important;
} */
/* .project-list-form .money-label .el-input {
  width: 185px;
} */
/* .project-list-form .button-wrap .el-form-item__content {
  margin-left: 15px !important;
} */
</style>