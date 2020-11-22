<template>
  <div>
    <el-table
      :data="userListTable.listData"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        fixed
        prop="num"
        label="序号"
        width="120"
      ></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleStatus" label="角色状态"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="createUserName" label="创建人"></el-table-column>
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
      userListTable: {
        listData: [
          {
            id: 1,
            num: 1,
            roleName: "Panda",
            roleStatus: "启用",
            createTime: "2020-11-20",
            createUserName: "张三",
          },
        ],
        total: 100,
        currentPage: 1,
      },
    };
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