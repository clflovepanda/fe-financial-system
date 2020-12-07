<template>
  <el-dialog title="编辑用户" :visible.sync="showEditUserDialog">
    <el-row>
      <el-col :span="4" class="labelSty">用户名称：</el-col>
      <el-col :span="12"
        ><el-input
          placeholder="请输入用户名称"
          v-model="editUserForm.username"
        ></el-input
      ></el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty">手机号：</el-col>
      <el-col :span="12"
        ><el-input
          placeholder="请输入手机号"
          v-model="editUserForm.mobile"
        ></el-input
      ></el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty">部门：</el-col>
      <el-col :span="12">
        <el-select
          v-model="editUserForm.depId"
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
          v-model="editUserForm.roleId"
        ></el-input
      ></el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty">账号状态：</el-col>
      <el-col :span="12">
        <el-select
          v-model="editUserForm.state"
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
          v-model="editUserForm.password"
          show-password
        ></el-input
      ></el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty">再次输入密码：</el-col>
      <el-col :span="12"
        ><el-input
          placeholder="请重复密码"
          v-model="editUserForm.repassword"
          show-password
        ></el-input
      ></el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="4" :offset="8">
        <el-button type="primary" style="width: 90%" @click="editUser"
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
import axios from "axios";
export default {
  data() {
    return {
      editUserForm: {
        userId: "",
        username: "",
        mobile: "",
        depId: "",
        state: "",
        roleName: "",
        roleId: "",
      },
      showEditUserDialog: false,
    };
  },
  computed: {
    partList() {
      return this.$store.state.partData.partList;
    },
    accountStatusList() {
      return this.$store.state.userData.accountStatusList;
    },
    isShowEditUserDialog() {
      return this.$store.state.dialogSwitchData.editUserDialogShow;
    },
    storeEditUserForm() {
      return this.$store.state.userData.editUserForm;
    },
  },
  watch: {
    storeEditUserForm(val, oldVal) {
      this.editUserForm.userId = oldVal.userId;
      this.editUserForm.username = oldVal.username;
      this.editUserForm.mobile = oldVal.mobile;
      this.editUserForm.depId = oldVal.depId;
      this.editUserForm.state = oldVal.state;
      this.editUserForm.roleName = oldVal.roleName;
      this.editUserForm.roleId = oldVal.roleId;
    },
    showEditUserDialog() {
      this.$store.commit(
        "dialogSwitchData/showEditUserDialog",
        this.showEditUserDialog
      );
    },
    isShowEditUserDialog(val, oldVal) {
      this.showEditUserDialog = val;
    },
  },
  methods: {
    editUser: function () {
      console.log("edit user ...", this.editUserForm);
      axios
        .post("/api/user/update", {
          user: {
            userId: this.editUserForm.userId,
            username: this.editUserForm.username,
            mobile: this.editUserForm.mobile,
            state: this.editUserForm.state,
            roleId: [this.editUserForm.roleId],
            depId: this.editUserForm.depId,
          },
        })
        .then(
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