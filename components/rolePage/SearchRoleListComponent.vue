<template>
  <div>
    <el-row>
      <el-col :span="2">
        <div class="labelSty">角色名称：</div>
      </el-col>
      <el-col :span="3">
        <el-input
          placeholder="请输入角色名称"
          v-model="roleSearchForm.roleName"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <div class="labelSty">角色状态：</div>
      </el-col>
      <el-col :span="3">
        <el-select v-model="roleSearchForm.roleStatus" placeholder="请选择">
          <el-option
            v-for="item in roleStatusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <div class="labelSty">创建时间：</div>
      </el-col>
      <el-col :span="7">
        <el-date-picker
          v-model="roleSearchForm.createDate"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      
      <el-col :span="2" :offset="1">
        <el-button type="primary" style="width: 90%" @click="searchRoleList">查询</el-button>
      </el-col>
      <el-col :span="2">
        <el-button style="width: 90%" @click="reset">重置</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleSearchForm: {
        roleName: "",
        roleStatus: "",
        createDate: "",
      },
    };
  },
  computed: {
    partList() {
      return this.$store.state.partData.partList;
    },
    roleStatusList() {
      return this.$store.state.roleData.roleStatusList;
    }
  },
  watch: {
    userSearchForm(val, oldVal) {
      this.$store.commit("userData/setUserSearchForm", val);
    }
  },
  methods: {
      searchRoleList: function() {
          console.log("search role list ...");
      },
      reset() {
        this.roleSearchForm.roleName = "";
        this.roleSearchForm.roleStatus = "";
        this.roleSearchForm.createDate = "";
      }
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