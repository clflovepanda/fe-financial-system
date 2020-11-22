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
        console.log("hahaha~");
        Object.assign(state.userSearchForm, newObj);
    }
}