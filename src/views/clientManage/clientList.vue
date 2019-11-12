<template>
  <section class="content">
    <div class="util">
      <div class="tool">
        <el-input style="width:200px;;margin-bottom:10px" placeholder="请输入姓名" v-model="form.name" size="mini" clearable>
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
      <el-table-column show-overflow-tooltip prop="name" label="姓名">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="email" label="邮箱">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="phone" label="手机">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="official_web" label="官网">
        <template slot-scope="scope">
          <a :href="scope.row.official_web" target="_blank">{{scope.row.official_web}}</a>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="message" label="留言内容">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="save_time" label="发布时间">
      </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="200">
        <template slot-scope="scope">
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
        name: '',
        begin_time: '',
        end_time: '',
        time: '',
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
        name: '',
        begin_time: '',
        end_time: '',
        time: '',
      }
      this.geteventlist()
    },
    changeDate(data) {
      this.form.begin_time = data[0].getTime()
      this.form.end_time = data[0].getTime()
    },
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
    geteventlist() {
      let url = '/crm/list'
      let data = {
        page: this.page.page_size,
        page_index: this.page.page_index,
        name: this.form.name,
        begin_time: this.form.begin_time,
        end_time: this.form.end_time,
      }
      this.$axios.post(url, data).then((res) => {
        this.tableData = res.data.crms
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
