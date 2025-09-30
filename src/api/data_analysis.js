import axioser from "@/axios"

const prefix = "da"

export function getAllVisualizeImagesAPI(taskId, runId) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getAllVisualizeImages`, {
        params: {
            taskId: taskId,
            runId: runId
        }
    })
}

export function getTaskNamesAPI(taskType) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getTaskNames`, {
        params: {
            taskType: taskType
        }
    })
}

export function getHistoryParamsAPI(taskType, taskId, studyId, runId) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getHistoryParams`, {
        params: {
            taskType: taskType,
            taskId: taskId,
            studyId: studyId,
            runId: runId
        }
    })
}

export function getAllTrainingHistoryAPI(taskType, taskId, studyId, runId) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getAllTrainingHistory`, {
        params: {
            taskType: taskType,
            taskId: taskId,
            studyId: studyId,
            runId: runId
        }
    })
}

export function getDefaultDataAnalysisConfigAPI() {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getDefaultDataAnalysisConfig`, {
        params: {
        }
    })
}

export function getAnalysisDataSetOptionsAPI(taskType, dataType) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getAnalysisDataSetOptions`, {
        params: {
            taskType: taskType,
            dataType: dataType
        }
    })
}

export function getAnalysisDataTableOptionsAPI(taskType, dataType, dataSet) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getAnalysisDataTableOptions`, {
        params: {
            taskType: taskType,
            dataType: dataType,
            dataSet: dataSet
        }
    })
}

export function getAnalysisTimeScaleOptionsAPI() {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getAnalysisTimeScaleOptions`, {
        params: {
        }
    })
}

export function getAnalysisNullValueOptionsAPI() {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getAnalysisNullValueOptions`, {
        params: {
        }
    })
}

export function getAnalysisTargetValueOptionsAPI(taskType) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getAnalysisTargetValueOptions`, {
        params: {
            taskType: taskType
        }
    })
}

export function getAnalysisNormalizeValueOptionsAPI() {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getAnalysisNormalizeValueOptions`, {
        params: {
        }
    })
}

export function getAnalysisSampleValueOptionsAPI() {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getAnalysisSampleValueOptions`, {
        params: {
        }
    })
}

export function getAnalysisModelTypeOptionsAPI() {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getAnalysisModelTypeOptions`, {
        params: {
        }
    })
}

export function getAnalysisModelOptionsAPI(modelType) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getAnalysisModelOptions`, {
        params: {
            modelType: modelType
        }
    })
}

export function getAnalysisParamsAPI() {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getAnalysisParams`, {
        params: {
        }
    })
}

export function getAnalysisModelInfoAPI(model) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getAnalysisModelInfo`, {
        params: {
            model: model
        }
    })
}

export function startDataAnalysisTrainingAPI(dataAnalysisConfig, taskName) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/startDataAnalysisTraining`, {
            dataAnalysisConfig: dataAnalysisConfig,
            taskName: taskName
        })
}

export function getDataFrameAPI(taskType, dataType, dataSet, dataTable) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getDataFrame`, {
        params: {
            taskType: taskType,
            dataType: dataType,
            dataSet: dataSet,
            dataTable: dataTable
        }
    })
}

export function getTrainingHistoryAPI(taskType, taskLevel) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getTrainingHistory`, {
        params: {
            taskType: taskType,
            taskLevel: taskLevel
        }
    })
}

export function getDefaultTargetColumnAPI(dataType, dataSet) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getDefaultTargetColumn`, {
        params: {
            dataType: dataType,
            dataSet: dataSet
        }
    })
}

export function getAnalysisHyperParamsOptionsAPI() {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getAnalysisHyperParamsOptions`, {
        params: {
        }
    })
}

export function activateClearFilesAPI(taskType) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/activateClearFiles`, {
            taskType: taskType
        })
}

export function getAnalysisPatternOptionsAPI() {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getAnalysisPatternOptions`, {
        params: {
        }
    })
}

export function deleteHistoryAPI(taskType, taskId, runId) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/deleteHistory`, {
            taskType: taskType,
            taskId: taskId,
            runId: runId
        })
}