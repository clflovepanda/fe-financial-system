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
          <el-breadcrumb-item class="breadcrumb">用户</el-breadcrumb-item>
          <el-breadcrumb-item class="breadcrumb" :to="{ path: '/user' }">用户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>

        <el-row>
          <el-col :span="2">
            <div class="labelSty">用户名称：</div>
          </el-col>
          <el-col :span="3">
            <el-input placeholder="请输入用户名称" v-model="userName"></el-input>
          </el-col>
          <el-col :span="2">
            <div class="labelSty">手机号：</div>
          </el-col>
          <el-col :span="3">
            <el-input placeholder="请输入手机号" v-model="phone"></el-input>
          </el-col>
          <el-col :span="2">
            <div class="labelSty">创建时间：</div>
          </el-col>
          <el-col :span="7">
            <el-date-picker
              v-model="createDate"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-col>
          <el-col :span="2">
            <div class="labelSty">账号状态：</div>
          </el-col>
          <el-col :span="3">
            <el-select v-model="accountStatus" placeholder="请选择">
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
          <el-col :span="2">
            <div class="labelSty">角色：</div>
          </el-col>
          <el-col :span="3">
            <el-input placeholder="请输入角色" v-model="role"></el-input>
          </el-col>
          <el-col :span="2">
            <div class="labelSty">部门：</div>
          </el-col>
          <el-col :span="3">
            <el-select v-model="part" placeholder="请选择">
              <el-option
                v-for="item in partList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <div class="labelSty">更新时间：</div>
          </el-col>
          <el-col :span="7">
            <el-date-picker
              v-model="updateDate"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button type="primary" style="width: 90%">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button style="width: 90%">重置</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed prop="num" label="序号" width="120"></el-table-column>
          <el-table-column prop="name" label="用户名称"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="part" label="部门"></el-table-column>
          <el-table-column prop="role" label="角色" width="120"></el-table-column>
          <el-table-column prop="accountStatus" label="邮编" width="120"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-col :span="12" :offset="12">
            <div class="block" style="margin-top:30px">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="10"
                layout="total, prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      lalala
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      phone: "",
      role: "",
      accountStatus: "",
      createDate: "",
      updateDate: "",
      part: "",
      partList: [
        { value: 1, label: "A部门" },
        { value: 2, label: "B部门" },
        { value: 3, label: "C部门" }
      ],
      accountStatusList: [
        {
          value: 1,
          label: "启用"
        },
        {
          value: 2,
          label: "禁用"
        }
      ],
      tableData: [],
      total: 100,
      currentPage: 1,
      dialogFormVisible: true
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {}
  }
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