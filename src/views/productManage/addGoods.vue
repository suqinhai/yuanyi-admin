<template>
  <section>
    <div class="content">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="商品封面">
          <el-upload class="upload-demo" :action="apiQiniuyunUpload" :before-upload="beforeAvatarUpload" :on-remove="handleRemove" :on-preview="handlePreview" :on-success="handleSuccess" :data="{token: form.qiniuyunToken}" name="file" :limit="1" list-type="picture" :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品分类">
          <!--<el-select v-model="form.category_id" placeholder="请选择分类">-->
            <!--&lt;!&ndash;<el-option v-for="item in classifyList" :key="item.id.toString()" :label="item.name" :value="item.id.toString()">&ndash;&gt;-->
            <!--&lt;!&ndash;</el-option>&ndash;&gt;-->
          <!--</el-select>-->
          你选择了： {{cName}}
          <el-tree :data="categorys" :props="categoryProps" @node-click="selectCategory" :render-after-expand="true" :highlight-current="true" empty-text="还没商品分类，现在去创建吧！" :accordion="true"></el-tree>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="概述">
          <el-input v-model="form.summary"></el-input>
        </el-form-item>
        <el-form-item label="商品介绍">
          <el-input v-model="form.intro" type="textarea" :row="3"></el-input>
        </el-form-item>
        <!--<el-form-item label="商品详情图">-->
          <!--<el-upload class="upload-demo" :action="apiQiniuyunUpload" :before-upload="beforeAvatarUpload" :on-remove="handleRemove2" :on-preview="handlePreview" :on-success="handleSuccess2" :data="{token: form.qiniuyunToken}" name="file" :limit="20" list-type="picture" :file-list="fileList2">-->
            <!--<el-button size="small" type="primary">点击上传</el-button>-->
          <!--</el-upload>-->
        <!--</el-form-item>-->
        <el-form-item label="商品详情图">
          <el-upload
            :action="apiQiniuyunUpload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove2"
            :before-upload="beforeAvatarUpload"
            :file-list="fileList2"
            :data="{token: form.qiniuyunToken}"
            :on-success="handleSuccess2"
            :on-error="testerr"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品售价">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <!--         <el-form-item label="商品上架">
           <el-switch v-model="form.states" @change="changeSwitch">
          </el-switch>
        </el-form-item> -->
        <el-form-item label="首页推荐">
          <el-switch v-model="form.index_show" @change="changeSwitch">
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width: 100px;margin-right: 20px;margin-top: 20px;">确定</el-button>
          <el-button style="width: 100px;" @click="goback()">取消</el-button>
        </el-form-item>
      </el-form>
      <!--</el-form>-->
    </div>
  </section>
</template>
<script>
import {domain} from '@/service/http/domain.js'

export default {
  data() {
    return {
      categorys: [
      ],
      categoryProps: {
        children: 'sub',
        id:"id",
        label: "name",
      },
      cName:"",
      dev: domain,
      fileList: [],
      fileList2: [],
      form: {
        id: this.$route.query.id,
        qiniuyunToken: '',
        name: '',
        intro: '',
        summary: '',
        index_show: true,
        details_pic_url: '',
        cover_url: '',
        price: '',
        category_id: '',
      },
      positions: [{
        value: 1,
        label: '首页'
      }, {
        value: 2,
        label: '公司'
      }, {
        value: 3,
        label: '方案'
      }, {
        value: 4,
        label: '新闻'
      }],
      classifyList:[],
      dialogImageUrl: '',
      dialogVisible: false,
    }
  },
  created() {
    if(this.form.id){
      let data = JSON.parse(localStorage.getItem("goods"))
      this.form = {
        id: data.id,
        name: data.name,
        intro: data.intro,
        summary: data.summary,
        index_show: data.index_show ? true : false,
        details_pic_url: data.details_pic_url,
        cover_url: data.cover_url,
        price: data.price,
        category_id: data.category_id.toString(),
      }
      this.cName = data.category_name
      this.fileList = [{
          name: data.cover_url,
          id: data.cover_url,
          url: data.cover_url,
      }]
      if(data.details_pic_url){
        data.details_pic_url.split(',').forEach((data)=>{
          this.fileList2.push({
            name: data,
            id: data,
            url: data,
          })
        })
      }
    }
    this.getTree()
    this.beforeAvatarUpload()
  },
  methods: {
    getTree(){
      let url = '/product/category/tree';
      this.$axios.post(url).then(res => {
        // let list = []
        // res.data.tree.forEach((data)=>{
        //   if(data.sub){
        //     data.sub.forEach((data2)=>{
        //       list.push(data2)
        //     })
        //   }
        // })
        // this.classifyList = list
        this.categorys = res.data.tree
      });
    },
    changeDate(data) {
      this.form.start_time = data[0].getTime() / 1000
      this.form.end_time = data[0].getTime() / 1000
    },
    changeSwitch() {
      this.form.index_show = !!this.form.index_show
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
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    handleSuccess2(response, file, fileList) {
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
    handlePreview(file) {
      window.open(file.url)
    },
    /**
     * 保存
     */
    onSubmit() {
      let details_pic_url = []
      this.fileList2.forEach((data)=>{
        details_pic_url.push(data.url)
      })
      // if(this.form.category_id){
      //   this.form.category_id = parseInt(this.form.category_id)
      // }
      if(undefined===this.fileList[0]){
        this.$message.error('商品封面 必须上传');
        return
      }

      let url = '/product/new';
      let data = {
        name: this.form.name,
        intro: this.form.intro,
        summary: this.form.summary,
        index_show: this.form.index_show?1:0,
        details_pic_url: details_pic_url.join(','),
        cover_url:  this.fileList[0].url,
        price: this.form.price,
        category_id: this.form.category_id,
      }
      if(this.form.id){
        url = '/product/modify'
        data['id'] = this.form.id
      }else{
        if (this.isEmpty(data.name)) {
          this.$message.error('商品名称必须填写');
          return
        }
      }
      this.$axios.post(url, data).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        });
        this.goback()
      });
    },
    selectCategory(data) {
      if (data.sub === null){
        this.cName = data.name
        this.form.category_id = data.id;
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    testerr(response, file, fileList){
      alert(response)
    },
    isEmpty(obj){
      if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
      }else{
        return false;
      }
    }
  }
}

</script>
<style scoped lang="less">
.content {
  width: 800px;
  padding-top: 40px;
}

</style>
