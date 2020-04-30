import Home from '@v/Home.vue';
// import Login from "@v/Login";
import Name from "@v/Name";
import Version from '@v/Version';
// 默认情况下 只有首页默认显示，其他点击时才加载组件
export default [
  {
    path: "/",
    redirect:{path:"home"}
  },
  {
    path: "/home",
    component: Home,
    components:{
      default:Home,
      name:Name,
      version:Version
    }
  },
  {
    path: "/login",
    component: ()=>import("@v/Login.vue")//路由懒加载
  },
  {
    path: "/profile",
    component: ()=>import("@v/Profile.vue")
  },
  {
    path: "/user",
    component: ()=>import("@v/User.vue"),
    children:[
      {
        path:'',//添加默认显示
        // name:'userAdd',
        // 路径默认儿子不能加 '/'
        component:()=>import("@v/UserAdd.vue")
      },
      {
        path:'add',
        name:'userAdd',
        // 路径默认儿子不能加 '/'
        component:()=>import("@v/UserAdd.vue")
      },
      {
        path:'list',
        name:'userList',
        // 路径默认儿子不能加 '/'
        component:()=>import("@v/UserList.vue")
      },
      {
        path:'detail',
        name:'userDetail',
        // 路径默认儿子不能加 '/'
        component:()=>import("@v/UserDetail.vue")
      }
    ]
  },
  {
    path:"*",
    component:()=>import("@v/404.vue")
  }
]