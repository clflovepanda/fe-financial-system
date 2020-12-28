export const state = () => ({
    projectStatistic: {}
})

export const mutations = {
    setProjectStatistic(state, newObj) {
        state.projectStatistic = newObj;
    }
}