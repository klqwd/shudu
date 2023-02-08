<template>
  <div>
    <div>
      <el-button
        style="margin-top: 20px; margin-left: 20px"
        type="primary"
        @click="
          dialogTitle = '添加'
          dialogFormVisible = true
          getUserOrganListByParentid()
        "
      >
        添加
      </el-button>
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column label="类别名称" prop="typeName" />
        <el-table-column label="责任单位" prop="organName" />
        <el-table-column label="责任人" prop="realName" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="alter(scope.row)">修改</el-button>
            <el-button type="text" @click="deleteMatterTypeById(scope.row)">
              删除
            </el-button>
            <!-- <el-button type="text" @click="skiptoTask">任务</el-button>
            <el-button type="text" @click="skiptoMatter(scope.row)">
              事项
            </el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :page="page"
        @changPageSize="changePageSize"
        @changePageNum="changePageNum"
      />
    </div>
    <!-- 弹出框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      width="60%"
      @close="closeDialog"
    >
      <el-form label-width="80px" :model="form">
        <el-form-item label="类别名称">
          <el-input v-model="form.typeName" />
        </el-form-item>
        <el-form-item label="填报单位">
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
        <el-form-item label="填报人">
          <el-select v-model="form.uid" placeholder="请选择责任人">
            <el-option
              v-for="item in realName"
              :key="item.uid"
              :label="item.realName"
              :value="item.uid"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remarks" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogFormVisible = false
            saveMatterType()
          "
        >
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import pagination from '@/components/pagination.vue'

  import {
    saveMatterType,
    getMatterTypeList,
    deleteMatterTypeById,
  } from '@/api/workbench/matter'
  import { getUserOrganList } from '@/mixins/getUserOrganList'
  export default {
    components: {
      pagination,
    },
    mixins: [getUserOrganList],
    data() {
      return {
        tableData: [
          {
            gid: '责任单位',
            uid: '责任人',
            organName: '机构名称',
            realName: '姓名',
            typeName: '重大事项类别名称',
          },
        ],
        form: {
          typeName: '',
          gid: 1,
          uid: '',
          remarks: '',
        },
        page: {
          pageNum: 1,
          pageSize: 20,
          total: null,
          totalPage: '',
        },
        dialogFormVisible: false,
        dialogTitle: '',
        loading: false,
      }
    },
    created() {
      this.getMatterTypeList()
    },

    mounted() {},
    methods: {
      // 添加或修改重大事项分类
      async saveMatterType() {
        await saveMatterType(this.form)
        this.getMatterTypeList()
      },
      // 打开修改弹出框
      alter(row) {
        this.dialogTitle = '修改'
        this.form = row
        this.getUserList().then(() => {
          this.dialogFormVisible = true
        })
      },
      // 根据重大事项分类ID获取重大事项分类信息
      async getMatterTypeList() {
        this.loading = true
        const data = await getMatterTypeList({
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
        })
        this.tableData = data.data.list
        this.page = data.data
        this.loading = false
      },
      // 删除重大事项分类
      async deleteMatterTypeById(row) {
        await deleteMatterTypeById({
          mtid: row.mtid,
        })
        this.getMatterTypeList()
      },

      //页面条数发生变化
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getMatterTypeList()
      },
      // 页面发生变化
      changePageNum(pageNum) {
        this.page.pageNum = pageNum
        this.getMatterTypeList()
      },
      // 跳转到任务页面
      // skiptoTask() {
      //   this.$router.push({
      //     path: '/bigproject/task',
      //   })
      // },
      // 跳转到事项页面
      // skiptoMatter(row) {
      //   this.$router.push({
      //     path: 'eventManagement',
      //     query: row,
      //   })
      // },
      closeDialog() {
        this.form = {
          typeName: '',
          gid: '',
          uid: '',
          remarks: '',
        }
      },
    },
  }
</script>

<style scoped></style>
