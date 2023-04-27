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
const getSongAll = (params)=>{
  return getAction(`song/selectAll`,params)
}

// 获取全部歌曲
const songOfSingerId = (params)=>{
  return getAction(`song/singer/detail`,params)
}

// 根据歌曲名称获取歌曲
const songOfName = (params)=>{
  return getAction(`song/songOfName`,params)
}

// 删除歌曲
const deleteSong = (params) => {
  return getAction(`song/delete`, params)
}

// 修改歌曲
const updateSong = (data) => {
  return postAction(`song/update`, data)
}

// 查询所有歌单
const getAllSongList = () => {
  return getAction(`songList/selectAll`)
}

// 添加歌单
const addSongList = (data) => {
  return postAction(`songList/add`, data)
}

// 删除歌单
const deleteSongList = (params) => {
  return getAction(`songList/delete`, params)
}

// 修改歌单
const updateSongList = (data) => {
  return postAction(`songList/update`, data)
}

// 根据歌单id获取对应的歌曲
const songOfSongListId = (params)=>{
  return getAction(`listSong/getSongBySongListId`,params)
}

// 从歌单中删除歌曲
const deleteSongListSong = (params) => {
  return getAction(`listSong/delete`, params)
}

// 往歌单添加歌曲
const addSongToList = (data) => {
  return postAction(`listSong/add`, data)
}

// 查询所有用户
const getAllConsumer = () => {
  return getAction(`consumer/selectAll`)
}

// 删除用户
const deleteConsumer = (params) => {
  return getAction(`consumer/delete`, params)
}

// 修改用户
const updateConsumer = (data) => {
  return postAction(`consumer/update`, data)
}

// 添加用户
const addConsumer = (data) => {
  return postAction(`consumer/add`, data)
}

// 获取数据的统计信息
const getDataCount = () => {
  return getAction(`admin/dataCount`)
}

// 获取数据的性别统计信息
const getConsumerSexCount = () => {
  return getAction(`admin/getConsumerSexCount`)
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
  updateSong,
  getAllSongList,
  addSongList,
  deleteSongList,
  updateSongList,
  songOfSongListId,
  songOfName,
  deleteSongListSong,
  getSongAll,
  addSongToList,
  getAllConsumer,
  deleteConsumer,
  updateConsumer,
  addConsumer,
  getDataCount,
  getConsumerSexCount
}