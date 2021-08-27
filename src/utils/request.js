import axios from 'axios'
import Qs from 'qs'

// console.log('当前开发环境：', process.env.NODE_ENV)

// 设置请求超时时间,ms
axios.defaults.timeout = 30000

let pending = [] // 声明一个数组用于存储每个请求的取消函数和axios标识
const cancelToken = axios.CancelToken
const removePending = (config) => {
    for (let i in pending) {
        if (pending[i].url === config.url + JSON.stringify(config.params) + '&' + JSON.stringify(config.data) + '&' + config.method) {
            // 当当前请求在数组中存在时执行函数体
            pending[i].f() // 执行取消操作
            pending.splice(i, 1)
        }
    }
}

// 请求拦截
axios.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么 验证token之类的

        // 在axios发送请求前执行一下取消操作
        removePending(config)

        config.cancelToken = new cancelToken((c) => {
            // 这里用请求地址&请求方式拼接的字符串标识请求
            pending.push({ url: config.url + JSON.stringify(config.params) + '&' + JSON.stringify(config.data) + '&' + config.method, f: c })
        })

        return config
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.error(error)
    },
)

// 响应拦截
axios.interceptors.response.use(
    (response) => {
        // 对响应数据做点什么

        // 在一个axios请求响应后再执行一下取消操作，把已经完成的请求从pending中移除
        removePending(response.config)

        return response
    },
    (error) => {
        // 对响应错误做点什么

        //请求取消时，也会进入error，根据axios.isCancel()：true--请求取消  false--请求失败
        //仅在请求失败时做后续处理
        if (axios.isCancel(error)) {
            console.log('主动取消请求')
        } else {
            // console.log('响应时的err', error)
            if (error) {
                if (error.message.indexOf('timeout') !== -1) {
                    console.log('网络请求超时', 'timeout')
                }
            }

            return Promise.reject()
        }

        return Promise.reject(error)
    },
)

export const get = (url, params) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params,
            })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                if (err) {
                    console.log(err)
                }
                reject(err)
            })
    })
}

export const getBlob = (url) => {
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            method: 'GET',
            responseType: 'blob', // important
        })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                if (err) {
                    console.log(err)
                }
                reject(err)
            })
    })
}

export const post = (url, params) => {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                if (err) {
                    console.log(err)
                }
                reject(err)
            })
    })
}

export const qspost = (url, params) => {
    return new Promise((resolve, reject) => {
        axios
            .post(url, Qs.stringify(params))
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                if (err) {
                    console.log(err)
                }
                reject(err)
            })
    })
}

export const put = (url, params) => {
    return new Promise((resolve, reject) => {
        axios
            .put(url, params)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                if (err) {
                    console.log(err)
                }
                reject(err)
            })
    })
}

export const deletefn = (url, params) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(url, params)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                if (err) {
                    console.log(err)
                }
                reject(err)
            })
    })
}
