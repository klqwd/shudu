<template>
  <div>
    <el-button
      style="margin-top: 20px; margin-left: 20px"
      type="primary"
      @click="
        dialogTitle = '增加'
        dialogFormVisible = true
      "
    >
      增加
    </el-button>
    <el-table v-loading="loading" :data="tableData" stripe style="width: 100%">
      <el-table-column label="事项名称" prop="matterName" />
      <!-- <el-table-column label="事项编码" prop="matterNum" />
      <el-table-column label="事项分类" prop="matterType" /> -->
      <!-- <el-table-column label="审核意见" prop="examineContent" /> -->
      <el-table-column label="计划开始时间" prop="plannedStartTime" />
      <el-table-column label="计划完成时间" prop="plannedEndTime" />
      <el-table-column label="责任单位" prop="organName" />
      <el-table-column label="责任人" prop="realName" />
      <el-table-column label="联系方式" prop="contactInfo" />
      <!-- <el-table-column label="审核人" prop="examinUser" />
      <el-table-column label="审核日期" prop="examineDate" /> -->
      <el-table-column label="备注" prop="remarks" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="alter(scope.row)">修改</el-button>
          <el-button type="text" @click="deleteExamineById(scope.row)">
            删除
          </el-button>
          <el-button type="text" @click="skipToSchedule(scope.row)">
            进度
          </el-button>
          <el-button type="text" @click="skipToTask(scope.row)">任务</el-button>
          <!-- <el-button type="text">审核</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      @close="closeDialog"
    >
      <el-form label-width="110px" :model="form">
        <el-form-item label="事项名称">
          <el-input v-model="form.matterName" />
        </el-form-item>

        <el-form-item label="计划开始时间">
          <el-date-picker
            v-model="form.plannedStartTime"
            placeholder="请选择日期"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="计划完成时间">
          <el-date-picker
            v-model="form.plannedEndTime"
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

        <el-form-item label="联系方式">
          <el-input v-model="form.contactInfo" />
        </el-form-item>
        <!-- <el-form-item label="审核意见">
          <el-input v-model="form.examineContent" />
        </el-form-item> -->
        <!-- <el-form-item label="审核日期">
          <el-input v-model="form.examineDate" />
        </el-form-item>
        <el-form-item label="审核人">
          <el-input v-model="form.examinUser" />
        </el-form-item> -->

        <!-- <el-form-item label="事项编码">
          <el-input v-model="form.matterNum" />
        </el-form-item>
        <el-form-item label="事项分类">
          <el-input v-model="form.matterType" />
        </el-form-item> -->

        <el-form-item label="备注">
          <el-input v-model="form.remarks" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            saveExamine()
            dialogFormVisible = false
          "
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getExamineList,
    saveExamine,
    deleteExamineById,
  } from '@/api/majorProject/assess'
  import { examineProjectTask } from '@/api/majorProject/task'
  import { getUserOrganList } from '@/mixins/getUserOrganList'

  export default {
    mixins: [getUserOrganList],
    data() {
      return {
        tableData: [
          {
            date: '类别单位',
            gid: '',
            uid: '',
            contactInfo: '',
            remarks: '',
          },
        ],
        form: {
          matterName: '', //事项名称
          matterNum: '', //事项编码
          matterType: '', //事项分类
          examineContent: '', //审核意见
          examineDate: '', //审核日期
          examineUser: '', //审核人
          plannedEndTime: '', //计划完成时间
          plannedStartTime: '', //计划开始时间
          contactInfo: '', //联系方式
          remarks: '', //备注
          uid: '', //责任人
          gid: '', //责任单位
        },
        dialogTitle: '',
        dialogFormVisible: false,
        loading: false,
      }
    },
    created() {
      this.getExamineList()
    },
    methods: {
      // 获取考核事项列表
      async getExamineList() {
        this.loading = true
        const data = await getExamineList({
          pageNum: 1,
          pageSize: 20,
          matterName: '',
          matterNum: '',
        })
        this.tableData = data.data.list
        this.loading = false
      },
      // 添加或修改考核事项
      async saveExamine() {
        await saveExamine(this.form)
      },
      // 打开修改弹出框
      alter(row) {
        this.form = row
        this.dialogTitle = '修改'
        console.log(this.form)
        this.getUserList().then(() => {
          this.dialogFormVisible = true
        })
      },
      // 删除考核事项
      async deleteExamineById(row) {
        await deleteExamineById({
          mid: row.mid,
        })
        this.getExamineList()
      },
      // 任务审核
      async examineProjectTask() {
        await examineProjectTask()
      },
      //跳转到进度页面
      skipToSchedule(row) {
        this.$router.push({
          path: '/assess/schedule',
          query: {
            row: JSON.stringify(row),
          },
        })
      },
      // 跳转到任务页面
      skipToTask(row) {
        this.$router.push({
          path: '/bigproject/task',
          query: {
            row: JSON.stringify(row),
          },
        })
      },
      closeDialog() {
        this.form = {
          matterName: '', //事项名称
          matterNum: '', //事项编码
          matterType: '', //事项分类
          examineContent: '', //审核意见
          examineDate: '', //审核日期
          examineUser: '', //审核人
          plannedEndTime: '', //计划完成时间
          plannedStartTime: '', //计划开始时间
          contactInfo: '', //联系方式
          remarks: '', //备注
          uid: '', //责任人
          gid: '', //责任单位
        }
      },
    },
  }
</script>

<style scope></style>
