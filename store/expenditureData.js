export const state = () => ({
    expenditureList: []
})

export const mutations = {
    setExpenditureList(state, newObj) {
        state.expenditureList = newObj;
    }
}