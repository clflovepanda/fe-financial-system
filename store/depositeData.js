export const state = () => ({
    depositeLogData: [],
    depositeSelected: {},
    depositeData: []
})

export const mutations = {
    setDepositeLogData(state, value) {
        state.depositeLogData = value;
    },
    setDepositeSelected(state, value) {
        state.depositeSelected = value;
    },
    setDepositeData(state, value) {
        state.depositeData = value;
    }
}