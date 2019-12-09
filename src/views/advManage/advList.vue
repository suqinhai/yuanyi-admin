<template>
  <section class="content">
    <div class="util">
      <div class="tools">
        <el-button style="margin-bottom:10px" type="primary" size="mini" @click="add">新增</el-button>
      </div>
      <div class="tool">
        <el-input style="width:200px;;margin-bottom:10px" placeholder="请输入广告名称" v-model="form.slogan" size="mini" clearable>
        </el-input>
        <el-select v-model="form.postion_id" size="mini" placeholder="请选择状态">
          <el-option v-for="item in optionPostion" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
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
      <el-table-column show-overflow-tooltip prop="slogan" label="广告名称">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="pic_url" label="广告图片">
        <template slot-scope="scope">
          <el-tooltip placement="top">
              <div slot="content"><img :src="scope.row.pic_url" width="200px"></div>
              <a href="jacascript:;" class="el-icon-picture"></a>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="phone" label="广告位置">
        <template slot-scope="scope">
          <span v-if="scope.row.postion_id == 1 ">首页</span>
          <span v-if="scope.row.postion_id == 2 ">公司</span>
          <span v-if="scope.row.postion_id == 3 ">方案</span>
          <span v-if="scope.row.postion_id == 4 ">新闻</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="message" label="时间">
        <template slot-scope="scope">
          {{scope.row.start_time + '至' + scope.row.end_time}}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="state" label="上线/下线">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.state" @change="changeSwitch(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="clicks" label="点击次数">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="weight" label="排序">
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
        slogan: '',
        begin_time: '',
        end_time: '',
        time: '',
        postion_id: 0,
      },
      page: {
        page_size: 15,
        page_index: 1,
      },
      tableData: [],
      optionPostion:[{
        value:0,
        label: '全部'
      },{
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
      }],
      count: 0,
    }
  },
  created() {
    this.geteventlist()
  },
  methods: {
    add() {
      this.$router.push({
        path: '/Y2019moc.rgaykcul/addAdv'
      })
    },
    changeSwitch(params) {
      let url = '/ad/state'
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
        slogan: '',
        begin_time: '',
        end_time: '',
        time: '',
        postion_id: 0,
      }
      this.geteventlist()
    },
    changeDate(data) {
      this.form.begin_time = data[0].getTime() / 1000
      this.form.end_time = data[0].getTime() / 1000
    },
    handleDelete(row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = '/ad/delete'
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
    handleEdit(data) {
      localStorage.setItem("ad", JSON.stringify(data));
      this.$router.push({
        path:'/Y2019moc.rgaykcul/addAdv',
        query:{
          id:data.id
        }
      })
    },
    geteventlist() {
      let url = '/ad/get'
      let data = {
        page: {
          page_size: this.page.page_size,
          page_index: this.page.page_index,
        },
        slogan: this.form.slogan,
        start_time: this.form.start_time,
        end_time: this.form.end_time,
      }
      this.$axios.post(url, data).then((res) => {
        res.data.ads.forEach((res) => {
          res.state = res.state ? true : false
        })
        this.tableData = res.data.ads
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
