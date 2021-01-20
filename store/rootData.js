export const state = () => ({
    userList: [],
    roleList: [],
    depList: [],
    projectList: [],
    revenueTypeList: [],
})

export const mutations = {
    setUserList(state, newObj) {
        state.userList = newObj;
    },
    setRoleList(state, newObj) {
        state.roleList = newObj;
    },
    setDepList(state, newObj) {
        state.depList = newObj;
    },
    setProjectList(state, newObj) {
        state.projectList = newObj;
    },
    setRevenueTypeList(state, newObj) {
        state.revenueTypeList = newObj;
    }
}