<template>
  <div>
    <el-form
      class="demo-form-inline"
      :inline="true"
      :model="formInline"
      style="padding-left: 20px; padding-top: 20px"
    >
      <el-form-item label="项目名称">
        <el-input v-model="formInline.matterName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="项目编码">
        <el-input v-model="formInline.matterNum" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="项目状态">
        <el-input v-model="formInline.projectStatus" placeholder="请输入" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <div style="padding-left: 20px">
      <el-button
        type="primary"
        @click="
          dialogFormVisible = true
          dialogTitle = '增加'
        "
      >
        增加
      </el-button>
      <el-button type="danger" @click="deleteProjectByIdList()">删除</el-button>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="80" />
        <el-table-column label="项目名称" prop="matterName" />
        <el-table-column label="项目编码" prop="matterNum" />
        <el-table-column label="建设性质" prop="buildNature" />
        <el-table-column
          label="计划开始时间"
          prop="plannedStartTime"
          width="140"
        />
        <el-table-column
          label="计划完成时间"
          prop="plannedEndTime"
          width="140"
        />
        <el-table-column label="责任单位" prop="organName" />
        <el-table-column label="责任人" prop="realName" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="alter(scope.row)">修改</el-button>
            <el-button type="text" @click="deleteProjectById(scope.row)">
              删除
            </el-button>
            <el-button type="text" @click="schedule(scope.row)">进度</el-button>
            <el-button type="text" @click="invest(scope.row)">
              <!--  -->
              投资
            </el-button>
            <el-button type="text" @click="node(scope.row)">节点</el-button>
            <el-button type="text" @click="approval(scope.row)">审批</el-button>
            <el-button type="text" @click="task(scope.row)">任务</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <pagination
          :page="page"
          @changPageSize="changePageSize"
          @changePageNum="changePageNum"
        />
      </div>
    </div>
    <!-- 增加弹出框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      width="70%"
      @close="closeDialog"
    >
      <el-form label-position="left" label-width="100px" :model="form">
        <el-row>
          <el-col :span="10">
            <el-form-item label="项目名称">
              <el-input v-model="form.matterName" />
            </el-form-item>
          </el-col>
          <el-col :offset="4" :span="10">
            <el-form-item label="建设面积">
              <el-input v-model="form.floorage" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="项目编码">
              <el-input v-model="form.matterNum" />
            </el-form-item>
          </el-col>
          <el-col :offset="4" :span="10">
            <el-form-item label="计划开始时间">
              <el-date-picker
                v-model="form.plannedStartTime"
                placeholder="请选择日期"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="建设性质">
              <el-input v-model="form.buildNature" />
            </el-form-item>
          </el-col>
          <el-col :offset="4" :span="10">
            <el-form-item label="计划完成时间">
              <el-date-picker
                v-model="form.plannedEndTime"
                placeholder="请选择日期"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="建设地址">
              <el-input v-model="form.buildAddress" />
            </el-form-item>
          </el-col>
          <el-col :offset="4" :span="10">
            <el-form-item label="计划投资额">
              <el-input v-model="form.plannedInvestment" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="用地面积">
              <el-input v-model="form.landArea" />
            </el-form-item>
          </el-col>
          <el-col :offset="4" :span="10">
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
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="联系方式">
              <el-input v-model="form.contactInfo" />
            </el-form-item>
          </el-col>
          <el-col :offset="4" :span="10">
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
          </el-col>
        </el-row>
        <upload />
        <el-form-item label="建设内容">
          <el-input
            v-model="form.buildContent"
            placeholder="请输入内容"
            :rows="3"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="form.remarks"
            placeholder="请输入内容"
            :rows="4"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="saveProject(), (dialogFormVisible = false)"
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
    getProjectListByCreateUser,
    saveProject,
    deleteProjectById,
    deleteProjectByIdList,
  } from '@/api/majorProject/classifyManagements'
  import pagination from '@/components/pagination.vue'
  import upload from '@/components/upload.vue'
  import { getUserOrganList } from '@/mixins/getUserOrganList'

  export default {
    components: {
      pagination,
      upload,
    },
    mixins: [getUserOrganList],
    data() {
      return {
        // 表格数据
        tableData: [
          {
            matterName: '项目名称',
            matterNum: '项目编码',
            buildNature: '建设性质',
            plannedStartTime: '计划开始时间',
            plannedEndTime: '计划完成时间',
            gid: '责任单位',
            uid: '责任人',
          },
        ],
        formInline: {
          matterName: '',
          matterNum: '',
          projectStatus: '',
        },
        dialogTitle: '',
        dialogFormVisible: false,
        // 表单数据
        form: {
          matterName: '',
          matterNum: '',
          buildNature: '',
          plannedStartTime: '',
          plannedEndTime: '',
          gid: '',
          uid: '',
        },
        formLabelWidth: '120px',
        radio: '',
        midList: '',
        loading: false,
        page: {
          pageNum: 1,
          pageSize: 20,
          total: '',
          totalPage: '',
        },
      }
    },
    created() {
      this.getProjectListByCreateUser()
    },
    methods: {
      // 根据创建人ID获取重大项目列表
      async getProjectListByCreateUser() {
        this.loading = true
        const data = await getProjectListByCreateUser({
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
        })
        this.tableData = data.data.list
        this.page = data.data
        this.loading = false
      },
      // 添加
      async saveProject() {
        await saveProject(this.form)
        this.getProjectListByCreateUser()
      },
      // 修改
      async alter(row) {
        this.dialogTitle = '修改'
        this.form = row
        this.getUserList().then(() => {
          this.dialogFormVisible = true
        })
      },
      //删除
      async deleteProjectById(row) {
        await deleteProjectById({
          mid: row.mid,
        })
        this.getProjectListByCreateUser()
      },
      // 批量删除
      async deleteProjectByIdList() {
        const data = await deleteProjectByIdList({
          midList: this.midList.toString(),
        })
        this.getProjectListByCreateUser()
        console.log(data)
      },
      // 查询
      search() {
        this.tableData.forEach((item) => {
          if (
            item.matterName == this.formInline.matterName ||
            item.matterNum == this.formInline.matterNum
          ) {
            this.tableData = [item]
          }
        })
      },
      //勾选复选框时触发
      handleSelectionChange(val) {
        this.midList = []
        val.forEach((item) => {
          this.midList.push(item.mid)
        })
        console.log(this.midList)
      },
      // 跳转到schedule页面
      schedule(row) {
        this.$router.push({
          path: 'schedule',
          query: { row: JSON.stringify(row) },
        })
      },
      // 跳转到invest页面
      invest(row) {
        this.$router.push({
          path: 'invest',
          query: { row: JSON.stringify(row) },
        })
      },
      // 跳转到approval页面
      approval(row) {
        this.$router.push({
          path: 'approval',
          query: { row: JSON.stringify(row) },
        })
      },
      //跳转到task页面
      task(row) {
        this.$router.push({
          path: 'task',
          query: { row: JSON.stringify(row) },
        })
      },
      // 跳转到node页面
      node(row) {
        this.$router.push({
          path: 'node',
          query: { row: JSON.stringify(row) },
        })
      },

      // 清空表单
      closeDialog() {
        this.form = {
          matterName: '',
          matterNum: '',
          buildNature: '',
          plannedStartTime: '',
          plannedEndTime: '',
          gid: '',
          uid: '',
        }
      },
      //页面条数发生变化
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getProjectListByCreateUser()
      },
      // 页面发生变化
      changePageNum(pageNum) {
        this.page.pageNum = pageNum
        this.getProjectListByCreateUser()
      },
    },
  }
</script>

<style scoped></style>
