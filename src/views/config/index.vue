<template>
  <div class="appWrapper">
    <!-- 一级菜单下面所拥有的二级菜单 -->
    <el-aside class="sidebar" width="170">
      <SideMenu :items='subMenuItems'></SideMenu>
    </el-aside>
    <!-- 以及二级菜单所对应的页面 -->
    <el-main class="mainBottom">
      <router-view></router-view>
    </el-main>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SideMenu from '@/components/sidemenu/sideMenu'
export default {
  components: {
    SideMenu,
  },
  data() {
    return {
      // items: [
      //   {
      //     index: 'orderConfig',
      //     title: '订餐设置',
      //     icon: 'r4'
      //   },
      //   {
      //     index: 'meal',
      //     title: '套餐设置',
      //     icon: 'r5'
      //   },
      //   {
      //     index: 'site',
      //     title: '网点设置',
      //     icon: 'r6'
      //   }
      // ],
    }
  },
  computed: {
    ...mapGetters(['menus']),
    subMenuItems() {
      let menus = []
      let arr = this.menus.filter(item => item.newPath == 'config')[0].children
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        menus.push({
          index:element.newPath,
          title:element.meta.title,
          icon:element.meta.icon
        })
      }
      return menus
    },
  },
  mounted () {
    
  }
}
</script>
<style scoped>
</style>