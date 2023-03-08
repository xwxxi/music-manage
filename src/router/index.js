import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =new Router({
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
          meta:{isAuth:true}
        },
        {
          // 如果子路由的path的最前边有“/”，则不需要加父路由的路径即可访问此子组件。
          path: '/Consumer',
          component: resolve => require(['../pages/ConsumerPage.vue'], resolve),
          meta:{isAuth:true}
        },
        {
          // 如果子路由的path的最前边有“/”，则不需要加父路由的路径即可访问此子组件。
          path: '/Singer',
          component: resolve => require(['../pages/SingerPage.vue'], resolve),
          meta:{isAuth:true}
        },
        {
          // 如果子路由的path的最前边有“/”，则不需要加父路由的路径即可访问此子组件。
          path: '/SongList',
          component: resolve => require(['../pages/SongListPage.vue'], resolve),
          meta:{isAuth:true}
        },
      ]
    }
  ]
})
// 路由守卫
router.beforeEach((to, from, next) => {
  console.log(to.meta.isAuth);
  if(to.meta.isAuth){
    const tokenStr = localStorage.getItem('userName')
    if (tokenStr) {
      next()
    } else {
      // 没有token
      next({path: '/'})
    }
  }else{
    next()
  }
})

export default router;
