/**
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，pro版只支持remixIcon图标，具体配置请查看vip群文档
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/vab/layouts'
import { publicPath, routerMode } from '@/config'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/majorIndex',
    name: 'majorIndex',
    component: () => import('@/views/workbench/majorIndex'),
    meta: {
      title: '重大指标',
      icon: 'marker',
      permissions: ['admin'],
      hidden: true,
    },
  },
  {
    path: '/pandect',
    name: 'pandect',
    component: () => import('@/views/workbench/pandect'),
    meta: {
      title: '总览',
      icon: 'marker',
      permissions: ['admin'],
      hidden: true,
    },
  },
  {
    path: '/dynamic',
    name: 'dynamic',
    component: () => import('@/views/workbench/dynamic'),
    meta: {
      title: '动态',
      icon: 'marker',
      permissions: ['admin'],
      hidden: true,
    },
  },
  {
    path: '/warn',
    name: 'warn',
    component: () => import('@/views/workbench/warn'),
    meta: {
      title: '预警',
      icon: 'marker',
      permissions: ['admin'],
      hidden: true,
    },
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('@/views/workbench/feedback'),
    meta: {
      title: '反馈',
      icon: 'marker',
      permissions: ['admin'],
      hidden: true,
    },
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import('@/views/workbench/rank'),
    meta: {
      title: '排行',
      icon: 'marker',
      permissions: ['admin'],
      hidden: true,
    },
  },
  {
    path: '/assessMatter',
    name: 'assessMatter',
    component: () => import('@/views/workbench/assessMatter'),
    meta: {
      title: '考核事项',
      icon: 'marker',
      permissions: ['admin'],
      hidden: true,
    },
  },
  {
    path: '/majorProject',
    name: 'majorProject',
    component: () => import('@/views/workbench/majorProject.vue'),
    meta: {
      title: '重大项目',
      icon: 'marker',
      permissions: ['admin'],
      hidden: true,
    },
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/views/workbench/detail'),
    meta: {
      title: '详情',
      icon: 'marker',
      permissions: ['admin'],
      hidden: true,
    },
    children: [
      {
        path: '/projectNews',
        name: 'projectNews',
        components: {
          menu: () => import('@/views/workbench/menus/projectNews'),
        },
        meta: {
          title: '项目动态',
          icon: 'marker',
          permissions: ['admin'],
        },
      },
      {
        path: '/investSchedule',
        name: 'investSchedule',
        components: {
          menu: () => import('@/views/workbench/menus/investSchedule'),
        },
        meta: {
          title: '投资进度',
          icon: 'marker',
          permissions: ['admin'],
        },
      },
      {
        path: '/approvalInformation',
        name: 'approvalInformation',
        components: {
          menu: () => import('@/views/workbench/menus/approvalInformation'),
        },
        meta: {
          title: '审批信息',
          icon: 'marker',
          permissions: ['admin'],
        },
      },
      {
        path: '/problemFeedback',
        name: 'problemFeedback',
        components: {
          menu: () => import('@/views/workbench/menus/problemFeedback'),
        },
        meta: {
          title: '问题反馈',
          icon: 'marker',
          permissions: ['admin'],
        },
      },
      {
        path: '/projectMap',
        name: 'projectMap',
        components: {
          menu: () => import('@/views/workbench/menus/projectMap'),
        },
        meta: {
          title: '项目地图',
          icon: 'marker',
          permissions: ['admin'],
        },
      },
    ],
  },
  {
    path: '/livelihood',
    name: 'livelihood',
    component: () => import('@/views/workbench/livelihood'),
    meta: {
      title: '民生实事',
      icon: 'marker',
      permissions: ['admin'],
      hidden: true,
    },
  },
  {
    path: '/majorEvents',
    name: 'majorEvents',
    component: () => import('@/views/workbench/majorEvents'),
    meta: {
      title: '重大事项',
      icon: 'marker',
      permissions: ['admin'],
      hidden: true,
    },
  },

  {
    path: '/project',
    component: Layout,
    name: 'project',
    meta: {
      title: '重大指标',
      icon: 'box-open',
    },
    children: [
      {
        path: 'indexManagement',
        name: 'indexManagement',
        component: () => import('@/views/project/indexManagement'),
        meta: {
          title: '指标管理',
          icon: 'marker',
          permissions: ['admin'],
        },
      },
      {
        path: 'indexData',
        name: 'indexData',
        component: () => import('@/views/project/indexData'),
        meta: {
          title: '指标数据',
          icon: 'marker',
          permissions: ['admin'],
        },
      },
      {
        path: 'indexFillin',
        name: 'indexFillin',
        component: () => import('@/views/project/indexFillin'),
        meta: {
          title: '指标填报',
          icon: 'marker',
          permissions: ['admin'],
        },
      },
    ],
  },
  {
    path: '/bigproject',
    component: Layout,
    name: 'bigproject',
    meta: {
      title: '重大项目',
      icon: 'box-open',
    },
    children: [
      {
        path: 'classifyManagement',
        name: 'bigProjectClassifyManagement',
        component: () => import('@/views/bigproject/classifyManagement'),
        meta: {
          title: '分类管理',
          icon: 'marker',
          permissions: ['admin'],
        },
      },
      {
        path: 'projectManagement',
        name: 'projectManagement',
        component: () => import('@/views/bigproject/projectManagement'),
        meta: {
          title: '项目管理',
          icon: 'marker',
          permissions: ['admin'],
        },
      },
      {
        path: 'schedule',
        name: 'schedule',
        component: () => import('@/views/bigproject/schedule'),
        meta: {
          title: '进度',
          icon: 'marker',
          permissions: ['admin'],
          hidden: true,
        },
      },
      {
        path: 'invest',
        name: 'invest',
        component: () => import('@/views/bigproject/invest'),
        meta: {
          title: '投资',
          icon: 'marker',
          permissions: ['admin'],
          hidden: true,
        },
      },
      {
        path: 'node',
        name: 'node',
        component: () => import('@/views/bigproject/node'),
        meta: {
          title: '节点',
          icon: 'marker',
          permissions: ['admin'],
          hidden: true,
        },
      },
      {
        path: 'fillNode',
        name: 'fillNode',
        component: () => import('@/views/bigproject/fillNode'),
        meta: {
          title: '填报节点',
          permissions: ['admin'],
          hidden: true,
        },
      },
      {
        path: 'approval',
        name: 'approval',
        component: () => import('@/views/bigproject/approval'),
        meta: {
          title: '审批',
          icon: 'marker',
          permissions: ['admin'],
          hidden: true,
        },
      },
      {
        path: 'task',
        name: 'task',
        component: () => import('@/views/bigproject/task'),
        meta: {
          title: '任务',
          icon: 'marker',
          permissions: ['admin'],
          hidden: true,
        },
      },
      {
        path: 'viewNodes',
        name: 'viewNodes',
        component: () => import('@/views/bigproject/viewNode.vue'),
        meta: {
          title: '查看节点',
          icon: 'marker',
          permissions: ['admin'],
          hidden: true,
        },
      },
      {
        path: 'taskprogress',
        name: 'taskprogress',
        component: () => import('@/views/bigproject/taskprogress.vue'),
        meta: {
          title: '任务完成情况',
          icon: 'marker',
          permissions: ['admin'],
          hidden: true,
        },
      },
      {
        path: 'investCompletion',
        name: 'investCompletion',
        component: () => import('@/views/bigproject/investCompletion.vue'),
        meta: {
          title: '投资完成情况',
          icon: 'marker',
          permissions: ['admin'],
          hidden: true,
        },
      },
    ],
  },
  {
    path: '/assess',
    component: Layout,
    name: 'assess',
    meta: {
      title: '考核事项',
      icon: 'box-open',
    },
    children: [
      {
        path: 'classifyManagement',
        name: 'assessClassifyManagement',
        component: () => import('@/views/assess/classifyManagement.vue'),
        meta: {
          title: '分类管理',
          icon: 'marker',
          permissions: ['admin'],
        },
      },
      {
        path: 'eventManagement',
        name: 'assessEventManagement',
        component: () => import('@/views/assess/eventManagement.vue'),
        meta: {
          title: '事项管理',
          icon: 'marker',
          permissions: ['admin'],
        },
      },
      {
        path: '/assess/schedule',
        name: 'assessSchedule',
        component: () => import('@/views/assess/schedule.vue'),
        meta: {
          title: '进度',
          icon: 'marker',
          permissions: ['admin'],
          hidden: true,
        },
      },
    ],
  },
  {
    path: '/majorIssues',
    component: Layout,
    name: 'majorIssues',
    meta: {
      title: '重大事项',
      icon: 'box-open',
    },
    children: [
      {
        path: 'classifyManagement',
        name: 'majorIssuesClassifyManagement',
        component: () => import('@/views/majorIssues/classifyManagement.vue'),
        meta: {
          title: '分类管理',
          icon: 'marker',
          permissions: ['admin'],
        },
      },
      {
        path: 'eventManagement',
        name: 'majorIssuesEventManagement',
        component: () => import('@/views/majorIssues/eventManagement.vue'),
        meta: {
          title: '事项管理',
          icon: 'marker',
          permissions: ['admin'],
        },
      },
    ],
  },
  {
    path: '/peopleLive',
    component: Layout,
    // component: () => import('@/views/peopleLive.vue'),
    name: 'peopleLive',
    meta: {
      title: '民生实事',
      icon: 'box-open',
    },
  },
  {
    path: '/gtasks',
    component: Layout,
    // component: () => import('@/views/gtasks.vue'),
    name: 'gtasks',
    meta: {
      title: '待办任务',
      icon: 'box-open',
    },
  },
  {
    path: '/auditTask',
    component: Layout,
    // component: () => import('@/views/auditTask.vue'),
    name: 'auditTask',
    meta: {
      title: '待审核任务',
      icon: 'box-open',
    },
  },
  {
    path: '/instruct ',
    component: Layout,
    // component: () => import('@/views/feedBack.vue'),
    name: 'instruct ',
    meta: {
      title: '批示反馈',
      icon: 'box-open',
    },
  },
  {
    path: '/myRank',
    component: Layout,
    // component: () => import('@/views/myRank.vue'),
    name: 'myRank',
    meta: {
      title: '我的排行',
      icon: 'box-open',
    },
  },
  {
    path: '/systemSetting',
    component: Layout,
    name: 'systemSetting',
    meta: {
      title: '系统设置',
      icon: 'box-open',
    },
    children: [
      {
        path: 'organization',
        name: 'organization',
        component: () => import('@/views/systemSetting/organization.vue'),
        meta: {
          title: '组织机构',
          icon: 'marker',
          permissions: ['admin'],
        },
      },
      {
        path: 'userManagement',
        name: 'userManagement',
        component: () => import('@/views/systemSetting/userManagement.vue'),
        meta: {
          title: '用户管理',
          icon: 'marker',
          permissions: ['admin'],
        },
      },
      {
        path: 'authorization',
        name: 'authorization',
        component: () => import('@/views/systemSetting/authorization.vue'),
        meta: {
          title: '授权管理',
          icon: 'marker',
          permissions: ['admin'],
        },
      },
      {
        path: 'permission',
        name: 'permission',
        component: () => import('@/views/systemSetting/authorization.vue'),
        meta: {
          title: '权限管理',
          icon: 'marker',
          permissions: ['admin'],
        },
      },
    ],
  },
]

export const asyncRoutes = [
  // {
  //   path: '/',
  //   name: 'Root',
  //   component: Layout,
  //   meta: {
  //     title: '首页',
  //     icon: 'home-2-line',
  //     breadcrumbHidden: true,
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Index',
  //       component: () => import('@/views/index'),
  //       meta: {
  //         title: '首页',
  //         icon: 'home-2-line',
  //         noClosable: true,
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '*',
  //   redirect: '/404',
  //   meta: {
  //     hidden: true,
  //   },
  // },
]

const router = createRouter()

function fatteningRoutes(routes) {
  return routes.flatMap((route) => {
    return route.children ? fatteningRoutes(route.children) : route
  })
}

export function resetRouter(routes = constantRoutes) {
  routes.map((route) => {
    if (route.children) {
      route.children = fatteningRoutes(route.children)
    }
  })
  router.matcher = createRouter(routes).matcher
}

function createRouter(routes = constantRoutes) {
  return new VueRouter({
    base: publicPath,
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: routes,
  })
}

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

export default router
