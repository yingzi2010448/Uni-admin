<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 m-auto pt-5">
          <div class="card mt-5">
            <div class="card-header bg-white">
              <!-- logo -->
              <h3 class="text-center mb-0 text-secondary">{{$conf.logo}}</h3>
            </div>
            <div class="card-body">
              <el-form
                ref="loginFormRef"
                :rules="rules"
                :model="loginForm"
              >
                <el-form-item prop="username">
                  <el-input
                    placeholder="请输入用户名"
                    v-model="loginForm.username"
                    size="medium"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    placeholder="请输入密码"
                    v-model="loginForm.password"
                    type="password"
                    size="medium"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    class="w-100"
                    type="primary"
                    @click="submit"
                  >立即登录</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      // 验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.loginFormRef.validate((valid) => {
        if (!valid) return
        this.$router.push({ name: 'index' })
      })
    }
  }
}
</script>

<style lang="stylus" scoped></style>
