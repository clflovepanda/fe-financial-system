<template>
  <div>
    <el-row class="rowSty">
      <el-col :span="4">
        <div class="labelSty"><i style="color: red">* </i>是否做账：</div>
      </el-col>
      <el-col :span="8">
        <el-radio v-model="accountingForm.isAccounting" label="1">是</el-radio>
        <el-radio v-model="accountingForm.isAccounting" label="2">否</el-radio>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4">
        <div class="labelSty">凭证号：</div>
      </el-col>
      <el-col :span="8">
        <el-input v-model="accountingForm.voucher" placeholder="选填"></el-input>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="6" :offset="18">
        <el-button type="primary">确认做账</el-button>
        <el-button>返回到款列表</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      accountingForm: {
        isAccounting: false,
        voucher: ""
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
    },
  },
  watch: {
    incomeSearchForm(val, oldVal) {
      this.$store.commit("incomeData/setSearchIncomeForm", val);
    },
  },
  methods: {},
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