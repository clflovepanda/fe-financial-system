<template>
  <el-dialog title="修改到款" :visible.sync="editIncomeDialogShow">
    <el-row>
      <el-col :span="4" class="labelSty">到款账户：</el-col>
      <el-col :span="12">
        <el-select
          v-model="editIncomeDialogForm.account"
          placeholder="请选择到款账户"
          style="width: 100%"
        >
          <el-option
            v-for="item in partList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty">到款种类：</el-col>
      <el-col :span="12">
        <template>
          <el-radio
            v-model="editIncomeDialogForm.incomeType"
            label="1"
            class="labelSty"
            >汇款</el-radio
          >
          <el-radio
            v-model="editIncomeDialogForm.incomeType"
            label="2"
            class="labelSty"
            >支票</el-radio
          >
          <el-radio
            v-model="editIncomeDialogForm.incomeType"
            label="3"
            class="labelSty"
            >现金</el-radio
          >
          <el-radio
            v-model="editIncomeDialogForm.incomeType"
            label="4"
            class="labelSty"
            >押金</el-radio
          >
        </template>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty">金额/元：</el-col>
      <el-col :span="12">
        <el-input
          placeholder="请输入到款金额"
          v-model="editIncomeDialogForm.money"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty">汇款方类型：</el-col>
      <el-col :span="12">
        <template>
          <el-radio
            v-model="editIncomeDialogForm.incomeFromType"
            label="1"
            class="labelSty"
            >企业</el-radio
          >
          <el-radio
            v-model="editIncomeDialogForm.incomeFromType"
            label="2"
            class="labelSty"
            >个人</el-radio
          >
          <el-radio
            v-model="editIncomeDialogForm.incomeFromType"
            label="3"
            class="labelSty"
            >未知</el-radio
          >
        </template>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty">汇款方：</el-col>
      <el-col :span="12">
        <el-input
          placeholder="请输入汇款方名称"
          v-model="editIncomeDialogForm.incomeFromName"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty">到款时间：</el-col>
      <el-col :span="12">
        <el-date-picker
          v-model="editIncomeDialogForm.incomeDate"
          type="date"
          placeholder="选择日期"
          style="width: 100%"
        >
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty">备注：</el-col>
      <el-col :span="12">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="editIncomeDialogForm.remark"
        >
        </el-input>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" :offset="8">
        <el-button type="primary" style="width: 90%" @click="createUser">保存</el-button>
      </el-col>
      <el-col :span="4">
        <el-button style="width: 90%">返回</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      editIncomeDialogForm: {
        account: "",
        money: "",
        incomeType: "",
        incomeFromType: "",
      },
      editIncomeDialogShow: false,
    };
  },
  computed: {
    partList() {
      return this.$store.state.partData.partList;
    },
    accountStatusList() {
      return this.$store.state.userData.accountStatusList;
    },
    isShowEditIncomeDialog() {
      return this.$store.state.dialogSwitchData.editIncomeDialogShow;
    },
  },
  watch: {
    editIncomeDialogShow() {
      this.$store.commit(
        "dialogSwitchData/showEditIncomeDialog",
        this.editIncomeDialogShow
      );
    },
    isShowEditIncomeDialog(val, oldVal) {
      this.editIncomeDialogShow = val;
    },
  },
  methods: {
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