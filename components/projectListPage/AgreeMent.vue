<template>
  <el-container class="container agreeMent">
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="2" class="labelSty"><span>项目合同：</span></el-col>
          <el-col :span="4">
            <el-input v-model="ruleForm.name" placeholder="请输入项目合同"></el-input>
          </el-col>
          <el-col :span="2" class="labelSty"><span>项目编号：</span></el-col>
          <el-col :span="4">
            <el-input v-model="ruleForm.id" placeholder="请输入项目编号"></el-input>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-button type="primary">查询</el-button>
            <el-button >重置</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>

        <el-row>
          <el-col :span="4" :offset="20">
            <el-button type="primary" >上传项目合同</el-button>
          </el-col>
        </el-row>
        <el-table :data="listData" border style="width: 100%; margin-top: 20px">
          <el-table-column align="center" fixed prop="num" label="序号" width="120"></el-table-column>
          <el-table-column align="center" prop="id" label="项目合同名称"></el-table-column>
          <el-table-column align="center" prop="name" label="合同编号" width="120"></el-table-column>
          <el-table-column align="center" prop="name" label="客户名称" width="120"></el-table-column>
          <el-table-column align="center" prop="proManager" label="附件"></el-table-column>
          <el-table-column align="center" prop="id" label="操作" width="140">
            <!-- <tempalte>
              <span>下载合同</span>
              <span>修改合同</span>
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
.agreeMent .el-form-item {
  display: inline-block;
  vertical-align: top;
}
.agreeMent .time .el-form-item__label {
  width: 130px !important;
}
.agreeMent .time .el-form-item__content {
  margin-left: 140px;
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
</style>