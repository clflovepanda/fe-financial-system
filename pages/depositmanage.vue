
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="breadcrumb">位置</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb">财务</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb" :to="{ path: '/description' }"
        >押金管理</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-divider></el-divider>
    <Deposit :projectDetail="false"/>

  </div>
</template>

<script>
import axios from 'axios';
import Deposit from "~/components/projectListPage/Deposit.vue";
import CookieUtil from "~/utils/CookieUtil";
import NetReqUser from "../network/NetReqUser";

export default {
  computed:{
    checkNowUserRole(){
      return function(name) {
        return this.$store.state.userData.nowUserRole.indexOf(name) > -1;
      }
    },
  },
  methods: {
    
  },
  async asyncData(ctx) {
    if(!CookieUtil.existCookie("user_id")) {
      location.href = "/";
    }
    let nowUserRole = await NetReqUser.getNowUserRole();
    console.log("当前用户角色列表", nowUserRole);
    ctx.store.commit("userData/setNowUserRole", nowUserRole);
    let useTypeResult = await axios.get("/api/expenditure/gettype").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data.data;
        }
      },
      () => {}
    );
    console.log("user type", useTypeResult);
    ctx.store.commit("expenditureData/setExpenditurePurposeType", useTypeResult);

    let cityResult = await axios.get("/api/common/getcity").then(
      (rep) => {
        if (rep && rep.data) {
          return rep.data.data;
        }
      },
      () => {}
    );
    console.log("city", cityResult);
    ctx.store.commit("expenditureData/setCity", cityResult);
  }
};

</script>