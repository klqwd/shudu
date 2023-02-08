<template>
  <div>
    <el-breadcrumb class="bread" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/majorIndex' }">
        数督青田
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        {{ $router.currentRoute.meta.title }}
      </el-breadcrumb-item>
      <!-- <el-breadcrumb-item>
            {{ tid.indicatorName }}
          </el-breadcrumb-item> -->
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    // props: {
    // tid: {
    //   type: [String, Array],
    //   required: false,
    //   default() {
    //     return ''
    //   },
    // },
    // },
    data() {
      return {}
    },
    created() {},

    mounted() {},
  }
</script>

<style scoped>
  .bread {
    border-left: solid 5px #409e90;
    padding-left: 10px;
  }
  .checkbox {
    margin: 30px 0 0 0px;
    /* padding: 30px 0 0 0; */
  }
  .el-checkbox {
    margin-right: 15px;
  }
</style>
