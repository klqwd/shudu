<template>
  <div>
    <div class="sidebar">
      <div class="logo">
        <div class="logoImg"></div>
        <div class="logoText">数督青田</div>
      </div>
      <div>
        <div class="router">
          <ul>
            <li
              v-for="(item, index) in menuData"
              :key="item.id"
              :class="{ active: activeIndex === index }"
              @click="goRouter(item.router, index)"
            >
              <div v-if="item.isShow" style="display: inline-block">
                <i :class="item.icon" style="margin-right: 20px"></i>
                <el-badge class="badge" :value="item.value">
                  {{ item.name }}
                </el-badge>
              </div>
              <div v-else style="display: inline-block">
                <i :class="item.icon" style="margin-right: 20px"></i>
                {{ item.name }}
              </div>
            </li>
          </ul>
          <!-- <div><router-link to="/majorIndex">重点指标</router-link></div>
          <div><router-link to="/majorProject">重点项目</router-link></div>
          <div><router-link to="/pandect">总览</router-link></div>
          <div>
            <el-badge class="badge" :value="5">
              <router-link to="/dynamic">动态</router-link>
            </el-badge>
          </div>

          <div>
            <el-badge class="badge" :value="12">
              <router-link to="/warn">预警</router-link>
            </el-badge>
          </div>
          <div>
            <el-badge class="badge" :value="7">
              <router-link to="/feedback">反馈</router-link>
            </el-badge>
          </div>
          <div><router-link to="/rank">排行</router-link></div>
          <div><router-link to="/assessMatter">考核事项</router-link></div>
          <div><router-link to="/livelihood">民生实事</router-link></div>
          <div><router-link to="/majorEvents">重大事项</router-link></div> -->
        </div>
      </div>
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        menuData: [
          {
            name: '重大指标',
            isShow: false,
            router: '/majorIndex',
            id: '1',
            icon: 'iconfont icon-louyushu',
          },
          {
            name: '重大项目',
            isShow: false,
            router: '/majorProject',
            id: '2',
            icon: 'iconfont icon-pie',
          },
          {
            name: '总览',
            isShow: false,
            router: '/pandect',
            id: '3',
            icon: 'iconfont icon-zhanghuzonglan',
          },
          {
            name: '动态',
            isShow: true,
            value: 5,
            router: '/dynamic',
            id: '4',
            icon: 'iconfont icon-dongtai',
          },
          {
            name: '预警',
            isShow: true,
            value: 12,
            router: '/warn',
            id: '5',
            icon: 'iconfont icon-yujing',
          },
          {
            name: '反馈',
            isShow: true,
            value: 7,
            router: '/feedback',
            id: '6',
            icon: 'iconfont icon-wodefankui',
          },
          {
            name: '排行',
            isShow: false,
            router: '/rank',
            id: '7',
            icon: 'iconfont icon-paihangbang',
          },
          {
            name: '考核事项',
            isShow: false,
            router: '/assessMatter',
            id: '8',
            icon: 'iconfont icon-zhibiao',
          },
          {
            name: '民生实事',
            isShow: false,
            router: '/livelihood',
            id: '9',
            icon: 'iconfont icon-icon-person-renyuan',
          },
          {
            name: '重大事项',
            isShow: false,
            router: '/majorEvents',
            id: '10',
            icon: 'iconfont icon-zhuyishixiang',
          },
        ],
        activeIndex: +localStorage.getItem('activeIndex'),
      }
    },
    created() {},
    methods: {
      goRouter(rout, index) {
        this.activeIndex = +index
        localStorage.setItem('activeIndex', this.activeIndex)
        this.$router.push({
          path: rout,
        })
      },
    },
  }
</script>

<style scoped>
  ::v-deep .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 2000;
    width: 266px;
    height: 100vh;
    overflow: hidden;
    background: #282c34;
    background-image: url('../assets/nano-content-bg.png');
    background-repeat: no-repeat;
    background-position: bottom;
  }
  .logo {
    height: 155px;
    overflow: hidden;
  }
  .logoImg {
    height: 79px;
    width: 79px;
    margin: 30px auto 0;
    background-image: url('../assets/logo2.png');
    background-size: contain;
  }
  .logoText {
    font-size: 25px;
    text-align: center;
    color: #fff;
    line-height: 55px;
  }
  .router {
    padding-left: 50px;
    color: #bdbdc7;
    line-height: 48px;
    background-color: #2a3547;
    font-size: 16px;
  }
  .router ul {
    padding-left: 0px;
  }
  .router ul li {
    list-style: none;
    cursor: pointer;
  }
  html body a {
    color: #bdbdc7;
  }

  ::v-deep .el-badge__content.is-fixed {
    top: 24px;
    right: -5px;
    width: 28px;
    height: 15px;
    line-height: 15px;
    background-color: #e61f18;
  }

  .router li:hover a {
    color: #fff;
  }
  .router li:hover {
    background-color: #1890ff;
    margin-left: -50px;
    padding-left: 45px;
    color: #fff !important;
  }
  .router div:visited {
    border: solid 5px #25a79f;
  }
  .router li.active {
    border-left: solid 5px #25a79f;

    /* background-color: #1890ff; */
    margin-left: -50px;
    color: #fff !important;
    padding-left: 45px;
    box-sizing: border-box;
  }
</style>
