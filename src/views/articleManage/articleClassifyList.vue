<template>
  <section class="content">
    <div class="util">
      <div class="tool">
        <el-button size="mini" @click="add" type="primary" style="margin-bottom:10px">新增</el-button>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%" size="mini">
      <el-table-column show-overflow-tooltip prop="id" type="selection" width="55">
      </el-table-column>
       <el-table-column show-overflow-tooltip prop="id" label="ID">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="type_name" label="分类名称">
      </el-table-column>
       <el-table-column show-overflow-tooltip prop="sort" label="排序">
      </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleModif(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="clickLevel(scope.row)" type="text" size="small">下级分类</el-button>
        </template>
      </el-table-column>
    </el-table>
     <div class="page">
      <el-pagination @size-change="handleSizeChange" :page-sizes="[10, 15, 20, 25]" layout="sizes, total, prev, pager, next" :total="count" @current-change="currentChange" :page-size="page.page_size">
      </el-pagination>
    </div>
    <el-dialog title="新增分类" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="form.type_name" placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort" placeholder="请输入排序" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
export default {
  data() {
    return {
      form: {
        type_name: '',
        parent_id: 0,
        sort: '',
        desc: '',
      },
      page:{
        page_size:15,
        page_index:1
      },
      dialogVisible: false,
      tableData: [],
      count:0,
    }
  },
  created() {
    this.geteventlist()
  },
  methods: {
    clickLevel(data) {
      this.$router.push({
        path: '/articleLowerClassifyList',
        query:{
          parent_id: data.id
        }
      })
    },
    handleModif(data){
      this.form = JSON.parse(JSON.stringify(data))  
      this.form.parent_id = 0
      this.dialogVisible = true
    },
    handleDelete(row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = '/article/category/delete'
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
    save() {
      let url
      let data = {
        type_name: this.form.type_name,
        parent_id: this.form.parent_id,
        sort: parseInt(this.form.sort),
      }
      if(this.form.id){
        url = '/article/category/edit'
        data['id'] = this.form.id
      }else{
        url = '/article/category/new'
        data['parent_id'] = this.form.parent_id
      }
      this.$axios.post(url, data).then((res) => {
        this.$message({
          message: res.msg,
          type: 'success'
        });
        this.geteventlist()
        this.dialogVisible = false
      })
    },
    add() {
      this.form = {
        type_name: '',
        parent_id: 0,
        sort: '',
        desc: '',
      }
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    changeSwitch(params) {
      let url = '/product/category/state'
      let data = {
        id: params.id,
      }
      this.$axios.post(url, data).then((res) => {
        this.$message({
          message: res.msg,
          type: 'success'
        });
      })
    },
    geteventlist() {
      let url = '/article/category/list'
      let data = {
        parent_id: this.form.parent_id,
        page:{
          page_size: this.page.page_size,
          page_index: this.page.page_index,
        }
      }
      this.$axios.post(url,data).then((res) => {
        res.data.ats.forEach((res) => {
          res.states = res.states ? true : false
        })
        this.tableData = res.data.ats
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
