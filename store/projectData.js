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
    projectPay: { //项目详情页，支出模块

    }
})

//状态(1:未开始 2:进行中 3:暂停 4:取消 5:已完成 6:已关闭)

export const mutations = {
    setProjectList(state, newObj) {
        state.projectList = newObj;
    },
    setViewProjectId(state, newObj) {
        state.viewProjectId = newObj;
    },
    setProjectDetail(state, newObj) {
        state.projectDetail = newObj;
    },
    setProjectFinancial(state, newObj) {
        state.projectFinancial = newObj;
    },
    setProjectPay(state, newObj) {
        state.projectPay = newObj;
    }
}