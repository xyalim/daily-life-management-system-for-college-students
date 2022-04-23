<template>
  <div class="register-container">
    <el-form
      ref="registerForm"
      size="small"
      :model="registerForm"
      :rules="loginRules"
      class="register-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ title }}</h3>
      </div>

      <el-form-item prop="selectedRole">
        <el-select
          v-model="registerForm.selectedRole"
          placeholder="请选择用户身份"
          class="register-select"
        >
          <el-option
            v-for="item in rolesArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="registerForm.username"
          placeholder="账号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="password"
          v-model="registerForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd(0)">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-form-item prop="confirmPassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="confirmPassword"
          v-model="registerForm.confirmPassword"
          :type="confirmPasswordType"
          placeholder="确认密码"
          name="confirmPasswordType"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd(1)">
          <svg-icon
            :icon-class="
              confirmPasswordType === 'password' ? 'eye' : 'eye-open'
            "
          />
        </span>
      </el-form-item>

      <el-form-item prop="verifyCode">
        <span class="svg-container">
          <svg-icon icon-class="captcha" />
        </span>
        <el-input
          :key="passwordType"
          ref="verifyCode"
          v-model="registerForm.verifyCode"
          placeholder="验证码"
          name="verifyCode"
          tabindex="3"
          @keyup.enter.native="handleLogin"
        />
        <div class="img-captcha-container">
          <img :src="captchaImageBase64" @click="handleRefreshCaptcha" />
        </div>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        class="btn"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleRegister"
        >注册</el-button
      >
      <!-- <el-button
        :loading="loading"
        type="primary"
        class="btn"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
      >登录</el-button> -->
    </el-form>
  </div>
</template>

<script>
import { handleRegister as test } from './handle.js'
import defaultSettings from '@/config/settings'
import { getImageCaptcha } from '@/api/login'
// import { reactive } from '@vue/composition-api'
import { useFetch } from '@vueuse/core'

export default {
  name: 'Register',
  setup() {
    console.log(useFetch)
    // function handleRegister() {
    //   console.log('用户注册')
    // }
    console.log(test, this)
    return {
      handleRegister: test
    }
    // const { isFetching, error, data } = useFetch(url)
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 2) {
        callback(new Error('请输入合法的账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
        return true
      } else {
        callback()
        return false
      }
    }

    const validateConfirmPassword = (rule, value, callback) => {
      if (this.registerForm.password !== value) {
        callback(new Error('密码不一致'))
        return false
      }
      callback()
      return true
    }

    const validatecaptchaCode = (rule, value, callback) => {
      if (value.length !== 4) {
        callback(new Error('请输入合法的验证码'))
      } else {
        callback()
      }
    }
    return {
      title: defaultSettings.title,
      registerForm: {
        selectedRole: '',
        username: '',
        password: '',
        confirmPassword: '',
        verifyCode: '',
        captchaId: ''
      },
      captchaImageBase64: '',
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        confirmPassword: [
          {
            required: true,
            trigger: 'blur',
            validator: validateConfirmPassword
          }
        ],
        verifyCode: [
          { required: true, trigger: 'blur', validator: validatecaptchaCode }
        ]
      },
      loading: false,
      passwordType: 'password',
      confirmPasswordType: 'password',
      redirect: undefined,
      rolesArr: [
        {
          value: '学生',
          label: '学生'
        },
        {
          value: '教师',
          label: '教师'
        }
      ]
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  async created() {
    this.handleRefreshCaptcha()
  },
  methods: {
    showPwd(pwdInputType = 0) {
      let passwordType = 'passwordType'

      if (pwdInputType === 0) {
        passwordType = 'passwordType'
      }
      if (pwdInputType === 1) {
        passwordType = 'confirmPasswordType'
      }

      if (this[passwordType] === 'password') {
        this[passwordType] = ''
      } else {
        this[passwordType] = 'password'
      }

      if (pwdInputType === 0) {
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      }
      if (pwdInputType === 1) {
        this.$nextTick(() => {
          this.$refs.confirmPassword.focus()
        })
      }
    },
    handleLogin() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/register', this.registerForm)
            .then(() => {
              // this.$router.push({ path: this.redirect || '/' }).catch(() => {})
              // this.loading = false
            })
            .catch((e) => {
              this.loading = false
              if (e.code && e.code === 10003) {
                this.handleRefreshCaptcha()
              }
            })
        } else {
          return false
        }
      })
    },
    async handleRefreshCaptcha() {
      const { data } = await getImageCaptcha({ width: 100, height: 50 })
      this.registerForm.captchaId = data.id
      this.captchaImageBase64 = data.img
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #f0f2f5;
$dark_gray: #d9d9d9;
$cursor: black;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
  .el-input {
    display: inline-block;
    height: 37px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: black;
      height: 37px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid $dark_gray;
    border-radius: 5px;
    color: $dark_gray;
    margin-bottom: 34px;
  }
}
</style>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$bg: #f0f2f5;

.register-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background: $bg url('~@/assets/background.svg') no-repeat 50%;
  background-size: 100%;

  .register-form {
    position: relative;
    width: 420px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      color: black;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .img-captcha-container {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 80px;
    cursor: pointer;

    img {
      height: 100%;
      width: 100%;
    }
  }

  .register-select {
    width: 100%;
    ::v-deep .el-input {
      width: 100%;
    }
  }

  .btn {
    margin: 0;
  }
}
</style>
