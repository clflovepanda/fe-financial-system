
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="breadcrumb">位置</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb">财务</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb" :to="{ path: '/invoiceReceivable' }"
        >发票应收</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-divider></el-divider>

    <el-row >
      <el-col :span="4">
        <el-input v-model="keyWord" placeholder="编号/单位"></el-input>
      </el-col>
      <el-col :span="4" style="margin-left:20px;">
        <el-input v-model="username" placeholder="经办人"></el-input>
      </el-col>
      <el-col :span="8">
        <el-date-picker
          v-model="rangeDate"
          type="daterange"
          range-separator="~"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          class="inpSty"
          style="width: 90%;margin-left:20px;"
          @change="changeDate"
        ></el-date-picker>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="mountInvoice()">查询</el-button>
      </el-col>
      
    </el-row>
    <el-divider></el-divider>
    <el-row style="margin-top:20px">
      <el-col :span="24" style="text-align:right">
        <el-button type="primary" @click="addinvoice('add')" :class="[checkNowUserRole('invoice_add') ? '':'disRoleMenu']">新增应收单</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="invoiceList"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column fixed prop="invoiceId" label="ID"></el-table-column>
      <el-table-column prop="invoiceNo" label="编号"></el-table-column>
      <el-table-column prop="companyName" label="公司"></el-table-column>
      <el-table-column prop="unitname" label="单位名称"></el-table-column>
      <el-table-column prop="revenueTypeName" label="应税劳务名称"></el-table-column>
      <el-table-column prop="cnyMoney" label="金额"></el-table-column>
      <el-table-column prop="username" label="经办人"></el-table-column>
      <el-table-column prop="createDatetime" label="时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="printPay(scope)" type="text" size="small" :class="[checkNowUserRole('invoice_print') ? '':'disRoleMenu']">打印</el-button>
          <el-button @click="addinvoice(scope.row)" type="text" size="small" :class="[checkNowUserRole('invoice_update') ? '':'disRoleMenu']">修改</el-button>
          <el-button @click="delInvoice(scope.row)" type="text" size="small" :class="[checkNowUserRole('invoice_del') ? '':'disRoleMenu']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加/修改发票应收" :visible.sync="dialogFormVisible" :before-close="cancelInvoice">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="公司：" :label-width="formLabelWidth" prop="companyId">
          <el-select
            v-model="form.companyId"
            placeholder="请选择公司："
            style="width: 100%"
            
          >
            <el-option
              v-for="item in accountList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="项目名称/编号：" :label-width="formLabelWidth" prop="projectId" >
          <!-- <el-input v-model="form.projectId" autocomplete="off"></el-input> -->
           <el-select v-model="form.projectId" filterable placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.projectId"
              :label="item.name"
              :value="item.projectId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发票类型：" :label-width="formLabelWidth" prop="invoiceType">
          <el-select v-model="form.invoiceType" placeholder="请选发票类型" style="width:100%">
            <el-option label="专票" value="专票"></el-option>
            <el-option label="普票" value="普票"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位名称：" :label-width="formLabelWidth" prop="unitname">
          <el-input v-model="form.unitname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="纳税人识别码：" :label-width="formLabelWidth" prop="taxpayerIdentityNumber">
          <el-input v-model="form.taxpayerIdentityNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址：" :label-width="formLabelWidth" >
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话：" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开户行：" :label-width="formLabelWidth">
          <el-input v-model="form.openingBank" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号：" :label-width="formLabelWidth">
          <el-input v-model="form.accountNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="应税劳务名称：" :label-width="formLabelWidth" prop="revenueTypeId">
          <!-- <el-input v-model="form.revenueTypeId" autocomplete="off"></el-input> -->
          <el-select v-model="form.revenueTypeId" placeholder="请选择应税劳务名称" style="width:100%">
            <el-option  v-for="item in gettypeList" :key="item.revenueTypeId" :label="item.revenueTypeName" :value="item.revenueTypeId"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="开票金额：" :label-width="formLabelWidth" prop="cnyMoney">
          <el-input v-model="form.cnyMoney" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="备注：" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.comment"  :rows="2"  autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelInvoice">取 消</el-button>
        <el-button type="primary" @click="invoiceAdd('form')">确 定</el-button>
      </div>
    </el-dialog>
    <PringPayDialog :showVis="showVis"/>
  </div>
</template>

<script>
import axios from "axios";
import CookieUtil from "~/utils/CookieUtil";
import PringPayDialog from "~/components/projectListPage/PringPayDialog";
import NetReqUser from "../network/NetReqUser";

