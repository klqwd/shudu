<template>
  <div class="vab-nav">
    <el-row :gutter="15">
      <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="4">
        <div class="left-panel">
          <!-- <vab-fold v-if="layout !== 'float'" />
          <el-tabs
            v-if="layout === 'comprehensive'"
            v-model="extra.first"
            tab-position="top"
            @tab-click="handleTabClick"
          >
            <template v-for="(route, index) in handleRoutes">
              <el-tab-pane :key="index + route.name" :name="route.name">
                <span slot="label">
                  <vab-icon
                    v-if="route.meta.icon"
                    :icon="route.meta.icon"
                    :is-custom-svg="route.meta.isCustomSvg"
                    style="min-width: 16px"
                  />
                  {{ translateTitle(route.meta.title) }}
                </span>
              </el-tab-pane>
            </template>
          </el-tabs>
          <vab-breadcrumb v-else class="hidden-xs-only" /> -->
          <el-input
            v-model="search"
            placeholder="搜索"
            prefix-icon="el-icon-search"
            style="border-radius: 16px"
          />
        </div>
      </el-col>
      <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="20">
        <div class="right-panel">
          <div>
            <i class="el-icon-time"></i>
            {{ date }}
          </div>
          <!-- <div>
            <i class="el-icon-question"></i>
          </div> -->
          <!-- <vab-error-log /> -->
          <!-- <vab-search /> -->
          <!-- <vab-notice /> -->
          <!-- <div>
            <i class="el-icon-circle-plus-outline"></i>
          </div> -->
          <!-- <vab-full-screen /> -->
          <!-- <vab-language /> -->
          <!-- <vab-theme /> -->
          <!-- <vab-refresh /> -->
          <vab-avatar />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { translateTitle } from '@/utils/i18n'
  import { mapGetters } from 'vuex'
  import { openFirstMenu } from '@/config'

  export default {
    name: 'VabNav',
    props: {
      layout: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        firstMenu: '',
        date: '',
        search: '',
      }
    },

    computed: {
      ...mapGetters({
        extra: 'settings/extra',
        routes: 'routes/routes',
      }),
      handleRoutes() {
        return this.routes.filter(
          (route) => route.meta && route.meta.hidden !== true
        )
      },
      handleActiveMenu() {
        return this.routes.find((route) => route.name === this.extra.first)
      },
      handlePartialRoutes() {
        const activeMenu = this.handleActiveMenu
        return activeMenu ? activeMenu.children : []
      },
    },
    watch: {
      $route: {
        handler(route) {
          const firstMenu = route.matched[0].name
          if (this.extra.first !== firstMenu) {
            this.extra.first = firstMenu
            this.handleTabClick(true)
          }
        },
        immediate: true,
      },
    },
    created() {
      this.getDate()
    },
    methods: {
      translateTitle,
      handleTabClick(handler) {
        if (handler !== true && openFirstMenu) {
          const { redirect } = this.handleActiveMenu
          this.$router.push(redirect ? redirect : this.handleActiveMenu)
        }
      },
      getDate() {
        var date = new Date() // 获取时间
        var year = date.getFullYear() // 获取年
        var month = date.getMonth() + 1 // 获取月
        var strDate = date.getDate() // 获取日
        // 由于部分业务处理 是需要月份日份前面有0 故新增一个函数
        // this.getNum()
        this.date = year + '-' + this.getNum(month) + '-' + this.getNum(strDate)
      },
      getNum(i) {
        return i < 10 ? '0' + i : i
      },
    },
  }
</script>

<style lang="scss" scoped>
  .vab-nav {
    position: relative;
    height: $base-nav-height;
    padding-right: $base-padding;
    padding-left: $base-padding;
    overflow: hidden;
    user-select: none;
    background: $base-color-white;
    box-shadow: $base-box-shadow;

    .left-panel {
      display: flex;
      align-items: center;
      justify-items: center;
      height: $base-nav-height;

      :deep() {
        .fold-unfold {
          margin-right: $base-margin;
        }
        .el-input__inner {
          border-radius: 16px;
          width: 330px;
        }

        .el-tabs {
          width: 100%;
          margin-left: $base-margin;

          .el-tabs__header {
            margin: 0;

            > .el-tabs__nav-wrap {
              display: flex;
              align-items: center;

              .el-icon-arrow-left,
              .el-icon-arrow-right {
                font-weight: 600;
                color: $base-color-grey;
              }
            }
          }

          .el-tabs__item {
            text-align: center;

            > div {
              display: flex;
              align-items: center;

              i {
                margin-right: 3px;
              }
            }
          }
        }

        .el-tabs__nav-wrap::after {
          display: none;
        }
      }
    }

    .right-panel {
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: flex-end;
      height: $base-nav-height;

      :deep() {
        [class*='ri-'] {
          margin-left: $base-margin;
          color: $base-color-grey;
          cursor: pointer;
        }
        i {
          margin-left: 20px;
          font-size: 16px;
        }
        button {
          [class*='ri-'] {
            margin-left: 0;
            color: $base-color-white;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
