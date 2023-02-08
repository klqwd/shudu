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
    <div style="padding-left: 20px; margin-top: 10px">
      <el-button
        type="primary"
        @click="
          dialogFormVisible = true
          dialogTitle = '新增'
        "
      >
        增加
      </el-button>
      <el-button type="danger" @click="deleteProjectInvestmentPlanByIdList()">
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
        <el-table-column label="计划日期(月)" prop="planDate" />
        <el-table-column label="计划投资额" prop="investmentAmount" />
        <el-table-column label="责任单位" prop="organName" />
        <el-table-column label="责任人" prop="realName" />
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="view(scope.row)">查看</el-button>
            <el-button
              type="text"
              @click="deleteProjectInvestmentPlanById(scope.row)"
            >
              删除
            </el-button>
            <el-button type="text" @click="alter(scope.row)">修改</el-button>
            <el-button
              type="text"
              @click="getProjectInvestmentCompleteByIpid(scope.row)"
            >
              投资完成计划
            </el-button>
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
        <el-form-item label="计划日期(月)">
          <el-date-picker
            v-model="form.planDate"
            placeholder="选择日期"
            type="date"
            value-format="yyyy-MM"
          />
        </el-form-item>
        <el-form-item label="计划投资额">
          <el-input v-model="form.investmentAmount" />
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
          @click="saveProjectInvestmentPlan(), (dialogFormVisible = false)"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 增加弹出框 -->

    <!-- 投资完成计划弹出框 -->
    <el-dialog
      title="投资完成计划"
      :visible.sync="investVisible"
      @close="closeDialog"
    >
      <el-form label-width="80px" :model="form">
        <el-form-item label="投资完成额">
          <el-input v-model="invest.investmentComplete" />
        </el-form-item>
        <el-form-item label="填报单位">
          <template slot-scope="scope">
            <el-select
              v-model="invest.gid"
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
          <el-select v-model="invest.uid" placeholder="请选择">
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
          <el-input v-model="invest.remarks" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="investVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            saveProjectInvestmentComplete()
            investVisible = false
          "
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 投资完成计划弹出框 -->
  </div>
</template>

<script>
  import {
    getProjectInvestmentPlanByMid,
    saveProjectInvestmentPlan,
    saveProjectInvestmentComplete,
    // getProjectInvestmentPlanByIpid,
    deleteProjectInvestmentPlanById,
    deleteProjectInvestmentPlanByIdList,
    getProjectInvestmentCompleteByIpid,
    deleteProjectInvestmentCompleteById,
  } from '@/api/majorProject/invest'
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
            planDate: '',
            investmentAmount: '',
            gid: '',
            uid: '',
          },
        ],
        icidList: [],
        fileList: [],
        dialogFormVisible: false,
        investVisible: false,
        form: {
          planDate: '',
          investmentAmount: '',
          gid: '',
          uid: '',
          remarks: '',
          mid: JSON.parse(this.$route.query.row).mid,
        },
        invest: {
          planDate: '',
          investmentComplete: '',
          gid: '',
          uid: '',
          remarks: '',
        },

        loading: false,
        dialogTitle: '',
      }
    },
    created() {
      this.getProjectInvestmentPlanByMid()
    },
    methods: {
      // 获取列表信息
      async getProjectInvestmentPlanByMid() {
        this.loading = true
        const data = await getProjectInvestmentPlanByMid({
          mid: JSON.parse(this.$route.query.row).mid,
        })
        this.tableData = data.data
        this.loading = false
      },
      // 添加或修改信息
      async saveProjectInvestmentPlan() {
        await saveProjectInvestmentPlan(this.form)
        this.getProjectInvestmentPlanByMid()
      },

      // // 根据投资计划ID获取投资计划信息
      // async getProjectInvestmentPlanByIpid(row) {
      //   await getProjectInvestmentPlanByIpid({
      //     ipid: row.ipid,
      //   })
      // },
      // 删除信息
      async deleteProjectInvestmentPlanById(row) {
        await deleteProjectInvestmentPlanById({ ipid: row.ipid })
        this.getProjectInvestmentPlanByMid()
      },
      // 点击复选框，获取删除信息列表
      handleSelectionChange(val) {
        this.icidList = []
        val.forEach((item) => {
          this.icidList.push(item.ipid)
        })
      },
      // 批量删除信息
      async deleteProjectInvestmentPlanByIdList() {
        await deleteProjectInvestmentPlanByIdList(this.icidList)
        this.getProjectInvestmentPlanByMid()
      },
      // 查看弹出框
      view(row) {
        this.dialogTitle = '查看'
        this.form = row
        this.getUserList().then(() => {
          this.dialogFormVisible = true
        })
      },
      // 修改弹出框
      alter(row) {
        this.dialogTitle = '修改'
        this.form = row
        this.getUserList().then(() => {
          this.dialogFormVisible = true
        })
      },
      // 关闭弹出框，表单清空
      closeDialog() {
        if (this.investVisible == true) {
          this.invest = {
            planDate: '',
            investmentComplete: '',
            gid: '',
            uid: '',
            remarks: '',
          }
        }
        this.form = {
          mid: JSON.parse(this.$route.query.row).mid,
          uid: '',
          planDate: '',
          investmentAmount: '',
          gid: '',
          remarks: '',
        }
      },

      // 根据投资计划ID获取投资完成信息
      async getProjectInvestmentCompleteByIpid(row) {
        this.investVisible = true
        const data = await getProjectInvestmentCompleteByIpid({
          ipid: row.ipid,
        })
        if (data.data) {
          // 如果填报过数据，就显示数据
          this.invest = data.data
        } else {
          // 之前没有填过数据，就先删除
          this.deleteProjectInvestmentCompleteById(row)
          this.invest = row
        }
      },
      // 添加或修改投资完成计划信息
      async saveProjectInvestmentComplete() {
        await saveProjectInvestmentComplete(this.invest)
        this.getProjectInvestmentPlanByMid()
      },
      // 删除投资完成计划信息
      async deleteProjectInvestmentCompleteById(row) {
        await deleteProjectInvestmentCompleteById({
          ipid: row.ipid,
        })
      },
      // 选中单位时获取填报人
      async getInformant() {
        if (this.investVisible == true) {
          this.invest.uid = ''
          this.getUserList()
        } else {
          this.form.uid = ''
          this.getUserList()
        }
      },
    },
  }
</script>

<style></style>
