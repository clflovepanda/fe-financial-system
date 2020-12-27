<template>
  <el-container class="container agreeMent">
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="2" class="labelSty"><span>项目合同：</span></el-col>
          <el-col :span="4">
            <el-input v-model="ruleForm.name" placeholder="请输入项目合同"></el-input>
          </el-col>
          <el-col :span="2" class="labelSty"><span>项目编号：</span></el-col>
          <el-col :span="4">
            <el-input v-model="ruleForm.id" placeholder="请输入项目编号"></el-input>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-button type="primary">查询</el-button>
            <el-button >重置</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>

        <el-row>
          <el-col :span="4" :offset="20">
            <el-button type="primary" >上传结算单</el-button>
          </el-col>
        </el-row>
        <el-table :data="getSettlementList" border style="width: 100%; margin-top: 20px">
          <el-table-column align="center" fixed prop="settlementId" label="序号"></el-table-column>
          <el-table-column align="center" prop="settlementName" label="结算单名称"></el-table-column>
          <el-table-column align="center" prop="settlementNo" label="结算单编号"></el-table-column>
          <el-table-column align="center" prop="isLastSettlement" label="是否为最终结算单">
            <template slot-scope="scope">
              {{scope.row.isLastSettlement == 1 ? "是" : "否"}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="settlementIncome" label="结算收入/元"></el-table-column>
          <el-table-column align="center" prop="proManager" label="附件">
            <template slot-scope="scope">
              <a :href="scope.row.resourceUrl">{{scope.row.resourceName}}</a>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="id" label="操作" width="140">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editSettlement(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="deleteSettlement(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Table from "~/components/projectListPage/Table.vue";

export default {
  data() {
    return {
      ruleForm: {
        id: "",
        name: "",
        proManager: "",
        saleManager: "",
        proPerson: "",
        statement: "",
        projectStatus: "",
        proDate: "",
        moneyStatus: "",
      },
    };
  },
  computed: {
    getSettlementList() {
      return this.$store.state.projectData.settlementList;
    }
  },
  methods: {
    editSettlement(row) {

    },
    deleteSettlement(row) {

    }
  },
};
</script>

<style>
.agreeMent .el-form-item {
  display: inline-block;
  vertical-align: top;
}
.agreeMent .time .el-form-item__label {
  width: 130px !important;
}
.agreeMent .time .el-form-item__content {
  margin-left: 140px;
}

.money-show {
  background: #ccc;
  margin-top: 20px;
}
.money-show span {
  line-height: 60px;
  color: #fff;
  margin-bottom: 20px;
}
.labelSty {
  line-height: 40px;
  text-align: center;
}

.rowSty {
  margin-top: 10px;
}

.inpSty {
  width: 100%
}
</style>