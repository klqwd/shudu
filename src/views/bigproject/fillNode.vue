<template>
  <div>
    <div style="padding-top: 10px; padding-left: 20px" @click="$router.go(-1)">
      <i class="el-icon-back" style="font-size: 18px"></i>
      <el-button style="font-size: 18px; color: #000" type="text">
        返回
      </el-button>
      <div style="display: inline; margin-left: 70px; font-size: 18px">
        {{ $route.query.matterName }}+{{
          JSON.parse($route.query.row).nodeName
        }}+{{ $router.currentRoute.meta.title }}
      </div>
    </div>
    <!-- 按钮 -->
    <div style="padding-left: 20px; margin-top: 20px">
      <el-button type="primary" @click="fill">增加</el-button>
      <el-button type="danger" @click="deleteProjectNodePlanByNpIdList()">
        删除
      </el-button>
    </div>
    <!-- 按钮 -->
    <!-- 表格 -->
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
        <el-table-column label="节点名称" prop="nodeName">
          {{ JSON.parse($route.query.row).nodeName }}
        </el-table-column>
        <el-table-column label="进度" prop="plan" />
        <!-- <el-table-column label="计划开始时间" prop="startTime" />
        <el-table-column label="计划完成时间" prop="endTime" /> -->
        <el-table-column
          label="责任单位"
          prop="organName"
          show-overflow-tooltip
        />
        <el-table-column label="责任人" prop="realName" show-overflow-tooltip />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="alter(scope.row)">修改</el-button>
            <el-button type="text" @click="deleteProjectNodePlanyId(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 表格 -->
    <!-- 填报弹出框 -->
    <el-dialog title="填报" :visible.sync="fillVisible" @close="closeDialog">
      <el-form label-position="left" label-width="80px" :model="form">
        <!-- <el-form-item label="日期">
          <el-date-picker
            v-model="form.createTime"
            placeholder="选择日期"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item> -->

        <el-form-item label="节点名称">
          <el-input v-model="form.nodeName" />
        </el-form-item>
        <el-form-item label="进度(%)">
          <el-input v-model="form.plan" />
        </el-form-item>

        <upload />
        <el-form-item label="备注">
          <el-input v-model="form.remarks" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="fillVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="saveProjectNodePlan(), (fillVisible = false)"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 填报弹出框 -->
    <!-- 修改弹出框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="alterVisible"
      @close="closeDialog"
    >
      <el-form label-position="left" label-width="80px" :model="form">
        <!-- <el-form-item label="日期">
          <el-date-picker
            v-model="form.createTime"
            placeholder="选择日期"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item> -->

        <el-form-item label="节点名称">
          <el-input v-model="form.nodeName" />
        </el-form-item>
        <el-form-item label="进度(%)">
          <el-input v-model="form.plan" />
        </el-form-item>
        <upload />
        <el-form-item label="备注">
          <el-input v-model="form.remarks" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="alterVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="saveProjectNodePlan(), (alterVisible = false)"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 修改弹出框 -->
  </div>
</template>

<script>
  import {
    getProjectNodePlanByMid,
    getProjectNodePlanByNid,
    deleteProjectNodePlanByNpIdList,
    deleteProjectNodePlanyId,
    saveProjectNodePlan,
  } from '@/api/majorProject/node'

  import upload from '@/components/upload.vue'
  export default {
    components: {
      upload,
    },
    data() {
      return {
        tableData: [
          {
            nodeName: '',
            startTime: '',
            endTime: '',
            uid: '',
            gid: '',
          },
        ],
        dialogTitle: '',
        fileList: [],
        fillVisible: false,
        alterVisible: false,
        loading: false,
        form: {
          mid: JSON.parse(this.$route.query.row).mid,
          endTime: '',
          gid: '',
          uid: '',
          nodeName: JSON.parse(this.$route.query.row).nodeName,
          remarks: '',
          startTime: '',
          plan: '',
          nid: JSON.parse(this.$route.query.row).nid,
        },
        npidList: [],
      }
    },
    created() {
      this.getProjectNodePlanByMid()
      this.getProjectNodePlanByNid()
    },

    methods: {
      // 根据事项ID获取节点进度列表
      async getProjectNodePlanByMid() {
        await getProjectNodePlanByMid({
          mid: JSON.parse(this.$route.query.row).mid,
        })
      },
      // 根据节点ID获取节点进度信息
      async getProjectNodePlanByNid() {
        this.loading = true
        const data = await getProjectNodePlanByNid({
          nid: JSON.parse(this.$route.query.row).nid,
        })
        this.tableData = data.data
        this.loading = false
        // this.tableData.forEach((item, index) => {
        //   this.tableData[index].nodeName = this.$route.query.nodeName
        // })
      },
      // 打开填报弹出框
      fill() {
        this.dialogTitle = '增加'
        this.fillVisible = true
      },
      // 添加或修改节点进度信息
      async saveProjectNodePlan() {
        await saveProjectNodePlan(this.form)
        this.getProjectNodePlanByNid(this.$route.query.nid)
      },
      // 修改
      alter(row) {
        console.log(row)
        this.dialogTitle = '修改'
        this.form = row
        ;(this.form.nodeName = JSON.parse(this.$route.query.row).nodeName),
          (this.alterVisible = true)
      },
      // 点击selection触发事件
      handleSelectionChange(val) {
        this.npidList = []
        val.forEach((item) => {
          this.npidList.push(item.npid)
        })
        console.log(this.npidList)
      },
      // 批量删除信息
      async deleteProjectNodePlanByNpIdList() {
        console.log(this.npidList)
        await deleteProjectNodePlanByNpIdList({
          npidList: this.npidList.toString(),
        })
        this.getProjectNodePlanByNid(this.$route.query.nid)
      },
      // 删除信息
      async deleteProjectNodePlanyId(row) {
        await deleteProjectNodePlanyId({
          npid: row.npid,
        })
        this.getProjectNodePlanByNid(this.$route.query.nid)
      },

      // 关闭表单清空数据
      closeDialog() {
        this.form = {
          mid: JSON.parse(this.$route.query.row).mid,
          nodeName: JSON.parse(this.$route.query.row).nodeName,
          endTime: '',
          gid: '',
          uid: '',
          remarks: '',
          startTime: '',
          plan: '',
          nid: JSON.parse(this.$route.query.row).nid,
        }
      },
    },
  }
</script>

<style scoped></style>
