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
            <el-button type="primary" @click="uploadQuotation()" v-if="checkNowUserRole('project_quotation_add')">上传报价单</el-button>
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
              <el-button type="text" size="small" @click="editQuotation(scope.row)" v-if="checkNowUserRole('project_quotation_update')">编辑</el-button>
              <el-button type="text" size="small" @click="deleteQuotation(scope.row)" v-if="checkNowUserRole('project_quotation_del')">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>


    <el-dialog title="上传报价单" :visible.sync="dialogFormVisible">
      <el-form :model="form" >
        <el-form-item label="报价单名称" :label-width="formLabelWidth"  :rules="[
      { required: true, message: '请输入报价单名称', trigger: 'blur' },
    ]" style="width:360px">
          <el-input v-model="form.name" autocomplete="off" style="width:360px"></el-input>
        </el-form-item>
        <el-form-item label="上传报价单" :label-width="formLabelWidth" :rules="[
      { required: true}]">
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
            <div class="el-upload__text">将文件拖到此处，或<em>点击添加报价单</em></div>
            <div class="el-upload__tip" slot="tip">提示：上传的报价单类型仅支持doc、xls等文件格式</div>
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
      actionUrl:'',
      ruleForm: {
        name:  "",
      },
      formLabelWidth: '200px',
      dialogFormVisible: false,
      form: {
        name:''
      },
      resourceName: '',
      resourceUrl: '',
    };
  },
  computed: {
    checkNowUserRole(){
      return function(name) {
        return this.$store.state.userData.nowUserRole.indexOf(name) > -1;
      }
    },
    getQuotationData() {
      return this.$store.state.projectData.quotationList;
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
    async addQuotation(){
      if(!this.form.name){
        this.$message.error('请输入报价单名称')
        return false
      }

      if(!this.resourceUrl){
        this.$message.error('请上传文件')
        return false

      }
      let params = {
        quotationName : this.form.name,
        resourceName : this.resourceName,
        resourceUrl: this.resourceUrl,
        projectId: this.$store.state.projectData.viewProjectId,
        dataSource: this.$store.state.projectData.projectDetail.dataSourceName,


      }
      axios.post('/api/quotation/add',params).then((res)=>{
        if(res.data.code==0){
          this.dialogFormVisible = false;
          this.$message.success('保存成功！')

           axios.get("/api/quotation/list?projectId=" + this.$store.state.projectData.viewProjectId).then((rep) =>{
             if (rep.data.code===0) {
              this.$store.commit("projectData/setQuotationList", rep.data.data);
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