<template>
  <div style="margin-top: 2rem;margin-left: 2rem; ">
    <h4>上传本地视频</h4>
    <div style="margin-top: 1rem;">
      <input type="file" ref="file">
    </div>
    <div style="margin-top: 0.5rem;">
      <button @click="uplaodVedio">本地上传</button>
      <span id="tips" style="color: red" v>{{ tips }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tips: "",
        form: {}
      };
    },
    name: "uploadLocalVedio",
    created() {
      localStorage.removeItem("localvideourl");
    },
    destroyed() {
      localStorage.setItem("localvideourl", "nil");
    },
    methods: {
      uuid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
          let r = Math.random() * 16 | 0,
            v = c === "x" ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      },
      async beforeAvatarUpload(file) {
        let url = "/resource/token";
        await this.$axios.get(url).then(res => {
          this.$set(this.form, "qiniuyunToken", res.data.token);
        });
      },
      async uplaodVedio() {
        if (this.$refs.file.files === undefined || this.$refs.file.files === null || this.$refs.file.files.length === 0) {
          this.tips = "未选中文件!!!";
          return;
        }
        this.tips = "上传中...";
        let that = this;
        let xhr, formData;
        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open("POST", this.apiQiniuyunUpload);
        xhr.onload = () => {
          let json;
          if (xhr.status !== 200) {
            this.tips = "上传失败，联系开发人员解决!!!";
            return;
          }
          json = JSON.parse(xhr.responseText);
          this.tips = "上传成功!!!" + that.qinniuyunImgDomain + json.key;
          localStorage.setItem("localvideourl", that.qinniuyunImgDomain + json.key);
          // window.close();
        };
        await this.beforeAvatarUpload();
        // console.log(this.$refs.file);
        formData = new FormData();
        formData.append("file", this.$refs.file.files[0], this.$refs.file.files[0].name);
        formData.append("key", this.uuid());
        formData.append("token", this.form.qiniuyunToken);
        xhr.send(formData);
      }
    }
  };

</script>

<style scoped>

</style>
