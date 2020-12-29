
<template>
  <div  v-loading="loading">
    <el-tree :data="dealedArr" :check-on-click-node="true" show-checkbox :default-expand-all="true"
      node-key="templateId" :props="defaultProps" ref="tree"
      @check="checkdata">
      <div class="custom" slot-scope="{ node, data }">
        <div>{{ node.label }}</div>
        <div v-for="item in renderData" :key="item.id">
          <div class="table-wrapper" 
            v-if="!node.disabled && node.checked && (item.id == data.templateId)">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="数量">
                  <div @click.stop>
                      <el-input size="mini" v-model="item.count" placeholder=""></el-input>
                  </div>
              </el-form-item>
              <el-form-item label="工时">
                  <div @click.stop>
                      <el-input size="mini" v-model="item.time" placeholder=""></el-input>
                  </div>
              </el-form-item>
              <el-form-item>
                  <el-button size="mini" type="primary" @click.stop="modify(item)">修改</el-button>
                  <el-button size="mini" type="primary" @click.stop="addInput(item)">添加</el-button>
              </el-form-item>
            </el-form>
            <div class="dialog" v-if="item.showtable">
              <el-table :data="tableData[item.id].list" size="mini" highlight-current-row
                style="width: 100%" :header-cell-style="{background:'#f1f1f1'}">
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="人员" width="260">
                    <template slot-scope="scope">
                        <div @click.stop>
                            <el-select size="mini" v-model="scope.row.person" placeholder="请选择">
                                <el-option v-for="(item,index) in options" :key="index"
                                            :label="item.realname" :value="item.username">
                                </el-option>
                            </el-select>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="数量" width="260">
                    <template slot-scope="scope">
                        <div @click.stop>
                            <el-input style="width:200px" size="mini" v-model="scope.row.count">
                            </el-input>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="工时" width="260">
                    <template slot-scope="scope">
                        <div @click.stop>
                            <el-input style="width:200px" size="mini" v-model="scope.row.time">
                            </el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="完成时间" width="260">
                    <template slot-scope="scope">
                        <div @click.stop>
                            <el-date-picker v-model="scope.row.completionTime" type="datetime"
                                            placeholder="选择日期时间" size="mini">
                            </el-date-picker>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                            <span class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;"
                                  @click.stop="del(scope.$index, data)">
                                删除
                            </span>
                    </template>
                </el-table-column>
              </el-table>
            </div>
        </div>
        </div>
      </div>
    </el-tree>
    <div>
        <el-button type="primary" @click="save" style="display: block;margin:40px auto;">保存</el-button>
    </div>
  
  </div>
</template>

