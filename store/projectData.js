export const state = () => ({
    projectList: [],
    viewProjectId: ""
})

export const mutations = {
    setProjectList(state, newObj) {
        state.projectList = newObj;
    },
    setViewProjectId(state, newObj) {
        state.viewProjectId = newObj;
    }
}