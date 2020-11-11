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
        <div>
          <nuxt-link to="/login">登录页</nuxt-link>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>