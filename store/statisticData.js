export const state = () => ({
    projectStatistic: {},
    incomeStatistic: [],
    incomeStatisticDetail: []
})

export const mutations = {
    setProjectStatistic(state, newObj) {
        state.projectStatistic = newObj;
    },
    setIncomeStatistic(state, newObj) {
        state.incomeStatistic = newObj;
    },
    setIncomeStatisticDetail(state, newObj) {
        state.incomeStatisticDetail = newObj;
    }
}