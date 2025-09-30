import axioser from "@/axios"

const prefix = "sr"

export function startCreateKnowledgeGraphAPI(taskParams, taskType) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/startCreateKnowledgeGraph`, {
        taskParams: taskParams,
        taskType: taskType
    })
}

export function getAllTasksAPI() {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getAllTasks`, {
        params: {
        }
    })
}

export function getPaperSummariesAPI() {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getPaperSummaries`, {
        params: {
        }
    })
}

export function getPaperCommunitiesAPI() {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getPaperCommunities`, {
        params: {
        }
    })
}

export function searchPapersOnThemesAPI(searchWords, paperNum) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/searchPapersOnThemes`, {
        searchWords: searchWords,
        paperNum: paperNum
    })
}

export function searchPapersOnThemesZhAPI(searchWords) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/searchPapersOnThemesZh`, {
        searchWords: searchWords,
    })
}

export function downloadPaperPdfAPI(taskId) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/downloadPaperPdf`, {
        taskId: taskId
    })
}

export function summarizePaperPdfAPI(taskId) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/summarizePaperPdf`, {
        taskId: taskId
    })
}

export function drawModelStructureAPI(taskId) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/drawModelStructure`, {
        taskId: taskId
    })
}

export function generateReportAPI(taskId) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/generateReport`, {
        taskId: taskId
    })
}

export function summarizePaperThemesAPI(taskId) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/summarizePaperThemes`, {
        taskId: taskId
    })
}

export function characterizeThemesAPI(taskId) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/characterizeThemes`, {
        taskId: taskId
    })
}

export function clusterPapersAPI(taskId) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/clusterPapers`, {
        taskId: taskId
    })
}

export function reconstructGraphAPI(taskId) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/reconstructGraph`, {
        taskId: taskId
    })
}

export function getKnowledgeNetworkAPI(taskId, contentPerspective) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getKnowledgeNetwork`, {
        params: {
            taskId: taskId,
            contentPerspective: contentPerspective
        }
    })
}

export function getKnowledgeGraphSummaryAPI(taskId, contentPerspective) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getKnowledgeGraphSummary`, {
        params: {
            taskId: taskId,
            contentPerspective: contentPerspective
        }
    })
}

export function getTimeEvolveTrendAPI(taskId, contentPerspective) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getTimeEvolveTrend`, {
        params: {
            taskId: taskId,
            contentPerspective: contentPerspective
        }
    })
}

export function summaryKnowledgeGraphAPI(taskId, contentPerspective) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/summaryKnowledgeGraph`, {
        params: {
            taskId: taskId,
            contentPerspective: contentPerspective
        }
    })
}

export function getKnowledgeGraphNodeDetailInfoAPI(nodeId) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getKnowledgeGraphNodeDetailInfo`, {
        params: {
            nodeId: nodeId
        }
    })
}

export function getContentPerspectiveDropdownAPI() {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getContentPerspectiveDropdown`, {
        params: {
        }
    })
}

export function getMySpaceTasksAPI() {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getMySpaceTasks`, {
        params: {
        }
    })
}

export function taskDeleteTaskAPI(taskId) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/taskDeleteTask`, {
        taskId: taskId
    })
}

export function taskRetryTaskAPI(taskId) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/taskRetryTask`, {
        taskId: taskId
    })
}

export function getTaskProgressAPI() {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getTaskProgress`, {
        params: {
        }
    })
}