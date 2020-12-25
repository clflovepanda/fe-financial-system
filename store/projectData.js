export const state = () => ({
    projectList: [],
    viewProjectId: "",
    projectDetail: {
        projectName: "",
        className: "",
        code: "",
        date: "",
        salesName: "",
        projectLeader: "",
        userNames: ""
    },
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
    }
}