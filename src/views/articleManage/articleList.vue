<template>
  <section class="content">
    <div class="util">
      <div class="tools">
        <el-button style="margin-bottom:10px" type="primary" size="mini" @click="addArticle">新增</el-button>
      </div>
      <div class="tool">
        <el-input style="width:200px;;margin-bottom:10px" placeholder="请输入标题" v-model="form.title" size="mini" clearable>
        </el-input>
        <el-date-picker v-model="form.time" range-separator="至" size="mini" type="daterange" style="width:405px" start-placeholder="开始日期" end-placeholder="结束日期" @change="changeDate">
        </el-date-picker>
        <el-button size="mini" @click="search
" type="primary" style="margin-left:0px">搜索</el-button>
        <el-button size="mini" @click="reset" type="primary" style="margin-left:0">重置</el-button>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%" size="mini">
      <el-table-column show-overflow-tooltip prop="id" type="selection" width="55">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="id" label="id">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="title" label="标题">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="author" label="文章作者">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="source" label="文章来源">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="source_url" label="文章来源链接">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="preview" label="文章预览图">
         <template slot-scope="scope">
          <el-tooltip placement="top">
              <div slot="content"><img :src="scope.row.preview" width="200px"></div>
              <a href="jacascript:;" class="el-icon-picture"></a>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="key_word" label="文章关键字">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="summary" label="文章摘要">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="clicks" label="浏览量">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="save_time" label="发布时间">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="sort" label="排序">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="states" label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.states" @change="changeSwitch(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination @size-change="handleSizeChange" :page-sizes="[10, 15, 20, 25]" layout="sizes, total, prev, pager, next" :total="count" @current-change="currentChange" :page-size="page.page_size">
      </el-pagination>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      form: {
        title:"",
        publish_start_time:"",
        publish_end_time:"",
        time: "",
      },
      page: {
        page_size: 15,
        page_index: 1,
      },
      tableData: [],
      count: 0,
    }
  },
  created() {
    this.geteventlist()
  },
  methods: {
     changeSwitch(params) {
      let url = '/article/online/change'
      let data = {
        id: params.id
      }
      this.$axios.post(url, data).then((res) => {
        this.$message({
          message: res.msg,
          type: 'success'
        });
      })
    },
    search() {
        this.page = {
          page_size: 15,
          page_index: 1,
        }
        this.geteventlist()
    },
    reset() {
      this.page = {
        page_size: 15,
        page_index: 1,
      }
      this.form = {
        title: '',
        publish_start_time: '',
        publish_end_time: '',
        time: '',
      }
      this.geteventlist()
    },
    changeDate(data) {
      this.form.publish_start_time = data[0].getTime()
      this.form.publish_end_time = data[0].getTime()
    },
    handleEdit(data){
      localStorage.setItem("articles", JSON.stringify(data));
      this.$router.push({
        path:'/Y2019moc.rgaykcul/addArticle',
        query:{
          id:data.id
        }
      })
    },
    addArticle(){
      this.$router.push({
        path:'/Y2019moc.rgaykcul/addArticle'
      })
    },
    handleDelete(row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = '/article/delete'
        let data = {
          id: row.id
        }
        this.$axios.post(url, data).then((res) => {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.geteventlist()
        })
      })
    },
    geteventlist() {
      let url = '/article/list'
      let data = {
        page: {
          page_size:this.page.page_size,
          page_index: this.page.page_index,
        },
        title: this.form.title,
        publish_start_time: this.form.publish_start_time,
        publish_end_time: this.form.publish_end_time,
      }
      this.$axios.post(url, data).then((res) => {
        res.data.as.forEach((item)=>{
          item.states = item.states ? true : false
        })
        this.tableData = res.data.as
        this.count = res.data.page.total
      })
    },
    currentChange(val) {
      this.page.page_index = val;
      this.geteventlist()
    },
    handleSizeChange(val) {
      this.page.page_size = val
      this.geteventlist()
    },
  }
}

</script>
<style scoped lang="less">
.content {
  width: 100%;
  padding-top: 15px;
}

.page {
  padding-top: 15px;
  text-align: right;
}

</style>
