<template>
  <el-container class="appContainer">
    <div class="mainWrapper" style="width:100%">
      <div class="mainHeader">
        <span class="title">模块菜单（拖动菜单进行排序）</span>
      </div>
      <div class="mainContent">
        <el-tree :data="menusTree" v-loading="TreeLoading" :props="defaultProps" highlight-current node-key="id"
          ref="tree" default-expand-all @node-drag-start="handleDragStart" @node-drag-enter="handleDragEnter"
          @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver" @node-drag-end="handleDragEnd"
          @node-drop="handleDrop" draggable :allow-drop="allowDrop">
          <span class="slot-t-node" slot-scope="{ node, data }">
            <span v-show="!node.isEdit">
              <span v-show="data.children && data.children.length >= 1">
                <span :class="[data.id >= maxexpandId ? 'slot-t-node--label' : '']">{{node.label}}</span>
              </span>
              <span v-show="!data.children || data.children.length == 0">
                <span :class="[data.id >= maxexpandId ? 'slot-t-node--label' : '']">{{node.label}}</span>
              </span>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
  </el-container>
</template>

<script>
import { apiGet, apiDefaultPut } from '@/utils/request'
export default {
  data() {
    return {
      TreeLoading: true, // 是否显示树形菜单加载动画
      defaultProps: {
        // 树形菜单配置项
        children: 'children',
        label: 'label',
      },
      menusTree: [], // 节点树数据
      maxexpandId: 95,
      NODE: null,
    }
  },

  mounted() {
    this.getMenuListFn()
  },
  methods: {
    // 获取菜单树
    getMenuListFn() {
      apiGet(this, 'system/menu/info', this.menu).then((res) => {
        this.menusTree = res.data
        this.TreeLoading = false
      })
    },
    // 节点开始拖拽时触发的事件
    handleDragStart(node, ev) {
      console.log('drag start', node)
    },
    // 拖拽进入其他节点时触发的事件
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label)
    },
    // 拖拽离开某个节点时触发的事件
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label)
    },
    // 在拖拽节点时触发的事件（类似浏览器的 mouseover 事件）
    handleDragOver(draggingNode, dropNode, ev) {
      console.log('tree drag over: ', draggingNode.label, dropNode.label)
    },
    // 拖拽结束时（可能未成功）触发的事件
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    },
    // 拖拽成功完成时触发的事件
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', draggingNode, dropNode, dropType)
      let params = {
        menuId: draggingNode.key,
        referenceId: dropNode.key,
        dropType: dropType,
      }
      apiDefaultPut(this, 'system/menu/draggable', params).then((res) => {
        this.$message.success(res.message)
        this.getMenuListFn()
      })
    },
    // 拖拽时判定目标节点能否被放置
    allowDrop(draggingNode, dropNode, type) {
      console.log(333)
      return type !== 'inner'
    },
  },
}
</script>

<style lang="scss" scoped>
.main-header {
  span {
    color: red;
  }
}
</style>
