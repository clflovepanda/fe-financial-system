export const state = () => ({
    projectList: [],
    projectPassTable: {
        list: [],
        pageSize: 5,
        pageNum: 1,
        total: 0
    },
    projectRejectTable: {
        list: [],
        pageSize: 5,
        pageNum: 1,
        total: 0
    },
    viewProjectId: "",
    projectDetail: { //项目详情页，项目详情数据
        projectName: "",
        className: "",
        code: "",
        date: "",
        salesName: "",
        projectLeader: "",
        userNames: "",
    },
    projectFinancial: { //项目详情页，财务模块数据
    },
    editProject: { //编辑项目
    },
    projectPay: [],
    projectDataSource: [],
    quotationList: [],
    contractList: [],
    settlementList: [],
    taskTimeList: [],
    getuserList: [],
    receivableList: [],
    printTemp: {}
})

//状态(1:未开始 2:进行中 3:暂停 4:取消 5:已完成 6:已关闭)

export const mutations = {
    setPringTemp(state, newObj) {
        state.printTemp = newObj;
    },
    setProjectList(state, newObj) {
        state.projectList = newObj;
    },
    setProjectPassList(state, newObj) {
        state.projectPassTable = newObj;
    },
    setProjectRejectList(state, newObj) {
        state.projectRejectTable = newObj;
    },
    setProjectPassPageAndSize(state, newObj) {
        if (newObj.pageSize) {
            state.projectPassTable.pageSize = newObj.pageSize;
        }
        if (newObj.pageNum) {
            state.projectPassTable.pageNum = newObj.pageNum;
        }
    },
    setProjectRejectPageAndSize(state, newObj) {
        if (newObj.pageSize) {
            state.projectRejectTable.pageSize = newObj.pageSize;
        }
        if (newObj.pageNum) {
            state.projectRejectTable.pageNum = newObj.pageNum;
        }
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
    },
    setProjectDataSrouce(state, newObj) {
        state.projectDataSource = newObj;
    },
    setQuotationList(state, newObj) {
        state.quotationList = newObj;
    },
    setContractList(state, newObj) {
        state.contractList = newObj;
    },
    setSettlementList(state, newObj) {
        state.settlementList = newObj;
    },
    //工时分配列表
    setTaskTimeList(state, newObj) {
        state.taskTimeList = newObj;
    },
    //用户列表
    setgetuserlist(state, newObj) {
        state.getuserList = newObj;
    },
    setReceivableList(state, newObj) {
        state.receivableList = newObj;
    },
    setEditProject(state, newObj) {
        state.editProject = newObj;
    }
}