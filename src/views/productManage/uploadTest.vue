<template>
<section class="content">
  <el-form ref="form" :model="form" label-width="120px">
  <el-form-item label="展示图" prop="picture" style="width: 800px;">
    <el-upload
      action="http://upload.qiniup.com/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :before-upload="beforeAvatarUpload"
      :file-list="fileList"
      :data="{token: form.qiniuyunToken}"
      :on-success="handleSuccess"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </el-form-item>
  </el-form>
  <div>{{msg()}}</div>
</section>
</template>

<script>
  export default {
    name: "uploadTest",
    data(){
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        picList: [],
        fileList: [],
        form: {
          qiniuyunToken: '',
          details_pic_url: '',
        }
      }
    },
    methods:{
      uploadAvatar(item) {
        const formData = new FormData()
        formData.append('file', item.file)
        const uid = item.file.uid
        // createStorage(formData).then(res => {
        //   this.picList.push({ key: uid, value: res.data.data.url })
        //   this.emptyUpload()
        // }).catch(() => {
        //   this.$message.error('上传失败，请重新上传')
        //   this.emptyUpload()
        // })

      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isPng = file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG && !isPng) {
          this.$message.error('上传图片只能是 JPG或png 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!')
        }
        return (isJPG || isPng) && isLt2M
      },
      handleRemove(file, fileList) {
        for (let i in this.fileList) {
          alert(this.fileList[i].url)
          if (this.fileList[i].url === file.url) {
            this.fileList.splice(i,1)
          }
        }
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
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
      msg(){
        // let m=""
        // for(let i=0;i<this.fileList.length;i++){
        //   m+=this.fileList[i].url
        //   if(i<this.fileList.length-1){
        //     m+=","
        //   }
        // }
        return this.fileList.join(",")
      },
      /**
       * 清空上传组件
       */
      emptyUpload() {
        const mainImg = this.$refs.upload
        if (mainImg) {
          if (mainImg.length) {
            mainImg.forEach(item => {
              item.clearFiles()
            })
          } else {
            this.$refs.upload.clearFiles()
          }
        }
      }
    },
  };
</script>

<style scoped>
  .content {
    width: 800px;
    padding-top: 40px;
  }

</style>
