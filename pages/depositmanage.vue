
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
    <Deposit />

  </div>
</template>

<script>
import axios from 'axios';
import Deposit from "~/components/projectListPage/Deposit.vue";

export default {

  methods: {
    
  },
  async asyncData(ctx) {
    
  }
};

</script>