<template>
  <div>
    <el-row>
      <el-col :span="2">
        <div class="labelSty">用户名称：</div>
      </el-col>
      <el-col :span="3">
        <el-input
          placeholder="请输入用户名称"
          v-model="userSearchForm.userName"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <div class="labelSty">手机号：</div>
      </el-col>
      <el-col :span="3">
        <el-input
          placeholder="请输入手机号"
          v-model="userSearchForm.phone"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <div class="labelSty">创建时间：</div>
      </el-col>
      <el-col :span="7">
        <el-date-picker
          v-model="userSearchForm.createDate"
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
        <el-select v-model="userSearchForm.accountStatus" placeholder="请选择">
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
        <el-input
          placeholder="请输入角色"
          v-model="userSearchForm.role"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <div class="labelSty">部门：</div>
      </el-col>
      <el-col :span="3">
        <el-select v-model="userSearchForm.part" placeholder="请选择">
          <el-option
            v-for="item in partList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <!-- <el-col :span="2">
        <div class="labelSty">更新时间：</div>
      </el-col>
      <el-col :span="7">
        <el-date-picker
          v-model="userSearchForm.updateDate"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col> -->
      <el-col :span="2" :offset="10">
        <el-button type="primary" style="width: 90%" @click="searchUserList"
          >查询</el-button
        >
      </el-col>
      <el-col :span="2">
        <el-button style="width: 90%">重置</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      userSearchForm: {
        userName: "",
        phone: "",
        role: "",
        accountStatus: "",
        createDate: null,
        updateDate: "",
        part: "",
      },
    };
  },
  computed: {
    partList() {
      return this.$store.state.partData.partList;
    },
    accountStatusList() {
      return this.$store.state.userData.accountStatusList;
    },
  },
  watch: {
    userSearchForm(val, oldVal) {
      this.$store.commit("userData/setUserSearchForm", val);
    },
  },
  methods: {
    searchUserList: function () {
      console.log("search user list ...", this.userSearchForm);
      let startDt = "";
      let endDt = "";
      if(this.userSearchForm.createDate != null) {
        startDt = moment(this.userSearchForm.createDate[0]).format("YYYY-MM-DD HH:mm:ss");
        endDt = moment(this.userSearchForm.createDate[1]).format("YYYY-MM-DD HH:mm:ss");
        console.log(startDt, endDt);
      }
      let params = "?username=" + this.userSearchForm.userName
       + "&mobile=" + this.userSearchForm.phone
       + "&state=" + this.userSearchForm.accountStatus
       + "&role=" + this.userSearchForm.role
       + "&depId=" + this.userSearchForm.part
       + "&startDt=" + startDt
       + "&endDt=" + endDt;
      axios.get("/api/user/list" + params).then(
        (res) => {
          this.$store.commit("userData/setUserListTable", res.data.data);
        },
        () => {}
      );
    },
  },
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