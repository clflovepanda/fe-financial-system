<template>
  <el-dialog title="新建用户" :visible.sync="showCreateUserDialog">
    <el-row>
      <el-col :span="4" class="labelSty">用户名称：</el-col>
      <el-col :span="12"
        ><el-input
          placeholder="请输入用户名称"
          v-model="createDialogForm.userName"
        ></el-input
      ></el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty">手机号：</el-col>
      <el-col :span="12"
        ><el-input
          placeholder="请输入手机号"
          v-model="createDialogForm.phone"
        ></el-input
      ></el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty">部门：</el-col>
      <el-col :span="12">
        <el-select
          v-model="createDialogForm.part"
          placeholder="请选择"
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
      <el-col :span="4" class="labelSty">角色：</el-col>
      <el-col :span="12"
        ><el-input
          placeholder="请输入角色"
          v-model="createDialogForm.role"
        ></el-input
      ></el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty">账号状态：</el-col>
      <el-col :span="12">
        <el-select
          v-model="createDialogForm.accountStatus"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            v-for="item in accountStatusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty">输入密码：</el-col>
      <el-col :span="12"
        ><el-input
          placeholder="请输入密码"
          v-model="createDialogForm.password"
          show-password
        ></el-input
      ></el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty">再次输入密码：</el-col>
      <el-col :span="12"
        ><el-input
          placeholder="请重复密码"
          v-model="createDialogForm.repassword"
          show-password
        ></el-input
      ></el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="4" :offset="8">
        <el-button type="primary" style="width: 90%" @click="createUser"
          >保存</el-button
        >
      </el-col>
      <el-col :span="4">
        <el-button style="width: 90%">重置</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      createDialogForm: {
        userName: "",
        phone: "",
        role: "",
        accountStatus: "",
        part: "",
        password: "",
        repassword: "",
      },
      showCreateUserDialog: false
    };
  },
  computed: {
    partList() {
      return this.$store.state.partData.partList;
    },
    accountStatusList() {
      return this.$store.state.userData.accountStatusList;
    },
    isShowCreateUserDialog() {
        return this.$store.state.dialogSwitchData.createUserDialogShow;
    }
  },
  watch: {
      showCreateUserDialog() {
          this.$store.commit("dialogSwitchData/showCreateUserDialog", this.showCreateUserDialog);
      },
      isShowCreateUserDialog(val, oldVal) {
        this.showCreateUserDialog = val;
      }
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
  margin-top: 10px;
}
</style>