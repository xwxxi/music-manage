<template>
  <div class="table">
    <el-dialog title="添加用户" :visible.sync="contentDislogVisible" width="500px" center @close="handleAddSingerClose">
      <el-form :model="addSConsumerForm" :rules="singerFormRules" ref="addSConsumerForm" label-width="80px">
        <el-form-item prop="name" label="用户名称" size="mini">
          <el-input v-model="addSConsumerForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="用户密码" size="mini">
          <el-input v-model="addSConsumerForm.password" placeholder="请输入用户密码"></el-input>
        </el-form-item>
        <el-form-item label="性别" size="mini">
          <el-radio-group v-model="addSConsumerForm.sex">
            <el-radio-button label="0">女</el-radio-button>
            <el-radio-button label="1">男</el-radio-button>
            <el-radio-button label="3">其他</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="phoneNum" label="电话" size="mini">
          <el-input v-model="addSConsumerForm.phoneNum" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" size="mini">
          <el-input v-model="addSConsumerForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="birth" label="生日" size="mini">
          <el-date-picker type="date" placeholder="请选择日期" v-model="addSConsumerForm.birth" style="width: 100%" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item prop="location" label="地区" size="mini">
          <el-input v-model="addSConsumerForm.location" placeholder="请输入地区"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" label="简介" size="mini">
          <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 10 }" v-model="addSConsumerForm.introduction" placeholder="请输入简介"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="contentDislogVisible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="addConsumer()">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改用户" :visible.sync="editVisible" width="500px" center>
      <el-form :model="editConsumerForm" :rules="singerFormRules" ref="editConsumerForm" label-width="80px">
        <el-form-item prop="name" label="用户名称" size="mini">
          <el-input v-model="editConsumerForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="用户密码" size="mini">
          <el-input v-model="editConsumerForm.password" placeholder="请输入用户密码"></el-input>
        </el-form-item>
        <el-form-item label="性别" size="mini">
          <el-radio-group v-model="editConsumerForm.sex">
            <el-radio-button label="0">女</el-radio-button>
            <el-radio-button label="1">男</el-radio-button>
            <el-radio-button label="3">其他</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="phoneNum" label="电话" size="mini">
          <el-input v-model="editConsumerForm.phoneNum" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" size="mini">
          <el-input v-model="editConsumerForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="birth" label="生日" size="mini">
          <el-date-picker type="date" placeholder="请选择日期" v-model="editConsumerForm.birth" style="width: 100%" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item prop="location" label="地区" size="mini">
          <el-input v-model="editConsumerForm.location" placeholder="请输入地区"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" label="简介" size="mini">
          <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 10 }" v-model="editConsumerForm.introduction" placeholder="请输入简介"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="editVisible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="editSinger()">确定</el-button>
      </span>
    </el-dialog>

    <div class="container">
      <div class="handle-box">
        <el-input size="mini" v-model="select_word" placeholder="请输入用户名" class="handle-input"></el-input>
        <el-button type="primary" size="mini" @click="contentDislogVisible = true">添加用户</el-button>
        <el-popconfirm :title="'是否删除选中的' + multipleSelection.length + '条数据'" @confirm="deleteAllSinger">
          <el-button type="danger" size="mini" slot="reference">批量删除</el-button>
        </el-popconfirm>
      </div>
    </div>
    <el-table size="mini" border style="width: 100%" height="700px" :data="data" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40"> </el-table-column>
      <el-table-column label="用户图片" width="110" align="center">
        <template slot-scope="scope">
          <div class="singer-img">
            <img :src="getUrl(scope.row.avator)" style="width: 100%" />
          </div>
          <el-upload :show-file-list="false" :action="uploadUrl(scope.row.id)" :before-upload="beforeAvatorUpload" :on-success="handleAvatorSuccess">
            <el-button size="mini">更新图片</el-button>
          </el-upload>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="120" align="center"> </el-table-column>
      <el-table-column prop="password" label="密码" width="120" align="center"> </el-table-column>
      <el-table-column label="性别" width="50" align="center">
        <template slot-scope="scope">
          <span>{{ changeSex(scope.row.sex) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="phoneNum" label="电话" width="120" align="center"> </el-table-column>
      <el-table-column prop="email" label="邮箱" width="120" align="center"> </el-table-column>
      <el-table-column label="生日" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ arrachBirth(scope.row.birth) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="location" label="地区" width="120" align="center"> </el-table-column>
      <el-table-column label="签名">
        <template slot-scope="scope">
          <p style="height: 100px; overflow-y: auto">{{ scope.row.introduction }}</p>
        </template>
      </el-table-column>
      <!-- <el-table-column label="歌曲管理" align="center" width="110">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="songEdit(scope.row.id, scope.row.name)">歌曲管理</el-button>
        </template>
      </el-table-column> -->
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
import { addConsumer, getAllConsumer, updateConsumer, deleteConsumer } from "@/api/api.js"
import { mixins } from "@/mixins/index.js"
export default {
  name: "Consumer",
  mixins: [mixins],
  data() {
    return {
      // 添加的弹窗
      contentDislogVisible: false,
      // 编辑弹窗
      editVisible: false,
      // 添加的对象
      addSConsumerForm: {
        username: "",
        password: "",
        sex: "0",
        phoneNum: "",
        email: "",
        birth: "",
        introduction: "",
        location: "",
        avator: "",
        create_time: "",
        update_time: "",
      },
      // 编辑的对象
      editConsumerForm: {
        id: "",
        username: "",
        password: "",
        sex: "",
        phoneNum: "",
        email: "",
        birth: "",
        introduction: "",
        location: "",
        avator: "",
        create_time: "",
        update_time: "",
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
      singerFormRules: {
        name: {
          required: true,
          message: "请输入用户名称",
          trigger: "blur",
        },
        sex: {
          required: true,
          message: "请输入选择性别",
          trigger: "blur",
        },
        birth: {
          required: true,
          message: "请输入生日",
          trigger: "blur",
        },
        location: {
          required: true,
          message: "请输入地址",
          trigger: "blur",
        },
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
  },
  created() {
    this.getData()
  },
  methods: {
    /**查询所有用户 */
    async getData(value = 1) {
      let data = await getAllConsumer()
      this.tableData = data.msg
      this.tempData = data.msg
      this.handleCurrentChange(value)
    },

    /**添加用户 */
    async addConsumer() {
      this.addSConsumerForm["avator"] = "/img/singerPic/hhh.jpg"
      let data = await addConsumer(this.addSConsumerForm)
      if (data.code == 200) {
        this.notify(data.msg)
        this.contentDislogVisible = false
        this.getData(Math.floor((this.tableData.length + 1) / this.pageSize) + ((this.tableData.length + 1) % this.pageSize == 0 ? 0 : 1))
        this.handleAddSingerClose()
      } else {
        this.notify(data.msg, "error")
      }
    //   this.$refs["addSConsumerForm"].validate(async (valid) => {
    //     if (valid) {
    //     } else {
    //       console.log("error submit!!")
    //     }
    //   })
    },

    /**添加用户关闭弹窗，清空表单 */
    handleAddSingerClose() {
      for (const key in this.addSConsumerForm) {
        this.addSConsumerForm[key] = ""
      }
    },

    /**编辑用户 */
    handleEdit(row) {
      this.editVisible = true
      this.editConsumerForm = { ...row }
    },

    /**弹窗编辑页面，保存修改的数据 */
    async editSinger() {
      let data = await updateConsumer(this.editConsumerForm)
      if (data.code == 200) {
        this.notify(data.msg)
        this.editVisible = false
        this.getData(this.currentPage)
      } else {
        this.notify(data.msg, "error")
      }
      //   this.$refs["editSingerForm"].validate(async (valid) => {
      //     if (valid) {
      //     } else {
      //       console.log("error submit!!")
      //     }
      //   })
    },

    /**删除用户 */
    async handleDeletr(id) {
      let data = await deleteConsumer({ id })
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
      return `${this.$store.state.HOST}/singer/updateSingerPic?id=${id}`
    },

    /**分页切换 */
    handleCurrentChange(value) {
      this.currentPage = value
    },

    /**批量删除用户 */
    async deleteAllSinger() {
      if (this.multipleSelection.length == 0) {
        this.notify("未选中任何内容")
        return
      }
      let bol = []
      for (let index = 0; index < this.multipleSelection.length; index++) {
        let data = await deleteConsumer({ id: this.multipleSelection[index] })
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
    songEdit(id, name) {
      this.$router.push({
        path: "/Song",
        query: {
          name,
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
.singer-img {
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