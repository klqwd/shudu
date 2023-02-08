<template>
  <div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        padding-left: 20px;
        padding-top: 20px;
      "
    >
      <el-button
        style=""
        type="primary"
        @click="
          dialogFormVisible = true
          dialogTitle = '添加'
        "
      >
        <i class="el-icon-plus"></i>
        添加
      </el-button>
      <div>
        <el-input
          v-model="searchInput"
          placeholder="请输入查询条件"
          style="width: 200px; margin-right: 10px"
        />
        <el-button style="margin-right: 20px" type="primary" @click="search">
          <i class="el-icon-search">查询</i>
        </el-button>
      </div>
    </div>

    <!-- 表格 -->
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column label="序号" prop="state" type="index" width="120px" />
      <el-table-column label="指标名称" prop="indicatorName" />
      <el-table-column label="单位" prop="unit" />
      <el-table-column
        :formatter="convertDateType"
        label="填报周期"
        prop="dateType"
      />
      <el-table-column label="填报单位" prop="organName" />
      <el-table-column label="填报人" prop="realName" />
      <el-table-column label="操作" prop="operate">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="text"
            @click="getIndicatorTypeByTid(scope.row)"
          >
            查看
          </el-button>
          <el-button size="small" type="text" @click="updateDialog(scope.row)">
            修改
          </el-button>
          <el-button size="small" type="text" @click="del(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div>
      <pagination
        ref="aa"
        :page="page"
        @changPageSize="changePageSize"
        @changePageNum="changePageNum"
      />
    </div>
    <!-- 弹出框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      width="500px"
      @close="closeDialog"
    >
      <el-form
        :disabled="dialogTitle == '查看'"
        label-width="80px"
        :model="form"
      >
        <el-form-item label="指标名称">
          <el-input v-model="form.indicatorName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="form.unit" />
        </el-form-item>
        <el-form-item label="填报周期">
          <el-select v-model="form.dateType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.dateType"
              :label="item.label"
              :value="item.dateType"
            />
          </el-select>
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createIndicator">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getIndicatorTypeList,
    createIndicator,
    deleteIndicator,
    updateIndicator,
  } from '@/api/indicator'

  import pagination from '@/components/pagination.vue'
  import { getUserOrganList } from '@/mixins/getUserOrganList'
  import { dateConvert } from '@/mixins/dateConvert'

  export default {
    components: {
      pagination,
    },
    mixins: [getUserOrganList, dateConvert],

    data() {
      return {
        tableData: [
          {
            indicatorName: '人均地区生产总值',
            unit: '元',
            dateType: '天',
            organName: '青田县',
            realName: '管理员',
          },
        ],
        searchInput: '',
        dialogTitle: '',
        dialogFormVisible: false,
        loading: false,
        form: {
          indicatorName: '',
          unit: '',
          dateType: '',
          gid: '',
          uid: '',
        },
        page: {
          pageNum: 1,
          pageSize: 20,
          total: null,
          totalPage: '',
        },
      }
    },
    created() {
      this.getIndicatorTypeList()
    },
    methods: {
      // 获取指标数据
      async getIndicatorTypeList() {
        this.loading = true
        const data = await getIndicatorTypeList({
          pageSize: this.page.pageSize,
          pageNum: this.page.pageNum,
        })
        this.tableData = data.data.list
        this.page = data.data
        this.loading = false
      },

      // 添加或者更新指标
      async createIndicator() {
        if (this.dialogTitle == '添加') {
          await createIndicator(this.form)
        } else if (this.dialogTitle == '修改') {
          await updateIndicator(this.form)
        }
        this.getIndicatorTypeList()
        this.dialogFormVisible = false
      },
      // 点击修改按钮弹出对话框
      updateDialog(row) {
        this.form = row
        this.dialogTitle = '修改'
        this.getUserList().then(() => {
          this.dialogFormVisible = true
        })
      },
      // 点击查看按钮弹出对话框
      getIndicatorTypeByTid(row) {
        this.form = row
        this.dialogTitle = '查看'
        // this.$nextTick(() => {
        //   this.getUserList()
        // })
        this.getUserList().then(() => {
          this.dialogFormVisible = true
        })
      },

      // 删除指标
      async del(row) {
        await deleteIndicator({
          tid: row.tid,
        })
        this.getIndicatorTypeList()
      },

      // 查询
      search() {
        this.loading = true
        const data = []
        this.tableData.forEach((item) => {
          Object.keys(item).map((key) => {
            if (item[key] == this.searchInput) {
              data.push(item)
            }
          })
        })
        this.tableData = data
        this.loading = false
      },

      //页面条数发生变化
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getIndicatorTypeList()
      },
      // 页面发生变化
      changePageNum(pageNum) {
        this.page.pageNum = pageNum
        this.getIndicatorTypeList()
      },
      // 关闭弹出框清空表单
      closeDialog() {
        this.form = {
          indicatorName: '',
          unit: '',
          dateType: '',
          gid: '',
          uid: '',
        }
      },
    },
  }
</script>

<style scoped></style>
