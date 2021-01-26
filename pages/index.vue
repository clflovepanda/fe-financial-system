<template>
  <div :class="[hasLogin ? 'hiddenMenu' : '']">
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
          <el-col :span="10">
            <el-input placeholder="请输入验证码" v-model="checkcode"></el-input>
          </el-col>
          <el-col :span="6" style="text-align: center">
            <img :src="validate.url" @click="changeCode" />
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
  </div>
</template>

<script>
import axios from "axios";
import NetReqUser from "../network/NetReqUser";
import CookieUtil from "../utils/CookieUtil";

export default {
  data() {
    return {
      account: "",
      password: "",
      checkcode: "",
      remember: false,
      validateUrl: "",
    };
  },
  computed: {
    validate() {
      return this.$store.state.userData.validateCode;
    },
    hasLogin() {
      if(!CookieUtil.existCookie("user_id")) {
        this.$store.commit("userData/setHasLogin", false);
      } else {
        this.$store.commit("userData/setHasLogin", true);
      }
      return this.$store.state.userData.hasLogin;
    }
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
          validate: this.$store.state.userData.validateCode.id,
          code: this.checkcode,
        })
        .then(
          (response) => {
            console.log(response);
            if (response.data.code == 0) {
              (async () => {
                this.$message({
                  message: "登录成功",
                  type: "success",
                });
                if (this.remember) {
                  CookieUtil.setCookie("isMem", true, 30);
                  CookieUtil.setCookie("memUser", this.account, 30);
                  CookieUtil.setCookie("memPwd", this.password, 30);
                } else {
                  CookieUtil.setCookie("isMem", false, -1);
                  CookieUtil.setCookie("memUser", this.account, -1);
                  CookieUtil.setCookie("memPwd", this.password, -1);
                }
                let allUser = await NetReqUser.getAllUser();
                this.$store.commit("rootData/setUserList", allUser);
                // let projectList = await NetReqUser.getAllProject();
                this.$router.push("/projectList");
                this.$store.commit("userData/setHasLogin", true);
                let nowUserRole = await NetReqUser.getNowUserRole();
                console.log("当前用户角色列表", nowUserRole);
                this.$store.commit("userData/setNowUserRole", nowUserRole);
              })();
            } else {
              this.$message.error(response.data.msg);
            }
          },
          () => {}
        );
    },
    changeCode() {
      axios.get("/api/login/createValidateCode").then(
        (rep) => {
          if (rep && rep.data) {
            let result = rep.data.data;
            this.$store.commit("userData/setValidateCode", {
              id: result.validateId,
              url: result.validateUrl,
            });
          }
        },
        () => {}
      );
    },
  },
  mounted(){
    let isMem = CookieUtil.getCookie("isMem");
    if (isMem != null && isMem != "" && isMem) {
      this.remember = true;
      let memUser = CookieUtil.getCookie("memUser");
      let memPwd = CookieUtil.getCookie("memPwd");
      console.log("+++", memUser, memPwd);
      if(memUser != null && memUser != "") {
        this.account = memUser;
        this.password = memPwd;
      }
    } else {
      console.log("没有保存用户名和密码");
      this.remember = false;
    }
  },
  async asyncData(ctx) {
    if(CookieUtil.existCookie("user_id")) {
      location.href = "/user";
    }
    let result = await axios.get("/api/login/createValidateCode").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data.data;
        }
      },
      () => {}
    );
    ctx.store.commit("userData/setValidateCode", {
      id: result.validateId,
      url: result.validateUrl,
    });
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
.hiddenMenu {
  display: none;
}
</style>
