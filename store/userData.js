export const state = () => ({
    userSearchForm: {
        userName: "",
        phone: "",
        role: "",
        accountStatus: "",
        createDate: "",
        updateDate: "",
        part: "",
    },
    userListTable: {
        listData: [],
        total: 0,
        currentPage: 1,
    },
    editUserForm: {
        userName: "",
        phone: "",
        role: "",
        accountStatus: "",
        createDate: "",
        updateDate: "",
        part: "",
    },
    accountStatusList: [{
            value: 1,
            label: "启用",
        },
        {
            value: 2,
            label: "禁用",
        },
    ],
})

export const mutations = {
    setUserSearchForm(state, newObj) {
        Object.assign(state.userSearchForm, newObj);
    },
    setUserListTable(state, newObj) {
        console.log("setUserListTable", newObj);
        state.userListTable.listData = newObj.list;
        state.userListTable.total = newObj.total;
    }
}