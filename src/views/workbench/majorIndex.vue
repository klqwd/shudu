<template>
  <div>
    <div class="tabs">
      <el-row>
        <el-col :span="6">
          <tabs />
        </el-col>
        <el-col :offset="11" :span="3">
          <el-select
            v-model="year"
            placeholder="请选择年份"
            @change="getIndicatorTypeRecordListByYear()"
          >
            <el-option
              v-for="item in selectYear"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="3" style="margin-left: 10px">
          <el-select
            v-model="tid"
            placeholder="请选择指标"
            value-key="tid"
            @change="getIndicatorRecordListByTid"
          >
            <el-option
              v-for="item in selectTid"
              :key="item.tid"
              :label="item.indicatorName"
              :value="item"
            />
          </el-select>
        </el-col>
      </el-row>
    </div>

    <div class="offset">
      <el-table
        :data="tableData"
        :header-cell-style="{ background: '#f5f6f7' }"
        style="border: 1px solid #eef2f6"
      >
        <!-- <el-table-column
          align="center"
          label="指标名称"
          prop="date"        
        />
        <el-table-column
          align="center"
          label="计算单位"
          prop="name"
          width="120"
        />

        <el-table-column align="center" label="季度累计">
          <el-table-column
            align="center"
            label="第一季度"
            prop="province"
            
          />
          <el-table-column
            align="center"
            label="第二季度"
            prop="city"
            
          />
          <el-table-column
            align="center"
            label="第三季度"
            prop="address"
            
          />
          <el-table-column
            align="center"
            label="第四季度"
            prop="zip"
            
          />
        </el-table-column> -->
        <el-table-column align="center" label="指标名称" prop="indicatorName" />
        <el-table-column
          align="center"
          :formatter="convertDateType"
          label="填报周期"
          prop="dateType"
        />

        <el-table-column align="center" label="指标值" prop="num" width="230">
          <template slot-scope="scope">
            {{ scope.row.num }}
            <span
              v-if="scope.row.num"
              style="margin-left: 10px; color: #c4c4cd"
            >
              同比
            </span>
            <i
              v-if="scope.row.num"
              class="iconfont icon-tubiaoshangshengqushi"
              style="margin-left: 10px; color: #fe889f"
            ></i>
            <span
              v-if="scope.row.num"
              style="margin-left: 10px; color: #c4c4cd"
            >
              9.2%
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="计量单位" prop="unit" />
        <el-table-column
          align="center"
          label="填报人"
          prop="realName"
          style="tableIcon"
        >
          <template slot-scope="scope">
            {{ scope.row.realName }}
            <span
              class="iconfont icon-24gf-phoneLoudspeaker"
              style="padding-left: 10px; color: #4dab9b"
            ></span>
            <span
              class="iconfont icon-a-ziyuan617"
              style="padding-left: 10px; color: #4dab9b"
            ></span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="填报单位" prop="organName" />
      </el-table>
    </div>
    <div>
      <pagination
        :page="page"
        @changPageSize="changePageSize"
        @changePageNum="changePageNum"
      />
    </div>
    <div
      v-if="showEchart"
      id="EChart"
      style="
        height: 300px;
        margin-left: 280px;
        margin-top: 50px;
        background-color: #fff;
      "
    ></div>
    <Layout />
  </div>
</template>

<script>
  import tabs from '@/components/tabs.vue'

  import Layout from '@/vab/layouts/VabLayout.vue'
  import {
    getIndicatorTypeRecordListByYear,
    getIndicatorTypeList,
    getIndicatorRecordListByTid,
  } from '@/api/workbench/majorIndex'
  import pagination from '@/components/pagination.vue'
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
        tableData: [
          {
            dateType: '填报周期',
            indicatorName: '指标名称',
            num: '指标值',
            unit: '单位',
            realName: '填报人',
            organName: '填报机构',
          },
        ],
        selectYear: [
          { value: 2019, label: 2019 },
          {
            value: 2020,
            label: 2020,
          },
          {
            value: 2021,
            label: 2021,
          },
          {
            value: 2022,
            label: 2022,
          },
        ],
        year: '2022',
        tid: {},
        selectTid: [],
        xAsisNumber: [],
        yAsisNumber: [],
        showEchart: true,
        page: {
          pageNum: 1,
          pageSize: 20,
          total: null,
          totalPage: '',
        },
      }
    },
    created() {
      this.getIndicatorTypeRecordListByYear()
      this.getIndicatorTypeList(), this.getIndicatorRecordListByTid()
    },
    mounted() {},
    methods: {
      // 根据年份获取各指标分类最新数据列表
      async getIndicatorTypeRecordListByYear() {
        const data = await getIndicatorTypeRecordListByYear({
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
          year: this.year,
        })
        this.tableData = data.data.list
        this.page = data.data
        this.showEchart = false
      },
      // 获取指标列表
      async getIndicatorTypeList() {
        const data = await getIndicatorTypeList({
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
          indicatorName: '',
          dateType: '',
          unit: '',
        })
        this.selectTid = data.data.list
        // 给select增加了一个全部的选项
        const complete = {
          indicatorName: '全部',
          tid: 0,
        }
        this.selectTid.unshift(complete)
      },

      // 根据指标分类获取指标值
      async getIndicatorRecordListByTid(item) {
        if (!item.tid) {
          this.getIndicatorTypeRecordListByYear() //如果点击的是全部就获取整个列表
        } else {
          this.showEchart = true
          this.xAsisNumber = []
          this.yAsisNumber = []
          const data = await getIndicatorRecordListByTid({
            pageNum: 1,
            pageSize: 20,
            tid: item.tid,
            year: this.year,
          })

          this.tableData = data.data.list.sort((a, b) => {
            return a.dateNum - b.dateNum
          })
          this.tableData.forEach((item) => {
            this.yAsisNumber.push(item.num)
          })
          // 给x轴的数据加上单位
          if (this.tableData[0].dateType == 1) {
            this.tableData.forEach((item) => {
              this.xAsisNumber.push(item.dateNum + '月')
            })
          } else if (this.tableData[0].dateType == 2) {
            this.tableData.forEach((item) => {
              this.xAsisNumber.push(item.dateNum + '季度')
            })
          } else if (this.tableData[0].dateType == 3) {
            this.tableData.forEach((item) => {
              this.xAsisNumber.push(item.dateNum + '年')
            })
          }
          this.getRenderer()
        }
      },
      getRenderer() {
        // 基于准备好的dom，初始化echarts实例
        let EChart = this.$echarts.init(document.getElementById('EChart'))
        // 配置参数
        let config = {
          title: { text: this.tableData[0].indicatorName },
          tooltip: {},
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.xAsisNumber,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: this.yAsisNumber,
              type: 'line',
              smooth: true,
            },
          ],
        }
        // 设置参数
        EChart.setOption(config)
      },
      //页面条数发生变化
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getIndicatorTypeRecordListByYear()
      },
      // 页面发生变化
      changePageNum(pageNum) {
        this.page.pageNum = pageNum
        this.getIndicatorTypeRecordListByYear()
      },
    },
  }
</script>

<style scope>
  .has-gutter {
    height: 42px;
  }
</style>
