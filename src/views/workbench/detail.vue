<template>
  <div>
    <div class="tabs">
      <tabs />
    </div>
    <div class="offset">
      <div style="margin-left: 20px">
        <div>
          <div style="font-size: 25px; margin-top: 20px">
            330国道青田温溪至船寮段改建工程
          </div>
          <el-row style="margin-top: 20px">
            <el-col :span="12">
              <i class="iconfont icon-zhuye"></i>
              <span class="grid-content" style="font-weight: 600">
                建设单位:
              </span>
              <span class="detailItem">交通发展投资有限公司</span>
            </el-col>
            <el-col :span="12">
              <i class="iconfont icon-aixin"></i>
              <span class="grid-content">建设性质:</span>
              <span class="detailItem">续建</span>
            </el-col>
          </el-row>
          <el-row style="margin-top: 13px">
            <el-col :span="12">
              <i class="iconfont icon-dingwei1"></i>
              <span class="grid-content">建设地址:</span>
              <span class="detailItem">青田、温溪、三溪口、船寮</span>
            </el-col>
            <el-col :span="12">
              <i class="iconfont icon-dengpao"></i>
              <span class="grid-content">建设状态:</span>
              <span class="detailItem">已开工</span>
            </el-col>
          </el-row>
          <el-row style="margin-top: 13px">
            <el-col :span="12">
              <i class="iconfont icon-wenjianguanli"></i>
              <span class="grid-content">建设内容:</span>
              <span class="detailItem">
                一级公路主线长约33.1公里,二级公路支线长约5.4公里
              </span>
            </el-col>
          </el-row>
        </div>
        <div style="margin-top: 30px">
          <menus />
        </div>
      </div>
    </div>
    <Layout />
  </div>
</template>

<script>
  import Layout from '@/vab/layouts/VabLayout.vue'
  import menus from '@/components/menu.vue'
  import tabs from '@/components/tabs.vue'

  export default {
    components: {
      Layout,
      menus,
      tabs,
    },
    data() {
      return {}
    },
    created() {
      console.log(this.$router)
    },

    mounted() {},
  }
</script>

<style scoped>
  .detailItem {
    color: #afafaf;
    margin-left: 10px;
  }
  .grid-content {
    font-weight: 600;
  }
</style>
