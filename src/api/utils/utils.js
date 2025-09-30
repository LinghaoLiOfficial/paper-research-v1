import axioser from "@/axios"

export function uploadFileAPI(file, file_name, file_size, file_type) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/psb/uploadFile`, {
        file: file,
        file_name: file_name,
        file_size: file_size,
        file_type: file_type
    }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
