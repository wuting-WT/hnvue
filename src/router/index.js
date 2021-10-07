import {
  createRouter,
  createWebHashHistory
} from 'vue-router';
const router = createRouter({
  history: createWebHashHistory(),
  routes: [{
      path: '/login',
      component: () => import('@views/login/login.vue'),
      hidden: true
    },
    {

      name: '领导驾驶舱',
      path: '/report',
      iconCls: 'el-icon-user-solid',
      component: () => import('@views/home/home.vue'),
      children: [{
          path: '/report/newReport',
          component: () => import('@views/newReport/newReport.vue'),
          name: 'newReport',
          iconCls: 'el-icon-s-flag',
          meta: {
            keepAlive: true,
            title: '新建报表任务'
          }
        },
        {
          path: '/report/report',
          component: () => import('@views/checkReport/checkReport.vue'),
          name: 'report',
          iconCls: 'el-icon-s-flag',
          meta: {
            keepAlive: true,
            title: '验证报告查阅'
          }
        }

      ]
    },
    {
      path: '/echarts',
      name: '风险分析',
      iconCls: 'el-icon-user-solid',
      component: () => import('@views/home/home.vue'),
      children: [{
          path: '/echarts',
          component: () => import('@views/echarts/echarts.vue'),
          name: 'echartsDemo',
          iconCls: 'el-icon-s-flag',
          meta: {
            keepAlive: true,
            title: 'echartsDemo'
          }
        }

      ]
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('@views/newReport/newReport.vue'),
      redirect: {
        name: 'newReport'
      },
      hidden: true
    },

  ]
});
export default router