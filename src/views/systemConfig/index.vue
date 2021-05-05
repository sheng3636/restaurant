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
      //     index: 'canteen',
      //     title: '食堂设置',
      //     icon: 'r4'
      //   },
      //   {
      //     index: 'checkMachine',
      //     title: '核销机管理',
      //     icon: 'r4'
      //   }
      // ],
    }
  },
  computed: {
    ...mapGetters(['menus']),
    subMenuItems() {
      let menus = []
      let arr = this.menus.filter(item => item.path == 'systemConfig')[0].children
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        menus.push({
          index:element.path,
          title:element.meta.title,
          icon:element.meta.icon
        })
      }
      return menus
    },
  },
}
</script>
<style scoped>
</style>