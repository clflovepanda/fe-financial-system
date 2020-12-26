<template>
  <div>
    <el-row class="rowSty">
      <el-col :span="4">
        <div class="labelSty">认款金额/元：</div>
      </el-col>
      <el-col :span="8">
        <el-input
          placeholder="请输入本次认款的金额"
          v-model="nowIncomeForm.money"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4">
        <div class="labelSty">收入类型/元：</div>
      </el-col>
      <el-col :span="8">
        <el-select
          v-model="nowIncomeForm.incomeType"
          placeholder="请选择收入类型"
          style="width: 100%"
        >
          <el-option
            v-for="item in incomeTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4">
        <div class="labelSty">选择关联项目：</div>
      </el-col>
      <el-col :span="8">
        <el-autocomplete
          class="inline-input"
          v-model="nowIncomeForm.project"
          :fetch-suggestions="querySearch"
          placeholder="请输入你要关联的项目名称"
          @select="handleSelect"
          style="width: 100%"
        ></el-autocomplete>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4">
        <div class="labelSty">项目二级类型：</div>
      </el-col>
      <el-col :span="8">
        <el-input
          disabled
          placeholder="请输入你要关联的二级项目"
          v-model="nowIncomeForm.dataSourceName"
        ></el-input>
        
        <!-- <el-autocomplete
          class="inline-input"
          v-model="nowIncomeForm.project"
          :fetch-suggestions="querySearch"
          placeholder="请输入你要关联的二级项目"
          @select="handleSelect"
          style="width: 100%"
        ></el-autocomplete> -->
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4">
        <div class="labelSty">认款时间：</div>
      </el-col>
      <el-col :span="8">
        <el-date-picker
          v-model="nowIncomeForm.incomeDate"
          type="date"
          placeholder="请选择认款时间"
          style="width: 100%"
        >
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4">
        <div class="labelSty">备注：</div>
      </el-col>
      <el-col :span="8">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入备注信息"
          v-model="nowIncomeForm.remark"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" :offset="16">
        <el-button type="primary" style="width: 90%" @click="addSubLog()">确认收款</el-button>
      </el-col>
      <el-col :span="4">
        <el-button style="width: 90%">返回到款列表</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      nowIncomeForm: {
        account: "",
        incomeType: "",
        incomeFromType: "",
        incomeFromName: "",
        incomeDate: "",
        remark: "",
        dataSourceName: '',
        receivementId:'',
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
  methods: {
    addSubLog(){
      if(this.nowIncomeForm.money > this.$store.state.dialogSwitchData.incomeDetailValue[0].remaindSubscriptionTotalMoney){
        this.$message({
          message: "本次认款金额需小于剩余认款金额",
          type: "warning",
        });
        return false
      }
      let params = {
        receivementId: this.$store.state.dialogSwitchData.incomeDetailValue[0].id,
        receivementMoney: this.nowIncomeForm.money,
        revenueTypeId: this.nowIncomeForm.incomeType,
        projectId: this.nowIncomeForm.projectId,
        subscriptionDate: new Date(this.nowIncomeForm.incomeDate).getTime(),
        remark: this.nowIncomeForm.remark,
        state: this.nowIncomeForm.money == this.$store.state.dialogSwitchData.incomeDetailValue[0].remaindSubscriptionTotalMoney?3:2,
      }

      if(this.nowIncomeForm.money&&this.nowIncomeForm.incomeType&&this.nowIncomeForm.projectId&&this.nowIncomeForm.incomeDate){
        axios.post('/api/receivement/addsublog',params).then( (response) => {
          if(response.data.code==200){
            window.location.reload();

          }
        })
      }else{
        this.$message({
          message: "请情书本次认款信息",
          type: "warning",
        });
      }
      

    },
    searchUserList: function () {
      console.log("search income list ...");
      axios.get("/api").then(
        (response) => {
          console.log(response);
        },
        () => {}
      );
    },
    querySearch: function (queryStr, cb) {
      if(queryStr){
        axios.get('/api/project/getbykey?keyWords='+this.nowIncomeForm.project).then(
          (res) => {
            let searchList  = [];
            res.data.data.map((item) => {
              searchList.push({value:item.name,item:item})
            })
            cb(searchList)


          }
        )
      }      
    },
    handleSelect: function (val) {
      this.nowIncomeForm.dataSourceName = val.item.dataSourceName;
      this.nowIncomeForm.projectId = val.item.projectId;

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