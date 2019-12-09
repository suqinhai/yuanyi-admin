<template>
  <section class="content">
    <div class="tools">
      <el-button style="margin-bottom:10px" type="primary" size="mini" @click="add">新增</el-button>
    </div>
    <div class="util">
      <div class="tool">
        <el-input style="width:200px;;margin-bottom:10px" placeholder="请输入商品名称" v-model="form.name" size="mini" clearable>
        </el-input>
        <el-select v-model="form.category_id" size="mini" placeholder="请选择分类">
          <el-option v-for="item in optionClassify" :key="item.id.toString()" :label="item.name" :value="item.id.toString()">
          </el-option>
        </el-select>
        <el-select v-model="form.states" size="mini" placeholder="请选择状态">
          <el-option v-for="item in optionStates" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button size="mini" @click="search
" type="primary" style="margin-left:0px">搜索</el-button>
        <el-button size="mini" @click="reset" type="primary" style="margin-left:0">重置</el-button>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%" size="mini">
      <el-table-column show-overflow-tooltip prop="id" type="selection" width="55">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="id" label="商品ID">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="商品名称">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="details_pic_url" label="商品图片">
        <template slot-scope="scope">
          <el-tooltip placement="top">
              <div slot="content"><img :src="scope.row.details_pic_url" width="200px"></div>
              <a href="jacascript:;" class="el-icon-picture"></a>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="category_name" label="类别">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="states" label="状态">
        <template slot-scope="scope">
          {{scope.row.states ? '上架': '下架'}}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="index_show" label="首页推荐">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.index_show" @change="changeIndexShowSwitch(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="states" label="商品上架">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.states" @change="changeStatesSwitch(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
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
        name: "",
        states: 2,
        category_id: '',
      },
      page: {
        page_size: 15,
        page_index: 1,
      },
      tableData: [],
      count: 0,
      optionClassify: [],
      optionStates: [{
        value: 2,
        label: '全部',
      }, {
        value: 1,
        label: '上架',
      }, {
        value: 0,
        label: '下架',
      }]
    }
  },
  created() {
    this.geteventlist()
    this.getClassifyList()
  },
  methods: {
    getClassifyList() {
      let url = '/product/category/tree'
      this.$axios.post(url).then((res) => {
        res.data.tree.unshift({
          id: '',
          name: '全部'
        })
        this.optionClassify = JSON.parse(JSON.stringify(res.data.tree))
      })
    },
    changeIndexShowSwitch(params) {
      let url = '/product/indexshow/change'
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
    changeStatesSwitch(params){
      let url = '/product/state/change'
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
        name: "",
        states: "",
        category_id: '',
      }
      this.geteventlist()
    },
    changeDate(data) {
      this.form.begin_time = data[0].getTime()
      this.form.end_time = data[0].getTime()
    },
    add(){
      this.$router.push({
        path:'/Y2019moc.rgaykcul/addGoods'
      })
    },
    handleEdit(data){
      localStorage.setItem("goods", JSON.stringify(data));
      this.$router.push({
        path:'/Y2019moc.rgaykcul/addGoods',
        query:{
          id:data.id
        }
      })
    },
    handleDelete(row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = '/product/delete'
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
      let url = '/product/list'
      let data = {
        page: {
          page_size: this.page.page_size,
          page_index: this.page.page_index,
        },
        name: this.form.name,
      }
      this.form.category_id === '' ?  '' : data['category_id'] = this.form.category_id
      this.form.states === '' ?  '' : data['states'] = this.form.states
      this.$axios.post(url, data).then((res) => {
        res.data.ps.forEach((item)=>{
          item.index_show = item.index_show ? true : false
          item.states = item.states ? true : false
        })
        this.tableData = res.data.ps
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
