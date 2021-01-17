<template>
  <el-dialog title="支出" :visible.sync="showCreatePayDialog" width="80%" style="z-index: 9999">
    <el-row>
      <el-col :span="4" class="labelSty"><span>公司：</span></el-col>
      <el-col :span="10">
          <el-select
              v-model="createForm.companyId"
              placeholder="请选择公司"
              class="inpSty"
              :disabled="showType == 3"
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
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty"><span>支出方式：</span></el-col>
      <el-col :span="10" class="labelSty">
        <el-radio-group v-model="createForm.expenditureMethodId" @change="changeMethod" :disabled="disableEdit || showType == 3">
          <el-radio :label="1">现金</el-radio>
          <el-radio :label="2">电汇</el-radio>
          <el-radio :label="3">差旅</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>

    <el-row :class="[needShowRow ? 'showRow' : 'disShowRow']" >
      <el-col :span="4" class="labelSty"><span>收款人单位（全称）：</span></el-col>
      <el-col :span="10">
        <el-autocomplete
          v-model="createForm.beneficiary_unit"
          :fetch-suggestions="querySearchAsync"
          @select="handleSelect"
          placeholder="请输入收款人单位全称"
           class="inpSty"
           :disabled="showType == 3"
        ></el-autocomplete>
      </el-col>
    </el-row>
    <el-row :class="[needShowRow ? 'showRow' : 'disShowRow']">
      <el-col :span="4" class="labelSty"><span>收款人账号：</span></el-col>
      <el-col :span="10">
        <el-input
          v-model="createForm.beneficiary_number"
          placeholder="请输入收款人账号"
           class="inpSty"
           :disabled="showType == 3"
        ></el-input>
      </el-col>
    </el-row>
    <el-row :class="[needShowRow ? 'showRow' : 'disShowRow']">
      <el-col :span="4" class="labelSty"><span>地点：</span></el-col>
      <el-col :span="10">
        <!--province   city-->
        <el-select v-model="createForm.province" placeholder="请选择省份" class="inpSty" :disabled="showType == 3">
          <el-option
            v-for="item in cityList"
            :key="item.provinceId"
            :label="item.name"
            :value="item.provinceId"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6" :offset="1">
        <el-select v-model="createForm.city" placeholder="请选择城市" class="inpSty" :disabled="showType == 3">
          <el-option
            v-for="item in subCityList"
            :key="item.cityId"
            :label="item.cityName"
            :value="item.cityId"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row :class="[needShowRow ? 'showRow' : 'disShowRow']">
      <el-col :span="4" class="labelSty"><span>汇入行：</span></el-col>
      <el-col :span="10">
        <el-input
          v-model="createForm.beneficiary_bank"
          placeholder="请输入汇入行名称"
           class="inpSty"
           :disabled="showType == 3"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty"><span>支出类型：</span></el-col>
      <el-col :span="10">
        <el-select v-model="createForm.expenditureTypeId" placeholder="请选择支出类型" class="inpSty" :disabled="disableEdit || showType == 3">
          <el-option
            v-for="item in expenditureType"
            :key="item.expenditureTypeId"
            :label="item.expenditureTypeName"
            :value="item.expenditureTypeId"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty"><span>用途：</span></el-col>
      <el-col :span="10">
        <el-select v-model="createForm.expenditurePurposeId" placeholder="请选择用途" class="inpSty" :disabled="disableEdit || showType == 3">
          <el-option
            v-for="item in expenditurePurposeType"
            :key="item.expenditurePurposeId"
            :label="item.expenditurePurposeName"
            :value="item.expenditurePurposeId"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6" :offset="1">
        <el-input
          v-model="createForm.expenditurePurposeContent"
          placeholder="其他用途"
           class="inpSty"
           :disabled="disableEdit || showType == 3"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty"><span>金额/元：</span></el-col>
      <el-col :span="10">
        <el-input
          v-model="createForm.expenditureMoney"
          placeholder="请输入支出金额"
           class="inpSty"
           :disabled="showType == 3"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty"><span>备注：</span></el-col>
      <el-col :span="10">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入备注"
          v-model="createForm.remark"
          :disabled="showType == 3">
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="20">
        <el-button type="primary" @click="createPay()" :class="[showType == 3 ? 'dis': '']">创建</el-button>
        <el-button @click="showCreatePayDialog = false">返回支出列表</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import axios from "axios";
