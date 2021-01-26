<template>
  <div>
    <el-container class="container">
      <el-container>
        <el-main>
          <el-row>
            <el-col :span="2" class="labelSty">
              <span>应收单编号</span>
            </el-col>
            <el-col :span="3">
              <el-input v-model="ruleForm.invoiceId" placeholder="请输入应收单编号"></el-input>
            </el-col>
            <el-col :span="2" :offset="1" class="labelSty">
              <span>单位名称</span>
            </el-col>
            <el-col :span="3">
              <el-input v-model="ruleForm.unitname" placeholder="请输入单位名称"></el-input>
            </el-col>
            <el-col :span="3" :offset="1" class="labelSty">
              <span>应税务劳务名称</span>
            </el-col>
            <el-col :span="4">
              <el-input v-model="ruleForm.revenueTypeName" placeholder="请输入应税务劳务名称"></el-input>
            </el-col>
          </el-row>
          <el-row class="rowSty">
            <el-col :span="2" class="labelSty">
              <span>经办人</span>
            </el-col>
            <el-col :span="3">
              <el-input v-model="ruleForm.username" placeholder="请输入经办人"></el-input>
            </el-col>
            <el-col :span="2" :offset="1" class="labelSty">
              <span>申请时间</span>
            </el-col>
            <el-col :span="6">
              <el-date-picker v-model="dataRange" type="daterange" range-separator="~" start-placeholder="请选择开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-col>
            <el-col :span="4" :offset="2">
              <el-button type="primary" @click="searchReceivable()">查询</el-button>
              <el-button @click="resetForm()">重置</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-divider></el-divider>
          </el-row>
          <el-row>
            <el-col :span="4" :offset="20">
              <el-button type="primary" @click="handleExcel()" v-if="checkNowUserRole('project_invoice_add')">新增应收单</el-button>
            </el-col>
          </el-row>
          <el-table :data="getReceivableList" border style="width: 100%; margin-top: 20px">
            <el-table-column align="center" prop="invoiceId" label="序号" width="120"></el-table-column>
            <el-table-column align="center" prop="invoiceNo" label="应收单编号"></el-table-column>
            <el-table-column align="center" prop="unitname" label="单位名称" width="120"></el-table-column>
            <el-table-column align="center" prop="revenueTypeName" label="应税劳务名称" width="120"></el-table-column>
            <el-table-column align="center" prop="cnyMoney" label="金额/元"></el-table-column>
            <el-table-column align="center" prop="username" label="经办人"></el-table-column>
            <el-table-column align="center" prop="createDatetime" label="申请时间"></el-table-column>
            <el-table-column align="center" label="操作" width="140">
              <template slot-scope="scope">
                <el-button @click="printPay(scope)" type="text" size="small" :disabled="scope.row.state<=3" v-if="checkNowUserRole('project_invoice_print')">打印</el-button>
                <el-button @click="del(scope)" type="text" size="small" v-if="checkNowUserRole('project_invoice_del')">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>

    <el-dialog title="新增应收单" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="width:360px" ref="form" :rules="rules">
        <el-form-item label="公司：" :label-width="formLabelWidth" prop="companyId" style="width:360px">
          <el-select v-model="form.companyId" placeholder="请选择" style="width:360px">
            <el-option v-for="item in $store.state.incomeData.accountList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="发票类型：" :label-width="formLabelWidth" prop="invoiceType" style="width:360px">
          <el-select v-model="form.invoiceType" placeholder="请选发票类型" style="width:360px">
            <el-option label="专票" value="专票"></el-option>
            <el-option label="普票" value="普票"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="单位名称：" :label-width="formLabelWidth" prop="org" style="width:360px">
          <el-input v-model="form.unitname" autocomplete="off" style="width:360px"></el-input>
        </el-form-item>
        <el-form-item label="纳税人识别码：" :label-width="formLabelWidth" prop="taxpayerIdentityNumber" style="width:360px">
          <el-input v-model="form.taxpayerIdentityNumber" autocomplete="off" style="width:360px"></el-input>
        </el-form-item>

        <el-form-item label="地址：" :label-width="formLabelWidth" prop="address" style="width:360px">
          <el-input v-model="form.address" autocomplete="off" style="width:360px"></el-input>
        </el-form-item>
        <el-form-item label="电话：" :label-width="formLabelWidth" prop="phone" style="width:360px">
          <el-input v-model="form.phone" autocomplete="off" style="width:360px"></el-input>
        </el-form-item>
        <el-form-item label="开户行：" :label-width="formLabelWidth" prop="openingBank" style="width:360px">
          <el-input v-model="form.openingBank" autocomplete="off" style="width:360px"></el-input>
        </el-form-item>
        <el-form-item label="账号：" :label-width="formLabelWidth" prop="accountNumber" style="width:360px">
          <el-input v-model="form.accountNumber" autocomplete="off" style="width:360px"></el-input>
        </el-form-item>

        <el-form-item label="应税劳务名称：" :label-width="formLabelWidth" prop="taxableServiceName" style="width:360px">
          <el-select v-model="form.revenueTypeId" placeholder="请选择应税劳务名称" style="width:360px">
            <el-option v-for="item in gettypeList" :key="item.revenueTypeId" :label="item.revenueTypeName" :value="item.revenueTypeId"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="开票金额/元" :label-width="formLabelWidth" style="width:360px" prop="cnyMoney">
          <el-input v-model="form.cnyMoney" autocomplete="off" style="width:360px"></el-input>
        </el-form-item>

        <el-form-item label="备注：" :label-width="formLabelWidth" style="width:360px" prop="comment">
          <el-input v-model="form.comment" type="textarea" :rows="2" autocomplete="off" style="width:360px"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addQuotation">保 存</el-button>
      </div>
    </el-dialog>
    <PringPayDialog :showVis="showVis"/>
  </div>
