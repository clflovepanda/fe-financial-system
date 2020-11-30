export const state = () => ({
    createUserDialogShow: false,
    editUserDialogShow: false,
    newIncomeDialogShow: false,
    confirmIncomeDialogShow: false,
    editIncomeDialogShow: false,
    confirmAccountingDialogShow: false,
    deleteIncomeDialogShow: false,
    confirmedIncomeDialogShow: false,
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
    },
    showEditIncomeDialog(state, value) {
        state.editIncomeDialogShow = value;
    },
    showConfirmAccountingDialog(state, value) {
        state.confirmAccountingDialogShow = value;
    },
    showDeleteIncomeDialog(state, value) {
        state.deleteIncomeDialogShow = value;
    },
    showConfirmedIncomeDialog(state, value) {
        state.confirmedIncomeDialogShow = value;
    }
}