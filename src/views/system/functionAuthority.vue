<template>
  <el-container class="appContainer">
    <el-aside width="300px">
      <div class="mainWrapper">
        <div class="mainHeader mainHeader1">
          <span class="title">模块菜单</span>
          <div class="searchBar">
            <el-button type="primary" @click="addRootMenu()"><i class="el-icon-plus"></i>新增</el-button>
          </div>
        </div>
        <div class="mainContent">
          <el-tree :data="menusTreeList" v-loading="treeLoading" :props="defaultProps" highlight-current node-key="id"
            ref="menusTree" default-expand-all @node-contextmenu='rightClick' @node-click='nodeClick'>
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
          <!--鼠标右键点击出现页面-->
          <el-menu v-show="menuVisible" id="rightClickMenu" class="el-menu-vertical" @select="handleRightSelect"
            active-text-color="#fff" text-color="#fff">
            <el-menu-item index="1" class="menuItem">
              <span slot="title">添加菜单</span>
            </el-menu-item>
            <el-menu-item index="2" class="menuItem">
              <span slot="title">修改菜单</span>
            </el-menu-item>
            <el-menu-item index="3" class="menuItem">
              <span slot="title">删除菜单</span>
            </el-menu-item>
          </el-menu>
          <!-- 新增编辑菜单弹窗 -->
          <el-dialog :title="menuTitle" :visible.sync="editMenuVisible" :close-on-click-modal="false" width="45%"
            @close="closeDialog('menusForm')">
            <el-form ref="menusForm" :model="menusForm" :rules="menusRules" label-position="top">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="上级菜单名称" prop="preMenu.menuName" v-if="isPreMenuShow">
                    <el-input v-model="menusForm.preMenu.menuName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="菜单名称" prop="menuName">
                    <el-input v-model="menusForm.menuName" maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="菜单编码" prop="menuCode">
                    <el-input v-model="menusForm.menuCode" maxlength="30"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="菜单图标" prop="menuIcon">
                    <el-input v-model="menusForm.menuIcon" maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="菜单URL" prop="menuUrl">
                    <el-input v-model="menusForm.menuUrl" placeholder="请输入有效的平台路径" maxlength="100"></el-input>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="24">
                  <el-form-item label="隐藏菜单" prop="isGlobal">
                    <el-switch v-model="menusForm.hidden" active-text="是" inactive-text="否"  />
                  </el-form-item>
                </el-col> -->
                <el-col :span="12">
                  <el-form-item label="是否在左侧栏出现" prop="hidden">
                    <el-select v-model="menusForm.hidden" placeholder="请选择" style="width:100%;">
                      <el-option v-for="item in YNOpts" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="12">
                  <el-form-item label="是否始终显示根菜单" prop="alwaysShow">
                    <el-select v-model="menusForm.alwaysShow" placeholder="请选择" style="width:100%;">
                      <el-option v-for="item in YNOpts" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col> -->
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="备注" prop="memo">
                    <el-input type="textarea" v-model="menusForm.memo" placeholder="请输入描述信息" :rows="3" maxlength="1000">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button size="mini" @click="closeDialog('menusForm')">关 闭</el-button>
              <el-button size="mini" type="primary" @click="saveMenuEdit('menusForm')">保 存</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </el-aside>

    <el-main width="70%">
      <div class="mainWrapper">
        <div class="mainHeader mainHeader1">
          <span class="title">权限信息</span>
          <div class="searchBar">
            <el-button type="primary" @click="addAuthority()"><i class="el-icon-plus"></i>新增</el-button>
          </div>
        </div>
        <div class="mainContent">
          <el-table :data="permissionList" border class="table">
            <el-table-column type="index" label="序号" width="70px" align="center" />
            <el-table-column prop="autName" label="权限名称" align="center"> </el-table-column>
            <el-table-column prop="menu.menuName" label="模块" align="center"> </el-table-column>
            <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <el-dropdown>
                  <el-button type="success" size="mini">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="editAuthority(scope.row)">修改</el-dropdown-item>
                    <el-dropdown-item @click.native="delAuthority(scope.row)">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>

              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="paginationWrap">
            <el-pagination :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
              @current-change="handleCurrentChange" />
          </div>
          <!-- 添加编辑弹出框 -->
          <el-dialog :title="authTitle" :visible.sync="authorityVisible" width="40%" :close-on-click-modal="false"
            @close="closeDialog('authForm')">
            <div class="auth-dialog-form">
              <el-form ref="authForm" label-position="top" :model="authorityForm" :rules="authorityRules">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="所属模块" prop="">
                      <el-input v-model="authorityForm.menu.menuName" :disabled="true" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="权限名称" prop="autName">
                      <el-input v-model="authorityForm.autName" maxlength="100" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <!-- <el-col :span="12">
                    <el-form-item label="权限表" prop="autTable">
                      <el-select v-model="authorityForm.autTable" clearable placeholder="请选择" style="width:100%">
                        <el-option v-for="item in authTableOption" :key="item.paraValue" :label="item.paraName"
                          :value="item.paraValue">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col> -->
                  <!-- <el-col :span="12">
                    <el-form-item label="权限类型" prop="autType">
                      <el-select v-model="authorityForm.autType" placeholder="请选择" style="width:100%">
                        <el-option v-for="item in authTypeOption" :key="item.value" :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col> -->
                </el-row>
                <el-form-item label="可访问URL列表" prop="autUrlMethod">
                  <el-input type="textarea" :rows="4" v-model="authorityForm.autUrlMethod"
                    placeholder="'url|method',多个路径用回车隔开">
                  </el-input>
                </el-form-item>
                <el-form-item label="备注" prop="memo">
                  <el-input type="textarea" :rows="4" v-model="authorityForm.memo" placeholder="请输入描述信息"
                    maxlength="1000"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button size="mini" @click="closeDialog('authForm')">关 闭</el-button>
              <el-button size="mini" type="primary" @click="saveAuthority('authForm')">保 存</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { apiGet, apiPost, apiPut, apiDelete } from '@/utils/request'
