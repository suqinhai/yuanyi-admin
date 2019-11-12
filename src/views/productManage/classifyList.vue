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
    </el-table>
    <el-dialog title="新增分类" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="分类名称">
           <el-input v-model="form.name" placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="上级分类">
          <el-select v-model="form.parent_id" placeholder="请选择上级分类" style="width: 100%">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
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
      form:{
        name:'',
        parent_id:'',
        sort:'',
        desc:'',
      },
      dialogVisible: false,
      tableData: [],
      categoryList:[],
    }
  },
  created() {
    this.geteventlist()
  },
  methods: {
    handleDelete(row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = '/crm/delete'
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
    save(){
      let url = '/product/category/new'
      let data = {
        name: this.form.name,
        parent_id: this.form.parent_id,
        sort: parseInt(this.form.sort),
        desc: this.form.desc,
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
    add(){
      this.dialogVisible = true
    },
    handleClose(){
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
      let url = '/product/category/tree'
      this.$axios.post(url).then((res) => {
        res.data.tree.forEach((res) => {
          res.states = res.states ? true : false
        })
        this.categoryList = JSON.parse(JSON.stringify(res.data.tree))
        this.categoryList.unshift({id:0,name:'顶级分类'})
        this.tableData = res.data.tree
      })
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
