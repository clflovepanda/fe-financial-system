<template>
  <div class="headerBar">
    <div class="logo">
      <i class="el-icon-s-claim"></i>
    </div>
    <h1 class="title">财务系统 V1.0</h1>
    <div :class="[hasLogin ? 'userSpan' : 'hiddenMenu']">
      <el-dropdown  @command="handleCommand">
        <span class="el-dropdown-link" style="color:white;cursor:pointer;font-size:18px">
          {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="out">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import CookieUtil from '../utils/CookieUtil';
export default {
  computed: {
    userName() {
      if (CookieUtil.existCookie("user_name")) {
        this.$store.commit("userData/setUserName",decodeURI(CookieUtil.getCookie("user_name")));
      }
      return this.$store.state.userData.userName;
    },
    hasLogin() {
      if (!CookieUtil.existCookie("user_id")) {
        this.$store.commit("userData/setHasLogin", false);
      } else {
        this.$store.commit("userData/setHasLogin", true);
      }
      return this.$store.state.userData.hasLogin;
    },
  },
  methods: {
    handleCommand(command) {
      console.log(command);
      if(command == "out") {
        CookieUtil.setCookie("user_id", "", -1);
        location.href = "/";
      }
    }
  },
};
</script>

<style>
.userSpan{
  display: inline-block;
  height:60px;
  line-height:60px;
  position:absolute;
  right:20px
}
.headerBar {
  background: #909399;
  height: 60px;
}
.logo {
  position: relative;
  display: inline-block;
  height: 60px;
  width: 160px;
  /* background: yellowgreen; */
  vertical-align: top;
  font-size: 36px;
  line-height: 60px;
  text-align: right;
  color: white;
}
.title {
  display: inline-block;
  margin-left: 20px;
  line-height: 60px;
  color: #fff;
  font-size: 22px;
}
</style>