export const state = () => ({
    projectStatistic: {},
    incomeStatistic: []
})

export const mutations = {
    setProjectStatistic(state, newObj) {
        state.projectStatistic = newObj;
    },
    setIncomeStatistic(state, newObj) {
        state.incomeStatistic = newObj;
    }
}