<template>
  <section>
    <div class="content">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="广告名称">
          <el-input v-model="form.slogan"></el-input>
        </el-form-item>
        <el-form-item label="广告位置">
          <el-select v-model="form.postion_id" placeholder="请选择广告位置">
            <el-option v-for="item in positions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始/结束时间">
          <el-date-picker v-model="form.time" range-separator="至" type="daterange" style="width:405px" start-placeholder="开始日期" end-placeholder="结束日期" @change="changeDate">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上线/下线">
          <el-switch v-model="form.state" @change="changeSwitch">
          </el-switch>
        </el-form-item>
        <el-form-item label="广告图片">
          <el-upload class="upload-demo" :action="apiQiniuyunUpload" :before-upload="beforeAvatarUpload" :on-remove="handleRemove" :on-preview="handlePreview" :on-success="handleSuccess" :data="{token: form.qiniuyunToken}" name="file" :limit="1" list-type="picture" :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="跳转地址" v-if="form.postion_id != 5">
          <el-input v-model="form.ad_link"></el-input>
        </el-form-item>
        <!--         <el-form-item label="浮动文字">
          <el-input v-model="form.englishName"></el-input>
        </el-form-item> -->
        <!--         <el-form-item label="广告备注">
          <el-input v-model="form.sequence" type="textarea" :row="3"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width: 100px;margin-right: 20px;margin-top: 20px;">确定</el-button>
          <el-button style="width: 100px;" @click="goback()">取消</el-button>
        </el-form-item>
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
      fileList: [],
      form: {
        id: this.$route.query.id,
        qiniuyunToken: '',
        slogan: "",
        pic_url: "",
        postion_id: 1,
        state: true,
        goto_type: 0,
        ad_link: "",
        start_time: "",
        end_time: "",
        time:"",
      },
      positions: [{
        value:1,
        label: '首页'
      },{
        value:2,
        label: '公司'
      },{
        value:3,
        label: '方案'
      },{
        value:4,
        label: '新闻'
      },{
        value:5,
        label: '关于我们图片集'
      }]
    }
  },
  created() {
    if(this.form.id){
      let data = JSON.parse(localStorage.getItem("ad"))
      this.form = {
        id: data.id,
        slogan: data.slogan,
        pic_url: data.pic_url,
        postion_id: data.postion_id,
        state: data.state,
        goto_type: data.goto_type,
        ad_link: data.ad_link,
        start_time: data.start_time,
        end_time: data.end_time,
        time: [new Date(data.start_time ), new Date(data.end_time )]
      }
      this.fileList = [{
          name: data.pic_url,
          id: data.pic_url,
          url: data.pic_url,
      }]

      // this.beforeAvatarUpload()
    }
  },
  methods: {
    changeDate(data) {
      this.form.start_time = data[0].getTime() / 1000
      this.form.end_time = data[0].getTime() / 1000
    },
    changeSwitch() {
      this.form.state = !this.form.state
    },
    async beforeAvatarUpload(file) {
      let url = '/resource/token'
      await this.$axios.get(url).then(res => {
        this.$set(this.form,'qiniuyunToken',res.data.token)
      });
    },
    handleSuccess(response, file, fileList) {
      let key = response.key
      this.fileList.push({
        name: key,
        id: key,
        url: this.qinniuyunImgDomain + key
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
      let url = '/ad/new';
      let data = {
        slogan: this.form.slogan,
        pic_url: this.fileList[0].url,
        postion_id: this.form.postion_id,
        state: this.form.state ? 1 : 0,
        goto_type: 0,
        ad_link: this.form.postion_id == 5? '#' : this.form.ad_link,
        start_time: this.form.start_time,
        end_time: this.form.end_time,
      }
      if(this.form.id){
        url = '/ad/modify'
        data['id'] = this.form.id
      }
      this.$axios.post(url, data).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        });
        this.goback()
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
