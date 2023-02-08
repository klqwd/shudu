<template>
  <div>
    <el-form-item label="附件图片">
      <el-upload
        action="/project/info/uploadFile"
        :before-remove="beforeRemove"
        :file-list="fileList"
        :headers="headerObj"
        :limit="3"
        multiple
        :on-exceed="handleExceed"
        :on-remove="handleRemove"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-form-item>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fileList: [],
        headerObj: {
          token: window.localStorage.getItem('admin-pro-token'),
        },
      }
    },
    created() {},

    mounted() {},
    methods: {
      // 上传文件时触发
      uploadFile(item) {
        console.log(item, 555)
      },
      // 文件移除时触发
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      // 文件超过个数限制时触发
      handleExceed(files, fileList) {
        this.$message.warning(
          `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
            files.length + fileList.length
          } 个文件`
        )
      },
      // 删除文件时触发
      beforeRemove(file) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
    },
  }
</script>

<style scoped></style>
