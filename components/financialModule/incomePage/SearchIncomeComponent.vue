<template>
  <div>
    <el-row>
      <el-col :span="2">
        <div class="labelSty">到款账户：</div>
      </el-col>
      <el-col :span="3">
        <el-select
          v-model="incomeSearchForm.account"
          placeholder="请选择到款账户"
        >
          <el-option
            v-for="item in accountList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <div class="labelSty">到款种类：</div>
      </el-col>
      <el-col :span="3">
        <el-select
          v-model="incomeSearchForm.incomeType"
          placeholder="请选择到款种类"
        >
          <el-option
            v-for="item in incomeTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <div class="labelSty">汇款方类型：</div>
      </el-col>
      <el-col :span="3">
        <el-select
          v-model="incomeSearchForm.incomeFromType"
          placeholder="请选择汇款方类型"
        >
          <el-option
            v-for="item in incomeFromTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <div class="labelSty">汇款方：</div>
      </el-col>
      <el-col :span="3">
        <el-input
          placeholder="请输入汇款方名称"
          v-model="incomeSearchForm.incomeFromName"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="2">
        <div class="labelSty">收款时间：</div>
      </el-col>
      <el-col :span="6">
        <el-date-picker
          v-model="incomeSearchForm.incomeDate"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <!-- <el-col :span="2">
        <div class="labelSty">备注</div>
      </el-col> -->
      <!-- <el-col :span="3">
        <el-input
          placeholder="请输入要查询的备注"
          v-model="incomeSearchForm.remark"
        ></el-input>
      </el-col> -->
      <el-col :span="2" :offset="1">
        <el-button type="primary" style="width: 90%" @click="searchUserList">查询</el-button
        >
      </el-col>
      <el-col :span="2">
        <el-button style="width: 90%" @click="reset">重置</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      incomeSearchForm: {
        account: "",
        incomeType: "",
        incomeFromType: "",
        incomeFromName: "",
        incomeDate: "",
        remark: "",
      },
    };
  },
  computed: {
    accountList() {
      return this.$store.state.incomeData.accountList;
    },
    incomeTypeList() {
      return this.$store.state.incomeData.incomeTypeList;
    },
    incomeFromTypeList() {
      return this.$store.state.incomeData.incomeFromTypeList;
    }
  },
  watch: {
    incomeSearchForm(val, oldVal) {
      this.$store.commit("incomeData/setSearchIncomeForm", val);
    },
  },
  methods: {
    searchUserList:  function () {
      console.log("search income list ...");
      let params = {
        companyId: this.incomeSearchForm.account,
        receivementTypeId:this.incomeSearchForm.incomeType,
        remitterMethodId:this.incomeSearchForm.incomeFromType,
        remitter:this.incomeSearchForm.incomeFromName,
        startDt:this.incomeSearchForm.incomeDate?new Date(this.incomeSearchForm.incomeDate[0]).getTime():'',
        endDt:this.incomeSearchForm.incomeDate?new Date(this.incomeSearchForm.incomeDate[1]).getTime():'',
      }
      axios({
        method: 'get',
        url: '/api/receivement/list',
        params: params,
        dataType: "json",
        contentType: "application/json",
      }).then((response) => {
        this.$store.commit('incomeData/setIncomeListTable',response.data.data)
      },() => {})

      // axios.get("/api/receivement/list").then(
      //   (response) => {
      //     console.log(response);
      //   },
      //   () => {}
      // );
    },
    reset() {
      this.incomeSearchForm.account = "";
      this.incomeSearchForm.incomeType = "";
      this.incomeSearchForm.incomeFromType = "";
      this.incomeSearchForm.incomeFromName = "";
      this.incomeSearchForm.incomeDate = "";
      this.incomeSearchForm.remark = "";
    }
  },
};
</script>
<style>
.labelSty {
  line-height: 40px;
  text-align: center;
}

.rowSty {
  margin-top: 10px;
}
</style>