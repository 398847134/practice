<template>
  <div class="login_page fillcontain">
    <img class="bgImg" src="../../assets/bg.jpg">
    <transition name="form-fade" mode="in-out">
      <v-card hover class="form_contianer" v-show="showLogin">
        <div class="toptip">
        </div>
        <div class="manage_tip">
          <p>项目后台管理系统</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
          </el-form-item>
<!--          <el-form-item>-->
<!--            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>-->
<!--          </el-form-item>-->
          <el-tooltip class="item" effect="dark" content="登录" placement="top">
            <v-btn color="blue" dark @click="submitForm('loginForm')">
              <v-icon>check</v-icon>
            </v-btn>
          </el-tooltip>
        </el-form>
      </v-card>
    </transition>
    <div class="right">
      Copyright © 2021 shangfurong,yaojunxu. All rights reserved.
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      loginForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
      },
      showLogin: true,
    }
  },
  mounted(){

  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message.success('登陆成功')
          this.$router.push('mainpage')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  watch: {

  }
}
</script>

<style scoped>
.right{
  position: absolute;
  bottom: 10px;
  width: 100%;
  align-content: center;
  z-index: 10;
  color: whitesmoke;
}
.toptip{
  width: 100%;
  height: 40px;
  background-color: #3a8ee6;
  position: absolute;
  top: 0;
  left: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.manage_tip{
  padding: 10px;
  font-weight: 900;
  font-size: 30px;
}
.bgImg {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  top: 0%;
  left: 0%;
  z-index: -1;
}
.form_contianer{
  width: 20%;
  position: absolute;
  top:30%;
  left: 40%;
  border-radius: 10px;
  padding: 50px;
  background-color: rgba(255, 255, 255, 0.9);
  transform-style: preserve-3d;
  backface-visibility: hidden;
  transition: transform 0.5s ease-in;
  z-index: 2;
}
</style>
