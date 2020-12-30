<template>
  <el-dialog title="财务审批" :visible.sync="showAuditDialog" width="80%">
    <el-divider></el-divider>
    <el-row>
      <el-table :data="auditTable" border style="width: 100%; margin-top: 20px" id="out-table">
          <el-table-column align="center" prop="auditType" label="当前操作">
            <template slot-scope="scope">
              {{getRealAuditType(scope.row.auditType)}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="ctime" label="操作时间"></el-table-column>
          <el-table-column align="center" prop="username" label="操作人员"></el-table-column>
          <el-table-column align="center" prop="remark" label="意见"></el-table-column>
          <el-table-column align="center" prop="coName" label="操作">
            <template slot-scope="scope">
              <el-button @click="del(scope)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-row>
    <el-row>
      <el-col :span="24" style="margin: 20px 0px">
        <div style="border: 1px solid black; text-align:center">
          <div style="height:60px; position: relative; text-align: center">
            <div style="margin-top: 20px; border-bottom: 1px solid black; padding-bottom: 10px; line-height: 30px;display:inline-block; height: 40px; font-size: 26px; font-weight: 600; text-align: center; width: 300px">
              支 出 申 请 单
            </div>
          </div>
          <div style="height:30px; position: relative; text-align: center">
            <div style="margin-top: 10px; line-height: 20px;display:inline-block; height: 20px; font-size: 16px; text-align: center; width: 300px">
              2020年 10月 23日
            </div>
          </div>
          <div style="display: inline-block; width:80%;height: 20px; position: relative">
            <div style="display: inline-block; position: absolute; left: 10px">公司：亚讯</div>
            <div style="display: inline-block; position: absolute; right: 20px">编号：亚讯</div>
          </div>
          <div style="position:relative; display:inline-block; border: 3px solid black;width:80%">
            <div style="height: 40px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:40px;line-height: 40px;font-weight:400;border-right: 1px solid black; width: 15%;">
                支出款项:
              </div>
              <div style="display: inline-block;position: absolute; left:15%;height:40px;line-height: 40px; width: 85%;text-align:left;padding-left:20px">
                xxxxx
              </div>
            </div>

            <div style="height: 80px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:80px;line-height: 80px;font-weight:400; width: 15%;">
                计人民币：
              </div>
              <div style="display: inline-block;position: absolute; left:15%;height:50px;line-height: 80px; width: 50%;text-align:left;padding-left:20px;border-bottom:1px dashed black;">
                xxxxxxxxxx
              </div>
              <div style="display: inline-block;position: absolute; left:70%;height:50px;line-height: 80px; width: 30%;text-align:left;padding-left:20px;border-bottom:1px dashed black;">
                xxxxxxxxxx
              </div>
            </div>

            <div style="height: 40px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:40px;line-height: 40px;font-weight:400; width: 15%;border-right: 1px solid black">
                申请人:
              </div>
              <div style="display: inline-block;position: absolute; left:15%;height:40px;line-height: 40px; width: 20%;text-align:left;padding-left:20px;border-right: 1px solid black;">
                xxxxxxxxxx
              </div>
              <div style="display: inline-block;position: absolute; left:35%;height:40px;line-height: 40px;font-weight:400; width: 15%;border-right: 1px solid black">
                领款人:
              </div>
              <div style="display: inline-block;position: absolute; left:50%;height:40px;line-height: 40px; width: 15%;text-align:left;padding-left:20px;border-right: 1px solid black;">
                xxxxxxxxxx
              </div>
              <div style="display: inline-block;position: absolute; left:65%;height:40px;line-height: 40px;font-weight:400; width: 15%;border-right: 1px solid black;">
                报销公司:
              </div>
              <div style="display: inline-block;position: absolute; left:80%;height:40px;line-height: 40px; width: 20%;text-align:left;padding-left:20px;border-right: 1px solid black;">
                xxxxxxxxxx
              </div>
            </div>

            <div style="height: 80px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:80px;line-height: 80px;font-weight:400; width: 15%;">
                部门经理：
              </div>
              <div style="display: inline-block;position: absolute; left:15%;height:50px;line-height: 80px; width: 20%;text-align:left;padding-left:20px;border-bottom:1px solid black;">
                xxxxxxxxxx
              </div>
              <div style="display: inline-block;position: absolute; left:35%;height:80px;line-height: 80px;font-weight:400; width: 15%;">
                公司经理：
              </div>
              <div style="display: inline-block;position: absolute; left:50%;height:50px;line-height: 80px; width: 30%;text-align:left;padding-left:20px;border-bottom:1px solid black;">
                xxxxxxxxxx
              </div>
            </div>
          </div>
          <div style="display: inline-block; width:80%;height: 20px; position: relative'; margin-bottom: 20px">
            <div style="display: inline-block; position: absolute; left: 0px; font-weight: 400">财务主管：</div>
            <div style="display: inline-block; position: absolute; left: 20%; font-weight: 400">记账：</div>
            <div style="display: inline-block; position: absolute; left: 40%; font-weight: 400">出纳：</div>
            <div style="display: inline-block; position: absolute; left: 60%; font-weight: 400">审核：</div>
            <div style="display: inline-block; position: absolute; left: 80%; font-weight: 400">制单：</div>
          </div>
          
        </div>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty">意见</el-col>
      <el-col :span="12" class="labelSty">
        <el-input v-model="auditForm.remark" placeholder="请输入内容" :disabled="editable"></el-input>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" class="labelSty">审批结果（单选）：</el-col>
      <el-col :span="12" class="labelSty" style="text-align:left">
        <el-radio-group v-model="auditForm.auditType" :disabled="editable">
          <el-radio :label="4">已支付</el-radio>
          <el-radio :label="5">票据作废</el-radio>
          <el-radio :label="6">凭借款</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="rowSty">
      <el-col :span="4" :offset="20">
        <el-button type="primary" @click="submitAudit" :disabled="editable" >提交</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import axios from "axios";
import {EnumAccount, EnumAuditType} from "../../utils/EnumUtil";
export default {
  data() {
    return {
      auditForm: {
        auditType: "",
        remark: "",
      },
      showAuditDialog: false
    };
  },
  computed: {
    getRealAuditType() {
      return function(value) {
        return EnumAuditType.getMsg(value);
      }
    },
    editable() {
      return this.$store.state.expenditureData.auditLog.state > 3;
    },
    auditTable() {
      let list = [];
      if (this.$store.state.expenditureData.auditLog.expenditureAuditLogs) {
        list = this.$store.state.expenditureData.auditLog.expenditureAuditLogs;
      }
      return list;
    },
    isShowAuditDialog() {
      return this.$store.state.dialogSwitchData.auditDialogShow;
    }
  },
  watch: {
    showAuditDialog() {
      this.$store.commit(
        "dialogSwitchData/setAuditDialogShow",
        this.showAuditDialog
      );
    },
    isShowAuditDialog(val, oldVal) {
      this.showAuditDialog = val;
    },
  },
  methods: {
    
    changeMethod() {
      if(this.createForm.expenditureMethodId == 2) {
        this.needShowRow = true;
      } else {
        this.needShowRow = false;
      }
    },
    getLabel: function(scope) {
      console.log(scope);
    },
    del(scope) {
      console.log(scope);
      axios.post('/api/expenditure/approval/del',scope.row).then((response) => {
        if(response.data.code != 0) {
          this.$message.error(response.data.msg);
        }
      })
    },
    submitAudit() {
      let params = {
        remark: this.auditForm.remark,
        auditType: this.auditForm.auditType,
        expenditureId: this.$store.state.expenditureData.auditLog.expenditureId
      }
      axios.post('/api/expenditure/approval', params).then((response) => {
        console.log(response);
        if(response.data.code != 0) {
          this.$message.error(response.data.msg);
        } else {
          axios.get("/api/expenditure/list?projectId=" + this.$store.state.projectData.viewProjectId).then(
          (rep) => {
            if (rep && rep.data) {
              this.$store.commit("projectData/setProjectPay", rep.data.data);
              this.showAuditDialog = false;
            }
          },
          () => {});
        }
      })
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

.showRow {
  display: block;
  margin-top: 10px;
}
.disShowRow {
  display: none;
  margin-top: 10px;
}
</style>