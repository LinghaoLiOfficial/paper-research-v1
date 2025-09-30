import axioser from "@/axios"


export function getUserInfoAPI() {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/login/getUserInfo`, {
    })
}


export function cancelAllTasksAPI() {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/login/cancelAllTasks`, {
        })
}


export function cancelCurrentTaskAPI() {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/login/cancelCurrentTask`, {
        })
}


export function addNewActivationCodeAPI() {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/login/addNewActivationCode`, {
        })
}


export function getAllKnowledgeGraphTaskAPI() {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/login/getAllKnowledgeGraphTask`, {
    })
}


export function getAllActivationCodeAPI() {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/login/getAllActivationCode`, {
    })
}


export function checkAdminTokenAPI() {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/login/checkAdminToken`, {
        params: {
        }
    })
}


export function checkTokenAPI() {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/login/checkToken`, {
        params: {
        }
    })
}


export function getSaltAPI(username) {
    return axioser.get(`${process.env.VUE_APP_FLASK_API}/login/getSalt`, {
        params: {
            username: username
        }
    })
}


export function loginAPI(username, password) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/login/login`, {
            username: username,
            password: password
        })
}


export function sendEmailAPI(email) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/login/sendEmail`, {
            email: email
        })
}


export function registerAPI(username, password, email, code, salt, activationCode) {
    return axioser.post(`${process.env.VUE_APP_FLASK_API}/login/register`, {
        username: username,
        password: password,
        email: email,
        code: code,
        salt: salt,
        activationCode: activationCode
    })
}
