import axios from 'axios';

const axioser = axios.create({
    baseURL: `${process.env.VUE_APP_FLASK_API}`,
    // timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 请求拦截器
axioser.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `${token}`;
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器（修改后）
axioser.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config
        
        // 自定义重试配置
        const retryConfig = {
            retryCount: 0,          // 当前重试次数
            maxRetries: 5,          // 最大重试次数
            retryDelay: 2000        // 重试延迟(ms)
        }

        // 合并自定义配置
        originalRequest.retry = originalRequest.retry || retryConfig

        // 检查是否达到最大重试次数
        if (originalRequest.retry.retryCount >= originalRequest.retry.maxRetries) {
            return Promise.reject(error)
        }

        // 增加重试计数器
        originalRequest.retry.retryCount += 1

        // 创建重试Promise
        await new Promise(resolve => 
            setTimeout(resolve, originalRequest.retry.retryDelay)
        )

        // 重新发起请求
        return axioser(originalRequest)
    }
)

export default axioser