<template>
  <div class="login_page fillcontain">
    <img class="bgImg" src="../../assets/bg4.jpeg">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>elm后台管理系统</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
          </el-form-item>
        </el-form>
        <p class="tip">温馨提示：</p>
        <p class="tip">未登录过的新用户，自动注册</p>
        <p class="tip">注册过的用户可凭账号密码登录</p>
      </section>
    </transition>
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
    submitForm (form) {

    }
  },
  watch: {

  }
}
</script>

<style scoped>
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
  background-color: whitesmoke;
  width: 30%;
  position: absolute;
  top:30%;
  left: 30%;
}
</style>