export default {
  data() {
    ///
    var validate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入可访问url'))
        // } else if(!/((^(\/(\w+)|(\d+))\\|(\w{3,4})\n*)+)$/.test){
        //   callback(new Error('请检查输入url'))
      } else {
        callback()
      }
    }
    return {
      maxexpandId: 95,
      NODE: null,
      objectID: null,
      treeLoading: true, // 是否显示树形菜单加载动画
      defaultProps: {
        // 树形菜单配置项
        children: 'children',
        label: 'label',
      },
      menusTreeList: [], // 菜单节点树数据
      menuVisible: false, // 鼠标右键点击菜单节点出现页面
      editMenuVisible: false, // 新增编辑菜单弹窗是否显示
      isPreMenuShow: false, // 新增菜单是否为根菜单
      menuTitle: '新增菜单', // 新增编辑菜单标题
      YNOpts: [
        // true、false下拉框
        {
          value: 0,
          label: '是',
        },
        {
          value: 1,
          label: '否',
        },
      ],
      menusForm: {
        // 新增编辑菜单表单
        preMenu: {
          menuName: '',
        },
      },
      menusRules: {
        // 新增编辑菜单表单验证规则
        menuName: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { required: true, message: '不能为空', trigger: 'change' },
        ],
      },
      total: 0, // 权限信息表格总数
      currentPage: 1, // 权限信息分页当前页码
      pageSize: 10, // 权限信息分页大小
      queryParams: {
        // 权限信息查询参数
        page: 1,
        pageSize: 10,
      },
      permissionList: [], // 权限表格数据

      authorityVisible: false, // 新增编辑功能权限弹窗是否显示
      authTitle: '新增功能权限', // 新增编辑功能权限弹窗标题
      authorityForm: {
        // 新增编辑功能权限表单
        autType: 0,
        menu: {},
      },
      authorityRules: {
        // 新增修改权限表单验证规则
        autName: [
          { required: true, message: '权限名称不能为空', trigger: 'blur' },
        ],
        autType: [
          { required: true, message: '权限类型不能为空', trigger: 'blur' },
        ],
        autUrlMethod: [
          { required: true, trigger: 'blur', validator: validate },
        ],
      },
      // authTableOption: [], // 权限表下拉框
      // authTypeOption: [
      //   //功能权限类型下拉框
      //   { value: 0, label: '业务级权限' },
      //   { value: 1, label: '系统级权限' }
      // ]
    }
  },

  mounted() {
    this.getMenuListFn()
    this.getAuthTableList()
  },
  methods: {
    // 获取菜单树
    getMenuListFn() {
      apiGet(this, 'system/menu/info').then((res) => {
        this.menusTreeList = res.data
        this.treeLoading = false
      })
    },
    // 当某一节点被鼠标右键点击时会触发该事件
    rightClick(event, object, node, element) {
      if (this.objectID !== object.id) {
        this.objectID = object.id
        this.menuVisible = true
        this.DATA = object
        this.NODE = node
      } else {
        this.menuVisible = !this.menuVisible
      }
      document.addEventListener('click', (e) => {
        this.menuVisible = false
      })
      const menu = document.querySelector('#rightClickMenu')
      // 菜单定位基于鼠标点击位置
      menu.style.left = event.clientX + 20 + 'px'
      menu.style.top = event.clientY - 30 + 'px'
      menu.style.position = 'fixed' // 为新创建的DIV指定绝对定位
      menu.style.width = 160 + 'px'
    },
    // 树形菜单节点被点击时的回调
    nodeClick(obj, node, element) {
      if (obj.children && obj.children.length === 0) {
        this.DATA = obj
        this.queryParams.menuId = obj.id
        this.getPermissionList()
      }
    },
    // 右击菜单节点出现的点击项点击事件
    handleRightSelect(key) {
      if (key == 1) {
        this.editMenuVisible = true
        // 添加菜单
        this.addMenu()
      } else if (key == 2) {
        // 修改菜单
        this.editMenuVisible = true
        this.editMenu()
      } else if (key == 3) {
        this.delMenu()
        this.menuVisible = false
      }
    },
    // 新增根级菜单数据初始化
    addRootMenu() {
      this.menuTitle = '新增菜单'
      this.isPreMenuShow = false
      this.editMenuVisible = true
      this.menusForm = {
        isRoot: 1,
        dLevel: 0,
        preMenu: {
          menuId: 0,
        },
      }
    },
    // 新增菜单前处理
    addMenu() {
      this.menuTitle = '新增菜单'
      this.isPreMenuShow = true
      this.editMenuVisible = true
      this.menusForm = {
        isRoot: 0,
        dLevel: 1,
        preMenu: {
          menuName: this.DATA.label,
          menuId: this.DATA.id,
        },
      }
    },
    // 编辑菜单前处理
    editMenu() {
      if (this.DATA.children.length != 0) {
        this.isPreMenuShow = false
      }
      this.menuTitle = '修改菜单'
      var params = {
        menuId: this.objectID,
      }
      apiGet(this, 'system/menu/menuDetailById', params).then((res) => {
        this.$nextTick(function () {
          this.menusForm = res.data
          // this.menusForm.hidden=res.data.hidden == 1 ? true : false
        })
      })
    },
    // 新增 、修改菜单请求
    saveMenuEdit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.menusForm.hidden = this.menusForm.hidden ? 1 : 0
          if (this.menuTitle === '修改菜单') {
            apiPut(this, '/system/menu', this.menusForm).then((res) => {
              this.getMenuListFn()
              this.getPermissionList()
              this.closeDialog('menusForm')
            })
          } else {
            apiPost(this, '/system/menu', this.menusForm).then((res) => {
              this.getMenuListFn()
              this.getPermissionList()
              this.closeDialog('menusForm')
            })
          }
        } else {
          return false
        }
      })
    },
    // 删除右击选中节点
    delMenu() {
      const that = this
      const menuItem = this.DATA
      if (menuItem.children && menuItem.children.length !== 0) {
        this.$message.error('此节点有子级，不可删除！')
        return false
      } else {
        let params = {
          menuId: menuItem.id,
        }
        apiDelete(this, '/system/menu', params).then((res) => {
          this.getMenuListFn()
        })
      }
    },

    // 获取权限信息表格数据
    getPermissionList() {
      apiGet(
        this,
        'system/functionAuthority/getMenuAuthority',
        this.queryParams
      ).then((res) => {
        this.total = res.total
        this.permissionList = res.data
      })
    },
    // pageSize变化getPermissionList()触动函数
    handleSizeChange(val) {
      this.queryParams.pageSize = val
      this.getPermissionList()
    },
    // page变化getPermissionList()触动函数
    handleCurrentChange(val) {
      this.queryParams.page = val
      this.getPermissionList()
    },
    // 查询新增功能权限-权限下拉框
    // getAuthTableList() {
    //   apiGet(this, 'system/functionAuthority/authTable').then(res => {
    //     this.authTableOption = res.data
    //   })
    // },
    // 点击添加权限
    addAuthority() {
      this.authorityForm = {
        autType: 0,
        menu: {},
      }
      if (!this.DATA) {
        this.$message.error('请先选择模块菜单！')
        return false
      }
      this.authTitle = '新增功能权限'
      this.authorityVisible = true
      this.autType = 0

      this.authorityForm = {
        autType: 0,
        menu: {
          menuId: this.DATA.id,
          menuName: this.DATA.label,
        },
      }
    },
    // 点击修改权限
    editAuthority(row) {
      this.authTitle = '修改功能权限'
      this.authorityForm = Object.assign({}, row)
      this.authorityVisible = true
    },
    // 新增编辑权限
    saveAuthority(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.authTitle === '修改功能权限') {
            apiPut(this, 'system/functionAuthority', this.authorityForm).then(
              (res) => {
                this.getPermissionList()
                this.closeDialog('authForm')
              }
            )
          } else {
            apiPost(this, 'system/functionAuthority', this.authorityForm).then(
              (res) => {
                this.getPermissionList()
                this.closeDialog('authForm')
              }
            )
          }
        } else {
          return false
        }
      })
    },
    // 删除权限
    delAuthority(row) {
      let params = { autId: row.autId }
      apiDelete(this, 'system/functionAuthority', params).then((res) => {
        this.getPermissionList()
      })
    },
    // 关闭弹窗
    closeDialog(formName) {
      this.editMenuVisible = false
      this.authorityVisible = false
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
.treeBtnGroup {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 7px;
}

.rightMenus,
.el-menu-vertical {
  background: #545c64;
  z-index: 100;
}
.el-main {
  margin-top: -20px;
}
.el-menu-item:focus,
.el-menu-item:hover {
  outline: 0;
  background-color: #9fc3ea;
}
</style>
