<template>
  <div>
    <!-- 按钮 -->
    <div style="padding-top: 20px; margin-left: 20px">
      <el-button type="primary" @click="add">增加</el-button>
      <el-button type="danger" @click="deleteProjectTypeByPtidList()">
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="80" />
        <el-table-column label="类别名称" prop="typeName" />
        <el-table-column label="责任单位" prop="organName" />
        <el-table-column label="责任人" prop="realName" />
        <el-table-column label="联系方式" prop="contactInfo" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="view(scope.row)">查看</el-button>
            <el-button type="text" @click="deleteProjectTypeById(scope.row)">
              删除
            </el-button>
            <el-button type="text" @click="alter(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <pagination
        ref="aa"
        :page="page"
        @changPageSize="changePageSize"
        @changePageNum="changePageNum"
      />
    </div>
    <!-- 增加弹出框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      @close="closeDialog"
    >
      <el-form :disabled="dialogTitle == '查看'" :model="form">
        <el-form-item label="类别名称" :label-width="formLabelWidth">
          <el-input v-model="form.typeName" />
        </el-form-item>
        <el-form-item label="责任单位" :label-width="formLabelWidth">
          <template slot-scope="scope">
            <el-select
              v-model="form.gid"
              placeholder="请选择单位"
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
        <el-form-item label="责任人" :label-width="formLabelWidth">
          <el-select v-model="form.uid" placeholder="请选择责任人">
            <el-option
              v-for="item in realName"
              :key="item.uid"
              :label="item.realName"
              :value="item.uid"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="form.contactInfo" />
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input
            v-model="form.textarea"
            placeholder="请输入内容"
            :rows="5"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="saveProjectType(), (dialogFormVisible = false)"
        >
          确 定
        </el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getProjectTypeList,
    saveProjectType,
    deleteProjectTypeById,
    deleteProjectTypeByPtidList,
  } from '@/api/majorProject/classifyManagements'
  import pagination from '@/components/pagination.vue'
  import { getUserOrganList } from '@/mixins/getUserOrganList'
  export default {
    components: {
      pagination,
    },
    mixins: [getUserOrganList],
    data() {
      return {
        // 表格内容
        tableData: [
          {
            typeName: '类别名称',
            uid: '责任人',
            gid: '责任单位',
            contactInfo: '联系方式',
          },
        ],

        dialogTitle: '',
        dialogFormVisible: false,
        loading: false,
        // 表单内容
        form: {
          typeName: '',
          gid: '',
          uid: '',
          contactInfo: '',
          remarks: '',
        },
        ptidList: [],
        formLabelWidth: '90px',
        page: {
          pageNum: 1,
          pageSize: 20,
          total: null,
          totalPage: '',
        },
      }
    },
    created() {
      this.getProjectTypeList()
    },

    methods: {
      // 获取分类列表
      async getProjectTypeList() {
        this.loading = true
        const data = await getProjectTypeList({
          pageSize: this.page.pageSize,
          pageNum: this.page.pageNum,
        })
        this.tableData = data.data.list
        this.page = data.data
        this.loading = false
      },
      // 点击增加时弹出dialog
      add() {
        this.dialogTitle = '增加'
        this.dialogFormVisible = true
      },
      // 添加类别
      async saveProjectType() {
        await saveProjectType(this.form)
        this.getProjectTypeList()
      },
      // 点击查看弹出dialog
      view(row) {
        this.dialogTitle = '查看'
        this.form = row
        this.getUserList().then(() => {
          this.dialogFormVisible = true
        })
      },
      // 点击修改弹出dialog
      alter(row) {
        this.dialogTitle = '修改'
        this.form = row
        this.getUserList().then(() => {
          this.dialogFormVisible = true
        })
      },
      // 删除
      async deleteProjectTypeById(row) {
        await deleteProjectTypeById({
          ptid: row.ptid,
        })
        this.getProjectTypeList()
      },
      // 点击复选框，获取删除信息列表
      handleSelectionChange(val) {
        this.ptidList = []
        val.forEach((item) => {
          this.ptidList.push(item.ptid)
        })
      },
      // 批量删除
      async deleteProjectTypeByPtidList() {
        await deleteProjectTypeByPtidList({
          ptidList: this.ptidList.toString(),
        })
        this.getProjectTypeList()
      },

      // 关闭弹出框，表单清空
      closeDialog() {
        this.form = {}
      },
      //页面条数发生变化
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getProjectTypeList()
      },
      // 页面发生变化
      changePageNum(pageNum) {
        this.page.pageNum = pageNum
        this.getProjectTypeList()
      },
    },
  }
</script>

<style></style>
