<template>
  <el-container class="container">
    <el-header class="headerContent">
      <HeaderBar />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Menu />
      </el-aside>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item class="breadcrumb">位置</el-breadcrumb-item>
          <el-breadcrumb-item class="breadcrumb">项目</el-breadcrumb-item>
          <el-breadcrumb-item class="breadcrumb" :to="{ path: '/projectList' }" >项目列表</el-breadcrumb-item>
        </el-breadcrumb>
        项目列表
      </el-main>
    </el-container>
  </el-container>
</template>

<script>


export default {
  methods: {
   
  }
};

</script>