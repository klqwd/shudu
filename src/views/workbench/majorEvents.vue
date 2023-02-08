<template>
  <div>
    <div class="tabs">
      <tabs />
    </div>
    <div class="offset">
      <el-button
        type="primary"
        @click="
          dialogVisible = true
          getUserOrganListByParentid()
          getUserList()
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
            <el-button type="text" @click="deleteMatterTypeById(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :page="page"
        @changPageSize="changePageSize"
        @changePageNum="changePageNum"
      />
    </div>
    <!-- 增加弹出框 -->
    <el-dialog title="增加" :visible.sync="dialogVisible" width="30%">
      <el-form label-width="80px" :model="form">
        <el-form-item label="重大事项类别名称">
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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogVisible = false
            saveMatterType()
          "
        >
          确 定
        </el-button>
      </span>
    </el-dialog>
    <Layout />
  </div>
</template>

<script>
  import Layout from '@/vab/layouts/VabLayout.vue'
  import tabs from '@/components/tabs.vue'
  import pagination from '@/components/pagination.vue'

  import {
    saveMatterType,
    getMatterTypeList,
    deleteMatterTypeById,
  } from '@/api/workbench/matter'
  import { getUserList, getUserOrganListByParentid } from '@/api/indicator'
  export default {
    components: {
      Layout,
      tabs,
      pagination,
    },
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
          gid: '',
          uid: '',
          remarks: '',
        },
        page: {
          pageNum: 1,
          pageSize: 20,
          total: '',
          totalPage: '',
        },
        dialogVisible: false,
        organName: '',
        realName: '',
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
        const data = await saveMatterType(this.form)
        this.getMatterTypeList()
        console.log(data)
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
      // 根据机构ID获取下级机构列表
      async getUserOrganListByParentid() {
        const data = await getUserOrganListByParentid({
          pageNum: 1,
          pageSize: 20,
          parentid: 1,
        })
        this.organName = data.data.list
      },
      // 获取用户列表
      async getUserList() {
        const data = await getUserList({
          pageNum: 1,
          pageSize: 20,
          gid: 1,
        })
        this.realName = data.data.list
      },
      // 获取填报人
      async getInformant() {
        this.form.uid = ''
        const data = await getUserList({
          gid: this.form.gid,
          pageNum: 1,
          pageSize: 20,
        })
        this.realName = data.data.list
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
    },
  }
</script>

<style scoped></style>
