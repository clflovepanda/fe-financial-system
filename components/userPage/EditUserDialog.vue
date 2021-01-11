<template>
  <el-dialog title="用户信息" :visible.sync="showEditUserDialog">
    <el-row>
      <el-col :span="4" class="labelSty">用户名称：</el-col>
      <el-col :span="12"
        ><el-input
          placeholder="请输入用户名称"
          v-model="editUserForm.username"
          :disabled="getViewUser"
        ></el-input
      ></el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty">手机号：</el-col>
      <el-col :span="12"
        ><el-input
          placeholder="请输入手机号"
          v-model="editUserForm.mobile"
          :disabled="getViewUser"
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
          :disabled="getViewUser"
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
        ><el-select
          v-model="editUserForm.roleId"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            v-for="item in getRoleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          ></el-option>
        </el-select></el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty">账号状态：</el-col>
      <el-col :span="12">
        <el-select
          v-model="editUserForm.state"
          placeholder="请选择"
          style="width: 100%"
          :disabled="getViewUser"
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
    <el-row class="rowSty" :class="[getViewUser ? 'hiddenRow' : '']">
      <el-col :span="4" class="labelSty">输入密码：</el-col>
      <el-col :span="12"
        ><el-input
          placeholder="请输入密码"
          v-model="editUserForm.password"
          show-password
          
        ></el-input
      ></el-col>
    </el-row>
    <el-row class="rowSty" :class="[getViewUser ? 'hiddenRow' : '']">
      <el-col :span="4" class="labelSty">再次输入密码：</el-col>
      <el-col :span="12"
        ><el-input
          placeholder="请重复密码"
          v-model="editUserForm.repassword"
          show-password
        ></el-input
      ></el-col>
    </el-row>
    <el-row style="margin-top: 20px" :class="[getViewUser ? 'hiddenRow' : '']">
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
        password: "",
        repassword: ""

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
    getViewUser() {
      return this.$store.state.userData.viewUser;
    },
    getRoleList() {
      return this.$store.state.roleData.roleListTable.listData;
    }
  },
  watch: {
    storeEditUserForm(val, oldVal) {
      this.editUserForm.userId = val.userId;
      this.editUserForm.username = val.username;
      this.editUserForm.mobile = val.mobile;
      this.editUserForm.depId = val.depId;
      this.editUserForm.state = val.state;
      this.editUserForm.roleName = val.roleName;
      this.editUserForm.roleId = val.roleId;
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
      if (editUserForm.password != editUserForm.repassword) {
        this.$message.error('两次输入的密码不一致');
        return;
      }
      axios
        .post("/api/user/update", {
          user: {
            userId: this.editUserForm.userId,
            username: this.editUserForm.username,
            mobile: this.editUserForm.mobile,
            state: this.editUserForm.state,
            roleId: [this.editUserForm.roleId],
            depId: this.editUserForm.depId,
            password: this.editUserForm.password
          },
        })
        .then(
          (response) => {
            this.$store.commit("dialogSwitchData/showEditUserDialog", false);
            axios.get("/api/user/list").then(
              (rep) => {
                if (rep && rep.data) {
                  this.$store.commit("userData/setUserListTable", rep.data.data);
                }
              },
              () => {}
            );
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

.hiddenRow {
  display: none;
}
</style>