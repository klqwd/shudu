<template>
  <el-pagination
    background
    :current-page="page.pageNum"
    layout="total, sizes, prev, pager, next, jumper"
    :page-size="page.pageSize"
    :page-sizes="[10, 20, 30, 40]"
    :total="page.total"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  />
</template>

<script>
  export default {
    props: {
      page: {
        type: [String, Number, Object],
        required: true,
      },
    },
    data() {
      return {
        currentPage: 1,
        parsePage: parseInt(this.page.total),
      }
    },
    created() {},
    methods: {
      handleSizeChange(val) {
        this.$emit('changPageSize', val)
      },
      handleCurrentChange(val) {
        this.$emit('changePageNum', val)
      },
    },
  }
</script>

<style></style>