import {EnumAccount} from "../../utils/EnumUtil";
export default {
  props: ["editObj", "showCreatPay", "showType"],
  data() {
    return {
      createForm: {
        companyId: "",
        projectId: "",   
        expenditureMethodId: "",
        expenditureTypeId: "",
        expenditurePurposeId: "",
        expenditurePurposeContent: "",
        expenditureMoney: "",
        remark: "",
        beneficiary_unit: "",
        beneficiary_number: "",
        province: "",
        city: "",
        beneficiary_bank: ""
      },
      showCreatePayDialog: false,
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
      needShowRow: false,
      disableEdit: false
    };
  },
  computed: {
    subCityList() {
      let cities = this.$store.state.expenditureData.city;
      if (cities == null) {
        cities = []
      }
      for (let i = 0 ; i < cities.length ; i ++) {
        if (cities[i].provinceId == this.createForm.province) {
          return cities[i].city;
        }
      }
    },
    cityList() {
      return this.$store.state.expenditureData.city;
    },
    expenditureType() {
      return this.$store.state.expenditureData.expenditurePurposeType.type;
    },
    expenditurePurposeType() {
      console.log("expenditurePurposeType", this.$store.state.expenditureData.expenditurePurposeType.purpose);
      return this.$store.state.expenditureData.expenditurePurposeType.purpose;
    },
    companyList() {
      return EnumAccount.list;
    },
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
    // isShowCreatePayDialog() {
    //   return this.$store.state.dialogSwitchData.createPayDialogShow;
    // },
    getRoleList() {
      return this.$store.state.roleData.roleListTable.listData;
    },
    getLevelOneDataSourceList() {
      return this.$store.state.projectData.projectDataSource;
    },
    getLevelTwoDataSourceList() {
      let levelOne = this.$store.state.projectData.projectDataSource;
      for (let i = 0 ; levelOne && i < levelOne.length ; i ++) {
        if(levelOne[i].dataSourceId == this.createForm.dataSourceIdOne) {
          return levelOne[i].son; 
        }
      }
      return [];
    },
    revenueId() {
      return this.$store.state.expenditureData.revenueId;
    }
  },
  watch: {
    showCreatPay() {
      if(this.showCreatePayDialog == true) {
        this.showCreatePayDialog = false;
      } else {
        this.showCreatePayDialog = true;
      }
      console.log("show type", this.showType);
      if(this.showType == 1) {
        this.createForm.companyId = "";
        this.createForm.projectId = "";   
        this.createForm.expenditureMethodId = "";
        this.createForm.expenditureTypeId = "";
        this.createForm.expenditurePurposeId = "";
        this.createForm.expenditurePurposeContent = "";
        this.createForm.expenditureMoney = "";
        this.createForm.remark = "";
        this.createForm.beneficiary_unit = "";
        this.createForm.beneficiary_number = "";
        this.createForm.province = "";
        this.createForm.city = "";
        this.createForm.beneficiary_bank = "";
      } else if(this.showType == 2) {
        console.log("修改支出", this.editObj);
        this.createForm.companyId = this.editObj.companyId;
        this.createForm.projectId = this.editObj.projectId;   
        this.createForm.expenditureMethodId = this.editObj.expenditureMethodId;
        this.createForm.expenditureTypeId = this.editObj.expenditureTypeId;
        this.createForm.expenditurePurposeId = this.editObj.expenditurePurposeId;
        this.createForm.expenditurePurposeContent = this.editObj.expenditurePurposeContent;
        this.createForm.expenditureMoney = this.editObj.expenditureMoney;
        this.createForm.remark = this.editObj.remark;
        this.createForm.beneficiary_unit = this.editObj.beneficiaryUnit;
        this.createForm.beneficiary_number = this.editObj.beneficiaryNumber;
        this.createForm.province = this.editObj.province;
        this.createForm.city = this.editObj.city;
        this.createForm.beneficiary_bank = this.editObj.beneficiaryBank;
        this.changeMethod();
      } else if(this.showType == 3) {
        console.log("显示支出", this.editObj);
        this.createForm.companyId = this.editObj.companyId;
        this.createForm.projectId = this.editObj.projectId;   
        this.createForm.expenditureMethodId = this.editObj.expenditureMethodId;
        this.createForm.expenditureTypeId = this.editObj.expenditureTypeId;
        this.createForm.expenditurePurposeId = this.editObj.expenditurePurposeId;
        this.createForm.expenditurePurposeContent = this.editObj.expenditurePurposeContent;
        this.createForm.expenditureMoney = this.editObj.expenditureMoney;
        this.createForm.remark = this.editObj.remark;
        this.createForm.beneficiary_unit = this.editObj.beneficiaryUnit;
        this.createForm.beneficiary_number = this.editObj.beneficiaryNumber;
        this.createForm.province = this.editObj.province;
        this.createForm.city = this.editObj.city;
        this.createForm.beneficiary_bank = this.editObj.beneficiaryBank;
        this.changeMethod();
      }
    },
    showCreatePayDialog() {
      // this.$store.commit(
      //   "dialogSwitchData/setCreatePayDialogShow",
      //   this.showCreatePayDialog
      // );
      // console.log("showCreatePayDialog", this.showCreatePayDialog);
      if(!this.showCreatePayDialog) {
        this.$store.commit("expenditureData/setRevenueId", "");
        this.createForm.expenditureMethodId = "";
        this.createForm.expenditureTypeId = "";
        this.createForm.expenditurePurposeContent = "";
        this.disableEdit = false;
        this.needShowRow = false;
      }
    },
    // isShowCreatePayDialog(val, oldVal) {
    //   this.showCreatePayDialog = val;
    // },
    revenueId(val, oldVal) {
      if (val > 0) {
        this.createForm.expenditureMethodId = 2;
        this.createForm.expenditureTypeId = 2;
        this.createForm.expenditurePurposeContent = "退押金";
        this.disableEdit = true;
        this.needShowRow = true;
      }
    }
  },
  methods: {
    handleSelect(obj) {
      console.log(obj);
      this.createForm.beneficiary_number = obj.data.beneficiaryNumber;
      this.createForm.beneficiary_bank = obj.data.beneficiaryBank;
      this.createForm.province = obj.data.province;
      this.createForm.city = obj.data.city;
    },
    querySearchAsync(queryString, cb) {
      console.log("search ... ... ");
       axios.get("/api/expenditure/getbeneficiary?keyWords=" + queryString).then(
          (rep) => {
            let arr = [];
            for (let i = 0 ; i < rep.data.data.length ; i ++) {
              arr.push({value: rep.data.data[i].beneficiaryUnit, data: rep.data.data[i]});
            }
            console.log(arr);
            cb(arr);
          },
          () => {}
       )
    },
    changeMethod() {
      if(this.createForm.expenditureMethodId == 2) {
        this.needShowRow = true;
      } else {
        this.needShowRow = false;
      }
    },
    createPay() {
      let revenueId = this.$store.state.expenditureData.revenueId;
      let url = "/api/expenditure/add";
      let isDeposite = false;
      if (revenueId != null && revenueId != "" && revenueId > 0) {
        this.createForm.revenueId = revenueId;
        url += "?flag=deposit";
        isDeposite = true;
      }
      this.createForm.projectId = this.$store.state.projectData.viewProjectId;
       axios.post(url,this.createForm).then((response) => {
         if (isDeposite) {
          axios.get("/api/deposit/list?projectId=" + this.createForm.projectId).then(
              (rep) => {
                if (rep && rep.data) {
                  if (rep.data.code == 0) {
                    console.log(rep.data.data);
                    this.$store.commit("depositeData/setDepositeData", rep.data.data.deposit);
                  } else {
                    this.$message.error(rep.data.msg);
                  }
                  
                }
              },
              () => {}
            );
            axios.get("/api/expenditure/list?projectId=" + this.createForm.projectId).then(
              (rep) => {
                if (rep && rep.data) {
                  if (rep.data.code == 0) {
                    this.$store.commit("projectData/setProjectPay", rep.data.data);
                  } else {
                    this.$message.error(rep.data.msg);
                  }
                  
                }
              },
              () => {}
            );
         } else {
            axios.get("/api/expenditure/list?projectId=" + this.createForm.projectId).then(
              (rep) => {
                if (rep && rep.data) {
                  if (rep.data.code == 0) {
                    this.$store.commit("projectData/setProjectPay", rep.data.data);
                  } else {
                    this.$message.error(rep.data.msg);
                  }
                  
                }
              },
              () => {}
            );
         }
         
        
        this.$store.commit("expenditureData/setRevenueId", 0);
        this.$store.commit("dialogSwitchData/setCreatePayDialogShow", false);
      })
    },
    getLabel: function(scope) {
      console.log(scope);
    },
  },
  mounted() {
    
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

.showRow {
  display: block;
  margin-top: 10px;
}
.disShowRow {
  display: none;
  margin-top: 10px;
}

.dis {
  display: none;
}
</style>