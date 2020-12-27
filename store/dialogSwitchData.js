
export const state = () => ({
    createUserDialogShow: false,
    createRoleDialogShow: false,
    editUserDialogShow: false,
    editRoleDialogShow: false,
    newIncomeDialogShow: false,
    confirmIncomeDialogShow: false,
    editIncomeDialogShow: false,
    confirmAccountingDialogShow: false,
    deleteIncomeDialogShow: false,
    confirmedIncomeDialogShow: false,
    incomeDetailValue: [],
    receivementListValue: [],
})

export const mutations = {
    showCreateUserDialog(state, value) {
        state.createUserDialogShow = value;
    },
    showCreateRoleDialog(state, value) {
        state.createRoleDialogShow = value;
    },
    showEditUserDialog(state, value) {
        state.editUserDialogShow = value;
    },
    showEditRoleDialog(state, value) {
        state.editRoleDialogShow = value;
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
    },
    incomeDetailSubscription(state, value) {
        state.incomeDetailValue = value;
    },
    receivementList(state, value) {
        state.receivementListValue = value;
    }
}