<template>
  <div>
    <el-dialog
      :title="dialogtitle"
      :visible="dialogvisible"
      width="500px"
      @close="closeDialog"
    >
      <slot name="table"></slot>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$parent.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="increase">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      dialogvisible: {
        type: [String, Number, Object, Boolean],
        required: true,
      },
      dialogtitle: {
        type: [String, Number, Object],
        required: true,
      },
    },
    data() {
      return {}
    },
    created() {},

    mounted() {},
    methods: {
      increase() {
        this.$emit('increase')
      },
      closeDialog() {
        this.$parent.form = {}
      },
    },
  }
</script>

<style scoped></style>
