export const state = () => ({
    depositeLogData: [],
    depositeSelected: {}
})

export const mutations = {
    setDepositeLogData(state, value) {
        state.depositeLogData = value;
    },
    setDepositeSelected(state, value) {
        state.depositeSelected = value;
    }
}