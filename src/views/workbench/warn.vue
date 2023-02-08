<template>
  <div>
    <div class="tabs">
      <tabs />
    </div>
    <div class="offset">
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column
          class="stateClass"
          :formatter="convertState"
          label="状态"
          prop="warningState"
          width="180"
        />

        <el-table-column label="项目名称" prop="matterName" width="180" />
        <el-table-column label="进度" prop="progress" />
        <el-table-column label="预警节点" prop="modelName" />
        <el-table-column label="计划完成日期" prop="planEndDate" />
        <el-table-column label="责任单位" prop="organName" />
        <el-table-column label="责任人" prop="realName" />
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
  import { getWarningMatterList } from '@/api/workbench/warn'
  import { dateConvert } from '@/mixins/dateConvert'
  export default {
    components: {
      Layout,
      pagination,
      tabs,
    },
    mixins: [dateConvert],
    data() {
      return {
        tableData: {
          warningState: '', //预警状态
          matterName: '', //项目名称
          progress: '', //进度
          modelName: '', //预警节点
          planEndDate: '', //计划完成日期
          organName: '', //责任单位
          realName: '', //责任人
        },
        stateClass: '',
        page: {
          pageNum: 1,
          pageSize: 20,
          total: '',
          totalPage: '',
        },
        isFollow: '',
      }
    },
    computed: {},
    created() {
      this.getWarningMatterList()
    },

    mounted() {},
    methods: {
      //获取列表数据
      async getWarningMatterList() {
        const data = await getWarningMatterList({
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
          isFollow: this.isFollow,
        })
        this.tableData = data.data.list
        this.page = data.data
      },

      //页面条数发生变化
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getWarningMatterList()
      },
      // 页面发生变化
      changePageNum(pageNum) {
        this.page.pageNum = pageNum
        this.getWarningMatterList()
      },
    },
  }
</script>

<style scoped>
  .stateLag {
    color: #edca5c;
    border: 1px solid #edca5c;
    padding: 2px 10px;
  }
  .stateOverdue {
    color: #f17a7a;
    border: 1px solid #f17a7a;
    padding: 2px 10px;
  }
</style>
