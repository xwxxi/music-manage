<template>
  <div class="table">
    <el-dialog title="添加歌单" :visible.sync="contentDislogVisible" width="500px" center @close="handleAddSongListClose">
      <el-form :model="addSongListForm" ref="addSongListForm" label-width="80px">
        <el-form-item prop="title" label="标题" size="mini">
          <el-input v-model="addSongListForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" label="简介" size="mini">
          <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 10 }" v-model="addSongListForm.introduction" placeholder="请输入简介"></el-input>
        </el-form-item>
        <el-form-item prop="style" label="风格" size="mini">
          <el-input v-model="addSongListForm.style" placeholder="请输入风格"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="contentDislogVisible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="addSongList()">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改歌单" :visible.sync="editVisible" width="500px" center>
      <el-form :model="editSongListForm" ref="editSongListForm" label-width="80px">
        <el-form-item prop="title" label="标题" size="mini">
          <el-input v-model="editSongListForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" label="简介" size="mini">
          <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 10 }" v-model="editSongListForm.introduction" placeholder="请输入简介"></el-input>
        </el-form-item>
        <el-form-item prop="style" label="风格" size="mini">
          <el-input v-model="editSongListForm.style" placeholder="请输入风格"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="editVisible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="editSongList()">确定</el-button>
      </span>
    </el-dialog>

    <div class="container">
      <div class="handle-box">
        <el-input size="mini" v-model="select_word" placeholder="请输入标题" class="handle-input"></el-input>
        <el-button type="primary" size="mini" @click="contentDislogVisible = true">添加歌单</el-button>
        <el-popconfirm :title="'是否删除选中的' + multipleSelection.length + '条数据'" @confirm="deleteAllSinger">
          <el-button type="danger" size="mini" slot="reference">批量删除</el-button>
        </el-popconfirm>
      </div>
    </div>
    <el-table size="mini" border style="width: 100%" height="700px" :data="data" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40"> </el-table-column>
      <el-table-column label="歌单图片" width="110" align="center">
        <template slot-scope="scope">
          <div class="songList-img">
            <img :src="getUrl(scope.row.pic)" style="width: 100%" />
          </div>
          <el-upload :show-file-list="false" :action="uploadUrl(scope.row.id)" :before-upload="beforeAvatorUpload" :on-success="handleAvatorSuccess">
            <el-button size="mini">更新图片</el-button>
          </el-upload>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="300" align="center"> </el-table-column>
      <el-table-column label="歌单简介">
        <template slot-scope="scope">
          <p style="height: 100px; overflow-y: auto">{{ scope.row.introduction }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="style" label="风格" width="150" align="center"> </el-table-column>
      <el-table-column label="歌曲管理" align="center" width="110">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="songEdit(scope.row.id, scope.row.title)">歌曲管理</el-button>
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
import { addSongList, getAllSongList, updateSongList, deleteSongList } from "@/api/api.js"
import { mixins } from "@/mixins/index.js"
export default {
  name: "SongList",
  mixins: [mixins],
  data() {
    return {
      // 添加的弹窗
      contentDislogVisible: false,
      // 编辑弹窗
      editVisible: false,
      // 添加的对象
      addSongListForm: {
        title: "",
        pic: "0",
        introduction: "",
        style: "",
      },
      // 编辑的对象
      editSongListForm: {
        id: "",
        title: "",
        pic: "0",
        introduction: "",
        style: "",
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
      songListFormRules: {
        title: {
          required: true,
          message: "请输入歌单标题",
          trigger: "blur",
        },
        introduction: {
          required: true,
          message: "请输入歌单简介",
          trigger: "blur",
        },
        style: {
          required: true,
          message: "请输入歌单风格",
          trigger: "blur",
        }
      },
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
          if (item.title.includes(this.select_word)) {
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
  },
  created() {
    this.getData()
  },
  methods: {
    /**查询所有歌单 */
    async getData(value = 1) {
      let data = await getAllSongList()
      this.tableData = data.msg
      this.tempData = data.msg
      this.handleCurrentChange(value)
    },

    /**添加歌单 */
    addSongList() {
      this.$refs["addSongListForm"].validate(async (valid) => {
        if (valid) {
          this.addSongListForm["pic"] = "/img/songListPic/123.jpg"
          let data = await addSongList(this.addSongListForm)
          if (data.code == 200) {
            this.notify(data.msg)
            this.contentDislogVisible = false
            this.getData(Math.floor((this.tableData.length + 1) / this.pageSize) + ((this.tableData.length + 1) % this.pageSize == 0 ? 0 : 1))
            this.handleAddSongListClose()
          } else {
            this.notify(data.msg, "error")
          }
        } else {
          console.log("error submit!!")
        }
      })
    },

    /**添加歌单关闭弹窗，清空表单 */
    handleAddSongListClose() {
      for (const key in this.addSongListForm) {
        this.addSongListForm[key] = ""
      }
    },

    /**编辑歌单 */
    handleEdit(row) {
      this.editVisible = true
      this.editSongListForm = { ...row }
    },

    /**弹窗编辑页面，保存修改的数据 */
    editSongList() {
      this.$refs["editSongListForm"].validate(async (valid) => {
        if (valid) {
          let data = await updateSongList(this.editSongListForm)
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

    /**删除歌单 */
    async handleDeletr(id) {
      let data = await deleteSongList({ id })
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

    /**更新图片 */
    uploadUrl(id) {
      return `${this.$store.state.HOST}/songList/updateSongListPic?id=${id}`
    },

    /**分页切换 */
    handleCurrentChange(value) {
      this.currentPage = value
    },

    /**批量删除歌单 */
    async deleteAllSinger() {
      if (this.multipleSelection.length == 0) {
        this.notify("未选中任何内容")
        return
      }
      let bol = []
      for (let index = 0; index < this.multipleSelection.length; index++) {
        let data = await deleteSongList({ id: this.multipleSelection[index] })
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

    /**跳转歌曲管理页面 */
    songEdit(id, title) {
      this.$router.push({
        path: "/ListSong",
        query: {
          title,
          id,
        },
      })
    },
  },
}
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}
.songList-img {
  width: 100%;
  height: 80px;
  border-radius: 5px;
  margin-bottom: 5px;
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
</style>