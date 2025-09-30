import axioser from "@/axios"

const prefix = "scm"

export function saveFileAPI(content, path) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/saveFile`, {
            content: content,
            path: path
        })
}

export function loadFileAPI(path) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/loadFile`, {
        params: {
            path: path
        }
    })
}