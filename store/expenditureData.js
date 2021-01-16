export const state = () => ({
    expenditureList: {
        list: [],
        total: 0
    },
    allExpenditureList: {
        list: [],
        total: 0
    },
    expenditurePurposeType: [],
    city: [],
    revenueId: "",
    auditLog: {},
    searchParams: {}
})

export const mutations = {
    setSearchParams(state, newObj) {
        state.searchParams = newObj;
    },
    setExpenditureList(state, newObj) {
        state.expenditureList.list = newObj.list;
        state.expenditureList.total = newObj.total;
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