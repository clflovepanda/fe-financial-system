<template>
  <div>
    <el-table
      :data="roleListTable.listData"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        fixed
        prop="roleId"
        label="序号"
        width="120"
      ></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="state" label="角色状态">
        <template slot-scope="scope">
          {{scope.row.state == 1 ? "启用" : "禁用"}}
        </template>
      </el-table-column>
      <el-table-column prop="createDatetime" label="创建时间"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope)" type="text" size="small"
            >查看</el-button
          > -->
          <el-button type="text" size="small" @click="handleEdit(scope)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="ban(scope)"
            >禁用</el-button
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
            :current-page.sync="roleListTable.currentPage"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="roleListTable.total"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
    <EditRoleDialog />
  </div>
</template>

<script>
import EditRoleDialog from "~/components/rolePage/EditRoleDialog";
import axios from "axios";
import {EnumRoleState} from "../../utils/EnumUtil";

export default {
  data() {
    return {
    };
  },
  computed: {
    roleListTable() {
      console.log("user component", this.$store.state.roleData.roleListTable);
      return this.$store.state.roleData.roleListTable;
    }
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    handleClick(scope) {
      console.log(scope);
    },
    handleEdit(scope) {
      this.$store.commit("dialogSwitchData/showEditRoleDialog", true);
      axios.get("/api/role/getbyroleid?roleId=" + scope.row.roleId).then(
        (rep) => {
          if (rep && rep.data) {
            this.$store.commit("roleData/setNowSelectRole", rep.data.data);
          }
        },
        () => {}
      );
    },
    ban(scope) {
      axios.get("/api/role/changerolestate?roleId=" + scope.row.roleId).then(
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
  },
};
</script>