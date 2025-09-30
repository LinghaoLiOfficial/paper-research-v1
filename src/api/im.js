import axioser from "@/axios"

const prefix = "test"


export function IMUploadImagesAPI(formData) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/uploadImages`, 
        formData, 
    {
        headers: {
            ...axioser.defaults.headers.common,
            'Content-Type': 'multipart/form-data',
        }
    })
}


export function getAllImagesAPI() {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/${prefix}/getAllImages`, {
        params: {
        }
    })
}


export function deleteImagesAPI(fileIdList) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/${prefix}/deleteImages`, {
            fileIdList: fileIdList
        })
}