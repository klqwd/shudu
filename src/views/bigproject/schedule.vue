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
          dialogFormVisible = true
          dialogTitle = '新增'
        "
      >
        增加
      </el-button>
      <el-button type="danger" @click="deleteProjectProgressByIdList()">
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
        <el-table-column label="进度状态" prop="progressState">
          <template slot-scope="scope">
            {{ alterState(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column label="进度" prop="progress">
          <template slot-scope="scope">
            {{ scope.row.progress }}
            <span v-if="scope.row.progress != 0">{{ '%' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="日期"
          prop="progressDate"
          show-overflow-tooltip
        />
        <el-table-column label="责任单位" prop="organName" />
        <el-table-column label="责任人" prop="realName" />
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="view(scope.row)">查看</el-button>
            <el-button
              type="text"
              @click="deleteProjectProgressById(scope.row)"
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
        label-width="80px"
        :model="form"
      >
        <el-form-item label="进度状态">
          <el-radio-group v-model="form.progressState">
            <el-radio :label="'3'">开工</el-radio>
            <el-radio :label="'6'">停工</el-radio>
            <el-radio :label="'9'">复工</el-radio>
            <el-radio :label="'12'">竣工</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="进度(%)">
          <el-input v-model="form.progress" />
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.progressDate"
            placeholder="请选择日期"
            type="date"
            value-format="yyyy-MM-dd"
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
          @click="saveProjectProgress(), (dialogFormVisible = false)"
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
    getProjectProgressListByMid,
    saveProjectProgress,
    deleteProjectProgressById,
    deleteProjectProgressByIdList,
  } from '@/api/majorProject/schedule'
  import upload from '@/components/upload'
  import { getUserOrganList } from '@/mixins/getUserOrganList'
  import { dateConvert } from '@/mixins/dateConvert'
  export default {
    components: {
      upload,
    },
    mixins: [getUserOrganList, dateConvert],
    data() {
      return {
        // 表格
        tableData: [
          {
            progressState: '进度状态',
            progress: '进度',
            progressDate: '日期',
            gid: '填报单位',
            uid: '填报人',
          },
        ],
        // 表单
        form: {
          gid: '',
          mid: JSON.parse(this.$route.query.row).mid,
          progress: '',
          progressDate: '',
          progressState: '',
          remarks: '',
          uid: '',
        },
        page: {
          pageNum: 1,
          pageSize: 20,
          total: '',
          totalPage: '',
        },
        fileList: [],
        loading: false,
        dialogTitle: '',
        dialogFormVisible: false,
        ppidList: [],
      }
    },
    created() {
      this.getProjectProgressListByMid()
    },

    methods: {
      // 添加或修改进度信息
      async saveProjectProgress() {
        await saveProjectProgress(this.form)
        this.getProjectProgressListByMid()
      },

      //根据事项ID获取进度列表
      async getProjectProgressListByMid() {
        this.loading = true
        const data = await getProjectProgressListByMid({
          mid: JSON.parse(this.$route.query.row).mid,
        })
        this.tableData = data.data
        this.loading = false
      },
      // 查看
      view(row) {
        this.dialogTitle = '查看'
        this.dialogFormVisible = true
        this.form = row
        this.getUserList().then(() => {
          this.dialogFormVisible = true
        })
      },
      // 关闭弹出框，表单清空
      closeDialog() {
        this.form = {
          mid: JSON.parse(this.$route.query.row).mid,
          uid: '',
          gid: '',
          progress: '',
          progressDate: '',
          progressState: '',
          remarks: '',
        }
      },
      // 修改
      alter(row) {
        this.dialogTitle = '修改'
        this.form = row
        this.dialogFormVisible = true
        this.getUserList().then(() => {
          this.dialogFormVisible = true
        })
      },
      // 点击复选框，获取删除信息列表
      handleSelectionChange(val) {
        this.ppidList = []
        val.forEach((item) => {
          this.ppidList.push(item.ppid)
        })
      },
      // 删除
      async deleteProjectProgressById(row) {
        await deleteProjectProgressById({
          ppid: row.ppid,
        })
        this.getProjectProgressListByMid()
      },
      // 批量删除信息
      async deleteProjectProgressByIdList() {
        await deleteProjectProgressByIdList({
          ppidList: this.ppidList.toString(),
        })
        this.getProjectProgressListByMid()
      },
    },
  }
</script>

<style></style>
