<template>
  <div>
    <el-container style="position: absolute;left: 0;top: 0;bottom: 0;right: 0; overflow: hidden;">
      <!-- 头部导航 -->
      <el-header
        class="d-flex align-items-center"
        style="background: #545c64;"
      >
        <!-- logo -->
        <a class="h5 mr-auto text-light mb-0">{{$conf.logo}}</a>
        <el-menu
          :default-active="navBar.active"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            :index="index|numToString"
            v-for="(item, index) in navBar.list"
            :key="index"
          >
            {{item.name}}
          </el-menu-item>
          <el-submenu index="100">
            <template slot="title">
              <el-avatar
                size="small"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              ></el-avatar>
              tomoya
            </template>
            <el-menu-item index="100-1">修改</el-menu-item>
            <el-menu-item index="100-2">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-container style="height:100%;">
        <!-- 左侧导航 -->
        <el-aside width="200px">
          <el-menu
            @select="asideSelect"
            style="height:100%;"
          >
            <el-menu-item
              v-for="(item, index) in asideMenus"
              :key="index"
              :index="index|numToString"
              :default-active="asideActive"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 右侧内容 -->
        <el-main class="bg-light">
          <!-- 面包屑导航 -->
          <div
            class="border-bottom mb-3 bg-white"
            v-if="bran.length > 0"
            style="padding: 20px;margin: -20px;"
          >
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item
                v-for="(item,index) in bran"
                :key="index"
                :to="{ path: item.path }"
              >
                {{item.title}}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <!-- 路由占位符 -->
          <router-view></router-view>

          <!-- 返回顶部 -->
          <el-backtop target=".el-main" :bottom="100">
            <div
              style="{
                height: 100%;
                width: 100%;
                background-color: #f2f5f6;
                box-shadow: 0 0 6px rgba(0,0,0, .12);
                text-align: center;
                line-height: 40px;
                color: #1989fa;
              }"
            >
            </div>
          </el-backtop>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import common from '@/common/mixins/common.js'
export default {
  mixins: [common],
  data () {
    return {
      navBar: [],
      bran: []
    }
  },
  created () {
    // 初始化菜单数据
    this.navBar = this.$conf.navBar
    this.getRouterBran()
    // 初始化选中菜单
    this.__initNavBar()
  },
  computed: {
    asideActive: {
      set (val) {
        this.navBar.list[this.navBar.active].subActive = val
      },
      get () {
        return this.navBar.list[this.navBar.active].subActive || '0'
      }
    },
    asideMenus () {
      return this.navBar.list[this.navBar.active].submenu || []
    }
  },
  watch: {
    $route: (to, from) => {
      // 本地缓存当前激活导航状态
      localStorage.setItem('navActive', JSON.stringify({
        top: this.navBar.asideMenus || '0',
        left: this.asideActive || '0'
      }))
    }
  },
  methods: {
    // 头部导航切换
    handleSelect (key, keyPath) {
      this.navBar.active = key
      this.asideActive = '0'
      if (this.asideMenus > 0) {
        this.$router.push({ name: this.asideMenus[this.asideActive].pathname })
      }
    },
    // 侧边导航切换
    asideSelect (key, keyPath) {
      this.asideActive = key
      // 跳转到指定页面
      this.$router.push({ name: this.asideMenus[key].pathname })
    },
    // 获取面包屑导航
    getRouterBran () {
      // console.log(this.$route.matched)
      const b = this.$route.matched.filter(v => v.name)
      const arr = []
      b.forEach((v, k) => {
        // 过滤layout和index
        if (v.name === 'index' || v.name === 'layout') return
        arr.push({
          name: v.name,
          path: v.path,
          title: v.meta.title
        })
      })
      if (arr.length > 0) {
        arr.unshift({ name: 'index', path: '/index', title: '后台首页' })
      }
      this.bran = arr
    },
    // 初始化选中菜单，有缓存则使用缓存
    __initNavBar () {
      let n = localStorage.getItem('navActive')
      if (n) {
        n = JSON.parse(n)
        this.navBar.active = n.top
        this.asideActive = n.left
      }
    }
  }
}
</script>

<style scoped>
</style>
