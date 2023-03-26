import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['../pages/Login.vue'], resolve)
    },
    {
      path: '/Home',
      component: resolve => require(['../components/Home.vue'], resolve),
      children: [
        {
          // 如果子路由的path的最前边有“/”，则不需要加父路由的路径即可访问此子组件。
          path: '/Info',
          component: resolve => require(['../pages/InfoPage.vue'], resolve),
          meta: { isAuth: true }
        },
        {
          // 如果子路由的path的最前边有“/”，则不需要加父路由的路径即可访问此子组件。
          path: '/Consumer',
          component: resolve => require(['../pages/ConsumerPage.vue'], resolve),
          meta: { isAuth: true }
        },
        {
          // 如果子路由的path的最前边有“/”，则不需要加父路由的路径即可访问此子组件。
          path: '/Singer',
          component: resolve => require(['../pages/SingerPage.vue'], resolve),
          meta: { isAuth: true }
        },
        {
          // 如果子路由的path的最前边有“/”，则不需要加父路由的路径即可访问此子组件。
          path: '/SongList',
          component: resolve => require(['../pages/SongListPage.vue'], resolve),
          meta: { isAuth: true }
        },
        {
          // 如果子路由的path的最前边有“/”，则不需要加父路由的路径即可访问此子组件。
          path: '/Song',
          component: resolve => require(['../pages/SongPage.vue'], resolve),
          meta: { isAuth: true }
        },
        {
          // 如果子路由的path的最前边有“/”，则不需要加父路由的路径即可访问此子组件。
          path: '/ListSong',
          component: resolve => require(['../pages/ListSongPage.vue'], resolve),
          meta: { isAuth: true }
        },
      ]
    }
  ]
})
//全局前置路由，配合浏览器localStorage进行鉴权操作
router.beforeEach((to, from, next) => {
  //首先，我们先看一看to和from参数，next就是执行的意思，不写页面是不会跳转的
  // console.log(to, from);
  if (to.meta.isAuth) { //判断是否需要鉴权
    const tokenStr = localStorage.getItem('userName')
    if (tokenStr) {
      next()
    } else {
      // 没有token
      next({ path: '/' })
    }
  } else {
    next()
  }
})

// 全局后置路由，简单写一个弹窗，在进入每一个路由组件后弹出一句话
// router.afterEach(() =>{
//   alert('欢迎你！！');
// })

export default router;
