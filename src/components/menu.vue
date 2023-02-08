<template>
  <div>
    <div>
      <el-menu
        class="el-menu-demo"
        :default-active="activeIndex"
        mode="horizontal"
        :router="true"
        style="display: inline-block"
      >
        <el-menu-item index="/projectNews">项目动态</el-menu-item>
        <el-menu-item index="/investSchedule">投资进度</el-menu-item>
        <el-menu-item index="/approvalInformation">审批信息</el-menu-item>
        <el-menu-item index="/problemFeedback">问题反馈</el-menu-item>
        <el-menu-item index="/projectMap">项目地图</el-menu-item>
      </el-menu>
    </div>
    <div>
      <router-view name="menu" />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '/projectNews',
      }
    },
    created() {},

    mounted() {},
    methods: {},
  }
</script>

<style scoped>
  ::v-deep .el-menu--horizontal > .el-menu-item.is-active {
    background-color: #60b1c9;
    color: #fff;
  }
  ::v-deep .el-menu--horizontal > .el-menu-item {
    height: 40px;
    line-height: 40px;
  }
  .el-menu-item {
    padding: 0 32px;
  }
</style>
