// AXIOS基础的封装
import axios from 'axios'

const httpInstance = axios.create({
    baseURL: 'http://localhost:3000', // 设置基础 URL
    timeout: 5000 // 设置请求超时时间为 5000 毫秒（5 秒）
})
  

  // 拦截器
 
  // Axios请求拦截器
  httpInstance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// axios响应式拦截
// 响应拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    return Promise.reject(e)
}) 


export default httpInstance;