<template>
  <div>
    <div style="padding-top: 10px; padding-left: 20px" @click="$router.go(-1)">
      <i class="el-icon-back" style="font-size: 18px"></i>
      <el-button style="font-size: 18px; color: #000" type="text">
        返回
      </el-button>
      <div style="display: inline; margin-left: 70px; font-size: 18px">
        {{ tableData[0].nodeName }} +{{ $router.currentRoute.meta.title }}
      </div>
    </div>
    <!-- 表单 -->
    <el-form ref="form" label-position="left" label-width="100px" :model="form">
      <el-row>
        <el-col :span="10">
          <el-form-item label="节点名称">
            <el-input v-model="form.nodeName" />
          </el-form-item>
        </el-col>
        <el-col :offset="4" :span="10">
          <el-form-item label="责任单位">
            <!-- <el-select v-model="form.gid" placeholder="请选择">
              <el-option
                v-for="item in organName"
                :key="item.gid"
                :label="item.organName"
                :value="item.gid"
              />
            </el-select> -->
            <el-input v-model="form.organName" placeholder="请选择" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="计划开始时间">
            <el-date-picker
              v-model="form.startTime"
              placeholder="选择日期"
              type="date"
            />
          </el-form-item>
        </el-col>
        <el-col :offset="4" :span="10">
          <el-form-item label="责任人">
            <!-- <el-select v-model="form.uid" placeholder="请选择">
              <el-option
                v-for="item in realName"
                :key="item.uid"
                :label="item.realName"
                :value="item.uid"
              />
            </el-select> -->
            <el-input v-model="form.realName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="计划完成时间">
            <el-date-picker
              v-model="value1"
              placeholder="选择日期"
              type="date"
            />
          </el-form-item>
        </el-col>
        <el-col :offset="4" :span="10">
          <el-form-item label="联系方式">
            <el-input />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="备注">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确实</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="80" />
        <el-table-column label="节点名称" prop="nodeName" />
        <el-table-column label="计划开始时间" prop="startTime" />
        <el-table-column
          label="计划完成时间"
          prop="endTime"
          show-overflow-tooltip
        />
        <el-table-column
          label="责任单位"
          prop="organName"
          show-overflow-tooltip
        />
        <el-table-column label="责任人" prop="realName" show-overflow-tooltip />
      </el-table>
    </div>
  </div>
</template>

<script>
  import { getUserList, getUserOrganListByParentid } from '@/api/indicator'

  export default {
    data() {
      return {
        form: {},
        tableData: [],
        realName: '',
        organName: '',
      }
    },
    created() {
      this.tableData = [JSON.parse(this.$route.query.tableData)]
      this.form = JSON.parse(this.$route.query.tableData)
      this.getUserOrganListByParentid()
      this.getUserList()
    },
    methods: {
      // 获取责任人信息
      async getUserList() {
        const data = await getUserList({
          pageNum: 2,
          pageSize: 20,
          gid: 2,
        })
        this.realName = data.data.list
      },
      // 获取责任单位信息
      async getUserOrganListByParentid() {
        const data = await getUserOrganListByParentid({
          parentid: 1,
          pageNum: 1,
          pageSize: 20,
        })
        this.organName = data.data.list
      },
      //把gid转换成填报单位
      getGidData(value) {
        const data = this.organName.filter((item) => {
          return JSON.stringify(item.gid) === JSON.stringify(value.gid)
        })
        return data[0] && data[0].organName
      },
      // 把uid转换成填报人
      getUidData(value) {
        const data = this.realName.filter((item) => {
          return JSON.stringify(item.uid) === JSON.stringify(value.uid)
        })
        return data[0] && data[0].realName
      },
    },
  }
</script>

<style scoped></style>
