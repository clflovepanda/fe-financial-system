let ProjectUtil = {
    buildProject(data) {
        let projectList = [];
        for (let i = 0; i < data.projectEntites.length; i++) {
            let project = {};
            project.projectId = data.projectEntites[i].projectId;
            project.projectEntites = data.projectEntites[i];
            project.contractEntities = [];
            project.projectTaskEntities = [];
            project.projectUserEntities = [];
            project.quotationEntities = [];
            project.receivableEntities = [];
            project.revenueEntities = [];
            project.settlementEntities = [];
            project.subscriptionLogEntites = [];
            projectList.push(project);
        }
        for (let i = 0; i < data.contractEntities.length; i++) {
            let contract = data.contractEntities[i];
            for (let j = 0; j < projectList.length; j++) {
                if (projectList[j].projectId == contract.projectId) {
                    projectList[j].contractEntities.push(contract);
                    break;
                }
            }
        }
        for (let i = 0; i < data.projectTaskEntities.length; i++) {
            let task = data.projectTaskEntities[i];
            for (let j = 0; j < projectList.length; j++) {
                if (projectList[j].projectId == task.projectId) {
                    projectList[j].projectTaskEntities.push(task);
                    break;
                }

            }
        }
        for (let i = 0; i < data.projectUserEntities.length; i++) {
            let projectUser = data.projectUserEntities[i];
            for (let j = 0; j < projectList.length; j++) {
                if (projectList[j].projectId == projectUser.projectId) {
                    projectList[j].projectUserEntities.push(projectUser);
                    break;
                }
            }
        }
        for (let i = 0; i < data.quotationEntities.length; i++) {
            let quotation = data.quotationEntities[i];
            for (let j = 0; j < projectList.length; j++) {
                if (projectList[j].projectId == quotation.projectId) {
                    projectList[j].quotationEntities.push(quotation);
                    break;
                }
            }
        }
        for (let i = 0; i < data.receivableEntities.length; i++) {
            let receivable = data.receivableEntities[i];
            for (let j = 0; j < projectList.length; j++) {
                if (projectList[j].projectId == receivable.projectId) {
                    projectList[j].receivableEntities.push(receivable);
                    break;
                }
            }
        }
        for (let i = 0; i < data.revenueEntities.length; i++) {
            let revenue = data.revenueEntities[i];
            for (let j = 0; j < projectList.length; j++) {
                if (projectList[j].projectId == revenue.projectId) {
                    projectList[j].revenueEntities.push(revenue);
                    break;
                }
            }
        }
        for (let i = 0; i < data.settlementEntities.length; i++) {
            let settlement = data.settlementEntities[i];
            for (let j = 0; j < projectList.length; j++) {
                if (projectList[j].projectId == settlement.projectId) {
                    projectList[j].settlementEntities.push(settlement);
                    break;
                }
            }
        }
        for (let i = 0; i < data.subscriptionLogEntites.length; i++) {
            let subscriptionLog = data.subscriptionLogEntites[i];
            for (let j = 0; j < projectList.length; j++) {
                if (projectList[j].projectId == subscriptionLog.projectId) {
                    projectList[j].subscriptionLogEntites.push(subscriptionLog);
                    break;
                }
            }
        }
        return projectList;
    }
}