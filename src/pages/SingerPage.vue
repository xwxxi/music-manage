<template>
  <div class="table">
    <el-dialog title="添加歌手" :visible.sync="contentDislogVisible" width="400px" center>
      <el-form :model="addSingerForm" ref="addSingerForm" label-width="80px">
        <el-form-item prop="name" label="歌手名" size="mini">
          <el-input v-model="addSingerForm.name" placeholder="请输入歌手名"></el-input>
        </el-form-item>
        <el-form-item label="性别" size="mini">
          <el-radio-group v-model="addSingerForm.sex">
            <el-radio-button label="0">女</el-radio-button>
            <el-radio-button label="1">男</el-radio-button>
            <el-radio-button label="2">组合</el-radio-button>
            <el-radio-button label="3">其他</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="birth" label="生日" size="mini">
          <el-date-picker
            type="date"
            placeholder="请选择日期"
            v-model="addSingerForm.birth"
            style="width: 100%"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="location" label="地区" size="mini">
          <el-input v-model="addSingerForm.location" placeholder="请输入地区"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" label="简介" size="mini">
          <el-input type="textarea" v-model="addSingerForm.introduction" placeholder="请输入简介"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="contentDislogVisible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="addSinger()">确定</el-button>
      </span>
    </el-dialog>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" size="mini" @click="contentDislogVisible = true">添加歌手</el-button>
      </div>
    </div>
    <el-table size="mini" border style="width: 100%" height="500px" :data="tableData">
      <el-table-column label="歌手图片" width="110" align="center">
        <template slot-scope="scope">
          <div class="singer-img">
            <img :src="getUrl(scope.row.pic)" style="width: 100%" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="歌手" width="120" align="center"> </el-table-column>
      <el-table-column label="性别" width="50" align="center">
        <template slot-scope="scope">
          <span>{{ changeSex(scope.row.sex) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生日" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ arrachBirth(scope.row.birth) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="location" label="歌手地址" width="100" align="center"> </el-table-column>
      <el-table-column label="歌手简介">
        <template slot-scope="scope">
          <p style="height:100px;overflow-y:auto;">{{ scope.row.introduction }}</p>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { addSinger, getAllSinger } from "@/api/api.js"
import { mixins } from "@/mixins/index.js"
export default {
  name: "info",
  mixins: [mixins],
  data() {
    return {
      contentDislogVisible: false,
      addSingerForm: {
        name: "",
        sex: "0",
        birth: "",
        location: "",
        introduction: "",
      },
      tableData: [],
    }
  },
  created() {
    this.getData()
  },
  methods: {
    /**查询所有歌手 */
    async getData() {
      this.tableData = []
      let data = await getAllSinger()
      this.tableData = [...data.msg]
    },
    /**添加歌手 */
    async addSinger() {
      this.addSingerForm["pic"] = "/img/singerPic/hhh.jpg"
      let data = await addSinger(this.addSingerForm)
      if (data.code == 200) {
        this.notify(data.msg)
        this.contentDislogVisible = false
      } else {
        this.notify(data.msg, "error")
      }
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
</style>