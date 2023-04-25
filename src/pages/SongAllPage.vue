<template>
    <div class="table">
        <el-dialog title="修改歌曲" :visible.sync="editVisible" width="500px" center @close="handleAddSongClose">
            <el-form :model="editSongForm" ref="editSongForm" label-width="90px" :rules="songFormRules">
                <el-form-item prop="name" label="歌手-歌名" size="mini">
                    <el-input v-model="editSongForm.name" placeholder="请输入歌名"></el-input>
                </el-form-item>
                <el-form-item prop="introduction" label="专辑" size="mini">
                    <el-input v-model="editSongForm.introduction" placeholder="请输入简介"></el-input>
                </el-form-item>
                <el-form-item prop="lyric" label="歌词" size="mini">
                    <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 20 }" v-model="editSongForm.lyric" placeholder="请输入歌词"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button size="mini" @click="editVisible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="editSinger()">确定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="歌单列表" :visible.sync="songListVisible" width="700px" center>
            <el-form :inline="true" class="demo-form-inline" center>
                <el-form-item label="歌单名称" size="mini">
                    <el-input placeholder="歌单名称" v-model="selectSongList"></el-input>
                </el-form-item>
            </el-form>
            <el-table border :data="songListData" style="width: 100%">
                <el-table-column prop="title" label="标题" align="center"></el-table-column>
                <el-table-column prop="style" label="风格" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="100">
                    <template slot-scope="scope">
                        <el-button type="info" size="mini" @click="collectToSongList(scope.row)">收藏</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="songListTableData.length"
                    :current-page="songListCurrentPage"
                    :page-size="songListPageSize"
                    @current-change="handleSongListCurrentChange"
                >
                </el-pagination>
            </div>
            <span slot="footer">
                <el-button size="mini" @click="songListVisible = false">关闭</el-button>
            </span>
        </el-dialog>

        <el-card>
            <div class="crumbs">
                <i class="el-icon-tickets">&nbsp;歌曲管理</i>
            </div>
            <div class="container">
                <div class="handle-box">
                    <el-input size="mini" v-model="select_word" placeholder="请输入歌曲名" class="handle-input"></el-input>
                    <el-popconfirm :title="'是否删除选中的' + multipleSelection.length + '条数据'" @confirm="deleteAllSinger">
                        <el-button type="danger" size="mini" slot="reference">批量删除</el-button>
                    </el-popconfirm>
                </div>
            </div>
            <el-table size="mini" border style="width: 100%" height="700px" :data="data" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="40"> </el-table-column>
                <el-table-column label="歌曲图片" width="110" align="center">
                    <template slot-scope="scope">
                        <div class="song-img">
                            <img :src="getUrl(scope.row.pic)" style="width: 100%" />
                        </div>
                        <div class="play" @click="setSongUrl(scope.row.url, scope.row.id)">
                            <div v-if="toggle == scope.row.id">
                                <svg class="icon">
                                    <use xlink:href="#icon-zanting"></use>
                                </svg>
                            </div>
                            <div v-if="toggle != scope.row.id">
                                <svg class="icon">
                                    <use xlink:href="#icon-bofanganniu"></use>
                                </svg>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="歌手-歌名" width="250" align="center"> </el-table-column>
                <el-table-column prop="introduction" label="专辑" width="150" align="center"> </el-table-column>
                <el-table-column label="歌词" align="center">
                    <template slot-scope="scope">
                        <ul style="height: 100px; overflow-y: auto">
                            <li v-for="(item, index) in parseLyric(scope.row.lyric)" :key="index">
                                {{ item }}
                            </li>
                        </ul>
                    </template>
                </el-table-column>
                <el-table-column label="资源更新" width="250" align="center">
                    <template slot-scope="scope">
                        <div class="songFileUpd">
                            <el-upload :show-file-list="false" :action="uploadUrl(scope.row.id)" :before-upload="beforeAvatorUpload" :on-success="handleAvatorSuccess">
                                <el-button size="mini">更新图标</el-button>
                            </el-upload>
                            <el-upload :show-file-list="false" :action="uploadSongUrl(scope.row.id)" :before-upload="beforeSongUpload" :on-success="handleSongSuccess">
                                <el-button size="mini">更新歌曲</el-button>
                            </el-upload>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <el-button type="info" size="mini" @click="handleCollect(scope.row.id)">收藏到歌单</el-button>
                        <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-popconfirm title="这是一段内容确定删除吗？" @confirm="handleDeletr(scope.row.id)">
                            <el-button slot="reference" type="danger" size="mini">删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="tableData.length"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    @current-change="handleCurrentChange"
                >
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
import { mixins } from "@/mixins/index.js"
import { mapGetters } from "vuex"
import "@/assets/js/iconfont.js"
import { getSongAll, getAllSongList, updateSong, addSongToList, deleteSong } from "@/api/api.js"
export default {
    name: "Song",
    mixins: [mixins],
    data() {
        return {
            // 编辑弹窗
            editVisible: false,
            // 收藏到歌单弹窗
            songListVisible: false,
            // 编辑的对象
            editSongForm: {
                id: "",
                name: "",
                introduction: "",
                lyric: "",
            },
            // 表单验证规则
            songFormRules: {
                name: {
                    required: true,
                    message: "请输入歌曲名称",
                    trigger: "blur",
                },
                introduction: {
                    required: true,
                    message: "请输入歌曲专辑",
                    trigger: "blur",
                },
            },
            // 表格内容数据
            tableData: [],
            // 表格内容数据的副本，用来做搜索
            tempData: [],
            select_word: "",
            // 分页每页的数量
            pageSize: 5,
            // 当前第几页
            currentPage: 1,
            // 多选删除，选择的id
            multipleSelection: [],
            file: "",
            toggle: false, // 播放器的图标状态
            songListTableData: [], // 歌单表格数据
            songListTempData: [], // 歌单内数据的副本用来做搜索
            selectSongList: "", // 搜索歌单
            songListPageSize: 5, // 歌单分页数量
            songListCurrentPage: 1, // 歌单第几页
            songId: 0, // 要收藏的歌曲id
        }
    },
    watch: {
        // 搜索框里面的内容发生变化的时候，搜索结果table列表的内容发生改变
        select_word() {
            this.currentPage = 1
            if (this.select_word.trim() == "" || this.select_word.length == 0) {
                this.tableData = this.tempData
            } else {
                this.tableData = []
                for (let item of this.tempData) {
                    // includes 查找字符串中是否包含否一个字符串
                    if (item.name.includes(this.select_word)) {
                        this.tableData.push(item)
                    }
                }
            }
        },
        selectSongList() {
            this.songListCurrentPage = 1
            if (this.selectSongList.trim() == "" || this.selectSongList.length == 0) {
                this.songListTableData = this.songListTempData
            } else {
                this.songListTableData = []
                for (let item of this.songListTempData) {
                    // includes 查找字符串中是否包含否一个字符串
                    if (item.title.includes(this.selectSongList)) {
                        this.songListTableData.push(item)
                    }
                }
            }
        },
    },
    computed: {
        data() {
            return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        },
        songListData() {
            return this.songListTableData.slice((this.songListCurrentPage - 1) * this.songListPageSize, this.songListCurrentPage * this.songListPageSize)
        },
        ...mapGetters(["id", "url", "isPlay"]),
    },
    created() {
        this.getData()
    },
    destroyed() {
        this.$store.commit("setIsPlay", false)
    },
    methods: {
        /**查询歌手所以的歌曲 */
        async getData(value = 1) {
            let ret = await getSongAll()
            this.tableData = ret.msg
            this.tempData = ret.msg
            this.handleCurrentChange(value)
        },

        /**编辑歌曲信息 */
        handleEdit(row) {
            this.editVisible = true
            this.editSongForm = { ...row }
        },

        /**弹窗编辑页面，保存修改的数据 */
        editSinger() {
            this.$refs["editSongForm"].validate(async (valid) => {
                if (valid) {
                    let ret = await updateSong(this.editSongForm)
                    if (ret.code == 200) {
                        this.notify(ret.msg)
                        this.editVisible = false
                        this.getData(this.currentPage)
                    } else {
                        this.notify(ret.msg, "error")
                    }
                } else {
                    console.log("error submit!!")
                }
            })
        },

        /**删除歌手歌曲 */
        async handleDeletr(id) {
            let ret = await deleteSong({ id })
            if (ret.code == 200) {
                this.notify(ret.msg)
                if (this.currentPage * this.pageSize >= this.tableData.length) {
                    this.getData(Math.floor((this.tableData.length - 1) / this.pageSize) + ((this.tableData.length - 1) % this.pageSize == 0 ? 0 : 1))
                } else {
                    this.getData(this.currentPage)
                }
            } else {
                this.notify(ret.msg, "error")
            }
        },

        /**收藏到歌单 弹窗 */
        async handleCollect(id) {
            this.songId = id
            this.songListVisible = true
            let ret = await getAllSongList()
            this.songListTableData = ret.msg
            this.songListTempData = ret.msg
        },

        /**收藏到歌单 关闭弹窗 */
        handleAddSongClose() {
            this.songId = 0
        },

        /**收藏 */
        async collectToSongList(data) {
            let formData = {
                songId: this.songId,
                songListId: data.id,
            }
            let ret = await addSongToList(formData)
            this.songId = 0
            if (ret.code == 200) {
                this.notify(ret.msg)
                this.songListVisible = false
            } else {
                this.notify(ret.msg, "error")
            }
        },

        /**更新歌曲图标 */
        uploadUrl(id) {
            return `${this.$store.state.HOST}/song/updateSongPic?id=${id}`
        },

        /**更新歌曲文件 */
        uploadSongUrl(id) {
            return `${this.$store.state.HOST}/song/updateSongFile?id=${id}`
        },

        /**分页切换 */
        handleCurrentChange(value) {
            this.currentPage = value
        },

        handleSongListCurrentChange(value) {
            this.songListCurrentPage = value
        },

        /**批量删除歌取 */
        async deleteAllSinger() {
            if (this.multipleSelection.length == 0) {
                this.notify("未选中任何内容")
                return
            }
            let bol = []
            for (let index = 0; index < this.multipleSelection.length; index++) {
                let ret = await deleteSong({ id: this.multipleSelection[index] })
                if (ret.code == 200) {
                    bol.push(true)
                } else {
                    bol.push(false)
                }
            }
            if (bol.length != 0 && bol.every((x) => x)) {
                this.notify("批量删除完成")
                if (this.currentPage * this.pageSize >= this.tableData.length) {
                    this.getData(
                        Math.floor((this.tableData.length - this.multipleSelection.length) / this.pageSize) +
                            ((this.tableData.length - this.multipleSelection.length) % this.pageSize == 0 ? 0 : 1)
                    )
                } else {
                    this.getData(this.currentPage)
                }
            } else {
                this.notify("删除异常")
                console.log(bol)
            }
        },

        /**歌词转换格式 */
        parseLyric(text) {
            let lines = text.split("\n")
            let pattern = /\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g
            let result = []
            for (let item of lines) {
                let value = item.replace(pattern, "")
                result.push(value)
            }
            return result
        },

        /**更新歌曲文件前的操作 */
        beforeSongUpload(file) {
            let testMsg = file.name.substring(file.name.lastIndexOf(".") + 1)

            if (testMsg != "mp3") {
                this.$message.error("上传的文件只能是mp3格式")
                return false
            }
            return true
        },

        /**更新歌曲后的操作 */
        handleSongSuccess(ret) {
            if (ret.code == 200) {
                this.getData()
                this.notify(ret.msg)
            } else {
                this.notify(ret.msg, "error")
            }
        },

        /**切换播放音乐 */
        setSongUrl(url, id) {
            if (this.toggle == id && this.isPlay) {
                this.toggle = ""
                this.$store.commit("setIsPlay", false)
            } else {
                this.toggle = id
                this.$store.commit("setUrl", this.$store.state.HOST + url)
                this.$store.commit("setIsPlay", true)
            }
        },
    },
}
</script>

<style scoped>
.song-img {
    width: 100%;
    height: 80px;
    border-radius: 5px;
    overflow: hidden;
}
.handle-input {
    width: 300px;
    display: inline-block;
    margin-right: 10px;
}
.pagination {
    display: flex;
    justify-content: center;
}
.cell {
    height: 110px;
}
.songFileUpd {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
}
.play {
    position: absolute;
    top: 18px;
    left: 15px;
    z-index: 100;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.icon {
    width: 4em;
    height: 4em;
    fill: currentColor;
    overflow: hidden;
}
</style>