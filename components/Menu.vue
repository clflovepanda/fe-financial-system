
<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    style="height: 100%"
    :class="[hasLogin ? '' : 'hiddenMenu']"
  >
    <nuxt-link to="/projectList" :class="[checkNowUserRole('project') ? '':'disRoleMenu']">
      <el-menu-item index="1">
        <i class="el-icon-s-order"></i>
        <span slot="title">项目列表</span>
      </el-menu-item>
    </nuxt-link>
    <el-submenu index="3" :class="[checkNowUserRole('financial') ? '':'disRoleMenu']">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>财务报表</span>
      </template>
      <el-menu-item-group>
        <nuxt-link to="/income" :class="[checkNowUserRole('receivement') ? '':'disRoleMenu']">
          <el-menu-item index="3-1">到款管理</el-menu-item>
        </nuxt-link>
        <nuxt-link to="/incomeStatistic" :class="[checkNowUserRole('statistic_receivement') ? '':'disRoleMenu']">
        <el-menu-item index="3-2">到款统计</el-menu-item>
        </nuxt-link>
        <nuxt-link to="/depositmanage" :class="[checkNowUserRole('deposit') ? '':'disRoleMenu']">
        <el-menu-item index="3-3" >押金管理</el-menu-item>
        </nuxt-link>
        <nuxt-link to="/expenditureManage" :class="[checkNowUserRole('expenditure') ? '':'disRoleMenu']">
        <el-menu-item index="3-4">支出管理</el-menu-item>
        </nuxt-link>
        <nuxt-link to="/invoiceReceivable" :class="[checkNowUserRole('invoice') ? '':'disRoleMenu']">
        <el-menu-item index="3-5">发票应收</el-menu-item>
        </nuxt-link>
        <nuxt-link to="/expenditureStatistic" :class="[checkNowUserRole('statistic_expenditure') ? '':'disRoleMenu']">
        <el-menu-item index="3-6">支出统计</el-menu-item>
        </nuxt-link>
        <nuxt-link to="/projectStatistic" :class="[checkNowUserRole('statistic_project') ? '':'disRoleMenu']">
        <el-menu-item index="3-7">项目统计</el-menu-item>
        </nuxt-link>
      </el-menu-item-group>
    </el-submenu>
    <nuxt-link to="/user" :class="[checkNowUserRole('user_list') ? '':'disRoleMenu']">
      <el-menu-item index="4">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
    </nuxt-link>
    <nuxt-link to="/role" :class="[checkNowUserRole('role_list') ? '':'disRoleMenu']">
      <el-menu-item index="5">
        <i class="el-icon-s-opportunity"></i>
        <span slot="title">角色管理</span>
      </el-menu-item>
    </nuxt-link>
  </el-menu>
</template>

<script>
import CookieUtil from "../utils/CookieUtil";
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  computed: {
    checkNowUserRole(){
      return function(name) {

        return this.$store.state.userData.nowUserRole.indexOf(name) > -1;
      }
    },
    hasLogin() {
      if(!CookieUtil.existCookie("user_id")) {
        this.$store.commit("userData/setHasLogin", false);
      } else {
        this.$store.commit("userData/setHasLogin", true);
      }
      return this.$store.state.userData.hasLogin;
    }
  }
};
</script>

<style>
.hiddenMenu {
  display: none;
}
</style>