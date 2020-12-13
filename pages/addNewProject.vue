<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="breadcrumb">位置</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb">项目列表</el-breadcrumb-item>
      <el-breadcrumb-item
        class="breadcrumb breadcrumb-actived"
        :to="{ path: '/addNewProject' }"
        >新增项目</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-form
      :model="createProductForm"
      ref="createProductForm"
      label-width="130px"
      label-position="left"
      class="demo-ruleForm add-project-form"
    >
      <el-form-item label="一级类目" prop="oneLevelMenu">
        <el-input v-model="createProductForm.oneLevelMenu" placeholder="请输入一级类目"></el-input>
      </el-form-item>
      <el-form-item label="二级类目" prop="twoLevelMenu">
        <el-input
          v-model="createProductForm.twoLevelMenu"
          placeholder="请输入二级类目"
        ></el-input>
      </el-form-item>
      <el-form-item label="项目周期" prop="productTime">
        <el-date-picker
          v-model="createProductForm.productTime"
          type="daterange"
          range-separator="~"
          start-placeholder="请选择项目开始时间"
          end-placeholder="结束时间"
        ></el-date-picker>
        <span class="time">工期：</span>
        <el-input
          v-model="createProductForm.gongQi"
          placeholder="根据选定的项目开始时间-结束时间自动生成"
        ></el-input>
      </el-form-item>

      <el-form-item label="项目名称" prop="productName">
        <el-input
          v-model="createProductForm.productName"
          placeholder="请输入销售经理姓名"
        ></el-input>
      </el-form-item>

      <el-form-item label="预计收入金额/元" prop="preIncomeMoney">
        <el-input
          v-model="createProductForm.preIncomeMoney"
          placeholder="请输入预计收入金额"
        ></el-input>
      </el-form-item>
      <el-form-item label="预计支出金额/元" prop="preOutMoney">
        <el-input
          v-model="createProductForm.preOutMoney"
          placeholder="请输入预计支出金额"
        ></el-input>
      </el-form-item>

      <el-form-item label="项目所属公司" prop="belongComp">
        <el-select
          v-model="createProductForm.belongComp"
          placeholder="请选择项目所属公司"
        >
          <el-option label="未结算" value="notState"></el-option>
          <el-option label="待结算" value="willState"></el-option>
          <el-option label="已结算" value="stated"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="销售经理" prop="saleManager">
        <el-select v-model="createProductForm.saleManager" placeholder="请选择销售经理">
          <el-option label="未结算" value="notState"></el-option>
          <el-option label="待结算" value="willState"></el-option>
          <el-option label="已结算" value="stated"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="项目经理" prop="productManager">
        <el-select v-model="createProductForm.proPerson" placeholder="请选择项目经理">
          <el-option label="未结算" value="notState"></el-option>
          <el-option label="待结算" value="willState"></el-option>
          <el-option label="已结算" value="stated"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="项目成员" prop="members">
        <el-select v-model="createProductForm.members" multiple placeholder="请选择项目成员" style="width: 50%">
          <el-option
            v-for="item in userList"
            :key="item.userId"
            :label="item.username"
            :value="item.userId"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="项目成员工时" prop="memberTimes">
        <span class="set-time" @click="handleSetTime()">设置工时</span>
        <el-input v-model="createProductForm.memberTimes" placeholder disabled></el-input>
      </el-form-item>

      <el-form-item label="项目描述" prop="productDesc">
        <el-input
          type="textarea"
          v-model="createProductForm.productDesc"
          placeholder="请输入项目描述"
        ></el-input>
      </el-form-item>

      <el-form-item class="button-wrap">
        <el-button @click="resetForm('ruleForm')">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >创建项目</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Table from "~/components/projectListPage/Table.vue";

export default {
  data() {
    return {
      createProductForm: {
        oneLevelMenu: "",
        towLevelMenu: "",
        productTime: "",
        gongQi: "",
        productName: "",
        preIncomeMoney: "",
        preOutMoney: "",
        belongComp: "",
        saleManager: "",
        proPerson: "",
        members: [],
        memberTimes: "",
        productDesc: ""
      }
    };
  },
  computed: {
    userList() {
      console.log("user component", this.$store.state.userData.userListTable);
      return this.$store.state.userData.userListTable.listData;
    }
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