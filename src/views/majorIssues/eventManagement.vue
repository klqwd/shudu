<template>
  <div>
    <div style="padding-top: 20px; margin-left: 20px">
      <el-button
        type="primary"
        @click="
          dialogFormVisible = true
          dialogTitle = '新增'
        "
      >
        新增
      </el-button>
    </div>
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column label="事项名称" prop="matterName" />
      <!-- <el-table-column label="事项编号" prop="matterType" /> -->
      <el-table-column label="来文内容" prop="communicationContent" />
      <el-table-column label="来文日期" prop="communicationDate" />
      <el-table-column label="来文单位" prop="communicationUnit" />
      <el-table-column label="批示内容" prop="instructionsContent" />
      <el-table-column label="批示日期" prop="instructionsDate" />
      <el-table-column label="批示人" prop="instructionsUser" />
      <el-table-column label="联系方式" prop="contactInfo" />
      <el-table-column label="审核意见" prop="examineContent" />
      <el-table-column label="审核日期" prop="examineDate" />
      <el-table-column label="审核人" prop="examineUser" />
      <el-table-column
        label="批示人"
        prop="instructionUser
      "
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="alter(scope.row)">修改</el-button>
          <el-button type="text" @click="deleteMatterById(scope.row)">
            删除
          </el-button>
          <el-button type="text" @click="skiptoTask(scope.row)">任务</el-button>
          <!-- <el-button type="text">目标管理</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form label-width="110px" :model="form">
        <el-form-item label="事项名称">
          <el-input v-model="form.matterName" />
        </el-form-item>
        <!-- <el-form-item label="事项编码">
          <el-input v-model="form.matterNum" />
        </el-form-item> -->
        <el-form-item label="来文内容">
          <el-input v-model="form.communicationContent" />
        </el-form-item>
        <el-form-item label="来文日期">
          <el-date-picker
            v-model="form.communicationDate"
            placeholder="请选择日期"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="来文单位">
          <el-input v-model="form.communicationUnit" />
        </el-form-item>
        <el-form-item label="审核意见">
          <el-input v-model="form.examineContent" />
        </el-form-item>

        <el-form-item label="审核日期">
          <el-date-picker
            v-model="form.examineDate"
            placeholder="请选择日期"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="审核人">
          <el-input v-model="form.examineUser" />
        </el-form-item>
        <el-form-item label="批示内容">
          <el-input v-model="form.instructionsContent" />
        </el-form-item>
        <el-form-item label="批示日期">
          <el-date-picker
            v-model="form.instructionsDate"
            placeholder="请选择日期"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="批示人">
          <el-input v-model="form.instructionsUser" />
        </el-form-item>

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

        <el-form-item label="联系方式">
          <el-input v-model="form.contactInfo" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            saveMatter()
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
    // getMatterTypeByMtid,
    saveMatter,
    getMatterList,
    deleteMatterById,
  } from '@/api/workbench/matter'
  import { getUserOrganList } from '@/mixins/getUserOrganList'
  export default {
    mixins: [getUserOrganList],
    data() {
      return {
        tableData: [
          {
            typeName: '',
            organName: '',
            realName: '',
            remarks: '',
            contactInfo: '',
          },
        ],
        form: {
          communicationContent: '', //来文内容
          communicationDate: '', //来文日期
          communicationUnit: '', //来文单位
          contactInfo: '', //联系方式
          examineContent: '', //审核意见
          examineDate: '', //审核日期
          examineUser: '', //审核人
          gid: '', //责任单位
          instructionsContent: '', //批示内容
          instructionsDate: '', //批示日期
          instructionUser: '', //批示人
          matterName: '', //事项名称
          matterNum: '', //事项编码
          matterType: '', //事项分类
          instructionsUser: '', //批示人
          // gid: '1',
        },
        dialogTitle: '',
        dialogFormVisible: false,
        loading: false,
      }
    },
    created() {
      this.getMatterList()
    },

    mounted() {},
    methods: {
      // async getMatterTypeByMtid() {
      //   const data = await getMatterTypeByMtid({
      //     mtid: this.$route.query.mtid || 0,
      //   })
      //   this.tableData = [data.data]
      // },
      // 添加
      async saveMatter() {
        await saveMatter(this.form)
        this.getMatterList()
      },
      // 获取重大事项列表
      async getMatterList() {
        this.loading = true
        const data = await getMatterList({
          matterName: '',
          matterNum: '',
          pageNum: 1,
          pageSize: 20,
        })
        this.tableData = data.data.list
        this.loading = false
      },
      // 修改
      alter(row) {
        this.dialogTitle = '修改'
        this.dialogFormVisible = true
        this.form = row
        this.getMatterList()
      },
      // 删除
      async deleteMatterById(row) {
        await deleteMatterById({
          mid: row.mid,
        })
        this.getMatterList()
      },
      // 跳转到任务页面
      skiptoTask(row) {
        this.$router.push({
          path: '/bigproject/task',
          query: {
            row: JSON.stringify(row),
          },
        })
      },
    },
  }
</script>

<style scoped></style>
