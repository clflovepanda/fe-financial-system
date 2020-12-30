export const state = () => ({
    expenditureList: [],
    allExpenditureList: [],
    expenditurePurposeType: [],
    city: [],
    revenueId: "",
    auditLog: {}
})

export const mutations = {
    setExpenditureList(state, newObj) {
        state.expenditureList = newObj;
    },
    setAllExpenditureList(state, newObj) {
        state.allExpenditureList = newObj;
    },
    setExpenditurePurposeType(state, newObj) {
        state.expenditurePurposeType = newObj;
    },
    setCity(state, newObj) {
        state.city = newObj;
    },
    setRevenueId(state, newObj) {
        state.revenueId = newObj;
    },
    setAuditLog(state, newObj) {
        state.auditLog = newObj;
    }
}