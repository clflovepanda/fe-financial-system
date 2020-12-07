export const state = () => ({
    roleStatusList: [
        { value: 1, label: "启用" },
        { value: 2, label: "禁用" }
    ],
    roleListTable: {
        listData: [],
        total: 0,
        currentPage: 1
    }
})

export const mutations = {
    setRoleList(state, newObj) {
        state.roleListTable.listData = newObj
        state.roleListTable.total = newObj.length;
    }
}