/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 贺朋展
 * @Date: 2020-12-25 13:44:27
 * @LastEditors: 贺朋展
 * @LastEditTime: 2020-12-27 13:47:25
 */

export const state = () => ({
    createUserDialogShow: false,
    editUserDialogShow: false,
    newIncomeDialogShow: false,
    confirmIncomeDialogShow: false,
    editIncomeDialogShow: false,
    confirmAccountingDialogShow: false,
    deleteIncomeDialogShow: false,
    confirmedIncomeDialogShow: false,
    incomeDetailValue: [],
    receivementListValue:[],
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
    showDeleteIncomeDialog (state, value) {
      state.deleteIncomeDialogShow = value;
    },
    showConfirmedIncomeDialog (state, value) {
      state.confirmedIncomeDialogShow = value;
    },
    incomeDetailSubscription (state, value) {
      state.incomeDetailValue = value;
    },
    receivementList (state, value) {
      state.receivementListValue = value;
    }
}