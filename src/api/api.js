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
const getAllSinger = () => {
  return getAction(`singer/selectAll`)
}

// 歌手分页
const pagehelper = (params) => {
  return getAction(`singer/pagehelper/${params.page}/${params.size}`)
}

// 根据歌手名称进行模糊查询
const getSingerOfName = (params) => {
  return getAction(`singer/getSingerOfName`, params)
}

// 修改歌手
const updateSinger = (data) => {
  return postAction(`singer/update`, data)
}

// 添加歌曲
const addSong = (data) => {
  return fileUploadAction(`song/add`, data)
}

// 根据歌手id获取歌曲
const songOfSingerId = (params)=>{
  return getAction(`song/singer/detail`,params)
}

// 删除歌曲
const deleteSong = (params) => {
  return getAction(`song/delete`, params)
}

// 修改歌曲
const updateSong = (data) => {
  return postAction(`song/update`, data)
}

export {
  getLoginStatus,
  deleteSinger,
  addSinger,
  getAllSinger,
  pagehelper,
  getSingerOfName,
  updateSinger,
  addSong,
  songOfSingerId,
  deleteSong,
  updateSong
}