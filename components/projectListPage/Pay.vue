<template>
<div>
  <el-container class="container pay">
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="2" class="labelSty"><span class="labelSty">公司:</span></el-col>
          <el-col :span="3">
            <el-select v-model="ruleForm.company" placeholder="请选择公司">
              <el-option label="1" value="notState"></el-option>
              <el-option label="2" value="willState"></el-option>
              <el-option label="3" value="stated"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" class="labelSty"><span class="labelSty">支出编号:</span></el-col>
          <el-col :span="3">
            <el-input v-model="ruleForm.id" placeholder="请输入支出编号"></el-input>
          </el-col>
          <el-col :span="2" class="labelSty"><span class="labelSty">支出方式:</span></el-col>
          <el-col :span="3">
            <el-select v-model="ruleForm.statement" placeholder="请选择支出方式">
              <el-option label="1" value="notState"></el-option>
              <el-option label="2" value="willState"></el-option>
              <el-option label="3" value="stated"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" class="labelSty"><span class="labelSty">支出类型:</span></el-col>
          <el-col :span="3">
            <el-select v-model="ruleForm.statement" placeholder="请选择支出类型">
              <el-option label="1" value="notState"></el-option>
              <el-option label="2" value="willState"></el-option>
              <el-option label="3" value="stated"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="rowSty">
          <el-col :span="2" class="labelSty"><span class="labelSty">收款人:</span></el-col>
          <el-col :span="3">
            <el-input v-model="ruleForm.imcomeName" placeholder="请输入查找收款人"></el-input>
          </el-col>
          <el-col :span="2" class="labelSty"><span class="labelSty">申请人:</span></el-col>
          <el-col :span="3">
            <el-input v-model="ruleForm.applyName" placeholder="请输入查找申请"></el-input>
          </el-col>
          <el-col :span="2" class="labelSty"><span class="labelSty">最新状态:</span></el-col>
          <el-col :span="3">
            <el-select v-model="ruleForm.statement" placeholder="请选择最新状态">
              <el-option label="1" value="notState"></el-option>
              <el-option label="2" value="willState"></el-option>
              <el-option label="3" value="stated"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" class="labelSty"><span class="labelSty">工作流:</span></el-col>
          <el-col :span="3">
            <el-select v-model="ruleForm.statement" placeholder="请选择工作流">
              <el-option label="1" value="notState"></el-option>
              <el-option label="2" value="willState"></el-option>
              <el-option label="3" value="stated"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="rowSty">
          <el-col :span="2" class="labelSty">
            <span class="labelSty">用途:</span>
            </el-col>
          <el-col :span="3">
            <el-input v-model="ruleForm.userful" placeholder="请输入查找用途"></el-input>
          </el-col>
          <el-col :span="2" class="labelSty">
            <span class="labelSty">创建时间:</span>
          </el-col>
          <el-col :span="8">
            <el-date-picker
              v-model="ruleForm.proDate"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-col>
          <el-col :span="6">
            <el-button type="primary">查询</el-button>
            <el-button>重置</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>

        <el-row>
          <el-col :span="8" :offset="16">
            <el-button type="primary" @click="showCreatePayDialog()">新增支出</el-button>
            <el-button type="primary" @click="handleExcel()">导出excel</el-button>
          </el-col>
        </el-row>

        <!-- <el-row class="money-show">
          <el-col :span="4">
            <span>已提交总计/元：</span>
            <span></span>
          </el-col>
          <el-col :span="4">
            <span>未财务审批/元:</span>
            <span></span>
          </el-col>
          <el-col :span="4">
            <span>已支付总计/元：</span>
            <span></span>
          </el-col>
          <el-col :span="4">
            <span>票据作废总计/元：</span>
            <span></span>
          </el-col>
          <el-col :span="4">
            <span>平借款总计/元：</span>
            <span></span>
          </el-col>
        </el-row> -->
        <el-table :data="getProjectPay" border style="width: 100%; margin-top: 20px" id="out-table">
          <el-table-column align="center" prop="expenditureId" label="序号"></el-table-column>
          <el-table-column align="center" prop="numbering" label="支出编号"></el-table-column>
          <el-table-column align="center" prop="coName" label="公司" width="120"></el-table-column>
          <el-table-column align="center" prop="expenditureMethodId" label="支付方式">
            <template slot-scope="scope">
              {{getPayType(scope.row.expenditureMethodId)}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="支出类型">
            <template slot-scope="scope">
              {{getOutputType(scope.row.expenditureTypeId)}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="expenditurePurposeContent" label="用途"></el-table-column>
          <el-table-column align="center" prop="beneficiaryUnit" label="收款人单位" width="140"></el-table-column>
          <el-table-column align="center" prop="expenditureMoney" label="金额/元" width="120"></el-table-column>
          <el-table-column align="center" prop="username" label="申请人" width="120"></el-table-column>
          <el-table-column align="center" prop="ctime" label="创建时间" width="170"></el-table-column>
          <el-table-column align="center" prop="state" label="最新状态" width="140">

          </el-table-column>
          <el-table-column align="center" prop="utime" label="最新状态时间" width="180"></el-table-column>
          <el-table-column align="center" prop="expenditureAuditLogs" label="工作流" width="140">
            <template slot-scope="scope">
              {{getAuditType(scope.row.expenditureTypeId)}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="140">
              <template slot-scope="scope">
                <el-button @click="printPay(scope)" type="text" size="small">查看</el-button>
                <el-button @click="printPay(scope)" type="text" size="small">查看</el-button>
              </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
  <CreatePayDialog />
  </div>
</template>

<script>
import Table from "~/components/projectListPage/Table.vue";
import {EnumAccount, EnumOutputType, EnumPayType, EnumAuditType} from "../../utils/EnumUtil"
import CreatePayDialog from "~/components/projectListPage/CreatePayDialog.vue";
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  data() {
    return {
      ruleForm: {
        id: "",
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
    getProjectPay() {
      console.log("project pay component", this.$store.state.projectData.projectPay);
      return this.$store.state.projectData.projectPay;
    },
    getOutputType() {
      return function(value) {
        return EnumOutputType.getMsg(value);
      }
    },
    getPayType() {
      return function(value) {
        return EnumPayType.getMsg(value);
      }
    },
    getAuditType() {
      return function(value) {
        return EnumAuditType.getMsg(value);
      }
    },
  },
  methods: {
    
    handleFindClick() {
      console.log("查询项目");
    },
    showCreatePayDialog() {
      console.log("haha");
      this.$store.commit("dialogSwitchData/setCreatePayDialogShow", true);
    },
    handleExcel() {
        /* 从表生成工作簿对象 */
        var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
        /* 获取二进制字符串作为输出 */
        var wbout = XLSX.write(wb, {
            bookType: "xlsx",
            bookSST: true,
            type: "array"
        });
        try {
            FileSaver.saveAs(
            //Blob 对象表示一个不可变、原始数据的类文件对象。
            //Blob 表示的不一定是JavaScript原生格式的数据。
            //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
            //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
            new Blob([wbout], { type: "application/octet-stream" }),
            //设置导出文件名称
            "sheetjs.xlsx"
            );
        } catch (e) {
            if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
    },
    printPay(scope) {

    }
  },
  
};
</script>

<style>
.pay .el-form-item {
  display: inline-block;
  vertical-align: top;
}

.money-show {
  background: #ccc;
  margin-top:20px;
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
</style>