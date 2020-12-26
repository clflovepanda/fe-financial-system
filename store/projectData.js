/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 贺朋展
 * @Date: 2020-12-25 13:44:27
 * @LastEditors: 贺朋展
 * @LastEditTime: 2020-12-26 23:05:47
 */
export const state = () => ({
    projectList: [],
    viewProjectId: "",
    projectDetail: { //项目详情页，项目详情数据
        projectName: "",
        className: "",
        code: "",
        date: "",
        salesName: "",
        projectLeader: "",
        userNames: ""
    },
    projectFinancial: { //项目详情页，财务模块数据
    },
    projectPay: [],
    projectDataSource: [],
  quotationList: [],
    taskTimeList: []
})

//状态(1:未开始 2:进行中 3:暂停 4:取消 5:已完成 6:已关闭)

export const mutations = {
  setProjectList (state, newObj) {
    state.projectList = newObj;
  },
  setViewProjectId (state, newObj) {
    state.viewProjectId = newObj;
  },
  setProjectDetail (state, newObj) {
    state.projectDetail = newObj;
  },
  setProjectFinancial (state, newObj) {
    state.projectFinancial = newObj;
  },
  setProjectPay (state, newObj) {
    state.projectPay = newObj;
  },
  setProjectDataSrouce (state, newObj) {
    state.projectDataSource = newObj;
  },
  setQuotationList (state, newObj) {
    state.quotationList = newObj;
  },
  //工时分配列表
  setTaskTimeList (state, newObj) {
    state.taskTimeList = newObj;
  }
}