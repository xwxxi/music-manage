<template>
    <div class="table">
        <el-card>
            <div class="crumbs">
                <i class="el-icon-tickets">&nbsp;{{ songListTitle }}歌单-歌曲管理</i>
            </div>
            <div class="container">
                <div class="handle-box">
                    <el-input size="mini" v-model="select_word" placeholder="请输入歌曲名" class="handle-input"></el-input>
                    <el-button type="primary" size="mini" @click="toAddSong()">添加歌曲</el-button>
                </div>
            </div>
            <el-table size="mini" border style="width: 100%" height="700px" :data="data">
                <el-table-column label="歌曲图片" width="110" align="center">
                    <template slot-scope="scope">
                        <div class="song-img">
                            <img :src="getUrl(scope.row.song.pic)" style="width: 100%" />
                        </div>
                        <div class="play" @click="setSongUrl(scope.row.song.url, scope.row.song.id)">
                            <div v-if="toggle == scope.row.song.id">
                                <svg class="icon">
                                    <use xlink:href="#icon-zanting"></use>
                                </svg>
                            </div>
                            <div v-if="toggle != scope.row.song.id">
                                <svg class="icon">
                                    <use xlink:href="#icon-bofanganniu"></use>
                                </svg>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="song.name" label="歌手-歌名" width="250" align="center"> </el-table-column>
                <el-table-column prop="song.introduction" label="专辑" width="150" align="center"> </el-table-column>
                <el-table-column label="歌词" align="center">
                    <template slot-scope="scope">
                        <ul style="height: 100px; overflow-y: auto">
                            <li v-for="(item, index) in parseLyric(scope.row.song.lyric)" :key="index">
                                {{ item }}
                            </li>
                        </ul>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-popconfirm title="这是一段内容确定删除吗？" @confirm="handleDeletr(scope.row.id)">
                            <el-button slot="reference" type="danger" size="mini">移出歌单</el-button>
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
import { songOfSongListId, deleteSongListSong, updateSong, deleteSong } from "@/api/api.js"
export default {
    name: "Song",
    mixins: [mixins],
    data() {
        return {
            songListTitle: "",
            songListId: "",
            // 表格内容数据
            tableData: [],
            // 表格内容数据的副本，用来做搜索
            tempData: [],
            select_word: "",
            // 分页每页的数量
            pageSize: 5,
            // 当前第几页
            currentPage: 1,
            toggle: false, // 播放器的图标状态
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
    },
    computed: {
        data() {
            return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        },
        ...mapGetters(["id", "url", "isPlay"]),
    },
    created() {
        this.songListId = this.$route.query.id
        this.songListTitle = this.$route.query.title
        this.getData()
    },
    destroyed() {
        this.$store.commit("setIsPlay", false)
    },
    methods: {
        /**查询歌单所有的歌曲 */
        async getData(value = 1) {
            let data = await songOfSongListId({ songListId: this.songListId })
            this.tableData = data.msg
            this.tempData = data.msg
            this.handleCurrentChange(value)
        },

        /**删除歌手歌曲 */
        async handleDeletr(id) {
            let data = await deleteSongListSong({ id })
            if (data.code == 200) {
                this.notify(data.msg)
                if (this.currentPage * this.pageSize >= this.tableData.length) {
                    this.getData(Math.floor((this.tableData.length - 1) / this.pageSize) + ((this.tableData.length - 1) % this.pageSize == 0 ? 0 : 1))
                } else {
                    this.getData(this.currentPage)
                }
            } else {
                this.notify(data.msg, "error")
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

        toAddSong() {
            this.$router.push({ path: "/SongAll" })
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