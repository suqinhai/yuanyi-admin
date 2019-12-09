<template>
  <section class="content">
    <strong class="f-c">
      此处上传的图片是显示在网站前台的合作伙伴列表
    </strong>
    <div class="list">
      <!--<div v-for="item in bps">-->
        <el-row :gutter="20">

          <el-col :span="8" style="margin-top: 15px">
            <div class="item" style="border: #888888 1px dotted;">
              <div class="add-business" @click="add"><i class="el-icon-plus" style="text-align: center"></i>新增合作商</div>
            </div>
          </el-col>

          <el-col :span="8" v-for="item in bps" style="margin-top: 15px">
            <div class="grid-content item">
              <div style="position: relative">
                <img  class="img-logo"  v-bind:src="item.logo">
                <div style="position: absolute;top:3vh;left:13vh">
                  <strong class="business_name">{{item.business_name}}</strong>
                  <p class="business_intro">{{item.intro}}</p>
                </div>
                <div class="edit_delete_content">
                  <div class="edit" @click="edit(item)">编辑</div>
                  <div class="delete" v-on:click="del(item.id)">删除</div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="page">
        <el-pagination @size-change="handleSizeChange" :page-sizes="[10, 15, 20, 25]" layout="sizes, total, prev, pager, next" :total="count" @current-change="currentChange" :page-size="page.page_size">
        </el-pagination>
      </div>
    <!--</div>-->
  </section>
</template>

<script>
  export default {
    name: "BusinessPartnersList",
    data() {
      return {
        page:{
          page_size:15,
          page_index:1
        },
        count:0,
        bps: [],
      };
    },
    created() {
      this.getBisunessPartners()
    },
    methods:{
      currentChange(val) {
        this.page.page_index = val;
        this.geteventlist()
      },
      handleSizeChange(val) {
        this.page.page_size = val
        this.geteventlist()
      },
      getBisunessPartners(){
        let url = '/business/partners/list'
        let data = {
          page:{
            page_size: this.page.page_size,
            page_index: this.page.page_index,
          }
        }
        this.$axios.post(url,data).then((res) => {
          this.bps = res.data.bps
          this.count = res.data.page.total
        })
      },
      add(){
        this.$router.push({
          path:'/Y2019moc.rgaykcul/businessAddParter'
        })
      },
      edit(data){
        localStorage.setItem("partner", JSON.stringify(data));
        this.$router.push({
          path:'/Y2019moc.rgaykcul/businessEditPartner',
          query:{
            id:data.id
          }
        })
      },
      del(id){
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = '/business/partners/delete'
          let data = {
            id: id
          }
          this.$axios.post(url, data).then((res) => {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.getBisunessPartners()
          })
        })
      },

    }
  };
</script>

<style scoped>
  .content {
    width: 100%;
    padding-top: 15px;
  }

  .f-c {
    color: #475669;
  }

  .list {
    padding-top: 35px;
  }

  .item {
    min-height: 30vh;
    background-color: #FFFFFF;
    /*border: #3b97d7 1px dotted;   */
    border: #888888 1px solid;
    border-radius: 3px;
    box-shadow: 0 0 3px #888888 inset;
    color: #475669;
  }

  .img-logo {
    height: 8vh;
    width: 8vh;
    border-radius: 50%;
    background-color: #009DFF;
    margin: 3vh
  }

  .business_name {
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold
  }

  .add-business{
    text-align: center;line-height: 30vh;cursor: pointer
  }
  .business_intro {
    margin-top: 2vh;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 18vw
  }
  .edit_delete_content{
    position:absolute;top:22vh;height:8vh;width: 100%; background-color: #F7F9FA; box-shadow:0 0 3px #888888 inset;
  }
  .edit{
    line-height:8vh;float: left;margin-left: 4vw;cursor: pointer;
  }

  .delete{
    float: right;line-height: 8vh;margin-right: 4vw;cursor: pointer;
  }

  .page {
    padding-top: 15px;
    text-align: right;
  }
</style>
