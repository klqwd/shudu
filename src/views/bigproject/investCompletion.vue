<template>
  <div>
    <div style="padding-top: 10px; padding-left: 20px" @click="$router.go(-1)">
      <i class="el-icon-back" style="font-size: 18px"></i>
      <el-button style="font-size: 18px; color: #000" type="text">
        返回
      </el-button>
      <div style="display: inline; margin-left: 70px; font-size: 18px">
        {{ $router.currentRoute.query.projectName }}+{{
          $router.currentRoute.meta.title
        }}
      </div>
    </div>
    <!-- 按钮 -->
    <div style="padding-left: 20px; margin-top: 20px">
      <el-button type="primary" @click="dialogFormVisible = true">
        增加
      </el-button>
      <el-button type="danger" @click="handleSelectionChange()">删除</el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="80" />
        <el-table-column label="投资完成额" prop="investmentComplete" />
        <el-table-column label="责任单位" prop="gid">
          <template slot-scope="scope">
            {{ getGidData(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column label="责任人" prop="uid">
          <template slot-scope="scope">
            {{ getUidData(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="view(scope.row)">查看</el-button>
            <el-button
              type="text"
              @click="deleteProjectInvestmentCompleteById(scope.row)"
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
      title="增加"
      :visible.sync="dialogFormVisible"
      @close="closeDialog"
    >
      <el-form label-width="80px" :model="form">
        <el-form-item label="投资完成额">
          <el-input v-model="form.investmentComplete" />
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            saveProjectInvestmentComplete()
            dialogFormVisible = false
          "
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 增加弹出框 -->

    <!-- 查看弹出框 -->
    <el-dialog title="查看" :visible.sync="viewVisible" @close="closeDialog">
      <el-form :disabled="true" label-width="80px" :model="form">
        <el-form-item label="投资完成额">
          <el-input v-model="form.investmentComplete" />
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="viewVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            saveProjectInvestmentComplete()
            viewVisible = false
          "
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 查看弹出框 -->

    <!-- 修改弹出框 -->
    <el-dialog title="查看" :visible.sync="alterVisible" @close="closeDialog">
      <el-form label-width="80px" :model="form">
        <el-form-item label="投资完成额">
          <el-input v-model="form.investmentComplete" />
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="alterVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            saveProjectInvestmentComplete()
            alterVisible = false
          "
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 修改弹出框 -->
  </div>
</template>

<script>
  import {
    getProjectInvestmentCompleteByMid,
    deleteProjectInvestmentCompleteById,
    deleteProjectInvestmentCompleteByIdList,
    saveProjectInvestmentComplete,
  } from '@/api/majorProject/invest'
  import { getUserList, getUserOrganListByParentid } from '@/api/indicator'
  import upload from '@/components/upload'
  export default {
    components: {
      upload,
    },
    data() {
      return {
        tableData: [
          {
            completeDate: '',
            investmentComplete: '',
            gid: '',
            uid: '',
          },
        ],
        dialogFormVisible: false,
        viewVisible: false,
        alterVisible: false,
        organName: '',
        realName: '',
        form: {
          completeDate: '',
          investmentComplete: '',
          gid: '',
          uid: '',
          mid: localStorage.getItem('mid'),
        },
      }
    },
    created() {
      this.getProjectInvestmentCompleteByMid()
      this.getUserList()
      this.getUserOrganListByParentid()
    },
    methods: {
      // 获取列表数据
      async getProjectInvestmentCompleteByMid() {
        const data = await getProjectInvestmentCompleteByMid({
          mid: localStorage.getItem('mid'),
        })
        this.tableData = data.data
      },
      // 删除数据
      async deleteProjectInvestmentCompleteById(row) {
        console.log(row)
        const data = await deleteProjectInvestmentCompleteById({
          ipid: row.ipid,
        })
        console.log(data, row)
        this.getProjectInvestmentCompleteByMid()
      },
      // 添加或修改数据
      async saveProjectInvestmentComplete() {
        await saveProjectInvestmentComplete(this.form)
        this.getProjectInvestmentCompleteByMid()
      },

      // 批量删除信息
      handleSelectionChange(val) {
        this.icidList = []
        val.forEach((item) => {
          this.icidList.push(item.icid)
        })
      },
      // 批量删除数据
      async deleteProjectInvestmentCompleteByIdList() {
        await deleteProjectInvestmentCompleteByIdList(this.icidList)
      },
      // 获取填报人列表
      async getUserList() {
        const data = await getUserList({
          pageNum: 1,
          pageSize: 20,
          gid: 2,
        })
        this.realName = data.data.list
      },
      // 获取填报单位列表
      async getUserOrganListByParentid() {
        const data = await getUserOrganListByParentid({
          parentid: 1,
          pageNum: 1,
          pageSize: 20,
        })
        this.organName = data.data.list
      },
      // 查看弹出框
      view(row) {
        this.viewVisible = true
        this.form = row
      },
      // 修改弹出框
      alter(row) {
        this.alterVisible = true
        this.form = row
      },
      // 关闭弹出框，表单清空
      closeDialog() {
        this.form = {}
      },
      // 将gid转化为填报人
      getGidData(value) {
        const data = this.organName.filter((item) => {
          return JSON.stringify(item.gid) === JSON.stringify(value.gid)
        })
        return data[0] && data[0].organName
      },
      // 将uid转化为填报单位
      getUidData(value) {
        const data = this.realName.filter((item) => {
          return JSON.stringify(item.uid) === JSON.stringify(value.uid)
        })
        return data[0] && data[0].realName
      },
      // 选中单位时获取填报人
      async getInformant() {
        this.form.uid = ''
        const data = await getUserList({
          gid: this.form.gid.toString(),
          pageNum: 1,
          pageSize: 20,
        })
        this.realName = data.data.list
      },
    },
  }
</script>

<style scoped></style>
