<template>
  <div class="header">
    <!-- 菜单的折叠按钮 -->
    <div class="collapse-btn">
      <i class="el-icon-menu" @click="collapseChange()"></i>
    </div>
    <div class="logo">音乐网站后台管理</div>
    <div class="user-right">
      <div class="btn-fullscreen">
        <el-tooltip :content="fullscreen ? '取消全屏' : '全屏'" placement="bottom">
          <i class="el-icon-rank" @click="handleFullScreen()"></i>
        </el-tooltip>
      </div>
      <div class="user-avator">
        <img src="@/assets/img/user.jpg" />
      </div>
      <el-dropdown class="user-name" trigger="click" @command="handleCommand">
        <span class="el-dropown-link">
          {{ userName }}
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import bus from "@/assets/js/bus.js"
export default {
  data() {
    return {
      collapse: false,
      fullscreen: false,
    }
  },
  computed: {
    userName() {
      return localStorage.getItem("userName")
    },
  },
  methods: {
    // 折叠菜单栏
    collapseChange() {
      this.collapse = !this.collapse
      bus.$emit("collapse", this.collapse)
    },
    // 全屏事件
    handleFullScreen() {
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullScreen) {
          document.msExitFullScreen()
        }
      } else {
        let element = document.documentElement
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullScreen) {
          element.msRequestFullScreen()
        }
      }
      this.fullscreen = !this.fullscreen
    },
    handleCommand(command) {
        console.log(command);
      if (command == "logout") {
        localStorage.removeItem("userName")
        this.$router.push("/")
      }
    },
  },
}
</script>

<style scoped>
.header {
  background-color: #253041;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #ffffff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  line-height: 70px;
  color: #ffffff;
}
.user-right {
  float: right;
  padding: 0 50px;
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  margin-right: 5px;
  font-size: 24px;
  transform: rotate(45deg);
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}
.user-name {
  margin-left: 15px;
}
.el-dropown-link {
  font-size: 22px;
  color: #ffffff;
  cursor: pointer;
}
</style>