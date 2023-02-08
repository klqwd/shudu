<template>
  <div>
    <div style="padding-top: 10px; padding-left: 20px" @click="$router.go(-1)">
      <i class="el-icon-back" style="font-size: 18px"></i>
      <el-button style="font-size: 18px; color: #000" type="text">
        返回
      </el-button>
      <div style="display: inline; margin-left: 70px; font-size: 18px">
        {{ JSON.parse($route.query.row).mid }}+{{
          $router.currentRoute.meta.title
        }}
      </div>
    </div>

    <div style="padding-left: 20px; margin-top: 20px">
      <el-button
        type="primary"
        @click="
          dialogFormVisible = true
          dialogTitle = '新增'
        "
      >
        增加
      </el-button>
      <el-button type="danger" @click="deleteProjectApprovalByIdList()">
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
        <el-table-column label="审批事项" prop="approvalContent" />
        <el-table-column label="审批单位" prop="approvalOrgan" />
        <el-table-column
          label="审批文号"
          prop="approvalNum"
          show-overflow-tooltip
        />
        <el-table-column
          label="审批日期"
          prop="approvalDate"
          show-overflow-tooltip
        />
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="view(scope.row)">查看</el-button>
            <el-button
              type="text"
              @click="deleteProjectApprovalById(scope.row)"
            >
              删除
            </el-button>
            <el-button type="text" @click="alter(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 弹出框 -->
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
        <el-form-item label="审批事项">
          <el-input v-model="form.approvalContent" />
        </el-form-item>
        <el-form-item label="审批单位">
          <el-input v-model="form.approvalOrgan" />
        </el-form-item>
        <el-form-item label="审批文号">
          <el-input v-model="form.approvalNum" />
        </el-form-item>
        <el-form-item label="审批日期">
          <el-date-picker
            v-model="form.approvalDate"
            placeholder="选择日期"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
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
          @click="saveProjectApproval(), (dialogFormVisible = false)"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 弹出框 -->
  </div>
</template>

<script>
  import {
    getProjectApprovalListByMid,
    saveProjectApproval,
    deleteProjectApprovalById,
    deleteProjectApprovalByIdList,
  } from '@/api/majorProject/approval'
  import { getUserOrganList } from '@/mixins/getUserOrganList'
  import upload from '@/components/upload'
  export default {
    components: {
      upload,
    },
    mixins: [getUserOrganList],
    data() {
      return {
        tableData: [
          {
            approvalContent: '审批事项',
            approvalOrgan: '审批单位',
            approvalNum: '审批文号',
            approvalDate: '审批日期',
          },
        ],
        paidList: [],
        dialogFormVisible: false,
        loading: false,
        dialogTitle: '',
        form: {
          approvalContent: '',
          approvalOrgan: '',
          approvalNum: '',
          approvalDate: '',
          remarks: '',
          mid: JSON.parse(this.$route.query.row).mid,
        },
      }
    },
    created() {
      this.getProjectApprovalListByMid()
    },
    methods: {
      // 获取数据
      async getProjectApprovalListByMid() {
        this.loading = true
        const data = await getProjectApprovalListByMid({
          mid: JSON.parse(this.$route.query.row).mid,
        })
        this.tableData = data.data
        this.loading = false
      },
      // 添加或修改审批信息
      async saveProjectApproval() {
        await saveProjectApproval(this.form)
        this.getProjectApprovalListByMid()
      },

      // 删除审批信息
      async deleteProjectApprovalById(row) {
        await deleteProjectApprovalById({
          paid: row.paid,
        })
        this.getProjectApprovalListByMid()
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
      // 点击复选框，获取删除信息列表
      handleSelectionChange(val) {
        console.log(val)
        this.paidList = []
        val.forEach((item) => {
          this.paidList.push(item.paid)
        })
        console.log(this.paidList)
      },
      // 批量删除数据
      async deleteProjectApprovalByIdList() {
        await deleteProjectApprovalByIdList({
          paidList: this.paidList.toString(),
        })
        this.getProjectApprovalListByMid()
      },
      // 关闭弹出框，表单清空
      closeDialog() {
        this.form = {
          mid: JSON.parse(this.$route.query.row).mid,
          approvalContent: '',
          approvalOrgan: '',
          approvalNum: '',
          approvalDate: '',
          remarks: '',
        }
      },
    },
  }
</script>

<style></style>