export default {
  data(){
    return {
      invoiceList: [],
      keyWord: '',
      username: '',
      rangeDate: ['',''],
      dialogFormVisible: false,
      form: {
        companyId: '',
        projectId: '',
        invoiceType: '',
        unitname: '',
        taxpayerIdentityNumber: '',
        address: '',
        phone: '',
        openingBank: '',
        accountNumber: '',
        revenueTypeId: '',
        cnyMoney: '',
        comment: '',
      },
      showVis: 0,
      formLabelWidth: '150px',
      gettypeList: [],
      options: [],//项目名称列表
      rules: {
        companyId: [
          { required: true, message: '请选择公司', trigger: 'blur' }
        ],
        projectId: [
          { required: true, message: '请输入项目名称/编号', trigger: 'blur' }
        ],
        invoiceType: [
          { required: true, message: '请选择发票类型', trigger: 'blur' }
        ],
        unitname: [
          { required: true, message: '请输入单位名称', trigger: 'blur' }
        ],
        revenueTypeId: [
          { required: true, message: '请选择应税劳务名称', trigger: 'blur' }
        ],
        cnyMoney: [
          { required: true, message: '请输入开票金额', trigger: 'blur' }
        ],
      },
      invoiceType: 0,
    }
  },
  methods: {
    delInvoice(row) {
      axios.get("/api/invoice/del?invoiceId="+row.invoiceId).then(
        (rep) => {
          console.log(1111,rep)
          if (rep && rep.data.code === 0) {
            this.$message.success('删除成功！');
            this.mountInvoice()
          }
        },
        () => {}
      );

    },
    cancelInvoice() {
      this.dialogFormVisible = false;
      this.$refs["form"].resetFields();

    },
    invoiceAdd(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {

          if(this.invoiceType==0){
            axios.post('/api/invoice/add',this.form).then((res)=>{
              if(res.data.code === 0){
                this.$message.success('添加成功！')
                this.$refs["form"].resetFields();
                this.dialogFormVisible = false;
                this.mountInvoice()

              }else{
                this.$message.success(res.data.msg)
              }
            })
          }else {
            axios.post('/api/invoice/update',this.form).then((res)=>{
              if(res.data.code === 0){
                this.$message.success('修改成功！')
                this.$refs["form"].resetFields();
                this.dialogFormVisible = false;
                this.mountInvoice()

              }else{
                this.$message.success(res.data.msg)
              }
            })
          }
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      

    },
    addinvoice(type) {
      this.dialogFormVisible = true;
      if(type!='add'){
        console.log('修改---',type)
        this.form = type;
        this.invoiceType = type.invoiceId
      }
    },
    printPay(scope) {
      console.log("即将打印的数据", scope);
      let printTemp = scope.row;
      this.$store.commit("projectData/setPringTemp", printTemp);
      let isShowPrint = this.$store.state.dialogSwitchData.printPayDialogShow;
      this.showVis = this.showVis + 1;
      // if (isShowPrint) {
      //   this.$store.commit("dialogSwitchData/setPrintPayDialogShow", false);
      // } else {
      //   this.$store.commit("dialogSwitchData/setPrintPayDialogShow", true);
      // }
    },
    changeDate(val){
      console.log(val)

    },
    async mountInvoice() {
      let start = ''
      let end = ''
      if(this.rangeDate[0]){
        start = new Date(this.rangeDate[0]).getTime();
      }
      if(this.rangeDate[1]){
        end = new Date(this.rangeDate[1]).getTime();
      }
      let params = '?keyWord=' + this.keyWord + '&username=' + this.username + '&startDt=' + start + '&endDt=' + end;
      let result = await axios.get("/api/invoice/list"+params).then(
        (rep) => {
          console.log(rep)
          if (rep && rep.data) {
          this.invoiceList = rep.data.data
          }
        },
        () => {}
      );
    },
    gettype() {

      axios.get("/api/revenue/gettype").then(
        (rep) => {
          console.log(rep)
          if (rep && rep.data) {
          this.gettypeList = rep.data.data
          }
        },
        () => {}
      );
      axios.get("/api/project/getbykey").then(
        (rep) => {
          console.log(rep)
          if (rep && rep.data) {
          this.options = rep.data.data
          }
        },
        () => {}
      );

    }
  
  },
   computed: {
    checkNowUserRole(){
      return function(name) {
        return this.$store.state.userData.nowUserRole.indexOf(name) > -1;
      }
    },
    accountList() {
      return this.$store.state.incomeData.accountList;
    },
  },
  async mounted(){
    console.log(this.rangeDate)
    this.mountInvoice();
    this.gettype();
    // ctx.store.commit("userData/setUserListTable", result);
  },
  async asyncData(ctx) {
    if(!CookieUtil.existCookie("user_id")) {
      location.href = "/";
    }
    let nowUserRole = await NetReqUser.getNowUserRole();
    console.log("当前用户角色列表", nowUserRole);
    ctx.store.commit("userData/setNowUserRole", nowUserRole);
  },
};
</script>