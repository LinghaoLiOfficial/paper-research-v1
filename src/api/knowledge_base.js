import axioser from "@/axios"

const prefix = "kb"

export function docCreateFileAPI(fileType, fileName) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/docCreateFile`, {
            fileType: fileType,
            fileName: fileName
        })
}

export function getUploadFolderOptionsAPI() {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getUploadFolderOptions`, {
        params: {
        }
    })
}

export function docGetMySpaceFilesAPI(belongFolder) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/docGetMySpaceFiles`, {
        params: {
            belongFolder: belongFolder
        }
    })
}

export function getKnowledgeGraphAPI(fileId) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getKnowledgeGraph`, {
        params: {
            fileId: fileId
        }
    })
}

export function updateKnowledgeGraphAPI(graphData) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/updateKnowledgeGraph`, {
            graphData: graphData
        })
}

export function uploadKnowledgeGraphImageAPI(formData) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/uploadKnowledgeGraphImage`, 
        formData, 
    {
        headers: {
            ...axioser.defaults.headers.common,
            'Content-Type': 'multipart/form-data',
        }
    })
}

export function docLoadPDFFileAPI(fileId) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/docLoadPDFFile`, {
        params: {
            fileId: fileId
        }
    })
}

export function getFileAPI(fileUrl) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}${fileUrl}`, {
        params: {
        },
        // PDF文件需要增加 arraybuffer 返回类型
        responseType: 'arraybuffer'
    })
}

export function docTranslateTextAPI(strToTranslate, translateSource) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/docTranslateText`, {
        params: {
            strToTranslate: strToTranslate,
            translateSource: translateSource
        }
    })
}

export function editSaveMarkdownFileAPI(content, fileId) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/editSaveMarkdownFile`, {
            content: content,
            fileId: fileId
        })
}

export function editLoadMarkdownFileAPI(fileId) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/editLoadMarkdownFile`, {
        params: {
            fileId: fileId
        }
    })
}

export function uploadMarkdownImageAPI(formData) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/uploadMarkdownImage`, 
        formData, 
    {
        headers: {
            ...axioser.defaults.headers.common,
            'Content-Type': 'multipart/form-data',
        }
    })
}

export function uploadPDFFileAPI(formData) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/uploadPDFFile`, 
        formData, 
    {
        headers: {
            ...axioser.defaults.headers.common,
            'Content-Type': 'multipart/form-data',
        }
    })
}

export function docDeleteFileAPI(fileType, fileId) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/docDeleteFile`, {
            fileType: fileType,
            fileId: fileId,
        })
}

export function getTotalFileSizeAPI() {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getTotalFileSize`, {
        params: {
        }
    })
}

export function docUpdatePDFFileAPI(formData) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/docUpdatePDFFile`, 
        formData, 
    {
        headers: {
            ...axioser.defaults.headers.common,
            'Content-Type': 'multipart/form-data',
        }
    })
}