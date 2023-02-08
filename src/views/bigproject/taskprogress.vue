<template>
  <div>
    <div style="padding-top: 10px; padding-left: 20px" @click="$router.go(-1)">
      <i class="el-icon-back" style="font-size: 18px"></i>
      <el-button style="font-size: 18px; color: #000" type="text">
        返回
      </el-button>
      <div style="display: inline; margin-left: 70px; font-size: 18px">
        {{ row.taskName }}+{{ $router.currentRoute.meta.title }}
      </div>
    </div>
    <div style="padding-left: 20px; margin-top: 20px">
      <el-button
        type="primary"
        @click="
          form.taskName = row.taskName
          dialogTitle = '新增'
          dialogFormVisible = true
        "
      >
        增加
      </el-button>
      <el-button type="danger" @click="deleteProjectTaskCompleteByIdList()">
        删除
      </el-button>
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
        <el-table-column label="任务名称" prop="taskState ">
          {{ row.taskName }}
        </el-table-column>
        <el-table-column label="完成值" prop="completeValue" />
        <el-table-column
          label="责任单位"
          prop="organName"
          show-overflow-tooltip
        />
        <el-table-column label="责任人" prop="realName" show-overflow-tooltip />
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="view(scope.row)">查看</el-button>
            <el-button
              type="text"
              @click="deleteProjectTaskCompleteyId(scope.row)"
            >
              删除
            </el-button>
            <el-button type="text" @click="alter(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 增加弹出框 -->
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
        <el-form-item label="完成值">
          <el-input v-model="form.completeValue" />
        </el-form-item>
        <el-form-item label="完成情况">
          <el-input v-model="form.compltetion" type="textarea" />
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
        <upload />
        <el-form-item label="备注">
          <el-input v-model="form.remarks" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="saveProjectTaskComplete(), (dialogFormVisible = false)"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getProjectTaskCompleteByTid,
    saveProjectTaskComplete,
    deleteProjectTaskCompleteyId,
    deleteProjectTaskCompleteByIdList,
  } from '@/api/majorProject/task'
  import upload from '@/components/upload.vue'
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
            taskState: '任务',
            identifying: '任务标识',
            completeValue: '完成值',
            gid: '填报单位',
            uid: '填报人',
          },
        ],
        row: JSON.parse(localStorage.getItem('row')),
        dialogFormVisible: false,
        dialogTitle: '',
        organName: '',
        realName: '',
        tcidList: [],
        form: {
          taskState: '',
          completeValue: '',
          compltetion: '',
          gid: '',
          uid: '',
          remarks: '',
          tid: JSON.parse(localStorage.getItem('row')).tid,
          mid: JSON.parse(localStorage.getItem('row')).mid,
        },
      }
    },
    created() {
      this.getProjectTaskCompleteByTid()
    },
    methods: {
      // 点击复选框，获取删除信息列表
      handleSelectionChange(val) {
        this.tcidList = []
        val.forEach((item) => {
          this.tcidList.push(item.tcid)
        })
      },
      // 获取数据
      async getProjectTaskCompleteByTid() {
        this.loading = true
        const data = await getProjectTaskCompleteByTid({
          tid: JSON.parse(localStorage.getItem('row')).tid,
        })
        this.tableData = data.data
        this.loading = false
      },
      // 添加或修改数据
      async saveProjectTaskComplete() {
        this.form.taskName = this.$router.currentRoute.query.taskName
        await saveProjectTaskComplete(this.form)
        this.getProjectTaskCompleteByTid()
      },
      // 删除
      async deleteProjectTaskCompleteyId(row) {
        await deleteProjectTaskCompleteyId({
          tcid: row.tcid,
        })
        this.getProjectTaskCompleteByTid()
      },
      // 批量删除
      async deleteProjectTaskCompleteByIdList() {
        await deleteProjectTaskCompleteByIdList({
          tcidList: this.tcidList.toString(),
        })
      },
      // 查看
      view(row) {
        this.dialogTitle = '查看'
        this.form.taskName = row.taskName
        this.form = row
        this.form.taskName = this.row.taskName
        this.getUserList().then(() => {
          this.dialogFormVisible = true
        })
      },
      // 修改
      alter(row) {
        this.dialogTitle = '修改'
        this.form = row
        this.form.taskName = this.row.taskName
        this.getUserList().then(() => {
          this.dialogFormVisible = true
        })
      },

      // 清空表单
      closeDialog() {
        this.form = {
          taskState: '',
          completeValue: '',
          compltetion: '',
          gid: '',
          uid: '',
          remarks: '',
          tid: JSON.parse(localStorage.getItem('row')).tid,
          mid: JSON.parse(localStorage.getItem('row')).mid,
        }
      },
    },
  }
</script>

<style></style>
