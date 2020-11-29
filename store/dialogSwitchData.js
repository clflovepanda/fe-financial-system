export const state = () => ({
    createUserDialogShow: false,
    editUserDialogShow: false,
    newIncomeDialogShow: false,
    confirmIncomeDialogShow: false,
})

export const mutations = {
    showCreateUserDialog(state, value) {
        state.createUserDialogShow = value;
    },
    showEditUserDialog(state, value) {
        state.editUserDialogShow = value;
    },
    showNewIncomeDialog(state, value) {
        state.newIncomeDialogShow = value;
    },
    showConfirmIncomeDialog(state, value) {
        state.confirmIncomeDialogShow = value;
    }
}