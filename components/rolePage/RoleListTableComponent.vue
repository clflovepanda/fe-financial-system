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
      <el-table-column prop="state" label="角色状态"></el-table-column>
      <el-table-column prop="createDatetime" label="创建时间"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope)" type="text" size="small"
            >查看</el-button
          >
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
  </div>
</template>

<script>
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
      console.log("edit role " + scope.$index + " ...");
    },
    ban(scope) {
      console.log("ban role " + scope.$index + " ..." );
    }
  },
};
</script>