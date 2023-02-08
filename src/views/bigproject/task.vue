<template>
  <div>
    <div
      v-if="resolve == false"
      style="padding-top: 10px; padding-left: 20px"
      @click="$router.go(-1)"
    >
      <i class="el-icon-back" style="font-size: 18px"></i>
      <el-button style="font-size: 18px; color: #000" type="text">
        返回
      </el-button>
      <div style="display: inline; margin-left: 70px; font-size: 18px">
        {{ JSON.parse($route.query.row).matterName }}
      </div>
    </div>
    <div
      v-if="resolve"
      style="padding-top: 10px; padding-left: 20px"
      @click="getProjectTaskParentByParentid"
    >
      <i class="el-icon-back" style="font-size: 18px"></i>
      <el-button style="font-size: 18px; color: #000" type="text">
        任务分解返回
      </el-button>
      <div style="display: inline; margin-left: 70px; font-size: 18px">
        {{ JSON.parse($route.query.row).matterName }}+
        <span v-if="lastRow.taskName != row.taskName">
          {{ lastRow.taskName }}+
        </span>
        {{ row.taskName }}
      </div>
    </div>
    <div style="padding-left: 20px; margin-top: 20px">
      <!-- <template slot-scope="scope"> -->
      <el-button
        type="primary"
        @click="
          dialogFormVisible = true
          dialogTitle = '新增'
        "
      >
        增加
      </el-button>
      <el-button type="danger" @click="deleteProjectTaskByIdList()">
        删除
      </el-button>
      <!-- </template> -->
    </div>
    <div>
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="80" />
        <el-table-column label="任务名称" prop="taskName" />
        <el-table-column label="计划开始时间" prop="startTime" />
        <el-table-column label="计划完成时间" prop="endTime" />
        <el-table-column
          label="责任单位"
          prop="organName"
          show-overflow-tooltip
        />
        <el-table-column label="责任人" prop="realName" show-overflow-tooltip />
        <el-table-column
          label="审核日期"
          prop="examineDate"
          show-overflow-tooltip
        />
        <el-table-column
          label="审核人"
          prop="examineUser"
          show-overflow-tooltip
        />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="view(scope.row)">查看</el-button>
            <el-button type="text" @click="alter(scope.row)">修改</el-button>
            <el-button type="text" @click="deleteProjectTaskById(scope.row)">
              删除
            </el-button>
            <el-button type="text" @click="examineDialog(scope.row)">
              审核
            </el-button>
            <el-button type="text" @click="getProjectTaskByParentid(scope.row)">
              分解
            </el-button>
            <el-button type="text" @click="taskprogress(scope.rofw)">
              完成情况
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加弹出框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      @close="closeDialog"
    >
      <el-form
        :disabled="dialogTitle == '查看'"
        label-position="left"
        label-width="110px"
        :model="form"
      >
        <el-form-item label="任务名称">
          <el-input v-model="form.taskName" />
        </el-form-item>
        <el-form-item label="责任单位">
          <template slot-scope="scope">
            <el-select
              v-model="form.gid"
              placeholder="请选择"
              @change="getInformant(scope.row)"
            >
              <el-option
                v-for="item in organName"
                :key="item.gid"
                :label="item.organName"
                :value="item.gid"
              />
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="责任人">
          <el-select v-model="form.uid" placeholder="请选择">
            <el-option
              v-for="item in realName"
              :key="item.uid"
              :label="item.realName"
              :value="item.uid"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="计划开始时间">
          <el-date-picker
            v-model="form.startTime"
            placeholder="选择日期"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="计划完成时间">
          <el-date-picker
            v-model="form.endTime"
            placeholder="选择日期"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="是否目标任务">
          <el-radio-group v-model="form.target">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="目标类型">
          <el-radio-group v-model="form.targetType">
            <el-radio :label="1">完成值</el-radio>
            <el-radio :label="2">比例</el-radio>
            <el-radio :label="3">是否完成</el-radio>
            <el-radio :label="4">情况报告</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核人">
          <el-input v-model="form.examineUser" />
        </el-form-item>
        <el-form-item label="审核日期">
          <el-input v-model="form.examineDate" />
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="form.unit" />
        </el-form-item>
        <upload />
        <el-form-item label="备注">
          <el-input v-model="form.remarks" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="saveProjectTask(), (dialogFormVisible = false)"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 添加弹出框 -->

    <!-- 审批弹出框 -->
    <el-dialog title="审批意见" :visible.sync="dialogExamineVisible">
      <el-form label-width="110px" :model="form">
        <el-form-item label="审批意见">
          <el-input v-model="examineContent" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogExamineVisible = false">取 消</el-button>
        <el-button type="primary" @click="examineProjectTask()">
          确 定
        </el-button>
      </div>
    </el-dialog>

    <!-- 审批弹出框 -->
  </div>
</template>

