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
    editUserForm: {},
    accountStatusList: [{
            value: "1",
            label: "启用",
        },
        {
            value: "0",
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
        state.userListTable.listData = newObj
        state.userListTable.total = newObj.length;
    },
    setEditUserForm(state, newObj) {
        console.log("setEditUserForm", newObj);
        let temp = {
            userId: newObj.userId,
            username: newObj.username,
            mobile: newObj.mobile,
            depId: newObj.depId,
            state: newObj.state,
            roleId: newObj.roles[0].roleId,
            roleName: newObj.roleName
        }
        state.editUserForm = temp;
    }
}