</template>

<script>
import Table from "~/components/projectListPage/Table.vue";
import PringPayDialog from "~/components/projectListPage/PringPayDialog.vue";
import axios from "axios";

export default {
  data() {
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入电话"));
      }
       var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;

      if (!myreg.test(value)) {
        callback(new Error("请输入正确的手机号"));
        return false;
      } else {
        callback();


      }
    };
    return {
      showVis: 0,
      ruleForm: {
        invoiceNo: "",
        unitname: "",
        revenueTypeName: "",
        username: "",
      },
      dataRange: "",
      listData: [],
      formLabelWidth: "200px",
      dialogFormVisible: false,
      form: {
        companyId: "",
        invoiceType: "",//发票类型
        unitname: "",//单位名称
        taxpayerIdentityNumber: "",//纳税人识别号
        address: "",
        phone: "",
        openingBank: "",//开户行
        accountNumber: "",//账号
        revenueTypeId: "",//应税劳务名称
        cnyMoney: "",//金额
        comment: "",
        projectId: this.$store.state.projectData.viewProjectId,
      },
      gettypeList: [],
      rules: {
        comment: { required: true, message: "请输入备注", trigger: "blur" },
        cnyMoney: {
          required: true,
          message: "请输入开票金额/元",
          trigger: "blur",
        },
        revenueTypeId: {
          required: true,
          message: "请选择应税劳务名称",
          trigger: "blur",
        },
        accountNumber: { required: true, message: "请输入账号", trigger: "blur" },
        openingBank: { required: true, message: "请输入开户行", trigger: "blur" },
        phone: [
            { required: true, message: "请输入电话", trigger: "blur" },
            { validator: checkPhone, trigger: 'blur' }
          ],
        address: { required: true, message: "请输入地址", trigger: "blur" },
        taxpayerIdentityNumber: {
          required: true,
          message: "请输入纳税人识别码",
          trigger: "blur",
        },
        unitname: { required: true, message: "请输入单位名称", trigger: "blur" },
        invoiceType: {
          required: true,
          message: "请选择发票类型",
          trigger: "blur",
        },
        companyId: { required: true, message: "请选择公司", trigger: "blur" },
      },
    };
  },
  computed: {
    checkNowUserRole(){
      return function(name) {
        return this.$store.state.userData.nowUserRole.indexOf(name) > -1;
      }
    },
    getReceivableList() {
      return this.$store.state.projectData.receivableList;
    },
  },
  methods: {
    resetForm() {
      this.dataRange = "";
      this.ruleForm = {
        invoiceNo: "",
        unitname: "",
        revenueTypeName: "",
        username: "",
      }
    },
    searchReceivable() {
      let st = this.dataRange[0];
      let et = this.dataRange[1];
      this.ruleForm.startDt = st.getTime();
      this.ruleForm.endDt = et.getTime();
      axios
        .get("/api/invoice/list", {
          params: this.ruleForm,
        })
        .then(
          (rep) => {
            if (rep && rep.data) {
              this.$store.commit(
                "projectData/setReceivableList",
                rep.data.data
              );
            }
          },
          () => {}
        );
    },
    handleAddPay() {},
    addQuotation() {
      console.log("新增应收单", this.form);
      this.$refs["form"].validate((valid) => {
        if (valid) {
          axios.post("/api/invoice/add", this.form).then((res) => {
            if (res.data.code == 0) {
              this.dialogFormVisible = false;
              this.$message.success("保存成功！");
              axios
                .get(
                  "/api/invoice/list?projectId=" +
                    this.$store.state.projectData.viewProjectId
                )
                .then((rep) => {
                  if (rep.data.code === 0) {
                    this.$store.commit(
                      "projectData/setReceivableList",
                      rep.data.data
                    );
                  }
                });
            } else {
              this.$message.success("保存失败！");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleExcel() {
      this.dialogFormVisible = true;
      (this.form = {
        companyId: "",
        invoiceType: "",//发票类型
        unitname: "",//单位名称
        taxpayerIdentityNumber: "",//纳税人识别号
        address: "",
        phone: "",
        openingBank: "",//开户行
        accountNumber: "",//账号
        revenueTypeId: "",//应税劳务名称
        cnyMoney: "",//金额
        comment: "",
        projectId: this.$store.state.projectData.viewProjectId,
      }),
        axios.get("/api/revenue/gettype").then(
          (rep) => {
            console.log(rep);
            if (rep && rep.data) {
              this.gettypeList = rep.data.data;
            }
          },
          () => {}
        );
    },
    printPay(scope) {
      console.log("即将打印的数据", scope);
      let printTemp = scope.row;
      this.showVis = this.showVis + 1;
      this.$store.commit("projectData/setPringTemp", printTemp);
      let isShowPrint = this.$store.state.dialogSwitchData.printPayDialogShow;
      if (isShowPrint) {
        this.$store.commit("dialogSwitchData/setPrintPayDialogShow", false);
      } else {
        this.$store.commit("dialogSwitchData/setPrintPayDialogShow", true);
      }

    },
    del(scope) {
      axios.get("/api/invoice/del?invoiceId=" + scope.row.invoiceId).then(
          (rep) => {
            if (rep && rep.data) {
              let st = this.dataRange[0];
              let et = this.dataRange[1];
              if (st) {
                this.ruleForm.startDt = st.getTime();
              }
              if (et) {
                this.ruleForm.endDt = et.getTime();
              }
              axios
                .get(
                  "/api/invoice/list?projectId=" +
                  this.$store.state.projectData.viewProjectId
                )
              // axios
              //   .get("/api/invoice/list", {
              //     params: this.ruleForm,
              //   })
                .then(
                  (rep) => {
                    if (rep && rep.data) {
                      this.$store.commit(
                        "projectData/setReceivableList",
                        rep.data.data
                      );
                    }
                  },
                  () => {}
                );
            }
          },
          () => {}
        );
    }
  },
};
</script>

<style>
/* .recieve .el-form-item {
  display: inline-block;
  vertical-align: top;
}

.recieve .time .el-form-item__content {
  margin-left: 140px;
}
.recieve .recive-name .el-form-item__label {
  width: 130px !important;

}
.recieve .recive-name .el-form-item__content {
  margin-left: 140px !important;
}

.money-show {
  background: #ccc;
  margin-top: 20px;
}
.money-show span {
  line-height: 60px;
  color: #fff;
  margin-bottom: 20px;
} */
.labelSty {
  line-height: 40px;
  text-align: center;
}

.rowSty {
  margin-top: 10px;
}
</style>
