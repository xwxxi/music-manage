import { axios } from '@/api/request'
//get
export function getAction(url,params) {
  return axios({
    url: url,
    method: 'get',
    params: params
  })
}
//post
export function postAction(url,data) {
  return axios({
    url: url,
    method:'post' ,
    data: data
  })
}

//put
export function putAction(url,data) {
  return axios({
    url: url,
    method:'put',
    data: data
  })
}

//deleteAction
export function deleteAction(url,params) {
  return axios({
    url: url,
    method: 'delete',
    params: params
  })
}

/**
 * 下载文件
 * @param {*} url: 请求地址
 * @param {*} params: 请求参数
 */
export function downFileAction(url,params){
  return axios({
    url: url,
    params: params,
    method:'get' ,
    responseType: 'blob'
  })
}
/**
 * 用于上传文件
 * @param {*} url:请求地址
 * @param {*} data:请求体数据
 */
export function fileUploadAction(url,data){
  return axios({
    url: url,
    data: data,
    method:'post' ,
    headers:{
      'Content-Type':'multipart/form-data'
    },
    timeout:1000*60*4  //上传时间4分钟
  })
}