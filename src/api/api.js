import { getAction, deleteAction, putAction, postAction, downFileAction, fileUploadAction } from '@/api/http'


// 判断管理是否能登录成功
const getLoginStatus = (data) => {
  return postAction(`admin/login/status`, data);
}
// 添加歌手
const addSinger = (data) => {
  return postAction(`singer/add`, data)
}

// 删除歌手
const deleteSinger = (params) => {
  return getAction(`singer/delete`, params)
}

// 查询所有歌手
const getAllSinger = ()=>{
  return getAction(`singer/selectAll`)
}

export {
  getLoginStatus,
  deleteSinger,
  addSinger,
  getAllSinger
}