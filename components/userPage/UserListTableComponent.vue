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
      <el-table-column prop="depId" label="部门">
        <template slot-scope="scope">
          {{getPart(scope)}}
        </template>
      </el-table-column>
      <el-table-column prop="roleName" label="角色"></el-table-column>
      <el-table-column prop="state" label="账号状态">
      <template slot-scope="scope">
        {{scope.row.state == 1 ? "启用" : "禁用"}}
      </template>
      </el-table-column>
      <el-table-column
        prop="createDatetime"
        label="创建时间"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="handleView(scope)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="handleEdit(scope)" v-if="checkNowUserRole('user_update')">编辑</el-button>
          <el-button type="text" size="small" @click="changeState(scope)" v-if="checkNowUserRole('user_state') && scope.row.state != 1">启用</el-button>
          <el-button type="text" size="small" @click="changeState(scope)" v-if="checkNowUserRole('user_state') && scope.row.state == 1">禁用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-row>
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
    </el-row> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    checkNowUserRole(){
      return function(name) {
        return this.$store.state.userData.nowUserRole.indexOf(name) > -1;
      }
    },
    userListTable() {
      console.log("user component", this.$store.state.userData.userListTable);
      return this.$store.state.userData.userListTable;
    }
  },
  methods: {
    getPart(scope) {
      let partList = this.$store.state.partData.partList;
      for (let i = 0 ; i < partList.length ; i ++) {
        if (partList[i].value == scope.row.depId) {
          return partList[i].label;
        }
      }
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleView(scope) {
      this.$store.commit("userData/setViewUser", true);
      this.$store.commit("userData/setEditUserForm", this.$store.state.userData.userListTable.listData[scope.$index]);
      this.$store.commit("dialogSwitchData/showEditUserDialog", true);
    },
    handleEdit(scope) {
      this.$store.commit("userData/setViewUser", false);
      this.$store.commit("userData/setEditUserForm", this.$store.state.userData.userListTable.listData[scope.$index]);
      this.$store.commit("dialogSwitchData/showEditUserDialog", true);
    },
    changeState(scope) {
    },
    ban(scope) {
      axios.get("/api/user/changeuserstate?userId=" + scope.row.userId).then(
        (res) => {
          axios.get("/api/role/get").then(
            (rep) => {
              if (rep && rep.data) {
                this.$store.commit("roleData/setRoleList", rep.data.data);
              }
            },
            () => {}
          );
        },
        () => {}
      );
    }
  }
};
</script>