<script>
  import {
    getProjectTaskAllByMid,
    saveProjectTask,
    deleteProjectTaskById,
    getProjectTaskByParentid,
    // getProjectNavigationBarDtoByTid,
    getProjectTaskParentByParentid,
    deleteProjectTaskByIdList,
    examineProjectTask,
  } from '@/api/majorProject/task'
  import upload from '@/components/upload'
  import { getUserOrganList } from '@/mixins/getUserOrganList'
  export default {
    components: {
      upload,
    },
    mixins: [getUserOrganList],
    data() {
      return {
        tableData: [
          {
            taskName: '',
            startTime: '',
            endTime: '',
            organName: '',
            realName: '',
            examineDate: '',
            examineUser: '',
          },
        ],
        tidList: [],
        dialogFormVisible: false,
        dialogExamineVisible: false,
        resolve: false,
        row: '',
        lastRow: {},
        fileList: [],
        organName: '',
        realName: '',
        loading: false,
        dialogTitle: '',
        examineContent: '',
        form: {
          endTime: '',
          gid: '',
          mid: JSON.parse(this.$route.query.row).mid,
          parentid: 0,
          remarks: '',
          startTime: '',
          target: 0,
          targetValue: 0,
          taskName: ' ',
          taskState: 0,
          tid: '',
          uid: '',
          unit: '',
          examineDate: '',
          examineUser: '',
        },
      }
    },
    created() {
      this.getProjectTaskAllByMid()
    },
    methods: {
      // 删除
      async deleteProjectTaskById(row) {
        await deleteProjectTaskById({
          tid: row.tid,
        })
        this.getProjectTaskAllByMid()
      },
      // 点击复选框，获取删除信息列表
      handleSelectionChange(val) {
        this.tidList = []
        val.forEach((item) => {
          this.tidList.push(item.tid)
        })
      },
      // 批量删除信息
      async deleteProjectTaskByIdList() {
        await deleteProjectTaskByIdList({
          tidList: this.tidList.toString(),
        })
        this.getProjectTaskAllByMid()
      },
      // 跳转到任务完成信息
      taskprogress(row) {
        localStorage.setItem('row', JSON.stringify(row))
        this.$router.push({
          path: 'taskprogress',
          query: {
            tid: row,
            projectName: this.matterName,
          },
        })
      },
      // 清空表单
      closeDialog() {
        this.form = {
          endTime: '',
          gid: '',
          mid: JSON.parse(this.$route.query.row).mid,
          parentid: 0,
          remarks: '',
          startTime: '',
          target: 0,
          targetValue: 0,
          taskName: ' ',
          taskState: 0,
          tid: '',
          uid: '',
          unit: '',
          examineDate: '',
          examineUser: '',
        }
      },

      // 新增
      async saveProjectTask() {
        await saveProjectTask(this.form)
        this.getProjectTaskAllByMid()
      },
      // 获取列表数据
      async getProjectTaskAllByMid() {
        this.loading = true
        if (this.resolve == false) {
          // 根据mid获取任务列表
          const data = await getProjectTaskAllByMid({
            mid: JSON.parse(this.$route.query.row).mid,
          })
          this.tableData = data.data
        } else {
          // 根据上级的任务获取子级任务
          this.getProjectTaskByParentid(this.row)
        }
        this.loading = false
      },
      // 根据上级任务ID获取子级任务信息列表，分解
      async getProjectTaskByParentid(row) {
        this.loading = true
        console.log(row)
        if (!this.row) {
          this.lastRow = row //把任务列表那一行数据保存，然后用来显示任务名称
        }
        this.row = row
        if (!this.row.tid) {
          // 如果没有tid就获取整个任务列表
          this.resolve = false
          this.getProjectTaskAllByMid()
        } else {
          // 向下分解
          const data = await getProjectTaskByParentid({
            parentid: this.row.tid,
          })
          this.tableData = data.data
          this.form.parentid = row.tid
          this.resolve = true
        }
        this.loading = false
      },
      // 返回上上级id
      async getProjectTaskParentByParentid() {
        // 根据上一级的tid获取上上级tid，跳转待上一页
        const data = await getProjectTaskParentByParentid({
          parentid: this.row.tid,
        })
        this.row.tid = data.data.tid
        this.getProjectTaskByParentid(this.row)
      },

      // 打开查看弹出框
      view(row) {
        this.dialogTitle = '查看'
        this.form = row
        this.getUserList().then(() => {
          this.dialogFormVisible = true
        })
      },
      // 打开修改弹出框
      alter(row) {
        this.dialogTitle = '修改'
        this.form = row
        this.getUserList().then(() => {
          this.dialogFormVisible = true
        })
      },

      // 打开审核弹出框
      examineDialog(row) {
        this.dialogExamineVisible = true
        this.row = row
      },
      // 任务审核
      async examineProjectTask() {
        await examineProjectTask({
          tid: this.row.tid,
          examineContent: this.examineContent,
        })
        this.dialogExamineVisible = false
      },
    },
  }
</script>

<style></style>
