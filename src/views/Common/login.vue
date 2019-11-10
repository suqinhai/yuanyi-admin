<template>
  <section class="container">
   <!--  <img src="@/assets/images/Common/loginback.1888877.jpg" width="1920" height="960"></canvas> -->
    <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">园艺网站后台管理系统</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="form.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2">登录</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
export default {
  data() {
    return {
      logining: false,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      },
      checked: true
    };
  },
  mounted() {},
  created() {
    let userinfo = JSON.parse(window.localStorage.getItem('userinfo'))
    if (userinfo && userinfo.checked) {
      this.form.username = userinfo.username
      this.form.password = userinfo.password
      this.checked = userinfo.checked
    }
  },
  methods: {
    handleReset2() {
      this.$refs.form.resetFields();
    },
    handleSubmit2(ev) {
      let _this = this;
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.logining = true;
          let url = '/back/login.htm?username=' + this.form.username + '&password=' + this.form.password;
          let data = {
            username: this.form.username,
            password: this.form.password
          };
          this.$axios.post(url).then(res => {

            this.logining = false;
            if (this.checked == true) {
              data.checked = true
              window.localStorage.setItem('userinfo', JSON.stringify(data))
            }
            window.localStorage.setItem('token', res.data.data.token)
            window.localStorage.setItem('adminInfo', JSON.stringify(res.data.data.userInfo))

            this.$router.push('/orderList')
            // this.getMent()
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getMent() {

      let url = '/admin/Eenu/treeEenu'
      this.$axios.get(url).then(res => {
        console.log(res)
        this.$router.push(res.data.data[0].children[0].path ? res.data.data[0].children[0].path : '/')
      })
    },
  }
}

</script>
<style lang="less" scoped>
.container {
  overflow: hidden;
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    position: absolute;
    z-index: 100;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    /* 使用css3的transform来实现 */
    margin: 180px auto;

    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
      font-size: 20px;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
}

</style>
