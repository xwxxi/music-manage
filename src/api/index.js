import { get, post } from './http.js'

// 判断管理是否能登录成功
export const getLoginStatus = async (params)=>{
    return await post(`admin/login/status`,params);
}