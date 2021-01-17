import axios from 'axios';

let UserNetUtil = {
    getAllUser() {
        let result = axios.get("/api/user/list").then(
            (rep) => {
                if (rep && rep.data) {
                    return rep.data.data;
                }
            },
            () => {}
        );
        if (result == null) {
            result = [];
        }
        return result;
    },
    getAllProject() {
        let result = axios.get("/api/project/project_list").then(
            (rep) => {
                if (rep && rep.data) {
                    return rep.data.data;
                }
            },
            () => {}
        );
        if (result == null) {
            result = {}
        }
        return result;
    },
    getNowUserRole() {
        let result = axios.get("/api/role/getmenu").then(
            (rep) => {
                if (rep && rep.data) {
                    return rep.data.data;
                }
            },
            () => {}
        );
        if (result == null) {
            result = {}
        }
        return result;
    }
}


export default UserNetUtil;