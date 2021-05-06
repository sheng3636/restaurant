<template>
  <!-- 左侧二级菜单栏的组件封装 -->
  <el-menu class="sidebar-el-menu" :default-active="toIndex()" background-color="white" text-color="#7a8297"
    active-text-color="#2d8cf0" router>
    <template v-for="item in items">
      <el-menu-item :index="item.index" :key="item.index">
        <!-- 需要图标的在 item 对象中加上属性 icon -->
        <!-- <i :class="item.icon"></i> -->
        <!-- <svg-icon :icon-class="item.icon"/> -->
        <img v-if="item.icon" class=subMenuImg :src="require('../../assets/images/' + item.icon + '.png')" />
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
export default {
  props: ['items'],
  data() {
    return {}
  },
  methods: {
    // 根据路径绑定到对应的二级菜单，防止页面刷新重新跳回第一个
    toIndex() {
      console.log(this.$route.path.split('/')[2]);
      return this.$route.path.split('/')[2]
    },
  },
}
</script>
