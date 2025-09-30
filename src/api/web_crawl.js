import axioser from "@/axios"

const prefix = "wc"

export function getCrawlTaskOptionsAPI() {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getCrawlTaskOptions`, {
        params: {
        }
    })
}

export function getCrawlTaskParamsAPI(crawlTask) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getCrawlTaskParams`, {
        params: {
            crawlTask: crawlTask
        }
    })
}

export function getCrawlTaskStepperDataAPI(crawlTask) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getCrawlTaskStepperData`, {
        params: {
            crawlTask: crawlTask
        }
    })
}

export function getDefaultWebCrawlConfigAPI() {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getDefaultWebCrawlConfig`, {
        params: {
        }
    })
}


export function getCrawlSearchPaperInfoWebsiteOptionsAPI(crawlTask) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getCrawlSearchPaperInfoWebsiteOptions`, {
        params: {
            crawlTask: crawlTask
        }
    })
}


export function getCrawlSearchPaperAbstractWebsiteOptionsAPI(crawlTask) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getCrawlSearchPaperAbstractWebsiteOptions`, {
        params: {
            crawlTask: crawlTask
        }
    })
}


export function getCrawlSearchPaperPDFWebsiteOptionsAPI(crawlTask) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getCrawlSearchPaperPDFWebsiteOptions`, {
        params: {
            crawlTask: crawlTask
        }
    })
}


export function getCrawlGetPaperAISummaryOptionsAPI(crawlTask) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getCrawlGetPaperAISummaryOptions`, {
        params: {
            crawlTask: crawlTask
        }
    })
}


export function getCrawlMyTaskOptionsAPI(crawlTask) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getCrawlMyTaskOptions`, {
        params: {
            crawlTask: crawlTask
        }
    })
}


export function startWebCrawlRunningAPI(webCrawlConfig, progressId) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/startWebCrawlRunning`, {
            webCrawlConfig: webCrawlConfig,
            progressId: progressId
        })
}
