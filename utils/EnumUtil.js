let EnumAccount = {
    list: [
        { value: 1, label: "亚讯" },
        { value: 2, label: "医通捷" },
        { value: 3, label: "新锐" },
        { value: 4, label: "医点通" },
        { value: 5, label: "现金到款" },
    ],
    getMsg(value) {
        for (let i = 0; i < this.list.length; i++) {
            if (value == this.list[i].value) {
                return this.list[i].label;
            }
        }
        return "";
    }
}

let EnumProjectType = {
    list: [
        { value: 1, label: "未开始" },
        { value: 2, label: "进行中" },
        { value: 3, label: "暂停" },
        { value: 4, label: "取消" },
        { value: 5, label: "已完成" },
        { value: 6, label: "已关闭" },
    ],
    getMsg(value) {
        for (let i = 0; i < this.list.length; i++) {
            if (value == this.list[i].value) {
                return this.list[i].label;
            }
        }
        return "";
    }
}

let EnumIncomeType = {
    list: [
        { value: 1, label: "汇款" },
        { value: 2, label: "支票" },
        { value: 3, label: "现金" },
        { value: 4, label: "押金转收入" },
    ],
    getMsg(value) {
        for (let i = 0; i < this.list.length; i++) {
            if (value == this.list[i].value) {
                return this.list[i].label;
            }
        }
        return "";
    }
}

let EnumIncomeFromType = {
    list: [
        { value: 1, label: "企业" },
        { value: 2, label: "个人" },
        { value: 3, label: "未知" },
    ],
    getMsg(value) {
        for (let i = 0; i < this.list.length; i++) {
            if (value == this.list[i].value) {
                return this.list[i].label;
            }
        }
        return "";
    }
}

let EnumOutputType = {
    list: [
        { value: 1, label: "普通支出" },
        { value: 2, label: "退押金" },
        { value: 3, label: "押金及费用" },
    ],
    getMsg(value) {
        for (let i = 0; i < this.list.length; i++) {
            if (value == this.list[i].value) {
                return this.list[i].label;
            }
        }
        return "";
    }
}

let EnumPayType = { //支付方式
    list: [
        { value: 1, label: "现金" },
        { value: 2, label: "电汇" },
        { value: 3, label: "差旅" },
    ],
    getMsg(value) {
        for (let i = 0; i < this.list.length; i++) {
            if (value == this.list[i].value) {
                return this.list[i].label;
            }
        }
        return "";
    }
}

let EnumAuditType = {
    list: [
        { value: 1, label: "支出申请" },
        { value: 2, label: "已支付" },
        { value: 3, label: "票据作废" },
        { value: 4, label: "平借款" },
        { value: 5, label: "驳回" },
    ],
    getMsg(value) {
        for (let i = 0; i < this.list.length; i++) {
            if (value == this.list[i].value) {
                return this.list[i].label;
            }
        }
        return "";
    }
}

let EnumSaleSendType = { //销售提成发放状态
    list: [
        { value: 1, label: "未发放" },
        { value: 2, label: "部分发放" },
        { value: 3, label: "全部发放" }
    ],
    getMsg(value) {
        for (let i = 0; i < this.list.length; i++) {
            if (value == this.list[i].value) {
                return this.list[i].label;
            }
        }
        return "";
    }
}

let EnumSettlementState = { //结算单状态
    list: [
        { value: 1, label: "未结算" },
        { value: 2, label: "已结算" }
    ],
    getMsg(value) {
        for (let i = 0; i < this.list.length; i++) {
            if (value == this.list[i].value) {
                return this.list[i].label;
            }
        }
        return "";
    }
}

let EnumProjectAuditState = {
    list: [
        { value: 0, label: "待审核" },
        { value: 1, label: "审核通过" },
        { value: 2, label: "驳回" },
    ],
    getMsg(value) {
        for (let i = 0; i < this.list.length; i++) {
            if (value == this.list[i].value) {
                return this.list[i].label;
            }
        }
        return "";
    }
}

let EnumExpenditureState = {
    list: [
        { value: 0, label: "未提交" },
        { value: 1, label: "已提交" },
        { value: 2, label: "审核中" },
        { value: 3, label: "被驳回" },
        { value: 4, label: "已支付" },
        { value: 5, label: "作废" },
        { value: 6, label: "凭借款" },
    ],
    getMsg(value) {
        for (let i = 0; i < this.list.length; i++) {
            if (value == this.list[i].value) {
                return this.list[i].label;
            }
        }
        return "";
    }
}

let EnumRoleState = {
    list: [
        { value: 0, label: "停用" },
        { value: 1, label: "启用" },
    ],
    getMsg(value) {
        for (let i = 0; i < this.list.length; i++) {
            if (value == this.list[i].value) {
                return this.list[i].label;
            }
        }
        return "";
    }
}


export {
    EnumAccount,
    EnumIncomeType,
    EnumIncomeFromType,
    EnumOutputType,
    EnumPayType,
    EnumAuditType,
    EnumProjectType,
    EnumSaleSendType,
    EnumSettlementState,
    EnumProjectAuditState,
    EnumExpenditureState,
    EnumRoleState
}