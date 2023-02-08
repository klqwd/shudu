<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-row>
          <el-col class="buildStep" :span="24">
            <el-steps :active="1" simple>
              <el-step title="规划选址" />
              <el-step title="设计编制" />
              <el-step title="开工建设" />
              <el-step title="竣工" />
            </el-steps>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="buildTime" :span="24">
            <el-steps :active="1" finish-status="success">
              <el-step title="2021年1月" />
              <el-step title="2021年8月" />
              <el-step title="2022年4月" />
              <el-step title="2025年1月" />
            </el-steps>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <span>问题反馈：</span>
            <span>土地资金现况进度偏慢</span>
          </el-col>
          <el-col :span="6">
            <i class="iconfont icon-yonghu" style="color: #3d79c4"></i>
            <span>交通运输局:</span>
            <span>熊先生</span>
          </el-col>
          <el-col :span="3">
            <i class="iconfont icon-shijian" style="color: #6f9cd3"></i>
            <span>04/22</span>
          </el-col>
          <el-col :span="6" style="color: #4bce44">
            <i class="iconfont icon-zhengque"></i>
            <span>已处理</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <span>最新动态：</span>
            <span>坟墓迁移</span>
          </el-col>
          <el-col :span="17">
            <span>4月1日[30%]</span>
            <i class="el-icon-right"></i>
            <span>4月30日[50%]</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :offset="1" :span="11">
        <div class="grid-content bg-purple-light">
          <el-row>
            <el-col :span="12">
              <span class="col-item">2022年04月10日</span>
              <span class="col-attribute">土地资金兑现91%</span>
            </el-col>
            <el-col :span="12">
              <span class="col-item">2022年04月18日</span>
              <span class="col2-attribute">土地资金兑现91%</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span class="col-item">2022年04月10日</span>
              <span class="col-attribute">土地资金兑现91%</span>
            </el-col>
            <el-col :span="12">
              <span class="col-item">2022年04月18日</span>
              <span class="col2-attribute">土地资金兑现91%</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span class="col-item">2022年04月10日</span>
              <span class="col-attribute">土地资金兑现91%</span>
            </el-col>
            <el-col :span="12">
              <span class="col-item">2022年04月18日</span>
              <span class="col2-attribute">土地资金兑现91%</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span class="col-item">2022年04月10日</span>
              <span class="col-attribute">土地资金兑现91%</span>
            </el-col>
            <el-col :span="12">
              <span class="col-item">2022年04月18日</span>
              <span class="col2-attribute">土地资金兑现91%</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span class="col-item">2022年04月10日</span>
              <span class="col-attribute">土地资金兑现91%</span>
            </el-col>
            <el-col :span="12">
              <span class="col-item">2022年04月18日</span>
              <span class="col2-attribute">土地资金兑现91%</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span class="col-item">2022年04月10日</span>
              <span class="col-attribute">土地资金兑现91%</span>
            </el-col>
            <el-col :span="12">
              <span class="col-item">2022年04月18日</span>
              <span class="col2-attribute">土地资金兑现91%</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span class="col-item">2022年04月10日</span>
              <span class="col-attribute">土地资金兑现91%</span>
            </el-col>
            <el-col :span="12">
              <span class="col-item">2022年04月18日</span>
              <span class="col2-attribute">土地资金兑现91%</span>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    created() {},

    mounted() {},
  }
</script>

<style scoped>
  .col-item {
    color: #b5b5b5;
  }
  .col-attribute {
    color: #7f94c6;
    margin-left: 13px;
  }
  .col2-attribute {
    color: #98cec9;
    margin-left: 13px;
  }
  .el-row {
    margin-top: 15px;
  }
  ::v-deep .el-step__icon-inner {
    display: none;
  }
  ::v-deep .buildTime .el-step__head .el-step__icon.is-text {
    width: 10px;
    height: 10px;
    background-color: #6b84bc;
    top: 4px;
    border: none;
  }
</style>
