import { getAction,deleteAction,putAction,postAction,downFileAction,fileUploadAction} from '@/api/http'


// 判断管理是否能登录成功
const getLoginStatus =(params)=>{
  return postAction(`admin/login/status`,params);
}

export {
  getLoginStatus
}