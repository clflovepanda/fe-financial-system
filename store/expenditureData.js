export const state = () => ({
    expenditureList: [],
    allExpenditureList: {},
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
        state.allExpenditureList.list = newObj.data;
        state.allExpenditureList.total = newObj.count;
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