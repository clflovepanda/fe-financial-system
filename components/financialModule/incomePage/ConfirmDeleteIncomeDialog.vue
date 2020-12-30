
<template>
  <el-dialog title="删除" :visible.sync="deleteIncomeDialogShow" width="40%">
    <el-row class="rowSty">
      <el-col :span="22" :offset="1">
        <span>请确认是否要删除这条记录？删除后记录将不可恢复，请谨慎操作。</span>
      </el-col>
    </el-row>
    <el-row style="margin-top: 50px">
      <el-col :span="8" :offset="16">
        <el-button type="primary" @click="deleteReceiveMent">确认删除</el-button>
        <el-button>取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import axios from 'axios'
import IncomeDetailListTableComponent from "~/components/financialModule/incomePage/IncomeDetailListTableComponent";
import ConfirmIncomeListTableComponent from "~/components/financialModule/incomePage/ConfirmIncomeListTableComponent";
import AccountingInfoComponent from "~/components/financialModule/incomePage/AccountingInfoComponent";

export default {
  data() {
    return {
      newIncomeDialogForm: {
        account: "",
        money: "",
        incomeType: "",
        incomeFromType: "",
      },
      deleteIncomeDialogShow: false,
    };
  },
  computed: {
    partList() {
      return this.$store.state.partData.partList;
    },
    accountStatusList() {
      return this.$store.state.userData.accountStatusList;
    },
    isShowDeleteIncomeDialog() {
      return this.$store.state.dialogSwitchData.deleteIncomeDialogShow;
    },
  },
  watch: {
    deleteIncomeDialogShow() {
      this.$store.commit(
        "dialogSwitchData/showDeleteIncomeDialog",
        this.deleteIncomeDialogShow
      );
    },
    isShowDeleteIncomeDialog(val, oldVal) {
      this.deleteIncomeDialogShow = val;
    },
  },
  methods: {
    deleteReceiveMent() {
      axios.get('/api/receivement/delete?id='+this.$store.state.dialogSwitchData.incomeDetailValue[0].id).then( (response) => {
        console.log(response.data)
        if( response.data.code === 0 ){
          window.location.reload();
        } else {
          this.$message({
            message: response.data.msg,
            type: "error"
          });
        }
      })
    },
    createUser: function () {
      console.log("create user ...");
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
  margin-top: 15px;
}
</style>