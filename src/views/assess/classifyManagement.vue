<template>
  <div>
    <div style="padding-top: 20px; margin-left: 20px">
      <el-button
        type="primary"
        @click="
          dialogVisible = true
          dialogTitle = '新增'
        "
      >
        新增
      </el-button>
    </div>
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column label="类别名称" prop="typeName" />
      <el-table-column label="责任单位" prop="organName" />
      <el-table-column label="责任人" prop="realName" />
      <!-- <el-table-column label="联系方式" prop="contactInfo" />
      <el-table-column label="备注" prop="remarks" /> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="alter(scope.row)">修改</el-button>
          <el-button type="text" @click="deleteExamineTypeById(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="50%"
      @close="closeDialog"
    >
      <el-form label-width="80px" :model="form">
        <el-form-item label="类别名称">
          <el-input v-model="form.typeName" />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.contactInfo" />
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
        <el-form-item label="备注">
          <el-input v-model="form.remarks" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            saveExamineType()
            dialogVisible = false
          "
        >
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getExamineTypeList,
    saveExamineType,
    deleteExamineTypeById,
  } from '@/api/majorProject/assess'
  import { getUserOrganList } from '@/mixins/getUserOrganList'

  export default {
    mixins: [getUserOrganList],
    data() {
      return {
        tableData: [
          {
            typeName: '类别单位',
            gid: '',
            uid: '',
            contactInfo: '',
            remarks: '',
          },
        ],
        form: {
          typeName: '', //考核事项类别名称
          contactInfo: '', //联系方式
          uid: '', //责任人
          gid: '', //责任单位
          remarks: '', //备注
        },
        dialogVisible: false,
        dialogTitle: '',
        loading: false,
      }
    },
    created() {
      this.getExamineTypeList()
    },
    methods: {
      // 获取考核事项分类列表
      async getExamineTypeList() {
        this.loading = true
        const data = await getExamineTypeList({
          pageNum: 1,
          pageSize: 20,
        })
        this.tableData = data.data.list
        this.loading = false
      },
      // 添加或修改考核事项分类
      async saveExamineType() {
        await saveExamineType(this.form)
        this.getExamineTypeList()
      },
      //点击修改打开修改弹出框
      alter(row) {
        this.form = row
        this.dialogTitle = '修改'
        this.getUserList().then(() => {
          this.dialogVisible = true
        })
      },
      // 删除考核事项分类
      async deleteExamineTypeById(row) {
        await deleteExamineTypeById({
          etid: row.etid,
        })
        this.getExamineTypeList()
      },
      // 关闭弹出框
      closeDialog() {
        this.form = {
          typeName: '',
          contactInfo: '',
          uid: '',
          gid: '',
          remarks: '',
        }
      },
    },
  }
</script>

<style></style>
