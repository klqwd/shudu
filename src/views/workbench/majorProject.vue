<template>
  <div>
    <div class="tabs">
      <el-row>
        <el-col :span="6">
          <tabs />
        </el-col>
        <el-col :offset="4" :span="9">
          <el-checkbox-group v-model="checkList" class="checkbox">
            <el-checkbox label="工业" />
            <el-checkbox label="交通" />
            <el-checkbox label="农业" />
            <el-checkbox label="水利" />
            <el-checkbox label="生态保护" />
          </el-checkbox-group>
        </el-col>
        <el-col class="boxBold" :span="5">
          <el-checkbox
            v-model="isFollow"
            false-label="0"
            true-label="1"
            @change="getAttention"
          >
            我关注的
          </el-checkbox>
          <el-checkbox v-model="checked">最近更新的</el-checkbox>
        </el-col>
      </el-row>
    </div>
    <div class="offset">
      <div style="display: flex; flex-direction: row">
        <div class="cell">
          <div style="color: #b7b6bb">开工数</div>
          <div style="margin: 10px 0 10px 0">
            <div>
              <div style="font-size: 32px; display: inline-block">
                {{ projectStatistics.projectCount }}
              </div>
              <span style="font-size: 12px; margin-left: 10px">个</span>
            </div>
          </div>
        </div>
        <div class="cell">
          <div style="color: #b7b6bb">累计计划投资额</div>
          <div>
            <div style="margin: 10px 0 10px 0">
              <div style="font-size: 32px; display: inline-block">
                {{ projectStatistics.sumInvestmentAmount }}
              </div>
              <span style="font-size: 12px; margin-left: 10px">元</span>
            </div>
          </div>
        </div>
        <div class="cell">
          <div style="color: #b7b6bb">累计完成投资额</div>
          <div>
            <div style="margin: 10px 0 10px 0">
              <div style="font-size: 32px; display: inline-block">
                {{ projectStatistics.sumInvestmentComplete }}
              </div>
              <span style="font-size: 12px; margin-left: 10px">元</span>
            </div>
          </div>
        </div>
        <div class="cell">
          <div style="color: #b7b6bb">年度计划投资额</div>
          <div>
            <div style="margin: 10px 0 10px 0">
              <div style="font-size: 32px; display: inline-block">
                {{ projectStatistics.yearInvestmentAmount }}
              </div>
              <span style="font-size: 12px; margin-left: 10px">元</span>
            </div>
          </div>
        </div>
        <div class="cell">
          <div style="color: #b7b6bb">年度完成投资额</div>
          <div>
            <div style="margin: 10px 0 10px 0">
              <div
                v-if="projectStatistics.yearInvestmentComplete"
                style="font-size: 32px; display: inline-block"
              >
                {{ projectStatistics.yearInvestmentComplete }}
              </div>
              <div v-else style="font-size: 32px; display: inline-block">0</div>
              <span style="font-size: 12px; margin-left: 10px">元</span>
            </div>
          </div>
        </div>
      </div>

      <el-table
        v-if="resolve == false"
        v-loading="loading"
        :data="tableData"
        :header-cell-style="{ background: '#f5f6f7' }"
        style="width: 100%; border: 1px solid #eef2f6"
      >
        <el-table-column label="状态" prop="date" width="70">
          <div class="success">顺利</div>
        </el-table-column>
        <el-table-column label="事项名称" prop="matterName" />
        <el-table-column label="总体进度" prop="plan" width="150px">
          <template slot-scope="scope">
            <el-progress :percentage="scope.row.plan" />
          </template>
        </el-table-column>
        <el-table-column label="当前节点" prop="nodeName">
          开工建设
        </el-table-column>
        <el-table-column label="进展情况">
          <template slot-scope="scope">
            {{ scope.row.taskCompleteCount }}/{{ scope.row.taskCount }}
          </template>
        </el-table-column>
        <el-table-column label="节点进度" prop="nodePlan" width="150px">
          <!-- <el-progress percentage="30" /> -->
        </el-table-column>
        <el-table-column
          label="投资完成情况"
          prop="investmentComplete"
          width="180"
        >
          <!-- <span style="position: absolute; top: -3px; left: 45px">300万</span>
            <el-row>
              <el-col :span="13">
                <el-progress
                  :format="progressFormat"
                  percentage="30"
                  :text-inside="true"
                />
              </el-col>
  
              <el-col :span="6"><span>500万</span></el-col>
            </el-row> -->
        </el-table-column>
        <!-- <el-table-column label="计划投资额" prop="investmentAmount" /> -->
        <el-table-column label="责任单位" prop="organName" />
        <el-table-column label="责任人" prop="realName" />
        <!-- <el-table-column label="子任务总数量" prop="taskCount" />
          <el-table-column
            label="已完成的子任务数量"
            prop="taskCompleteCount"
            width="150px"
          /> -->

        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="
                $router.push({
                  path: '/detail',
                  name: 'detail',
                  params: { name: '详情' },
                })
              "
            >
              查看
            </el-button>
            <el-button
              v-if="scope.row.isFollow"
              type="text"
              @click="delFollowMatter(scope.row)"
            >
              取消关注
            </el-button>
            <el-button v-else type="text" @click="saveFollowMatter(scope.row)">
              关注
            </el-button>
            <el-button type="text" @click="getProjectTaskAllByMid(scope.row)">
              分解
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-table
        v-if="resolve == true"
        ref="multipleTable"
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        tooltip-effect="dark"
      >
        <el-table-column label="任务名称" prop="taskName" />
        <el-table-column label="计划开始时间" prop="startTime" />
        <el-table-column label="计划完成时间" prop="endTime" />
        <el-table-column
          label="责任单位"
          prop="organName"
          show-overflow-tooltip
        />
        <el-table-column label="责任人" prop="realName" show-overflow-tooltip />

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="getProjectTaskAllByMid(scope.row)">
              分解
            </el-button>
            <el-button
              type="text"
              @click="getProjectTaskParentByParentid(scope.row)"
            >
              返回上一级
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 页码 -->
    <div>
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
  import {
    getWorkProjectStatistics,
    getWorkProjectList,
    saveFollowMatter,
    delFollowMatter,
    getProjectTaskAllByMid,
  } from '@/api/workbench/majorProject'
  import {
    getProjectTaskByParentid,
    getProjectTaskParentByParentid,
    // getProjectTaskByTid,
  } from '@/api/majorProject/task'
  import pagination from '@/components/pagination.vue'
  // import menus from '@/components/menu.vue'
  import tabs from '@/components/tabs.vue'
  export default {
    components: {
      Layout,
      pagination,
      // menus,
      tabs,
    },
    data() {
      return {
        tableData: [
          {
            matterName: '事项名称',
            plan: '总体进度',
            nodePlan: '节点进度',
            nodeName: '当前节点',
            investmentComplete: '投资完成情况',
            investmentAmount: '计划投资额',
            organName: '责任单位',
            realName: '责任人',
            taskCompleteCount: '已完成的子任务数量',
            taskCount: '子任务总数量',
          },
        ],
        resolve: false,
        projectStatistics: {},
        checked: '',
        row: '',
        page: {
          pageNum: 1,
          pageSize: 20,
          total: null,
          totalPage: '',
        },
        loading: false,
        isFollow: '',
        checkList: ['选中且禁用', '复选框 A'],
      }
    },
    created() {
      this.getWorkProjectList()
      this.getWorkProjectStatistics()
    },
    methods: {
      // 获取重大项目列表
      async getWorkProjectList() {
        this.loading = true
        const data = await getWorkProjectList({
          isFollow: this.isFollow,
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
        })
        this.tableData = data.data.list
        this.page = data.data
        this.loading = false
      },
      //  获取重大项目统计数据
      async getWorkProjectStatistics() {
        const data = await getWorkProjectStatistics()
        this.projectStatistics = data.data
      },
      // 关注
      async saveFollowMatter(row) {
        await saveFollowMatter({
          mid: row.mid,
        }).then(
          this.$message({
            message: '关注成功',
            type: 'success',
          })
        )
        this.getWorkProjectList()
      },
      // 取消关注
      async delFollowMatter(row) {
        await delFollowMatter({
          mid: row.mid,
        }).then(
          this.$message({
            message: '取消关注成功',
            type: 'success',
          })
        )
        this.getWorkProjectList()
      },
      // 根据事项ID任务分解信息
      async getProjectTaskAllByMid(row) {
        console.log(row)
        if (this.resolve) {
          // 获取到任务列表后再对任务进行分解
          this.getProjectTaskByParentid(row.tid)
          this.row = row
        } else {
          this.row = row
          // 根据事项ID获取任务列表
          const data = await getProjectTaskAllByMid({
            mid: row.mid,
          })
          this.resolve = true
          this.tableData = data.data
        }
      },
      // 根据上级任务ID获取子级任务信息列表，分解
      async getProjectTaskByParentid(tid) {
        const data = await getProjectTaskByParentid({
          parentid: tid,
        })
        this.tableData = data.data
      },
      // 返回上上级id
      async getProjectTaskParentByParentid(row) {
        console.log(row)
        console.log(this.row)
        if (!this.row.tid) {
          this.row.tid = 0
        }
        const data = await getProjectTaskParentByParentid({
          parentid: this.row.tid,
        })
        this.row.tid = data.data.tid
        if (this.row.tid == 0) {
          this.resolve = false
          // 如果tid=0的话，就获取任务列表
          this.getProjectTaskAllByMid(this.row)
        } else if (!this.row.tid) {
          // 如果没有tid就获取重大项目列表
          this.resolve = false
          this.getWorkProjectList()
        } else {
          // 如果有tid就根据tid获取分解的任务
          this.getProjectTaskByParentid(this.row.tid)
        }
      },

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
      //点击我关注的
      getAttention() {
        this.getWorkProjectList()
      },
      // 进度条格式化
      // progressFormat() {
      //   return '50万'
      // },
      // 根据任务ID获取任务信息
      // async getProjectTaskByTid(tid) {
      //   const data = await getProjectTaskByTid({
      //     tid: tid,
      //   })
      //   this.tableData = [data.data]
      // },
    },
  }
