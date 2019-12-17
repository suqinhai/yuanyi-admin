<template>
  <section>
    <div class="content">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="新密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="form.newpassword" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width: 100px;margin-right: 20px;margin-top: 20px;">确定</el-button>
          <el-button style="width: 100px;" @click="goback()">取消</el-button>
        </el-form-item>
      </el-form>
      </el-form>
    </div>
  </section>
</template>
<script>
import {domain} from '@/service/http/domain.js'
export default {
  data() {
    return {
      dev: domain,
      form: {
        password:'',
        newpassword:'',
      },
    }
  },
  created() {
  
  },
  methods: {
    /**
     * 保存
     */
    onSubmit() {
      let url = '/modify/password';
      let data = {
        password: this.form.password,
      }
      if(this.form.password != this.form.newpassword){
        this.$message({
          message: '2次输入的密码不一致',
          type: 'error'
        });
        return false
      }
      this.$axios.post(url, data).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        });
        window.localStorage.removeItem('token');
        this.$router.push({
          path:'/login'
        })
      });
    },
  }
}

</script>
<style scoped lang="less">
.content {
  width: 800px;
  padding-top: 40px;
}

</style>
