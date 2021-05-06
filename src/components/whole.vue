<template>
  <div class="bodyWrapper">
    <!-- 页面头部部分 -->
    <div class="systemHeader">
      <div class="logo">慧用餐系统</div>
      <!-- 水平一级菜单 -->
      <el-menu :default-active="toIndex()" mode="horizontal" @select="handleSelect">
        <template v-for="item in menuItems">
          <el-menu-item :index="item.index" :key="item.index">
            <template slot="title">
              <svg-icon :icon-class="item.icon" />
              <span slot="title">{{ item.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>

      <div class="headerUserIcon">
        <!-- 用户头像 -->
        <div class="userAvator"><img src="../assets/images/avart.png" /></div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="userName" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ name }}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 页面左侧二级菜单栏，和主体内容区域部分 -->
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      // items: [
      //   // 水平一级菜单栏的菜单
      //   { index: 'Home', title: '数据总览', icon: 'dataOverview' },
      //   { index: 'normalOrder', title: '点餐详情', icon: 'detail' },
      //   { index: 'config', title: '用餐设置', icon: 'mealSeeting' },
      //   { index: 'account', title: '账号管理', icon: 'user1' },
      //   { index: 'systemConfig', title: '系统设置', icon: 'system' },
      // ],
    };
  },
  computed: {
    ...mapGetters(["name", "menus"]),
    menuItems() {
      // let aaa = JSON.parse(JSON.stringify(this.menus))
      // aaa.shift()
      // aaa.shift()
      // aaa.shift()
      // console.log(aaa);
      let arr = [];
      for (let i = 0; i < this.menus.length; i++) {
        const element = this.menus[i];
        console.log(element.path.split("/"));
        arr.push({
          index: element.path,
          title: element.meta.title,
          icon: element.meta.icon,
        });
      }
      return arr;
    },
  },
  mounted() {},
  methods: {
    // 根据路径绑定到对应的一级菜单，防止页面刷新重新跳回第一个
    toIndex() {
      console.log(this.$route.path.split("/")[1]);
      return this.$route.path.split("/")[1];
    },
    // 切换菜单栏
    handleSelect(index) {
      this.$router.push("/" + index);
    },
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "loginout") {
        this.$router.push("/login");
      }
    },
    async logout() {
      clearInterval(this.intervalId);
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>