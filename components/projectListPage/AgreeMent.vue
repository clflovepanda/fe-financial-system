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
            <el-button type="primary"  @click="uploadQuotation()" v-if="checkNowUserRole('project_contract_add')">上传项目合同</el-button>
          </el-col>
        </el-row>
        <el-table :data="getContractList" border style="width: 100%; margin-top: 20px">
          <el-table-column align="center" fixed prop="contractId" label="序号"></el-table-column>
          <el-table-column align="center" prop="contractName" label="项目合同名称"></el-table-column>
          <el-table-column align="center" prop="contractNo" label="合同编号"></el-table-column>
          <el-table-column align="center" prop="customerName" label="客户名称"></el-table-column>
          <el-table-column align="center" prop="proManager" label="附件">
            <template slot-scope="scope">
              <el-button type="text" size="small" :href="scope.row.resourceUrl" :disabled="!checkNowUserRole('project_contract_download')">下载合同</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="id" label="操作" width="140">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editContract(scope.row)" v-if="checkNowUserRole('project_contract_update')">编辑</el-button>
              <el-button type="text" size="small" @click="deleteContract(scope.row)" v-if="checkNowUserRole('project_contract_del')">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

    <el-dialog title="上传项目合同" :visible.sync="dialogFormVisible">
      <el-form :model="form"  style="width:360px">
        <el-form-item label="项目合同名称：" :label-width="formLabelWidth"  :rules="[
      { required: true, message: '请输入项目合同名称', trigger: 'blur' },
    ]" style="width:360px">
          <el-input v-model="form.name" autocomplete="off" style="width:360px"></el-input>
        </el-form-item>
        <el-form-item label="客户名称：" :label-width="formLabelWidth"  :rules="[
      { required: true, message: '请输入客户名称', trigger: 'blur' },
    ]" style="width:360px">
          <el-input v-model="form.customerName" autocomplete="off" style="width:360px"></el-input>
        </el-form-item>
        <el-form-item label="上传合同" :label-width="formLabelWidth">
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
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传合同</em></div>
            <div class="el-upload__tip" slot="tip">提示：上传的项目合同类型仅支持doc、xls等文件格式</div>
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
        name:'',
        customerName: ''
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
    getContractList() {
      return this.$store.state.projectData.contractList;
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
      if(!this.form.name){
        this.$message.error('请输入项目合同名称')
        return false
      }
      if(!this.form.customerName){
        this.$message.error('请输入客户名称')
        return false
      }

      if(!this.resourceUrl){
        this.$message.error('请上传文件')
        return false

      }
      let params = {
        contractName : this.form.name,
        resourceName : this.resourceName,
        resourceUrl: this.resourceUrl,
        projectId: this.$store.state.projectData.viewProjectId,
        customerName: this.form.customerName,
        dataSource: this.$store.state.projectData.projectDetail.dataSourceName,


      }
      axios.post('/api/contract/add',params).then((res)=>{
        if(res.data.code==0){
          this.dialogFormVisible = false;
          this.$message.success('保存成功！')

           axios.get("/api/contract/list?projectId=" + this.$store.state.projectData.viewProjectId).then((rep) =>{
             if (rep.data.code===0) {
              this.$store.commit("projectData/setContractList", rep.data.data);
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
    editContract(row) {

    },
    deleteContract(row) {

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