
export const state = () => ({
    namespaced: true,
    searchIncomeForm: {
        account: "",
        incomeType: "",
        incomeFromType: "",
        incomeFromName: "",
        incomeDate: "",
        remark: ""
    },
    incomeListTable: {
        listData: [],
        currentPage: 1,
        total: 10,
    },
    accountList: [
        { value: 1, label: "亚讯" },
        { value: 2, label: "医通捷" },
        { value: 3, label: "新锐" },
        { value: 4, label: "医点通" },
        { value: 5, label: "现金到款" },
    ],
    incomeTypeList: [
        { value: 1, label: "汇款" },
        { value: 2, label: "支票" },
        { value: 3, label: "现金" },
        { value: 4, label: "押金转收入" },
    ],
    incomeFromTypeList: [
        { value: 1, label: "企业" },
        { value: 2, label: "个人" },
        { value: 3, label: "未知" },
    ]
})

export const mutations = {
    setSearchIncomeForm(state, newObj) {
        state.searchIncomeForm.account = newObj.account;
        state.incomeType = newObj.incomeType;
        state.incomeFromType = newObj.incomeFromType;
        state.incomeFromName = newObj.incomeFromName;
        state.incomeDate = newObj.incomeDate;
        state.remark = newObj.remark;
    },
  setIncomeListTable (state, newObj) {
        state.incomeListTable.listData = newObj;
        state.incomeListTablecurrentPage = 1;
        state.incomeListTable.total = newObj.length;
    }
}