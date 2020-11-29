<template>
  <el-container class="container view-project">
    <el-header class="headerContent">
      <HeaderBar />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Menu />
      </el-aside>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item class="breadcrumb">位置</el-breadcrumb-item>
          <el-breadcrumb-item class="breadcrumb">项目列表</el-breadcrumb-item>
          <el-breadcrumb-item
            class="breadcrumb breadcrumb-actived"
            :to="{ path: '/viewProject' }"
          >查看项目</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
          <el-tab-pane label="项目信息" name="first">
            <el-row class="button-wrap">
              <el-col :span="10" :offset="14">
                <el-button size="small" type="success">销售提成1%已发放</el-button>
                <el-button size="small" type="success">销售提成已全部发放</el-button>
                <el-button size="small" type="warning">修改项目</el-button>
                <el-button size="small" type="danger">关闭项目</el-button>
              </el-col>
            </el-row>
            <div class="project-info-wrap">
              <el-row class="project-info">
                <span class="info-title">项目信息</span>
                <el-button size="mini" type="primary">生效中</el-button>
              </el-row>
              <el-divider></el-divider>

              <el-row>
                <el-col :span="8">
                  <label class="label-item" for>项目名称:</label>
                  <span></span>
                </el-col>
                <el-col :span="8">
                  <label class="label-item" for>所属类目:</label>
                  <span></span>
                </el-col>
                <el-col :span="8">
                  <label class="label-item" for>项目编号:</label>
                  <span></span>
                </el-col>
              </el-row>
              <el-divider></el-divider>

              <el-row>
                <el-col :span="10">
                  <label class="label-item" for>项目开始时间-结束时间:</label>
                  <span></span>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <el-row>
                <el-col :span="8">
                  <label class="label-item" for>项目所属公司:</label>
                  <span></span>
                </el-col>
                <el-col :span="8">
                  <label class="label-item" for>销售经理:</label>
                  <span></span>
                </el-col>
                <el-col :span="8">
                  <label class="label-item" for>项目经理:</label>
                  <span></span>
                </el-col>
              </el-row>
              <el-divider></el-divider>

              <el-row>
                <el-col :span="10">
                  <label class="label-item" for>项目成员:</label>
                  <span></span>
                </el-col>
                <el-col :span="10">
                  <label class="label-item" for>项目成员工时:</label>
                  <span></span>
                </el-col>
              </el-row>
              <el-divider></el-divider>

              <el-row>
                <el-col :span="10">
                  <label class="label-item" for>立项人:</label>
                  <span></span>
                </el-col>
                <el-col :span="10">
                  <label class="label-item" for>立项时间:</label>
                  <span></span>
                </el-col>
              </el-row>
              <el-divider></el-divider>

              <el-row>
                <el-col :span="8">
                  <label class="label-item" for>项目审核人:</label>
                  <span></span>
                </el-col>
                <el-col :span="8">
                  <label class="label-item" for>审核时间:</label>
                  <span></span>
                </el-col>
                <el-col :span="8">
                  <label class="label-item" for>审核状态:</label>
                  <span></span>
                </el-col>
              </el-row>
              <el-divider></el-divider>

              <el-row>
                <div class="label-item">项目描述：</div>
                <div class="desc">fhdsfkjdsfhks</div>
              </el-row>
            </div>
            <div class="project-info-wrap">
              <el-row>
                <span class="info-title">财务统计</span>
                <el-divider></el-divider>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <span class="label-item">预计收入金额/元：</span>
                  <span></span>
                </el-col>
                <el-col :span="10">
                  <span class="label-item">预计支出金额/元：</span>
                  <span></span>
                </el-col>
              </el-row>
              <el-divider></el-divider>

              <el-row>
                <el-col :span="10">
                  <span class="label-item">实际收入金额/元：</span>
                  <span></span>
                </el-col>
                <el-col :span="10">
                  <span class="label-item">实际支出金额/元：</span>
                  <span></span>
                </el-col>
              </el-row>
              <el-divider></el-divider>

              <el-row>
                <el-col :span="10">
                  <span class="label-item">预收押金/元：</span>
                  <span></span>
                </el-col>
                <el-col :span="10">
                  <span class="label-item">押金转收入金额/元：</span>
                  <span></span>
                </el-col>
              </el-row>
              <el-divider></el-divider>

              <el-row>
                <el-col :span="8">
                  <span class="label-item">项目利润/元：</span>
                  <span></span>
                </el-col>
                <el-col :span="8">
                  <span class="label-item">毛利率/%：</span>
                  <span></span>
                </el-col>
                <el-col :span="8">
                  <span class="label-item">支出比/%:</span>
                  <span></span>
                </el-col>
              </el-row>
              <el-divider></el-divider>

              <el-row>
                <el-col :span="10">
                  <span class="label-item">结算收入金额/元：</span>
                  <span></span>
                </el-col>
                <el-col :span="10">
                  <span class="label-item">应收收入/元：</span>
                  <span></span>
                </el-col>
              </el-row>
              <el-divider></el-divider>
            </div>
          </el-tab-pane>
          <el-tab-pane label="工时分配" name="second">
            <el-row>
              <el-col :offset="22">
                <el-button size="small" type="primary">新增工时</el-button>
              </el-col>
            </el-row>
            <div class="project-info-wrap">
              <el-row>
                <span class="info-title">已添加工时</span>
              </el-row>
              <el-divider></el-divider>
              <el-row>
                <el-col :span="6">
                  <span></span>
                </el-col>
                <el-col :span="6">
                  <span>数量：</span>
                  <span></span>
                </el-col>
                <el-col :span="6">
                  <span>工时：</span>
                  <span></span>
                </el-col>
                <el-col :span="6">
                  <span>完成实时间：</span>
                  <span></span>
                </el-col>
              </el-row>
              <el-divider></el-divider>
            </div>
          </el-tab-pane>
          <el-tab-pane label="收入" name="third">收入</el-tab-pane>
          <el-tab-pane label="支出" name="fourth">支出</el-tab-pane>
          <el-tab-pane label="押金" name>押金</el-tab-pane>
          <el-tab-pane label="报价单" name>报价单</el-tab-pane>
          <el-tab-pane label="项目合同" name>项目合同</el-tab-pane>
          <el-tab-pane label="结算单" name>结算单</el-tab-pane>
          <el-tab-pane label="应收单" name>应收单</el-tab-pane>
        </el-tabs>

        <el-row>
          <el-col :offset="9">
            <el-button class="add-project" type="primary" @click="handleBackList()">返回项目列表</el-button>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
    };
  },

  methods: {
    handleTabClick(tab, event) {
      console.log(tab, event);
    },
    handleBackList() {
      this.$router.push("/projectList");
    },
  },
};
</script>

<style>
.breadcrumb.breadcrumb-actived .el-breadcrumb__inner.is-link {
  color: blue;
}
.project-list-form .el-form-item {
  display: inline-block;
  vertical-align: top;
}
.project-info-wrap {
  background: #eee;
  padding: 20px;
  margin-bottom: 20px;
  margin-top:20px;
}
.info-title {
  font-weight: bold;
  margin-right: 35px;
}
.label-item {
  color: #606266;
}
.desc {
  color: #606266;
  margin-top: 15px;
}


</style>