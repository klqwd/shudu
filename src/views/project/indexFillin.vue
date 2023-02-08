<template>
  <div>
    <!-- <div>
      <el-button
        style="margin-left: 20px; margin-top: 20px"
        type="primary"
        @click="dialogFormVisible = true"
      >
        <i class="el-icon-plus"></i>
        添加
      </el-button>
    </div> -->
    <div style="display: flex; justify-content: flex-end; padding-top: 20px">
      <el-input
        v-model="searchInput.dateType"
        placeholder="请输入填报周期"
        style="width: 150px; margin-right: 10px"
      />
      <el-input
        v-model="searchInput.indicatorName"
        placeholder="请输入指标名称"
        style="width: 150px; margin-right: 10px"
      />
      <el-input
        v-model="searchInput.unit"
        placeholder="请输入单位"
        style="width: 150px; margin-right: 10px"
      />
      <el-button style="margin-right: 20px" type="primary" @click="search">
        <i class="el-icon-search">查询</i>
      </el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="120" />
      <el-table-column
        :formatter="convertDataTypeState"
        label="填报状态"
        prop="state"
      />
      <el-table-column label="指标名称" prop="indicatorName" />
      <el-table-column label="指标值" prop="num" />
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
          <el-button size="small" type="text" @click="fillForm(scope.row)">
            填报
          </el-button>
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
    <!-- 填报弹出框 -->
    <el-dialog
      title="填报"
      :visible.sync="dialogFormVisible"
      width="500px"
      @close="closeDialog"
    >
      <el-form label-width="80px" :model="form">
        <el-form-item label="指标名称">
          <el-input v-model="form.indicatorName" autocomplete="off" />
        </el-form-item>
        <el-form label-width="80px" :model="form">
          <el-form-item label="指标值">
            <el-input v-model="form.num" />
          </el-form-item>
          <el-form-item label="填报日期">
            <el-date-picker
              v-model="form.createTime"
              placeholder="选择日期时间"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-form>
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            updateIndicatorRecord()
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
  import pagination from '@/components/pagination.vue'
  import {
    getListByUid,
    updateIndicatorRecord,
    // getIndicatorRecordList,
  } from '@/api/indicator'
  import { dateConvert } from '@/mixins/dateConvert'
  import { getUserOrganList } from '@/mixins/getUserOrganList'
  export default {
    components: {
      pagination,
    },
    mixins: [dateConvert, getUserOrganList],
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
        form: {
          indicatorName: '',
          unit: '',
          dateType: '',
          organName: '',
          realName: '',
          targetValue: '',
          num: '',
          createTime: '', //填报日期
          gid: '',
          uid: '',
        },
        dialogFormVisible: false,
        searchInput: {
          dateType: '',
          indicatorName: '',
          unit: '',
        },
        realName: '',
        page: {
          pageNum: 1,
          pageSize: 20,
          total: '',
          totalPage: '',
        },
      }
    },
    created() {
      this.getListByUid()
    },

    methods: {
      // 获取当前用户待办记录列表
      async getListByUid() {
        const data = await getListByUid({
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
          dateType: this.searchInput.dateType,
          indicatorName: this.searchInput.indicatorName,
          unit: this.searchInput.unit,
        })
        this.tableData = data.data.list
        this.page = data.data
      },
      // 获取所有指标填报数据
      // async getIndicatorRecordList() {
      //   const data = await getIndicatorRecordList({
      //     pageNum: this.page.pageNum,
      //     pageSize: this.page.pageSize,
      //     dateType: this.dateTypeInput,
      //     indicatorName: this.searchInput.indicatorName,
      //     unit: this.searchInput.unit,
      //   })
      //   this.tableData = data.data.list
      //   this.page = data.data
      // },
      //指标填报
      async updateIndicatorRecord() {
        await updateIndicatorRecord(this.form)
        this.dialogFormVisible = false
      },
      //打开填报弹出框，数据回显
      fillForm(row) {
        this.form = row
        this.getUserList().then(() => {
          this.dialogFormVisible = true
        })
      },
      // 关闭弹出框，清空表单
      closeDialog() {
        this.form = {
          indicatorName: '',
          unit: '',
          dateType: '',
          organName: '',
          realName: '',
          targetValue: '',
          num: '',
          createTime: '', //填报日期
          gid: '',
          uid: '',
        }
      },
      // 查询
      search() {
        this.getListByUid()
      },

      //页面条数发生变化
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getListByUid()
      },
      // 页面发生变化
      changePageNum(pageNum) {
        this.page.pageNum = pageNum
        this.getListByUid()
      },
    },
  }
</script>

<style scoped></style>
