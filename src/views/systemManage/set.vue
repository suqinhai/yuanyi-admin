<template>
  <section>
    <div class="content">
      <el-form ref="form" :model="form" label-width="180px">
        <h1>网站基础设置</h1>
        <el-form-item label="网站名称：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="官网地址：">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="网站logo(长方形)：">
          <el-upload class="upload-demo" :action="'http://upload.qiniup.com/'" :before-upload="beforeAvatarUpload" :on-remove="handleRemove" :on-preview="handlePreview" :on-success="handleSuccess" :data="{token: form.qiniuyunToken}" name="file" :limit="1" list-type="picture" :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="网站logo（正方形）：">
          <el-upload class="upload-demo" :action="'http://upload.qiniup.com/'" :before-upload="beforeAvatarUpload2" :on-remove="handleRemove2" :on-preview="handlePreview2" :on-success="handleSuccess2" :data="{token: form.qiniuyunToken}" name="file" :limit="1" list-type="picture" :file-list="fileList2">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>


        <h1>网站联系设置</h1>
        <el-form-item label="公司地址：">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="企业邮箱：">
          <el-input v-model="form.enterprise_email"></el-input>
        </el-form-item>
        <el-form-item label="服务热线：">
          <el-input v-model="form.hotline"></el-input>
        </el-form-item>

        <h1>备案</h1>
        <el-form-item label="网站ICP备案号：">
          <el-input v-model="form.icp"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width: 100px;margin-right: 20px;margin-top: 20px;">确定</el-button>
        </el-form-item>
      </el-form>
      </el-form>
    </div>
  </section>
</template>
<script>
import domain from '@/service/http/domain.js'
export default {
  data() {
    return {
      dev: domain,
      fileList: [],
      fileList2: [],
      form: {
        qiniuyunToken:'',
        name: "",
        url: "",
        rectangle_logo: "",
        square_logo: "",
        address: "",
        enterprise_email: "",
        hotline: "",
        icp: ""
      },
      data:{}
    }
  },
  created() {
    this.getSetting()
  },
  methods: {
    async beforeAvatarUpload(file){
      let url = '/resource/token'
      await this.$axios.get(url).then(res => {
        this.form.qiniuyunToken = res.data.token
      });
    },
    handleSuccess(response, file, fileList){
      let key = response.key
      this.fileList.push({
        name: key,
        id: key,
        url: 'http://forrily.com/' + key
      })
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    handlePreview(file) {
      window.open(file.url)
    },
    async beforeAvatarUpload2(file){
      let url = '/resource/token'
      await this.$axios.get(url).then(res => {
        this.form.qiniuyunToken = res.data.token
      });
    },
    handleSuccess2(response, file, fileList){
      let key = response.key
      this.fileList2.push({
        name: key,
        id: key,
        url: 'http://forrily.com/' + key
      })
    },
    handleRemove2(file, fileList) {
      this.fileList2 = fileList
    },
    handlePreview2(file) {
      window.open(file.url)
    },
    getSetting(){
      let url = '/sys/setting'
      this.$axios.get(url).then(res => {
        this.form.id = res.data.setting.id
        this.form.name = res.data.setting.name
        this.form.url = res.data.setting.url
        this.fileList = [{
          name: new Date().getTime(),
          id: new Date().getTime(),
          url: res.data.setting.rectangle_logo
        }]
        this.fileList2 = [{
          name: new Date().getTime(),
          id: new Date().getTime(),
          url: res.data.setting.square_logo
        }]
        this.form.rectangle_logo = res.data.setting.rectangle_logo
        this.form.square_logo = res.data.setting.square_logo
        this.form.address = res.data.setting.address
        this.form.enterprise_email = res.data.setting.enterprise_email
        this.form.hotline = res.data.setting.hotline
        this.form.icp = res.data.setting.icp
      });
    },
    /**
     * 保存
     */
    onSubmit() {
      let url = '/sys/setting/modify';
      let data = {
        id: this.form.id,
        qiniuyunToken: this.form.qiniuyunToken,
        name: this.form.name,
        url: this.form.url,
        rectangle_logo: this.fileList[0].url,
        square_logo: this.fileList2[0].url,
        address:  this.form.address,
        enterprise_email: this.form.enterprise_email,
        hotline: this.form.hotline,
        icp:this.form.icp,
      }
      this.$axios.post(url,data).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        });
      });
    },
  }
}

</script>
<style scoped lang="less">
h1{
  font-size: 20px;
  margin-bottom: 30px;
}
.content {
  width: 800px;
  padding-top: 40px;
}

</style>