<script>
import axios from 'axios'
import CookieUtil from "~/utils/CookieUtil";
export default {
  data() {
    return {
      loading: true,
      templateList: [],
      defaultProps: {
          children: 'templates',
          label: 'templateName'
      },
      dealedArr: [],
      form: {
          count: 5,
          time: 20
      },
      projectId: 113,
      showTable: false,
      renderData: [],
      tableDataBox: [],
      thirdArr: [],
      baseUrl: '${pageContext.request.contextPath}',
      options: [],
      tableData: {},
      projectId: '',
      flag: '',
      value3:'',
      tableOne: {}
    }
  },

  

  methods: {
      addNum() {

      },
      // 保存按钮
      save() {
          // 校验
          let errorStr = ""
          Object.keys(this.tableOne).forEach((key) => {
              let totalTime = Number(this.tableOne[key].time) * Number(this.tableOne[key].count)
              let sum = 0
              for (let i = 0; i < this.tableData[key].list.length; i++) {
                  let v = this.tableData[key].list[i]
                  if (v.count != '' && v.time != '' && v.person != '') {
                      sum += Number(v.count) * Number(v.time)
                  }
              }
              if (sum > totalTime) {
                  errorStr += '模板' + this.tableOne[key].name + '、'
              }
          })
          if (errorStr) {
              let msg = errorStr.slice(0, -1)
              this.$message.error(msg + ',超出模板工时')
              return
          }
          let reqArr = []
          Object.keys(this.tableData).forEach((key) => {
              if (this.tableData[key].list.length > 0) {
                  this.tableData[key].list.map(item => {
                      if (item.count != '' && item.time != '' && item.person != '') {
                          reqArr.push({
                              taskRelationId: this.$route.query.taskRelationId,
                              userId: this.options.find(cell => cell.username == item.person).userId,
                              templateId: key,
                              amount: item.count,
                              takeTime: item.time,
                              taskId: item.taskId ? item.taskId : '',
                              completionTime: item.completionTime?new Date(item.completionTime).getTime():''
                          })
                      }
                  })
              }
          })
          axios.post("/api/task/adduser", reqArr).then(({data}) => {
              if (data.code == 0) {
                  this.$message.success('保存成功')
                   this.$router.push('/viewProject')
                  // window.location.href = this.baseUrl + '/task/json/tovuegettask.do?project_id=' + this.projectId
              } else {
                  this.$message.error(data.msg)
              }
          })
      },
      // 添加按钮
      addInput(item) {
          // 获取人员下拉列表
          this.getUser()
          if (!item.showtable) {
              item.showtable = true
              if (!this.tableData[item.id]) {
                  this.tableData[item.id] = {list: []}
              }
              this.tableData[item.id].list.push({
                  taskId: '',
                  templateId: item.templateId,
                  projectId: item.projectId,
                  person: '',
                  time: this.tableOne[item.id].time,
                  count: this.tableOne[item.id].count,
                  completionTime: this.tableOne[item.id].completionTime
              })
          } else {
              this.tableData[item.id].list.push({
                  taskId: '',
                  templateId: item.templateId,
                  projectId: item.projectId,
                  person: '',
                  time: this.tableOne[item.id].time,
                  count: this.tableOne[item.id].count,
                  completionTime: this.tableOne[item.id].completionTime
              })
          }
      },
      // 修改按钮
      modify(item) {
      let params = {
        taskId: item.taskId,
        amount: item.count,
        takeTime: item.time
      }
        axios.post('/api/task/updatetasktemplate',params).then((data) => {
            if (data.data.code === 0) {
                this.tableOne[item.id] = {
                    time: item.time,
                    count: item.count,
                    name: item.name,
                    completionTime: item.completionTime
                }
                this.$message.success('修改成功')
            } else {
                this.$message.error('修改失败：'+data.data.msg)
            }
        })
      },
      // 节点选中按钮
      checkdata(val) {
        val.checked = !val.checked
        axios.post( "/api/task/inittask",{taskRelationId:this.$route.query.taskRelationId,templateId:val.templateId}).then((response) => {
            if (val.checked) {
              let data = response.data.data;
              
                if (!this.tableData[val.menuId]) {
                    this.tableData[val.menuId] = {list: []}
                }
                this.tableOne[val.menuId] = {
                    time: data.tasktemp.takeTime,
                    count: data.tasktemp.amount,
                    name: val.templateName,
                }
                let res = data.task.map((item) => ({
                    taskId: item.taskId,
                    templateId: item.templateId,
                    taskRelationId: item.taskRelationId,
                    person: item.user.username,
                    time: item.takeTime,
                    count: item.amount,
                    name: val.templateName,
                    completionTime: item.completionTime
                }))
                if (res.length > 0) {
                    this.getUser()
                    this.renderData.push({
                        id: val.menuId,
                        time: data.tasktemp.takeTime,
                        count: data.tasktemp.amount,
                        taskId: data.tasktemp.taskId,
                        showtable: true,
                        name: val.templateName
                    })
                } else {
                    this.renderData.push({
                        id: val.menuId,
                        time: data.tasktemp.takeTime,
                        count: data.tasktemp.amount,
                        taskId: data.tasktemp.taskId,
                        showtable: false,
                        name: val.templateName
                    })
                }
                this.tableData[val.menuId].list = res
            } else {
                let idx = this.renderData.findIndex(item => item.id == val.menuId)
                if (idx != undefined) {
                    this.renderData.splice(idx, 1)
                }
                if (this.tableData[val.menuId]) {
                    this.tableData[val.menuId] = {list: []}
                }
            }
        })

      },
      getInitData() {
        axios.get("/api/template/getthreelayers?layer=" + this.$route.query.layer).then(({data}) => {
            if (data.code == 0) {
                this.loading = false
                this.templateList = data.data
                this.dealedArr = this.templateList.map(item => ({
                    ...item,
                    disabled: true,
                    templates: item.templates.map(value => ({
                        ...value,
                        disabled: true,
                        templates: value.templates.map(v => ({
                            ...v,
                            disabled: false,
                            checked: false,
                            menuId: v.templateId
                        }))
                    }))
                }))
                this.templateList.map(item => {
                    item.templates.map(value => {
                        value.templates.map(v => {
                            this.thirdArr.push(
                                {
                                    ...v,
                                    disabled: false,
                                    checked: false,
                                    menuId: v.templateId
                                }
                            )
                        })
                    })
                })
            }
        })
      },
      getUser() {
        this.options = this.$store.state.projectData.getuserList
        // axios.get("/api/task/getuser?projectId=" + this.$store.state.projectData.viewProjectId).then((data) => {
        //     this.options = data.data.data.map(item => {
        //         return item
        //     })
        // })
      },
      del(index, data) {
        console.log(this.tableData[data.menuId].list[index].taskId)
        if (this.tableData[data.menuId].list[index].taskId) {
            // 调接口
            let taskid = this.tableData[data.menuId].list[index].taskId
            axios.get("/api/task/deluser?taskId=" + taskid).then((res) => {

                if (res.data.code == 0) {
                    this.tableData[data.menuId].list.splice(index, 1)
                    this.$message.success('删除成功')
                } else {
                    this.$message.error('删除失败')
                }
            })
        } else {
            this.tableData[data.menuId].list.splice(index, 1)
            this.$message.success('删除成功')
        }
      }
  },
  async mounted(){
    this.getInitData()
  },
  async asyncData(ctx) {
    if(!CookieUtil.existCookie("user_id")) {
      location.href = "/";
    }
  }
};
</script>

<style>
        .el-tree-node__content {
            display: flex;
            align-items: baseline;
            height: auto;
            padding: 15px 0;
        }

        .table-wrapper {
            padding: 10px;
        }

        .el-form-item {
            margin-bottom: 12px;
        }
    </style>