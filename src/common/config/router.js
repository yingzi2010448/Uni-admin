/* 
路由规则：
1.自动补全component
2.自动生成name，2.1将所有的/替换为_(如shop/goods/list => shop_goods_list)，2.2如末尾是index则将其删除
3.自动生成path
 */
const routes = [
  {
    redirect: { name: 'index' },
    component:'layout',
    children: [
      {
        // path: 'index',
        // name: 'index',
        // component: () => import('../../views/index/index.vue')
        meta:{ title: '后台首页'},
        component:'index/index'
      },
      {
        meta:{ title: '商品列表'},
        component:'shop/goods/list'
      }
    ]
  },
  {
    meta:{ title: '登录页'},
    component: 'login/index'
  },
  {
	  path: '*',
    redirect: { name: 'index' }
  }
]

// 获取路由信息
let getRoutes = function(){
  // 自动生成路由
  createRoute(routes)
  return routes
}

//自动生成路由
function createRoute(arr) {
  for (let i = 0; i < arr.length; i++) {
    if(!arr[i].component) return
    // 去除index
    let val = reduceIndex(arr[i].component)
    // 生成name, 将/替换成_
    arr[i].name = arr[i].name || val.replace(/\//g, '_')
    // 生成path
    arr[i].path = `/${val}`
    // 自动生成component
    let componentFun = import(`../../views/${arr[i].component}.vue`)
    arr[i].component = () => componentFun
    // 如果含有children递归
    if(arr[i].children && arr[i].children.length > 0){
      createRoute(arr[i].children)
    }
  }
}

//去除Index
function reduceIndex(str) {
  // str = shop/goods/index
  // 获取最后一个/的index
  let index = str.lastIndexOf('/')
  // 获取最后一个/后面的字符
  let val = str.substring(index+1, str.length)
  // 判断是否以index结尾
  if(val === 'index'){
    // 去除index
    return str.substring(index, -1)
  }
  return str

}

export default getRoutes()
