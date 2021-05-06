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
import { mapGetters } from "vuex";
import SideMenu from "@/components/sidemenu/sideMenu";
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
      menusaaa: [
        {
          redirect: "/index/index",
          path: "/",
          component: "Layout",
          hidden: false,
          children: [
            {
              path: "/index/index",
              component: "/index/index",
              meta: {
                icon: "dataOverview",
                title: "首页",
              },
              name: "/index/index",
              url: "/index/index",
            },
          ],
          newPath:'index', // 新增的
          meta: { // 新增的
            icon: "dataOverview",
            title: "首页",
          },
          name: "首页",
        },
        {
          path: "/normalOrder",
          component: "Layout",
          hidden: false,
          children: [
            {
              path: "/normalOrder",
              component: "/normalOrder",
              meta: {
                icon: "detail",
                title: "点餐详情",
              },
              name: "/normalOrder",
              url: "/normalOrder",
            },
          ],
          newPath:'normalOrder', // 新增的
          meta: { // 新增的
            icon: "detail",
            title: "点餐详情",
          },
          name: "点餐详情",
        },
        {
          redirect: "/config/orderConfig",
          path: "/config/orderConfig",
          component: "Layout",
          hidden: false,
          children: [
            {
              path: "/config/orderConfig",
              component: "/config/orderConfig",
              hidden: false,
              children: [],
              newPath:'orderConfig', // 新增的
              meta: {
                icon: "r4",
                title: "订餐设置",
              },
              name: "订餐设置",
              url: "/config/orderConfig",
            },
            {
              path: "/config/meal",
              component: "/config/meal",
              hidden: false,
              children: [],
              newPath:'meal', // 新增的
              meta: {
                icon: "r5",
                title: "套餐配置",
              },
              name: "套餐配置",
              url: "/config/meal",
            },
            {
              path: "/config/site",
              component: "/config/site",
              hidden: false,
              children: [],
              newPath:'site', // 新增的
              meta: {
                icon: "r11",
                title: "网点管理",
              },
              name: "网点管理",
              url: "/config/site",
            },
          ],
          newPath:'config', // 新增的
          meta: {
            icon: "mealSeeting",
            title: "用餐设置",
          },
          name: "用餐设置",
        }
      ],
    };
  },
  computed: {
    ...mapGetters(["menus"]),
    subMenuItems() {
      // let aaa = JSON.parse(JSON.stringify(this.menus));
      // aaa.shift();
      // aaa.shift();
      let menus = [];
      let arr = aaa.filter(
        (item) => item.path == "systemConfig"
      )[0].children;
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        menus.push({
          index: element.path,
          title: element.meta.title,
          icon: element.meta.icon,
        });
      }
      return menus;
    },
  },
};
</script>
<style scoped>
</style>