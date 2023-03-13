<template>
  <div class="login-wrap">
    <div class="ms-title">music 后台管理登录</div>
    <div class="ms-login">
      <el-form :model="userForm" :rules="rules" ref="userForm">
        <el-form-item prop="name">
          <el-input v-model="userForm.name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="userForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getLoginStatus } from "@/api/api.js"
import { mixins } from "@/mixins/index.js"
export default {
  name: "Login",
  mixins: [mixins],
  data() {
    return {
      userForm: {
        name: "admin",
        password: "1",
      },
      rules: {
        name: {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
        password: {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
      },
    }
  },
  created() {
  },
  methods: {
    submitForm() {
      this.$refs["userForm"].validate(async (valid) => {
        if (valid) {
          let data = await getLoginStatus(this.userForm)
          if (data.code == 200) {
            localStorage.setItem("userName", this.userForm.name)
            this.$router.push("/Info")
            this.notify(data.msg)
          } else {
            this.notify(data.msg, "error")
          }
        } else {
          console.log("error submit!!")
        }
      })
    },
  },
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  background: url("../assets/img/background.jpg");
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  color: #fff;
}
.ms-login {
  width: 450px;
  height: 250px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px;
  border-radius: 5px;
}
.login-btn {
  text-align: center;
  margin-top: 40px;
}
.login-btn .el-button {
  width: 100%;
  height: 36px;
}
</style>
