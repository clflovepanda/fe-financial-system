<template>
<div>
  <el-container class="container">
    <el-container>
      <el-main>
      <el-row>
        <el-col :span="2" class="labelSty">
          <span>应收单编号</span>
        </el-col>
        <el-col :span="3">
          <el-input v-model="ruleForm.receivableNo" placeholder="请输入应收单编号"></el-input>
        </el-col>
        <el-col :span="2" :offset="1" class="labelSty">
          <span>单位名称</span>
        </el-col>
        <el-col :span="3">
          <el-input v-model="ruleForm.compnayName" placeholder="请输入单位名称"></el-input>
        </el-col>
        <el-col :span="2" :offset="1" class="labelSty">
          <span>应税务劳务名称</span>
        </el-col>
        <el-col :span="3">
          <el-input v-model="ruleForm.taxableServiceName" placeholder="请输入应税务劳务名称"></el-input>
        </el-col>
      </el-row>
      <el-row class="rowSty">
        <el-col :span="2" class="labelSty">
          <span>经办人</span>
        </el-col>
        <el-col :span="3">
          <el-input v-model="ruleForm.username" placeholder="请输入经办人"></el-input>
        </el-col>
        <el-col :span="2" :offset="1" class="labelSty">
          <span>申请时间</span>
        </el-col>
        <el-col :span="6">
          <el-date-picker
              v-model="dataRange"
              type="daterange"
              range-separator="~"
              start-placeholder="请选择开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="searchReceivable()">查询</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-divider></el-divider>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="20">
          <el-button type="primary" @click="handleExcel()">新增应收单</el-button>
        </el-col>
      </el-row>
      <el-table :data="getReceivableList" border style="width: 100%; margin-top: 20px">
        <el-table-column align="center" prop="receivableId" label="序号" width="120"></el-table-column>
        <el-table-column align="center" prop="receivableNo" label="应收单编号"></el-table-column>
        <el-table-column align="center" prop="companyName" label="单位名称" width="120"></el-table-column>
        <el-table-column align="center" prop="taxableServiceName" label="应税劳务名称" width="120"></el-table-column>
        <el-table-column align="center" prop="invoiceType" label="金额/元"></el-table-column>
        <el-table-column align="center" prop="username" label="经办人"></el-table-column>
        <el-table-column align="center" prop="applyDatetime" label="申请时间"></el-table-column>
        <el-table-column align="center" label="操作" width="140">
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
</div>
</template>

<script>
import Table from "~/components/projectListPage/Table.vue";
import axios from "axios";

export default {
  data() {
    return {
      ruleForm: {
        receivableNo: "",
        compnayName: "",
        taxableServiceName: "",
        username: "",
      },
      dataRange: "",
      listData: [],
    };
  },
  computed: {
    getReceivableList() {
      return this.$store.state.projectData.receivableList;
    }
  },
  methods: {
    searchReceivable() {
      axios.get("/api/receivable/list", {
        params: this.ruleForm
      }).then(
        (rep) => {
          if (rep && rep.data) {
            this.$store.commit("projectData/setReceivableList", rep.data.data);
          }
        },
        () => {}
      );
    },
    handleAddPay() {},
    handleExcel() {},
  },
};
</script>

<style>
/* .recieve .el-form-item {
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
} */
.labelSty {
  line-height: 40px;
  text-align: center;
}

.rowSty {
  margin-top: 10px;
}
</style>