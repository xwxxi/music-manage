<template>
  <div class="table">
    <div class="crumbs">
      <i class="el-icon-tickets">&nbsp;{{ singerName }}-歌曲管理</i>
    </div>
    <el-dialog title="添加歌曲" :visible.sync="contentDislogVisible" width="500px" center @close="handleAddSongClose">
      <el-form :model="addSongForm" ref="addSongForm" label-width="90px" :rules="songFormRules">
        <el-form-item prop="name" label="歌名" size="mini">
          <el-input v-model="addSongForm.name" placeholder="请输入歌名"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" label="专辑" size="mini">
          <el-input v-model="addSongForm.introduction" placeholder="请输入简介"></el-input>
        </el-form-item>
        <el-form-item prop="lyric" label="歌词" size="mini">
          <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 20 }" v-model="addSongForm.lyric" placeholder="请输入歌词"></el-input>
        </el-form-item>
        <el-form-item label="歌曲上传" size="mini">
          <el-upload class="upload-demo" ref="upload" drag action="" multiple :auto-upload="false" :http-request="httpRequest">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="contentDislogVisible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="addSong()">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改歌曲" :visible.sync="editVisible" width="500px" center>
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

    <div class="container">
      <div class="handle-box">
        <el-input size="mini" v-model="select_word" placeholder="请输入歌曲名" class="handle-input"></el-input>
        <el-button type="primary" size="mini" @click="contentDislogVisible = true">添加歌曲</el-button>
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
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="这是一段内容确定删除吗？" @confirm="handleDeletr(scope.row.id)">
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="tableData.length" :current-page="currentPage" :page-size="pageSize" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mixins } from "@/mixins/index.js"
import { mapGetters } from "vuex"
import "@/assets/js/iconfont.js"
import { addSong, songOfSingerId, updateSong, deleteSong } from "@/api/api.js"
export default {
  name: "Song",
  mixins: [mixins],
  data() {
    return {
      singerId: "",
      singerName: "",
      // 添加的弹窗
      contentDislogVisible: false,
      // 编辑弹窗
      editVisible: false,
      // 添加的对象
      addSongForm: {
        name: "",
        introduction: "",
        lyric: "",
      },
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
    this.singerId = this.$route.query.id
    this.singerName = this.$route.query.name
    this.getData()
  },
  destroyed() {
    this.$store.commit("setIsPlay", false)
  },
  methods: {
    /**查询歌手所以的歌曲 */
    async getData(value = 1) {
      let data = await songOfSingerId({ singerId: this.singerId })
      this.tableData = data.msg
      this.tempData = data.msg
      this.handleCurrentChange(value)
    },

    /**自定义的提交文件函数，取出文件设置进请求参数 */
    httpRequest(param) {
      this.file = param.file
    },

    /**添加歌曲 */
    addSong() {
      this.$refs["addSongForm"].validate(async (valid) => {
        if (valid) {
          // 将数据获取好
          this.addSongForm["singerId"] = this.singerId
          this.addSongForm["name"] = this.singerName + "-" + this.addSongForm["name"]
          if (this.addSongForm["lyric"] == null || this.addSongForm["lyric"].length <= 0) {
            this.addSongForm["lyric"] = "[00:00:00]暂无歌词"
          }
          this.addSongForm["pic"] = "/img/songPic/tubiao.jpg"
          this.$refs.upload.submit()
          let formData = new FormData()
          // 将数据填充到提交对象
          formData.append("singerId", this.addSongForm["singerId"])
          formData.append("name", this.addSongForm["name"])
          formData.append("introduction", this.addSongForm["introduction"])
          formData.append("pic", this.addSongForm["pic"])
          formData.append("lyric", this.addSongForm["lyric"])
          formData.append("file", this.file)
          let data = await addSong(formData)
          if (data.code == 200) {
            this.notify(data.msg)
            this.contentDislogVisible = false
            this.$refs.upload.clearFiles()
            this.getData(Math.floor((this.tableData.length + 1) / this.pageSize) + ((this.tableData.length + 1) % this.pageSize == 0 ? 0 : 1))
          } else {
            this.notify(data.msg, "error")
          }
        }
      })
    },

    /**添加歌曲关闭弹窗，清空表单 */
    handleAddSongClose() {
      for (const key in this.addSongForm) {
        this.addSongForm[key] = ""
      }
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
          let data = await updateSong(this.editSongForm)
          if (data.code == 200) {
            this.notify(data.msg)
            this.editVisible = false
            this.getData(this.currentPage)
          } else {
            this.notify(data.msg, "error")
          }
        } else {
          console.log("error submit!!")
        }
      })
    },

    /**删除歌手歌曲 */
    async handleDeletr(id) {
      let data = await deleteSong({ id })
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

    /**批量删除歌取 */
    async deleteAllSinger() {
      if (this.multipleSelection.length == 0) {
        this.notify("未选中任何内容")
        return
      }
      let bol = []
      for (let index = 0; index < this.multipleSelection.length; index++) {
        let data = await deleteSong({ id: this.multipleSelection[index] })
        if (data.code == 200) {
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
    handleSongSuccess(data) {
      if (data.code == 200) {
        this.getData()
        this.notify(data.msg)
      } else {
        this.notify(data.msg, "error")
      }
    },

    /**切换播放音乐 */
    setSongUrl(url, id) {
      if (this.toggle == id && this.isPlay) {
        this.toggle = ''
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
.handle-box {
  margin-bottom: 20px;
}
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