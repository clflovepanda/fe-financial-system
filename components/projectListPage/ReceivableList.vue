<template>
  <el-container class="container recieve">
    <el-container>
      <el-main>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="90px"
          label-position="left"
          class="demo-ruleForm recieve-form"
        >
          <el-form-item label="应收单编号" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入应收单编号"></el-input>
          </el-form-item>
           <el-form-item label="单位名称" prop="id">
            <el-input v-model="ruleForm.id" placeholder="请输入单位名称"></el-input>
          </el-form-item>

            <el-form-item label="应税务劳务名称" prop="name" class="recive-name">
            <el-input v-model="ruleForm.name" placeholder="请输入应税务劳务名称"></el-input>
          </el-form-item>
           <el-form-item label="经办人" prop="id">
            <el-input v-model="ruleForm.id" placeholder="请输入经办人"></el-input>
          </el-form-item>
           <el-form-item label="申请时间" required class="time">
            <el-date-picker
              v-model="ruleForm.proDate"
              type="daterange"
              range-separator="~"
              start-placeholder="请选择开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>

          <el-form-item class="button-wrap">
            <el-button type="primary" @click="handleFindClick()">查询</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>

        <el-row>
          <el-col :span="4" :offset="20">
            <el-button type="primary" @click="handleExcel()">新增应收单</el-button>
          </el-col>
        </el-row>
        <el-table :data="listData" border style="width: 100%; margin-top: 20px">
          <el-table-column align="center" fixed prop="num" label="序号" width="120"></el-table-column>
          <el-table-column align="center" prop="id" label="应收单编号"></el-table-column>
          <el-table-column align="center" prop="name" label="单位名称" width="120"></el-table-column>
          <el-table-column align="center" prop="name" label="应税劳务名称" width="120"></el-table-column>
          <el-table-column align="center" prop="proManager" label="金额/元"></el-table-column>
          <el-table-column align="center" prop="proManager" label="经办人"></el-table-column>
          <el-table-column align="center" prop="proManager" label="申请时间"></el-table-column>


          <el-table-column align="center" prop="id" label="操作" width="140">
            <!-- <tempalte>
              <span>打印</span>
              <span>修改</span>
              <span>删除</span>
            </tempalte> -->
          </el-table-column>
        </el-table>
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
      //   rules: {
      //     id: [{ required: true, message: "请输入项目编号", trigger: "blur" }],
      //     name: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
      //     proManager: [
      //       { required: true, message: "请输入项目经理姓名", trigger: "blur" },
      //     ],
      //     saleManager: [
      //       { required: true, message: "请输入销售经理姓名", trigger: "blur" },
      //     ],
      //     proPerson: [
      //       { required: true, message: "请输入项目成员姓名", trigger: "blur" },
      //     ],
      //     statement: [
      //       { required: true, message: "请选择结算单状态", trigger: "change" },
      //     ],
      //     projectStatus: [
      //       { required: true, message: "请选择项目状态", trigger: "change" },
      //     ],

      //     proDate: [
      //       {
      //         type: "date",
      //         required: true,
      //         message: "请选择日期",
      //         trigger: "change",
      //       },
      //     ],
      //     moneyStatus: [
      //       {
      //         required: true,
      //         message: "请选择销售提成发放状态",
      //         trigger: "change",
      //       },
      //     ],
      //   },
      listData: [],
    };
  },

  methods: {
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert("submit!");
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handleFindClick() {
      console.log("查询项目");
    },
    handleAddPay() {},
    handleExcel() {},
  },
};
</script>

<style>
.recieve .el-form-item {
  display: inline-block;
  vertical-align: top;
}

.recieve .time .el-form-item__content {
  margin-left: 140px;
}
.recieve .recive-name .el-form-item__label {
  width: 130px !important;

}
.recieve .recive-name .el-form-item__content {
  margin-left: 140px !important;
}

.money-show {
  background: #ccc;
  margin-top: 20px;
}
.money-show span {
  line-height: 60px;
  color: #fff;
  margin-bottom: 20px;
}
</style>