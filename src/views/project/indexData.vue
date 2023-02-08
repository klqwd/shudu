<template>
  <div>
    <div style="display: flex; justify-content: flex-end; padding-top: 20px">
      <el-input
        v-model="searchInput.dateType"
        placeholder="请输入填报周期"
        style="width: 150px; margin-right: 10px"
      />
      <el-input
        v-model="searchInput.indicatorName"
        placeholder="请输入指标名称"
        style="width: 150px; margin-right: 10px"
      />
      <el-input
        v-model="searchInput.unit"
        placeholder="请输入单位"
        style="width: 150px; margin-right: 10px"
      />
      <el-button style="margin-right: 20px" type="primary" @click="search">
        <i class="el-icon-search">查询</i>
      </el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" prop="state" type="index" width="120" />
      <el-table-column label="指标名称" prop="indicatorName" />
      <el-table-column label="指标值" prop="num" />
      <el-table-column label="单位" prop="unit" />
      <el-table-column
        :formatter="convertDateType"
        label="填报周期"
        prop="dateType"
      />
      <el-table-column label="填报单位" prop="organName" />
      <el-table-column label="填报人" prop="realName" />
    </el-table>
    <!-- 页码 -->
    <div>
      <pagination
        :page="page"
        @changPageSize="changePageSize"
        @changePageNum="changePageNum"
      />
    </div>
  </div>
</template>

<script>
  import { getIndicatorRecordList } from '@/api/indicator'
  import pagination from '@/components/pagination.vue'
  import { dateConvert } from '@/mixins/dateConvert'
  export default {
    components: {
      pagination,
    },
    mixins: [dateConvert],
    data() {
      return {
        tableData: [
          {
            indicatorName: '人均地区生产总值',
            unit: '元',
            dateType: '天',
            organName: '青田县',
            realName: '管理员',
            num: '',
          },
        ],
        searchInput: {
          dateType: '',
          indicatorName: '',
          unit: '',
        },
        page: {
          pageNum: 1,
          pageSize: 20,
          total: '',
          totalPage: '',
        },
      }
    },
    computed: {
      dateTypeInput() {
        if (this.searchInput.dateType == '月') {
          return '1'
        } else if (this.searchInput.dateType == '季度') {
          return '2'
        } else if (this.searchInput.dateType == '年') {
          return '3'
        } else {
          return ''
        }
      },
    },
    created() {
      this.getIndicatorRecordList()
    },
    methods: {
      // 获取指标填报数据
      async getIndicatorRecordList() {
        const data = await getIndicatorRecordList({
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
          dateType: this.dateTypeInput,
          indicatorName: this.searchInput.indicatorName,
          unit: this.searchInput.unit,
        })
        this.tableData = data.data.list
        this.page = data.data
      },
      // 查询
      search() {
        this.getIndicatorRecordList()
      },
      //页面pageSize变化
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getIndicatorRecordList()
      },
      // 页面pageNum变化
      changePageNum(pageNum) {
        this.page.pageNum = pageNum
        this.getIndicatorRecordList()
      },
    },
  }
</script>

<style></style>
