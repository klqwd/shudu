<template>
  <div>
    <div class="offset">
      <el-row>
        <el-col :span="24" style="padding: 20px">
          <div class="grid-content bg-purple-dark"></div>
        </el-col>
      </el-row>
    </div>
    <Layout />
  </div>
</template>

<script>
  import Layout from '@/vab/layouts/VabLayout.vue'

  export default {
    components: {
      Layout,
    },
    data() {
      return {}
    },

    created() {
      this.value = {
        value: '选项5',
        label: '北京烤鸭',
      }
    },

    mounted() {},
    methods: {
      // chnage触发
      change(e) {
        console.log(e) // 打印整个对象
      },
    },
  }
</script>

<style scoped>
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
</style>
