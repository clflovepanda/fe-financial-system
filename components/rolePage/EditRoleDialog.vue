<template>
  <el-dialog title="编辑角色" :visible.sync="showEditRoleDialog">
    <el-row>
      <el-col :span="4" class="labelSty">角色名称：</el-col>
      <el-col :span="12"
        ><el-input
          placeholder="请输入角色名称"
          v-model="roleName"
        ></el-input
      ></el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty"><span>菜单权限：</span></el-col>
      <el-col :span="20">
        <el-checkbox v-model="checkAllPermission" @change="handleCheckAllPermissionChange">全选</el-checkbox>
        <el-tree
          :data="getListLevelData"
          show-checkbox
          node-key="permissionId"
          :props="defaultProps2"
          ref="levelTree">
        </el-tree>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty"><span>数据源：</span></el-col>
      <el-col :span="20">
        <el-checkbox v-model="checkAllSourceData" @change="handleCheckAllSourceDataChange">全选</el-checkbox>
        <el-tree
          :data="getSourceData"
          show-checkbox
          node-key="dataSourceId"
          :props="defaultProps"
          ref="sourceTree">
        </el-tree>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" :offset="20">
        <el-button type="primary" @click="editRole">修改</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      showEditRoleDialog: false,
      defaultProps: {
        children: 'son',
        label: 'dataSourceName'
      },
      defaultProps2: {
        children: 'permissionSons',
        label: 'name'
      },
      levelIds: [],
      sourceIds: [],
      roleName: "",
      roleId: "",
      checkAllPermission: false,
      checkAllSourceData: false
    };
  },
  computed: {
    getListLevelData() {
      return this.$store.state.roleData.listLevelTree;
    },
    getSourceData() {
      return this.$store.state.roleData.roleTree;
    },
    partList() {
      return this.$store.state.partData.partList;
    },
    accountStatusList() {
      return this.$store.state.userData.accountStatusList;
    },
    roleList() {
      return this.$store.state.roleData.roleStatusList;
    },
    isShowEditRoleDialog() {
      console.log(this.$store.state.dialogSwitchData.editRoleDialogShow);
      return this.$store.state.dialogSwitchData.editRoleDialogShow;
    },
    getRoleList() {
      return this.$store.state.roleData.roleListTable.listData;
    },
    nowSelectRole() {
      return this.$store.state.roleData.nowSelectRole;
    }
  },
  watch: {
    showEditRoleDialog() {
      this.$store.commit(
        "dialogSwitchData/showEditRoleDialog",
        this.showEditRoleDialog
      );
    },
    isShowEditRoleDialog(val, oldVal) {
      this.showEditRoleDialog = val;
    },
    nowSelectRole(val, oldVal) {
      console.log(val);
      this.roleName = val.roleName;
      this.roleId = val.roleId;
      let permissionKeys = [];
      for (let i = 0 ; i < val.permissions.length ; i ++) {
        permissionKeys.push(val.permissions[i].permissionId);
      }
      let sourceKeys = [];
      for (let i = 0 ; i < val.dataSources.length ; i ++) {
        sourceKeys.push(val.dataSources[i].dataSourceId);
      }
      this.$refs.levelTree.setCheckedKeys(permissionKeys, false);
      this.$refs.sourceTree.setCheckedKeys(sourceKeys, false);
    }
  },
  methods: {
    handleCheckAllPermissionChange() {
      if (this.checkAllPermission) {
        this.$refs.levelTree.setCheckedNodes(this.getListLevelData);
      } else {
          this.$refs.levelTree.setCheckedKeys([]);
      }
    },
    handleCheckAllSourceDataChange() {
      if (this.checkAllSourceData) {
        this.$refs.sourceTree.setCheckedNodes(this.getSourceData);
      } else {
          this.$refs.sourceTree.setCheckedKeys([]);
      }
    },
    getLabel: function(scope) {
      console.log(scope);
    },
    editRole: function () {
      let levelIds = this.$refs.levelTree.getCheckedNodes();
      let permissions = [];
      for(let i = 0 ; i < levelIds.length ; i ++) {
        permissions.push({
          permissionId: levelIds[i].permissionId
        });
      }
      let sourceIds = this.$refs.sourceTree.getCheckedNodes();
      let dataSources = [];
      for (let j = 0 ; j < sourceIds.length ; j ++) {
        dataSources.push({
          dataSourceId: sourceIds[j].dataSourceId
        });
      }
      
      axios.post("/api/role/update", {
            roleId: this.roleId,
            roleName: this.roleName,
            permissions: permissions,
            dataSources: dataSources
        })
        .then(
          (response) => {
            axios.get("/api/role/get").then(
              (rep) => {
                if (rep && rep.data) {
                  this.$store.commit("roleData/setRoleList", rep.data.data);
                }
              },
              () => {}
            );
            this.$store.commit("dialogSwitchData/showEditRoleDialog", false);
          },
          () => {}
        );
    },
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