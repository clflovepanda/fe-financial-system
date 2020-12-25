<template>
  <div>
    <el-table
      :data="userListTable.listData"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        fixed
        prop="userId"
        label="序号"
      ></el-table-column>
      <el-table-column prop="username" label="用户名称"></el-table-column>
      <el-table-column prop="mobile" label="手机号"></el-table-column>
      <el-table-column prop="depId" label="部门"></el-table-column>
      <el-table-column prop="roleName" label="角色"></el-table-column>
      <el-table-column
        prop="state"
        label="账号状态"
      ></el-table-column>
      <el-table-column
        prop="createDatetime"
        label="创建时间"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small" @click="handleEdit(scope)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="12" :offset="12">
        <div class="block" style="margin-top: 30px">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="userListTable.currentPage"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="userListTable.total"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    userListTable() {
      console.log("user component", this.$store.state.userData.userListTable);
      return this.$store.state.userData.userListTable;
    }
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    handleClick(scope) {
      console.log(scope);
    },
    handleEdit(scope) {
      console.log("edit " + scope.$index + " ...");
      this.$store.commit("userData/setEditUserForm", this.$store.state.userData.userListTable.listData[scope.$index]);
      this.$store.commit("dialogSwitchData/showEditUserDialog", true);
    },
  }
};
</script>