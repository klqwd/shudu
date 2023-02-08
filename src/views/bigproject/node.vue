<template>
  <div>
    <div style="padding-top: 10px; padding-left: 20px" @click="$router.go(-1)">
      <i class="el-icon-back" style="font-size: 18px"></i>
      <el-button style="font-size: 18px; color: #000" type="text">
        返回
      </el-button>
      <div style="display: inline; margin-left: 70px; font-size: 18px">
        {{ JSON.parse($route.query.row).matterName }}+{{
          $router.currentRoute.meta.title
        }}
      </div>
    </div>
    <!-- 按钮 -->
    <div style="padding-left: 20px; margin-top: 20px">
      <el-button
        type="primary"
        @click="
          dialogTitle = '增加'
          dialogFormVisible = true
        "
      >
        增加
      </el-button>
      <el-button type="danger" @click="deleteProjectNodeByNidList()">
        删除
      </el-button>
    </div>
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
        <el-table-column label="节点名称" prop="nodeName" />
        <el-table-column label="计划开始时间" prop="createTime" />
        <el-table-column label="计划完成时间" prop="endTime" />
        <el-table-column
          label="责任单位"
          prop="organName"
          show-overflow-tooltip
        />
        <el-table-column label="责任人" prop="realName" show-overflow-tooltip />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button
              type="text"
              @click="
                $router.push({
                  path: 'viewNodes',
                  name: 'viewNodes',
                  query: { tableData: JSON.stringify(scope.row) },
                })
                localStorage.setItem('nodeName', JSON.parse(scope.row))
              "
            >
              查看
            </el-button> -->
            <el-button type="text" @click="alter(scope.row)">修改</el-button>
            <el-button type="text" @click="deleteProjectNodeById(scope.row)">
              删除
            </el-button>
            <el-button type="text" @click="fill(scope.row)">填报</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--增加弹出框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      @close="closeDialog"
    >
      <el-form
        :disabled="dialogTitle == '查看'"
        label-position="left"
        label-width="80px"
        :model="form"
      >
        <el-form-item label="节点名称">
          <el-input v-model="form.nodeName" />
        </el-form-item>
        <el-form-item label="计划开始时间">
          <el-date-picker
            v-model="form.createTime"
            placeholder="请选择日期"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="计划完成时间">
          <el-date-picker
            v-model="form.endTime"
            placeholder="请选择日期"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="填报单位">
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
        <el-form-item label="填报人">
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
          @click="saveProjectNode(), (dialogFormVisible = false)"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 增加弹出框 -->
  </div>
</template>

<script>
  import {
    getProjectNodeByMid,
    saveProjectNode,
    deleteProjectNodeById,
    // saveProjectNodePlan,
    deleteProjectNodeByNidList,
    // getProjectNodePlanByMid,
    // getProjectNodePlanByNid,
  } from '@/api/majorProject/node'
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
            nodeName: '',
            startTime: '',
            endTime: '',
            uid: '',
            gid: '',
          },
        ],
        nidList: [],
        dialogFormVisible: false,
        loading: false,

        dialogTitle: '',
        form: {
          mid: JSON.parse(this.$route.query.row).mid,
          createTime: '',
          gid: '',
          uid: '',
          nodeName: '',
          remarks: '',
          endTime: '',
          plan: '',
          nid: 0,
        },
      }
    },
    created() {
      this.getProjectNodeByMid()
    },
    methods: {
      // 获取列表信息
      async getProjectNodeByMid() {
        this.loading = true
        const data = await getProjectNodeByMid({
          mid: JSON.parse(this.$route.query.row).mid,
        })
        this.tableData = data.data
        this.loading = false
      },

      // 添加或修改信息
      async saveProjectNode() {
        await saveProjectNode(this.form)
        this.getProjectNodeByMid()
      },
      // 删除
      async deleteProjectNodeById(row) {
        await deleteProjectNodeById({
          nid: row.nid,
        })
        this.getProjectNodeByMid()
      },
      // 点击修改打开弹出框
      alter(row) {
        this.dialogTitle = '修改'
        this.form = row
        this.getUserList().then(() => {
          this.dialogFormVisible = true
        })
      },
      // 点击填报打开弹出框
      fill(row) {
        this.$router.push({
          path: 'fillNode',
          name: 'fillNode',
          query: {
            row: JSON.stringify(row),
            matterName: JSON.parse(this.$route.query.row).matterName,
          },
        })
        // this.form.nodeName = row.nodeName
        // this.form.nid = row.nid
        // this.dialogFormVisible = true
      },

      // // 根据事项ID获取节点进度列表
      // async getProjectNodePlanByMid() {
      //   await getProjectNodePlanByMid({
      //     mid: 2,
      //   })
      // },
      // // 根据节点ID获取节点进度信息
      // async getProjectNodePlanByNid() {
      //   await getProjectNodePlanByNid({
      //     nid: 6,
      //   })
      // },
      // 填报
      // async saveProjectNodePlan() {
      //   await saveProjectNodePlan(this.form)
      //   this.getProjectNodePlanByMid()
      //   this.getProjectNodePlanByNid()
      // },
      // 点击selection触发事件
      handleSelectionChange(val) {
        this.nidList = []
        val.forEach((item) => {
          this.nidList.push(item.nid)
        })
      },
      // 批量删除信息
      async deleteProjectNodeByNidList() {
        await deleteProjectNodeByNidList({
          nidList: this.nidList.toString(),
        })
        this.getProjectNodeByMid()
      },

      // 关闭弹出框，表单清空
      closeDialog() {
        this.form = {
          mid: JSON.parse(this.$route.query.row).mid,
          createTime: '',
          gid: '',
          uid: '',
          nodeName: '',
          remarks: '',
          endTime: '',
          plan: '',
          nid: 0,
        }
      },
    },
  }
</script>

<style></style>
