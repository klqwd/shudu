<template>
  <div>
    <div class="tabs">
      <tabs />
    </div>
    <div class="offset">
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column label="序号" prop="date" width="180" />
        <el-table-column label="事项分类" prop="name" width="180" />
        <el-table-column label="事项分类" prop="address" />
        <el-table-column label="状态/当前进度" prop="address" />
        <el-table-column label="最新信息" prop="address" />
        <el-table-column label="责任单位" prop="address" />
        <el-table-column label="责任人" prop="address" />
      </el-table>
      <pagination
        :page="page"
        @changPageSize="changePageSize"
        @changePageNum="changePageNum"
      />
    </div>
    <Layout />
  </div>
</template>

<script>
  import Layout from '@/vab/layouts/VabLayout.vue'
  import pagination from '@/components/pagination.vue'
  import tabs from '@/components/tabs.vue'

  export default {
    components: {
      Layout,
      pagination,
      tabs,
    },
    data() {
      return {
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
        ],
        page: {
          pageNum: 1,
          pageSize: 20,
          total: '',
          totalPage: '',
        },
      }
    },
    created() {},

    mounted() {},
    methods: {
      //页面条数发生变化
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getWorkProjectList()
      },
      // 页面发生变化
      changePageNum(pageNum) {
        this.page.pageNum = pageNum
        this.getWorkProjectList()
      },
    },
  }
</script>

<style scoped></style>