</script>

<style scoped>
  .cell {
    /* border-right: 1px solid #e8e8e8; */
    padding: 0 71px 0 71px;
    display: flex;
    flex-direction: column;
    margin: 20px 0 20px 0;
  }
  .offset {
    background-color: #fff;
    margin-left: 290px;
    margin-right: 24px;
  }
  ::v-deep .el-menu--horizontal > .el-menu-item.is-active {
    background-color: #60b1c9;
    color: #fff;
  }
  ::v-deep .el-menu--horizontal > .el-menu-item {
    height: 30px;
    line-height: 30px;
  }
  .has-gutter {
    height: 42px;
  }
  .success {
    display: inline-block;
    color: #53b548;
    padding: 0px 5px 0px 5px;
    border: 1px solid #53b548;
  }
  ::v-deep .el-progress-bar__outer {
    height: 15px !important;
    border-radius: 0px;
    width: 30 px !important;
  }
  ::v-deep .el-progress-bar__inner {
    background-color: #45aca9;
    border-radius: 0px;
  }
  ::v-deep .el-progress-bar__innerText {
    color: #fff !important;
  }
  .boxBold .el-checkbox {
    font-weight: 600 !important;
  }
  .boxBold {
    padding-left: 25px;
    border-left: 1px solid #e4e7e9;
  }
</style>
