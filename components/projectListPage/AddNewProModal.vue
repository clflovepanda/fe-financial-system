<template>
  <el-dialog title="新增工时" :visible.sync="show">
    <el-divider></el-divider>
    <el-form :model="form" ref="form">
      <el-form-item label="选择模板" label-width="100px" prop="proTemplate">
        <el-select v-model="form.proTemplate" placeholder="请选择工时模板">
          <el-option label="活动" value="first"></el-option>
          <el-option label="搭建" value="second"></el-option>
          <el-option label="主场" value="third"></el-option>
          <el-option label="IT直播" value="four"></el-option>
          <el-option label="IT研发" value="five"></el-option>
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
</template>

<script>
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
    this.$emit('hideModal');
    this.$router.push('/createTime');
    }
  },
};
</script>