<template>
  <section class="content">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="文章分类">
        你选择了： {{cName}}
        <el-tree :data="categorys" :props="categoryProps" @node-click="selectCategory" :render-after-expand="true" :highlight-current="true" empty-text="还没文章分类，现在去创建吧！" :accordion="true"></el-tree>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="文章作者">
        <el-input v-model="form.author"></el-input>
      </el-form-item>
      <el-form-item label="文章来源">
        <el-input v-model="form.source"></el-input>
      </el-form-item>
      <el-form-item label="文章来源链接">
        <el-input v-model="form.source_url"></el-input>
      </el-form-item>
      <el-form-item label="*文章预览图">
        <el-upload class="upload-demo" :action="'http://upload.qiniup.com/'" :before-upload="beforeAvatarUpload" :on-remove="handleRemove" :on-preview="handlePreview" :on-success="handleSuccess" :data="{token: form.qiniuyunToken}" name="file" :limit="1" list-type="picture" :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章关键字">
        <el-input v-model="form.key_word"></el-input>
      </el-form-item>
      <el-form-item label="文章摘要">
        <el-input v-model="form.summary"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <editor v-model="myValue"
                :init="init"
                :disabled="disabled"
                @onClick="onClick">
        </editor>
      </el-form-item>

      <el-form-item label="上线/下线">
        <el-switch v-model="form.states" @change="changeOnlineSwitch">
        </el-switch>
      </el-form-item>
      <el-form-item label="文章排序">
        <el-input v-model="form.sort" placeholder="请输入排序" type="number"></el-input>
      </el-form-item>
      <!--<el-form-item label="文章点击量">-->
        <!--<el-input v-model="form.sort" placeholder="请输入文章点击量" type="number"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="width: 100px;margin-right: 20px;margin-top: 20px;">确定</el-button>
        <el-button style="width: 100px;" @click="goback()">取消</el-button>
      </el-form-item>
    </el-form>

  </section>

</template>
<script>
  import tinymce from 'tinymce/tinymce'
  import Editor from '@tinymce/tinymce-vue'
  import 'tinymce/themes/silver'
  // 编辑器插件plugins
  // 更多插件参考：https://www.tiny.cloud/docs/plugins/
  import 'tinymce/plugins/image'// 插入上传图片插件
  import 'tinymce/plugins/media'// 插入视频插件
  import 'tinymce/plugins/table'// 插入表格插件
  import 'tinymce/plugins/lists'// 列表插件
  import 'tinymce/plugins/wordcount'// 字数统计插件
  export default {
    components: {
      Editor
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      plugins: {
        type: [String, Array],
        default: 'lists image media table wordcount'
      },
      toolbar: {
        type: [String, Array],
        default: 'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat'
      }
    },
    data () {
      return {
        fileList:[],
        categorys: [
        ],
        categoryProps: {
          children: 'sub_article_type',
          id:"id",
          label: "type_name",
        },
        cName:"",
        form:{
          type_id:0,
          title:'',
          author:'',
          source:'',
          source_url:'',
          preview:'',
          key_word:'',
          summary:'',
          content:'',
          states:false,
          sort:0,
        },
        init: {
          language_url: '/static/zh_CN.js',  //public目录下
          language: 'zh_CN',
          skin_url: '/static/tinymce/skins/ui/oxide', //public目录下
          height: 400,
          plugins: this.plugins,  // 父组件传入 或者 填写个默认的插件 要选用什么插件都可以 去官网可以查到
          toolbar: this.toolbar,  // 工具栏 我用到的也就是lists image media table wordcount 这些 根据需求而定
          images_upload_url: '', //上传路径
          // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
          // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler

          // 官网抄的图片上传 项目如果用了vue-resource可以用$http 因为比较懒就没改
          images_upload_handler: (blobInfo, success, failure) => {

            var xhr, formData;
            xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open('POST', `${config.webPath}` + "basic/upload/");

            xhr.onload = function() {
              var json;
              if (xhr.status != 200) {
                failure('HTTP Error: ' + xhr.status);
                return;
              }
              json = JSON.parse(xhr.responseText);

              // if (!json || typeof json.img_url != 'string') {
              //   failure('Invalid JSON: ' + xhr.responseText);
              //   return;
              // }
              console.log(json)
              success(json.img_url);
            };

            formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());
            console.log('formData', formData)

            xhr.send(formData);
          }
        },
        myValue: this.value
      }
    },
    mounted () {
      // 富文本初始化
      tinymce.init({})
    },
    created(){
      this.getTree()
      this.beforeAvatarUpload()
    },
    methods: {
      onClick (e) {
        this.$emit('onClick', e, tinymce)
      },
      getTree(){
        let url = '/article/category/tree';
        this.$axios.get(url).then(res => {
          this.categorys = res.data.tree
        });
      },
      selectCategory(data) {
        if (data.sub_article_type === null){
          this.cName = data.type_name
          this.form.category_id = data.id;
        }
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
      handlePreview(file) {
        window.open(file.url)
      },
      changeOnlineSwitch() {
        this.form.states = !!  this.form.states
      },
      onSubmit(){
        let url = '/article/new';
        let data = {
          type_id:this.form.type_id,
          title:this.form.title,
          author:this.form.author,
          source:this.form.source,
          source_url:this.form.source_url,
          preview:this.fileList[0].url,
          key_word:this.form.key_word,
          summary:this.form.summary,
          content:this.myValue,
          states:this.form.states,
          sort:this.form.sort,
        }
        if(this.form.id){
          url = '/article/modify'
          data['id'] = this.form.id
        }
        this.$axios.post(url, data).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.goback()
        });

      }
    },
    watch: {
      value (newValue) {
        this.myValue = newValue
      },
      myValue (newValue) {
        this.$emit('input', newValue)
      }
    }
  }

</script>

<style scoped lang="less">
  .content {
    width: 100%;
    padding-top: 15px;
  }

</style>

