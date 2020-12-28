export const state = () => ({
    expenditureList: [],
    expenditurePurposeType: [],
    city: []
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
    }
}