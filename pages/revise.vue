<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="breadcrumb">位置</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb">查看项目</el-breadcrumb-item>
      <el-breadcrumb-item
        class="breadcrumb nowLocation"
        :to="{ path: '/revise' }"
        >修改项目</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="130px"
      label-position="left"
      class="demo-ruleForm revise-form"
    >
      <el-form-item label="一级类目" prop="statement">
        <el-select v-model="ruleForm.statement" placeholder="请选择一级类目">
          <el-option label="RA" value="notState"></el-option>
          <el-option label="G" value="willState"></el-option>
          <el-option label="猎头" value="stated"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级类目" prop="statement">
        <el-select v-model="ruleForm.statement" placeholder="请选择二级类目">
          <el-option label="RA" value="notState"></el-option>
          <el-option label="G" value="willState"></el-option>
          <el-option label="猎头" value="stated"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目周期" prop="proManager">
        <el-date-picker
          v-model="ruleForm.proDate"
          type="daterange"
          range-separator="~"
          start-placeholder="请选择项目开始时间"
          end-placeholder="结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="工期" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入工期"></el-input>
      </el-form-item>
      <el-form-item label="项目名称" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入项目名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="预计收入金额/元" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入预计收入金额/元"
        ></el-input>
      </el-form-item>
      <el-form-item label="预计支出金额/元" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入预计支出金额/元"
        ></el-input>
      </el-form-item>
      <el-form-item label="项目所属公司" prop="statement">
        <el-select
          v-model="ruleForm.statement"
          placeholder="请选择项目所属公司"
        >
          <el-option label="RA" value="notState"></el-option>
          <el-option label="G" value="willState"></el-option>
          <el-option label="猎头" value="stated"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="销售经理" prop="statement">
        <el-select v-model="ruleForm.statement" placeholder="请选择销售经理">
          <el-option label="RA" value="notState"></el-option>
          <el-option label="G" value="willState"></el-option>
          <el-option label="猎头" value="stated"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目经理" prop="statement">
        <el-select v-model="ruleForm.statement" placeholder="请选择项目经理">
          <el-option label="RA" value="notState"></el-option>
          <el-option label="G" value="willState"></el-option>
          <el-option label="猎头" value="stated"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目成员" prop="statement">
        <el-select v-model="ruleForm.statement" placeholder="请选择项目成员">
          <el-option label="RA" value="notState"></el-option>
          <el-option label="G" value="willState"></el-option>
          <el-option label="猎头" value="stated"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目员工工时" prop="name">
        <span @click="setWorkTime()" class="setTime">设置工时</span>
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入员工工时"
        ></el-input>
      </el-form-item>
      <el-form-item label="项目描述" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入项目描述"
        ></el-input>
      </el-form-item>
      <el-form-item class="button-wrap">
        <el-button @click="resetForm('ruleForm')">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >保存项目</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
    setWorkTime() {
      this.$router("/setWorkTime");
    },
  },
};
</script>

<style scoped>
.revise-form .el-input {
  width: 300px;
}
.nowLocation {
  color: blue !important;
}
.setTime {
  color: blue;
  cursor: pointer;
}
</style>