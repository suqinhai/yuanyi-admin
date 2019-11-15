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
      <el-table-column show-overflow-tooltip prop="sort" label="排序">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="分类名称">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="desc" label="描述">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="states" label="显示">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.states" @change="changeSwitch(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="level" label="级别">
      </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleModif(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
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
          <el-input v-model="form.name" placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort" placeholder="请输入排序" type="number"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" :rows="3" v-model="form.desc" placeholder="请输入描述"></el-input>
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
        name: '',
        parent_id: this.$route.query.parent_id,
        sort: '',
        desc: '',
      },
      page: {
        page_size: 15,
        page_index: 1,
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
    handleModif(data){
      this.form = JSON.parse(JSON.stringify(data))
      this.form.parent_id = this.$route.query.parent_id
      this.dialogVisible = true
    },
    handleDelete(row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = '/product/category/delete'
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
        name: this.form.name,
        sort: parseInt(this.form.sort),
        desc: this.form.desc,
      }
      if(this.form.id){
        url = '/product/category/modify'
        data['id'] = this.form.id
      }else{
        url = '/product/category/new'
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
        name: '',
        parent_id: this.$route.query.parent_id,
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
        id: params.id
      }
      this.$axios.post(url, data).then((res) => {
        this.$message({
          message: res.msg,
          type: 'success'
        });
      })
    },
    geteventlist() {
      let url = '/product/category/list'
      let data  = {
        page: {
          page_size:this.page.page_size,
          page_index: this.page.page_index,
        },
        parent_id: parseInt(this.form.parent_id),
      }
      this.$axios.post(url,data).then((res) => {
        res.data.pcs.forEach((res) => {
          res.states = res.states ? true : false
        })
        this.tableData = res.data.pcs
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
