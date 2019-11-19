<template>
  <section>
    <div class="content">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="*logo:">
          <el-upload class="upload-demo" :action="'http://upload.qiniup.com/'" :before-upload="beforeAvatarUpload" :on-remove="handleRemove" :on-preview="handlePreview" :on-success="handleSuccess" :data="{token: form.qiniuyunToken}" name="file" :limit="1" list-type="picture" :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="*企业名称:">
          <el-input v-model="form.business_name"></el-input>
        </el-form-item>
        <el-form-item label="介绍:">
          <el-input v-model="form.intro" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input v-model="form.sort" placeholder="请输入排序" type="number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width: 100px;margin-right: 20px;margin-top: 20px;">确定</el-button>
          <el-button style="width: 100px;" @click="goback()">取消</el-button>
        </el-form-item>
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
      form: {
        logo:"",
        business_name:"",
        intro:"",
        sort:0,
        qiniuyunToken:""
      },
    }
  },
  created() {
  },
  methods: {
    async beforeAvatarUpload(file) {
      let url = '/resource/token'
      await this.$axios.get(url).then(res => {
        this.form.qiniuyunToken = res.data.token
      });
    },
    handleSuccess(response, file, fileList) {
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
    /**
     * 保存
     */
    onSubmit() {
      let url = '/business/partners/add';
      if(undefined===this.fileList[0]){
        this.$message.error('logo 必须上传');
        return
      }
      if (this.isEmpty(this.form.business_name)) {
        this.$message.error('企业名称必须填写');
        return
      }
      let data = {
        logo:this.fileList[0].url,
        business_name:this.form.business_name,
        intro:this.form.intro,
        sort:this.form.sort
      }
      this.$axios.post(url, data).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        });
        this.goback()
      });
    },
    isEmpty(obj){
      if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
      }else{
        return false;
      }
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
