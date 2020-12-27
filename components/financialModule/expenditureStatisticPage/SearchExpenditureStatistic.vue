<template>
  <div>
    <el-row>
        <el-col :span="2" class="labelSty"><span>一级类目：</span></el-col>
        <el-col :span="3">
            <el-select v-model="searchExpenditureForm.dataSourceIdOne" placeholder="请选择一级类目" class="inpSty">
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
            <el-select v-model="searchExpenditureForm.attribute" placeholder="请选择一级类目" class="inpSty">
                <el-option
                    v-for="item in getLevelTwoDataSourceList"
                    :key="item.dataSourceId"
                    :label="item.dataSourceName"
                    :value="item.dataSourceId"
                ></el-option>
            </el-select>
        </el-col>
        <el-col :span="2" class="labelSty"><span>公司：</span></el-col>
        <el-col :span="3">
            <el-select
                v-model="searchExpenditureForm.company"
                placeholder="请选择公司"
                class="inpSty"
                >
                <el-option
                    v-for="item in companyList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="2" class="labelSty"><span>申请人：</span></el-col>
        <el-col :span="3">
            <el-input
                v-model="searchExpenditureForm.applyUser"
                placeholder="申请人"
                class="inpSty"
            ></el-input>
        </el-col>
    </el-row>
    <el-row class="rowSty">
        <el-col :span="2" class="labelSty"><span>用途：</span></el-col>
        <el-col :span="3">
            <el-input
                v-model="searchExpenditureForm.purpose"
                placeholder="用途"
                class="inpSty"
            ></el-input>
        </el-col>
        <el-col :span="2" class="labelSty"><span>时间：</span></el-col>
        <el-col :span="6">
            <el-date-picker
              v-model="dataRange"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
        </el-col>
        <el-col :span="3" class="labelSty"><span>收款人单位：</span></el-col>
        <el-col :span="3">
            <el-input
                v-model="searchExpenditureForm.beneficiaryUnit"
                placeholder="收款人单位"
                class="inpSty"
            ></el-input>
        </el-col>
    </el-row>
    <el-row class="rowSty">
        <el-col :span="2" class="labelSty"><span>状态：</span></el-col>
        <el-col :span="3">
            <el-select v-model="searchExpenditureForm.state" multiple placeholder="请选择状态" style="width: 100%">
                <el-option
                    v-for="item in getExpenditureEnumList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="2" :offset="1">
            <el-button type="primary" @click="search()">查询</el-button>
        </el-col>
    </el-row>
  </div>
</template>

<script>

import { EnumExpenditureState, EnumAccount } from "../../../utils/EnumUtil";
import axios from "axios";

export default {
  data() {
    return {
        searchExpenditureForm: {
            dataSourceIdOne: "",
            attribute: "",
            company: "",
            applyUser: "",
            purpose: "",
            startDt: "",
            endDt: "",
            state: "",
            beneficiaryUnit: ""//收款单位
        },
        dataRange: ""
    };
  },
  computed: {
    getExpenditureTable() {
        return [];
    },
    getExpenditureEnumList() {
        return EnumExpenditureState.list;
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
        if(levelOne[i].dataSourceId == this.searchExpenditureForm.dataSourceIdOne) {
          return levelOne[i].son; 
        }
      }
      return [];
    }
  },
  watch: {},
  methods: {
    
    search() {
        if (this.dateRange) {
            let st = this.dateRange[0];
            let et = this.dateRange[1];
            this.searchExpenditureForm.startDt = st.getTime();
            this.searchExpenditureForm.endDt = et.getTime();
        }
        axios.get("/api/statistics/expenditure", {
            params: this.searchExpenditureForm
        }).then(
            (rep) => {
                if (rep && rep.data) {
                    console.log("statistics expenditure", rep.data.data);
                    this.$store.commit("expenditureData/setExpenditureList", rep.data.data);
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
