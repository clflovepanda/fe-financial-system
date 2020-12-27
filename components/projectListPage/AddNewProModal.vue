
<template>
<div>
  <el-dialog title="新增工时" :visible.sync="show"  :before-close="handleCancel">
    <el-divider></el-divider>
    <el-form :model="form" ref="form">
      <el-form-item label="选择模板" label-width="100px" prop="proTemplate">
        <el-select v-model="form.proTemplate" placeholder="请选择工时模板">
          <el-option label="活动" value="1"></el-option>
          <el-option label="搭建" value="2"></el-option>
          <el-option label="主场" value="3"></el-option>
          <el-option label="IT直播" value="4"></el-option>
          <el-option label="IT研发" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-divider></el-divider>

      <el-form-item label="工时名称" label-width="100px" prop="name">
        <el-input v-model="form.name" autocomplete="off" placeholder="请输入工时名称"></el-input>
      </el-form-item>
      <el-divider></el-divider>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel()">取 消</el-button>
      <el-button type="primary" @click="handleCreate()">创 建</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import axios from "axios";
export default {
  props:['show'],
  data() {
    return {
      form: {
        proTemplate: "",
        name: "",
      },
    };
  },
  methods: {
    handleCancel: function() {
    this.$refs['form'].resetFields();
    this.$emit('hideModal',false);
    },
    handleCreate (){
      let params = {
        projectId: this.$store.state.projectData.viewProjectId,
        templateFlag: this.form.proTemplate,
        templateName: this.form.name
      }
      axios.post('/api/task/addrelation',params).then((res)=>{
        if(res.data.code === 0){
          this.$message.success('创建成功！')
          this.$store.commit("projectData/setTaskTimeList", res.data.data);
          this.$emit('hideModal');
        }
      })
    // this.$router.push('/createTime');
    }
  },
};
</script>