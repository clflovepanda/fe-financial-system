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
      <el-col :span="12">
        <el-select
          v-model="createDialogForm.role"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            v-for="item in getRoleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          ></el-option>
        </el-select>
      </el-col>
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
        <el-button style="width: 90%" @click="resetForm">重置</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import axios from "axios";
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
      showCreateUserDialog: false,
    };
  },
  computed: {
    partList() {
      return this.$store.state.partData.partList;
    },
    accountStatusList() {
      return this.$store.state.userData.accountStatusList;
    },
    roleList() {
      return this.$store.state.roleData.roleStatusList;
    },
    isShowCreateUserDialog() {
      return this.$store.state.dialogSwitchData.createUserDialogShow;
    },
    getRoleList() {
      return this.$store.state.roleData.roleListTable.listData;
    }
  },
  watch: {
    showCreateUserDialog() {
      this.$store.commit(
        "dialogSwitchData/showCreateUserDialog",
        this.showCreateUserDialog
      );
    },
    isShowCreateUserDialog(val, oldVal) {
      this.showCreateUserDialog = val;
    },
  },
  methods: {
    createUser: function () {
      console.log("create user ...");
      if (this.createDialogForm.password != this.createDialogForm.repassword) {
        this.$message.error("两次输入的密码不一致");
        return;
      }
      if (this.createDialogForm.password == null || this.createDialogForm.password == "") {
        this.$message.error("密码不能为空");
        return;
      }
      if (
        this.createDialogForm.userName == null ||
        this.createDialogForm.userName == ""
      ) {
        this.$message.error("用户名不能为空");
        return;
      }
      if (
        this.createDialogForm.phone == null ||
        this.createDialogForm.phone == ""
      ) {
        this.$message.error("电话号不能为空");
        return;
      }
      if (
        this.createDialogForm.role == null ||
        this.createDialogForm.role == ""
      ) {
        this.$message.error("角色不能为空");
        return;
      }
      if (
        this.createDialogForm.part == null ||
        this.createDialogForm.part == ""
      ) {
        this.$message.error("部门不能为空");
        return;
      }
      axios
        .post("/api/user/add", {
          user: {
            userId: "",
            username: this.createDialogForm.userName,
            mobile: this.createDialogForm.phone,
            email: "",
            password: this.createDialogForm.password,
            state: 1,
            roleId: [this.createDialogForm.role],
            depId: this.createDialogForm.part,
          },
        })
        .then(
          (response) => {
            if(response.data.code != 0) {
              this.$message.error(response.data.msg);
              return;
            }
            this.$store.commit("dialogSwitchData/showCreateUserDialog", false);
            axios.get("/api/user/list").then(
              (rep) => {
                console.log(rep);
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
    resetForm() {
      this.createDialogForm.userName = "";
      this.createDialogForm.phone = "";
      this.createDialogForm.role = "";
      this.createDialogForm.accountStatus = "";
      this.createDialogForm.part = "";
      this.createDialogForm.password = "";
      this.createDialogForm.repassword = "";
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