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
        <div class="labelSty">项目大类：</div>
      </el-col>
      <el-col :span="3">
        <el-select
          v-model="incomeSearchForm.incomeFromType"
          placeholder="请选择项目大类"
        >
          <el-option
            v-for="item in incomeFromTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
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
    searchUserList: function () {
      console.log("search income list ...");
      axios.get("/api").then(
        (response) => {
          console.log(response);
        },
        () => {}
      );
    },
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