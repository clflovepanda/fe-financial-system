export const state = () => ({
    expenditureList: [],
    expenditurePurposeType: [],
    city: [],
    revenueId: ""
})

export const mutations = {
    setExpenditureList(state, newObj) {
        state.expenditureList = newObj;
    },
    setExpenditurePurposeType(state, newObj) {
        state.expenditurePurposeType = newObj;
    },
    setCity(state, newObj) {
        state.city = newObj;
    },
    setRevenueId(state, newObj) {
        state.revenueId = newObj;
    }
}