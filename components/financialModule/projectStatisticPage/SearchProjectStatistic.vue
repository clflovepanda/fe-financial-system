<template>
  <div>
    <el-row>
        <el-col :span="2" class="labelSty"><span>一级类目：</span></el-col>
        <el-col :span="3">
            <el-select v-model="searchForm.dataSourceIdOne" placeholder="请选择一级类目" class="inpSty">
                <el-option
                    v-for="item in getLevelOneDataSourceList"
                    :key="item.dataSourceId"
                    :label="item.dataSourceName"
                    :value="item.dataSourceId"
                ></el-option>
            </el-select>
        </el-col>
        <el-col :span="2" class="labelSty"><span>二级类目：</span></el-col>
        <el-col :span="3">
            <el-select v-model="searchForm.dataSourceId" placeholder="请选择一级类目" class="inpSty">
                <el-option
                    v-for="item in getLevelTwoDataSourceList"
                    :key="item.dataSourceId"
                    :label="item.dataSourceName"
                    :value="item.dataSourceId"
                ></el-option>
            </el-select>
        </el-col>
        <el-col :span="2" class="labelSty"><span>关键字：</span></el-col>
        <el-col :span="3">
            <el-input
                v-model="searchForm.keyword"
                placeholder="编号/名称/负责人"
                class="inpSty"
            ></el-input>
        </el-col>
        <el-col :span="2" class="labelSty"><span>时间：</span></el-col>
        <el-col :span="7">
            <el-date-picker
              v-model="dataRange"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
        </el-col>
    </el-row>
    <el-row class="rowSty">
        <el-col :span="2" class="labelSty"><span>状态：</span></el-col>
        <el-col :span="3">
            <el-select v-model="searchForm.state" multiple placeholder="请选择状态" style="width: 100%">
                <el-option
                    v-for="item in getProjectTypeEnumList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="2" :offset="1">
            <el-button type="primary" @click="search()" style="width: 100%">查询</el-button>
        </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-button type="primary" @click="exportExcel" :class="[checkNowUserRole('statistic_project_export') ? '':'disRoleMenu']">导出Excel</el-button>
    </el-row>
  </div>
</template>

<script>

import { EnumExpenditureState, EnumAccount , EnumProjectType } from "../../../utils/EnumUtil";
import axios from "axios";

export default {
  data() {
    return {
        searchForm: {
            dataSourceIdOne: "",
            dataSourceId: "",
            keyword: "",
            startDt: "",
            endDt: "",
            state: ""
        },
        dataRange: ""
    };
  },
  computed: {
    checkNowUserRole(){
      return function(name) {
        return this.$store.state.userData.nowUserRole.indexOf(name) > -1;
      }
    },
    getExpenditureTable() {
        return [];
    },
    getProjectTypeEnumList() {
        return EnumProjectType.list;
    },
    companyList() {
        return EnumAccount.list;
    },
    userList() {
        return this.$store.state.rootData.userList;
    },
    getLevelOneDataSourceList() {
      return this.$store.state.projectData.projectDataSource;
    },
    getLevelTwoDataSourceList() {
      let levelOne = this.$store.state.projectData.projectDataSource;
      for (let i = 0 ; levelOne && i < levelOne.length ; i ++) {
        if(levelOne[i].dataSourceId == this.searchForm.dataSourceIdOne) {
          return levelOne[i].son; 
        }
      }
      return [];
    }
  },
  watch: {},
  methods: {
    exportExcel(){
        if (this.dateRange) {
            let st = this.dateRange[0];
            let et = this.dateRange[1];
            this.searchForm.startDt = st.getTime();
            this.searchForm.endDt = et.getTime();
        }
        axios.get("/api/export/statistics/project", {
            params: this.searchForm
        }).then(
            (rep) => {
                if (rep && rep.data) {
                    window.location.href = rep.data.url;
                }
            },
            () => {}
        );
    },
    search() {
        if (this.dateRange) {
            let st = this.dateRange[0];
            let et = this.dateRange[1];
            this.searchForm.startDt = st.getTime();
            this.searchForm.endDt = et.getTime();
        }
        axios.get("/api/statistics/project", {
            params: this.searchForm
        }).then(
            (rep) => {
                if (rep && rep.data) {
                    console.log("statistics project", rep.data.data);
                    this.$store.commit("statisticData/setProjectStatistic", rep.data.data);
                    // this.$store.commit("expenditureData/setExpenditureList", rep.data.data);
                }
            },
            () => {}
        );
        
    }
  },
  mounted() {
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
