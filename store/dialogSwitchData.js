export const state = () => ({
    createUserDialogShow: false,
    editUserDialogShow: false,
})

export const mutations = {
    showCreateUserDialog(state, value) {
        state.createUserDialogShow = value;
    },
    showEditUserDialog(state, value) {
        state.editUserDialogShow = value;
    }
}