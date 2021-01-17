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
            <el-button type="primary"  @click="uploadQuotation()" v-if="checkNowUserRole('project_settlement_add')">上传结算单</el-button>
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
              <el-button :href="scope.row.resourceUrl" type="text" size="small" :disabled="!checkNowUserRole('project_settlement_download')">{{scope.row.resourceName}}</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="id" label="操作" width="140">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editSettlement(scope.row)" v-if="checkNowUserRole('project_settlement_update')">编辑</el-button>
              <el-button type="text" size="small" @click="deleteSettlement(scope.row)" v-if="checkNowUserRole('project_settlement_del')">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

    <el-dialog title="上传结算单" :visible.sync="dialogFormVisible">
      <el-form :model="form"  style="width:360px">
        <el-form-item label="结算单名称：" :label-width="formLabelWidth"  :rules="[
      { required: true, message: '请输入结算单名称', trigger: 'blur' },
    ]" style="width:360px">
          <el-input v-model="form.settlementName" autocomplete="off" style="width:360px"></el-input>
        </el-form-item>

        <el-form-item label="是否为最终结算单" :label-width="formLabelWidth">
          <el-radio v-model="form.isLastSettlement" label="1">是</el-radio>
          <el-radio v-model="form.isLastSettlement" label="0">否</el-radio>
        </el-form-item>

        
        <el-form-item label="结算收入：" :label-width="formLabelWidth"  :rules="[
      { required: true, message: '请输入结算收入', trigger: 'blur' },
      { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确的格式,可保留两位小数' }
    ]" style="width:360px">
          <el-input v-model="form.settlementIncome"   oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" type="number"  autocomplete="off" style="width:360px"></el-input>
        </el-form-item>
        <el-form-item label="上传结算单" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            drag
             ref="upload"
            :http-request="requestFile"
            :auto-upload="true"
            accept="doc、xls"
            :before-upload="beforeAvatarUpload"
						:action="actionUrl"
						:limit="1"
            >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击添加结算单</em></div>
            <div class="el-upload__tip" slot="tip">提示：上传的结算单类型仅支持doc、xls等文件格式</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addQuotation">保 存</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import Table from "~/components/projectListPage/Table.vue";
import axios from 'axios'

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
       formLabelWidth: '200px',
        dialogFormVisible: false,
        form: {
          settlementName:'',
          settlementIncome: '',
          isLastSettlement: '1',
        },
        resourceName: '',
        resourceUrl: '',
        actionUrl:'',
    };
  },
  computed: {
    checkNowUserRole(){
      return function(name) {
        return this.$store.state.userData.nowUserRole.indexOf(name) > -1;
      }
    },
    getSettlementList() {
      return this.$store.state.projectData.settlementList;
    }
  },
  methods: {
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'application/msword';

        // if (file.type === 'application/msword'||file.type === 'application/vnd.ms-excel') {
        //   return true
          
        // }else{
        //   this.$message.error('请上传正确的文件格式!');          
        //   return false;
        // }
     },
     
    requestFile(content){
      let filename = content.file.name;
      this.resourceName = filename;
      let index = filename.lastIndexOf(".");
      let fileType = filename.substring(index+1);
      let file = this.$refs.upload.uploadFiles.pop().raw;//这里获取上传的文件对象
      let formData = new FormData();
      formData.append("file",file);
      this.actionUrl = '/api/upload/excel?fileType='+fileType+'&mode=quotation'
      axios.post(this.actionUrl, formData).then((res)=>{
        console.log('file---',res)
        if(res.data.code===0){
          this.resourceUrl = res.data.data;
          this.$message.success('上传成功！')
          

        }
      })
    },
    addQuotation(){
      if(!this.form.settlementName){
        this.$message.error('请输入结算单名称')
        return false
      }
      if(!this.form.settlementIncome){
        this.$message.error('请输入结算收入')
        return false
      }

      if(!this.resourceUrl){
        this.$message.error('请上传文件')
        return false

      }
      let params = {
        settlementName : this.form.settlementName,
        settlementIncome : this.form.settlementIncome,
        resourceName : this.resourceName,
        resourceUrl: this.resourceUrl,
        projectId: this.$store.state.projectData.viewProjectId,
        settlementIncome: this.form.settlementIncome,
        dataSource: this.$store.state.projectData.projectDetail.dataSourceName,


      }
      axios.post('/api/settlement/add',params).then((res)=>{
        if(res.data.code==0){
          this.dialogFormVisible = false;
          this.$message.success('保存成功！')

           axios.get("/api/settlement/list?projectId=" + this.$store.state.projectData.viewProjectId).then((rep) =>{
             if (rep.data.code===0) {
              this.$store.commit("projectData/setSettlementList", rep.data.data);
            }
           })
        }
      })

    },
    uploadQuotation(){
      this.dialogFormVisible = true;
      this.resourceName = '';
      this.resourceUrl = '';
      this.form.name = '';
    },
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