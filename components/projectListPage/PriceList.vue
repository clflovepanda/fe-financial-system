<template>
  <el-container class="container price-list">
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="2">
            <span class="labelSty">报价单名称:</span>
          </el-col>
          <el-col :span="4">
            <el-input v-model="ruleForm.name" placeholder="请输入报价单名称"></el-input>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button type="primary">查询</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>

        <el-row>
          <el-col :span="4" :offset="20" style="text-align:right">
            <el-button type="primary" @click="uploadQuotation()">上传报价单</el-button>
          </el-col>
        </el-row>
        <el-table :data="getQuotationData" border style="width: 100%; margin-top: 20px">
          <el-table-column align="center" fixed prop="quotationId" label="序号"></el-table-column>
          <el-table-column align="center" prop="quotationName" label="报价单名称"></el-table-column>
          <el-table-column align="center" prop="quotationNo" label="报价单编号"></el-table-column>
          <el-table-column align="center" prop="proManager" label="附件">
            <template slot-scope="scope">
              <a :href="scope.row.resourceUrl">下载附件</a>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="id" label="操作" width="140">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editQuotation(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="deleteQuotation(scope.row)">删除</el-button>
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
        name: "",
      },
    };
  },
  computed: {
    getQuotationData() {
      return this.$store.state.projectData.quotationList;
    }
  },
  methods: {
    editQuotation() {},
    deleteQuotation() {}
  },
};
</script>

<style>
.price-list .el-form-item {
  display: inline-block;
  vertical-align: top;
}
.price-list .time .el-form-item__label {
  width: 130px !important;
}
.price-list .time .el-form-item__content {
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