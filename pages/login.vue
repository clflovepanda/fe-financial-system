<template>
  <el-row>
    <el-col :span="12" :offset="6">
      <el-row class="rowContent">
        <el-col :span="12" :offset="2">
          <div class="loginTitle">用户登录</div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row class="rowContent">
        <el-col :span="4" :offset="2">
          <div class="leftLabel">账号：</div>
        </el-col>
        <el-col :span="16">
          <el-input placeholder="请输入账号" v-model="account"></el-input>
        </el-col>
      </el-row>
      <el-row class="rowContent">
        <el-col :span="4" :offset="2">
          <div class="leftLabel">密码：</div>
        </el-col>
        <el-col :span="16">
          <el-input
            placeholder="请输入密码"
            v-model="password"
            show-password
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="rowContent">
        <el-col :span="4" :offset="2">
          <div class="leftLabel">验证码：</div>
        </el-col>
        <el-col :span="16">
          <el-input placeholder="请输入验证码" v-model="checkcode"></el-input>
        </el-col>
      </el-row>
      <el-row class="rowContent">
        <el-col :span="12" :offset="2">
          <div>
            <el-checkbox v-model="remember"></el-checkbox>
            <span>记住密码</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="rowContent">
        <el-col :span="20" :offset="2">
          <el-button type="primary" class="btnLogin" @click="login"
            >登录</el-button
          >
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      account: "",
      password: "",
      checkcode: "",
      remember: false,
    };
  },
  methods: {
    onInput() {
      return function (e) {
        this.$forceUpdate();
      };
    },
    login() {
      console.log("login ...");
      axios
        .post("/api/login/check", {
          userName: this.account,
          password: this.password,
        })
        .then(
          (response) => {
            console.log(response);
            if (response.data.code == 0) {
              this.$message({
                message: "登录成功",
                type: "success",
              });
              location.href = "/user";
            } else {
              this.$message.error(response.data.msg);
            }
          },
          () => {}
        );
    },
  },
  mounted() {
    console.log("++++++");
  },
};
</script>

<style>
.loginTitle {
  font-size: 20px;
  font-weight: 600;
}
.rowContent {
  margin-top: 30px;
}
.btnLogin {
  width: 100%;
}
.inputSty {
  width: 100%;
}
.leftLabel {
  text-align: left;
  line-height: 40px;
}
</style>