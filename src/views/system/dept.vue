<template>
  <el-container class="appContainer">
    <el-aside width="300px">
      <div class="mainWrapper">
        <div class="mainHeader mainHeader1">
          <span class="title">组织机构</span>
        </div>
        <div class="mainContent">
          <el-tree :data="menusTreeList" v-loading="treeLoading" :props="defaultProps" highlight-current node-key="id"
            ref="tree" default-expand-all :expand-on-click-node="false" :filter-node-method="filterNode"
            @node-contextmenu='rihgtClick' @node-click='deptNodeClick'>
            <span class="slot-t-node" slot-scope="{ node, data }">
              <span v-show="!node.isEdit">
                <span v-show="data.children && data.children.length >= 1">
                  <span
                    :class="[data.id >= maxexpandId ? 'slot-t-node--label' : '']">{{node.label}}（{{node.data.hasChild}}人）</span>
                </span>
                <span v-show="!data.children || data.children.length == 0">
                  <span
                    :class="[data.id >= maxexpandId ? 'slot-t-node--label' : '']">{{node.label}}（{{node.data.hasChild}}人）</span>
                </span>
              </span>
            </span>
          </el-tree>
          <!--鼠标右键点击出现页面-->
          <el-menu v-show="menuVisible" id="rightClickMenu" class="el-menu-vertical" @select="handleRightSelect"
            active-text-color="#fff" text-color="#fff">
            <el-menu-item index="1" class="menuItem">
              <span slot="title">添加分类</span>
            </el-menu-item>
            <el-menu-item index="2" class="menuItem">
              <span slot="title">修改分类</span>
            </el-menu-item>
            <el-menu-item index="3" class="menuItem" v-show="delMenuVisible">
              <span slot="title">删除分类</span>
            </el-menu-item>
          </el-menu>
          <!-- 新增编辑组织机构弹出框 -->
          <el-dialog :title="editDeptTitle" :visible.sync="editDeptVisible" width="40%">
            <el-form ref="editDeptForm" :model="editDeptForm" :rules="editDeptrules" label-position="top">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="上级组织名称" prop="preDeptName">
                    <el-input v-model="editDeptForm.preDeptName" :disabled="true" placeholder="请输入上级组织名称" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="组织名称" prop="deptName">
                    <el-input v-model="editDeptForm.deptName" placeholder="请输入组织名称" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="组织编码" prop="deptCode">
                    <el-input v-model="editDeptForm.deptCode" placeholder="请输入组织编码" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系人" prop="deptLinkman">
                    <el-input v-model="editDeptForm.deptLinkman" placeholder="请输入联系人" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系电话" prop="deptLinkmanPhone">
                    <el-input v-model="editDeptForm.deptLinkmanPhone" placeholder="请输入联系电话" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="电子邮件" prop="deptLinkmanEmail">
                    <el-input v-model="editDeptForm.deptLinkmanEmail" placeholder="请输入电子邮件" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="备注" prop="memo">
                    <el-input type="textarea" :rows="4" v-model="editDeptForm.memo" placeholder="请输入备注" />
                  </el-form-item>
                </el-col>
              </el-row>

            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="closeDialog('editDeptForm')">取 消</el-button>
              <el-button type="primary" @click="saveDept('editDeptForm')">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </el-aside>

    <el-main width="70%">
      <div class="mainWrapper">
        <div class="mainHeader mainHeader1">
          <span class="title">用户信息</span>
          <div class="searchBar">
            <el-button type="primary" @click="addUserFn()"><i class="el-icon-plus"></i>新增</el-button>
          </div>
        </div>
        <div class="mainContent">
          <el-table :data="userList" border class="table" ref="multipleTable" header-cell-class-name="table-header">
            <el-table-column prop="dept.deptName" label="部门" align="center"> </el-table-column>
            <el-table-column prop="loginName" label="姓名" align="center"> </el-table-column>
            <el-table-column prop="staffName" label="账号" align="center"></el-table-column>
            <el-table-column prop="accountState" label="状态" align="center">
              <template slot-scope="scope">
                {{switchAccountState(scope.row.accountState)}}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <el-dropdown>
                  <el-button type="success" size="mini">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown" v-if="scope.row.accountState != 3">
                    <el-dropdown-item @click.native="editUser(scope.row)">修改用户</el-dropdown-item>
                    <el-dropdown-item @click.native="forbiddenUser(scope.row)">禁用用户</el-dropdown-item>
                    <el-dropdown-item @click.native="delUser(scope.row)">删除用户</el-dropdown-item>
                    <el-dropdown-item @click.native="resetPassword(scope.row)">重置密码</el-dropdown-item>
                    <el-dropdown-item @click.native="grantUser(scope.row)">账号授权</el-dropdown-item>
                  </el-dropdown-menu>
                  <el-dropdown-menu slot="dropdown" v-else>
                    <el-dropdown-item @click.native="enableUser(scope.row)">启用用户</el-dropdown-item>
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
        </div>
      </div>
    </el-main>

    <!-- 新增编辑用户弹窗 -->
    <el-dialog :title="editUserTitle" :visible.sync="editUserVisible" :close-on-click-modal="false" width="55%">
      <el-form ref="editUserForm" :model="editUserForm" :rules="editUserRules" label-position="top">
        <el-row>
          <el-col :span="8">
            <el-form-item label="部门" prop="deptName">
              <el-input v-model="editUserForm.deptName" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名" prop="staffName">
              <el-input v-model="editUserForm.staffName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="登录名" prop="loginName">
              <el-input v-model="editUserForm.loginName" :disabled="editUserTitle === '编辑用户'" />
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="editUserTitle==='编辑用户'">
            <el-form-item label="原密码" prop="oldPassword">
              <el-input v-model="editUserForm.oldPassword" :type="passwordType1" />
              <span class="show-pwd" @click="showPwdFn1">
                <svg-icon :icon-class="passwordType1 === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="新密码" prop="password">
              <el-input v-model="editUserForm.password" :type="passwordType2" />
              <span class="show-pwd" @click="showPwdFn2">
                <svg-icon :icon-class="passwordType2 === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="确认密码" prop="checkPass">
              <el-input v-model="editUserForm.checkPass" :type="passwordType3" />
              <span class="show-pwd" @click="showPwdFn3">
                <svg-icon :icon-class="passwordType3 === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工号" prop="jobNo">
              <el-input v-model="editUserForm.jobNo" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职务" prop="staffDuty">
              <el-input v-model="editUserForm.staffDuty" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电子邮件" prop="staffEmail">
              <el-input v-model="editUserForm.staffEmail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话号码" prop="staffPhone">
              <el-input v-model="editUserForm.staffPhone" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="memo">
              <el-input type="textarea" :rows="6" v-model="editUserForm.memo" placeholder="请输入描述信息" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog('editUserForm')">取 消</el-button>
        <el-button type="primary" @click="updateUser('editUserForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 角色授权弹窗 -->
    <el-dialog title="角色授权" :visible.sync="roleVisi" :close-on-click-modal="false" width="40%">
      <el-form ref="roleForm" :model="roleForm" label-position="top">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="staffName">
              <el-input v-model="roleForm.staffName" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="登录名" prop="loginName">
              <el-input v-model="roleForm.loginName" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="角色名">
              <el-checkbox-group v-model="checkedItems">
                <el-checkbox v-for="item in checkList" :label="item.roleId" :key="item.roleId">{{item.roleName}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog('roleForm')">取 消</el-button>
        <el-button type="primary" @click="roleAuthorization('roleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  apiPutCustom,
} from '@/utils/request.js'
import { isValidPaVss } from '@/utils/validate'
export default {
  data() {
    var validateOldPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入原密码'))
      } else if (!isValidPaVss(value)) {
        callback(
          new Error(
            '请输入8-16位字符，至少包含数字、大写字母、小写字母、特殊字符中的三种类型'
          )
        )
      } else {
        let checkParams = {
          userId: this.editUserForm.userId,
          password: this.editUserForm.oldPassword,
        }
        apiGet(this, '/system/user/checkPassWord', checkParams).then((res) => {
          console.log(res)
          if (res.code !== 0) {
            callback(new Error(res.message))
          } else {
            callback()
          }
        })
      }
    }
    var validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'))
      } else if (!isValidPaVss(value)) {
        callback(
          new Error(
            '请输入8-16位字符，至少包含数字、大写字母、小写字母、特殊字符中的三种类型'
          )
        )
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.editUserForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      passwordType1: 'password',
      passwordType2: 'password',
      passwordType3: 'password',
      maxexpandId: 95,
      NODE: null,
      objectID: null,
      treeLoading: true, // 是否显示树形菜单加载动画
      defaultProps: {
        // 树形菜单配置项
        children: 'children',
        label: 'name',
      },
      menusTreeList: [], // 菜单节点树数据
      menuVisible: false, // 鼠标右键点击菜单节点出现页面
      editDeptVisible: false, // 新增编辑组织机构弹窗是否显示
      delMenuVisible: true,
      editDeptTitle: '新增组织机构', // 新增编辑组织机构标题
      editDeptForm: {}, // 新增编辑组织机构表单
      editDeptrules: {
        deptName: [
          { required: true, message: '组织名称不能为空', trigger: 'blur' },
        ],
        deptCode: [
          { required: true, message: '组织编码不能为空', trigger: 'blur' },
        ],
      },

      total: 0, // 用户信息表格总数
      currentPage: 1, // 用户信息分页当前页码
      pageSize: 10, // 用户信息分页大小
      queryParams: {
        // 获取用户列表参数
        page: 1,
        pageSize: 10,
        deptId: '',
      },
      userList: [], // 用户信息表格数据

      editUserVisible: false, // 新增编辑用户弹窗是否显示
      editUserTitle: '新增用户', // 新增编辑用户标题
      editUserRules: {
        // 新增编辑用户表单验证规则
        deptName: [
          { required: true, message: '部门不能为空', trigger: 'blur' },
        ],
        loginName: [
          { required: true, message: '登录名不能为空', trigger: 'blur' },
        ],
        oldPassword: [
          { required: true, trigger: 'blur', validator: validateOldPass },
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePass },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' },
        ],
      },
      editUserForm: {}, // 新增编辑用户表单

      roleVisi: false, // 角色授权弹窗是否显示
      roleForm: {}, // 角色授权表单
      checkList: [], // 角色列表
      checkedItems: [], // 被选中角色
    }
  },
  mounted() {
    this.getDeptListFn()
  },
  methods: {
    // 获取组织机构树
    getDeptListFn() {
      apiGet(this, 'system/dept/list', this.queryParams).then((res) => {
        this.menusTreeList = res.data
        this.treeLoading = false
      })
    },
    // 当某一节点被鼠标右键点击时会触发该事件
    rihgtClick(event, object, value, element) {
      if (object.level == 0) {
        this.delMenuVisible = false
      } else {
        this.delMenuVisible = true
      }
      if (this.objectID !== object.id) {
        this.objectID = object.id
        this.menuVisible = true
        this.DATA = object
        this.NODE = value
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
    // 对树节点进行筛选操作
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 右击菜单节点出现的点击项点击事件
    handleRightSelect(key) {
      if (key == 1) {
        this.editDeptVisible = true
        this.editDeptTitle = '新增组织机构'
        //查询组织详情
        this.getDeptDetailsFn(
          'add',
          this.DATA.level,
          this.DATA.name,
          this.DATA.id
        )
      } else if (key == 2) {
        this.editDeptTitle = '修改组织机构'
        this.editDeptVisible = true
        this.getDeptDetailsFn(
          'edit',
          this.DATA.level,
          this.DATA.name,
          this.DATA.id
        )
      } else if (key == 3) {
        this.NodeDel(this.NODE, this.DATA)
        this.menuVisible = false
      }
    },
    // 点击组织机构节点
    deptNodeClick(obj, node) {
      console.log(node)
      this.DATA = obj
      this.queryParams.deptId = obj.id
      this.getDeptUsersFn()
    },
    // 获取组织详情
    getDeptDetailsFn(type, level, preDeptName, deptId) {
      let params = {
        deptId: deptId,
      }
      this.editDeptForm.preDeptName = preDeptName
      apiGet(this, 'system/dept/details', params).then((res) => {
        if (type == 'add') {
          this.editDeptForm.preDept = { deptId: res.data.dept.id }
          this.editDeptForm.dLevel = level + 1
        } else {
          this.editDeptForm = res.data.dept
          this.editDeptForm.preDeptName = res.data.dept.preDept.deptName
        }
      })
    },
    // 新增、新增组织
    saveDept(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.editDeptTitle === '修改组织机构') {
            apiPut(this, 'system/dept', this.editDeptForm).then((res) => {
              this.closeDialog('editDeptForm')
              this.getDeptListFn()
            })
          } else {
            apiPost(this, 'system/dept', this.editDeptForm).then((res) => {
              this.closeDialog('editDeptForm')
              this.getDeptListFn()
            })
          }
        } else {
          return false
        }
      })
    },
    // 删除组织机构
    NodeDel(n, d) {
      // 删除节点
      console.log(n, d)
      const that = this
      if (d.children && d.children.length !== 0) {
        this.$message.error('此节点有子级，不可删除！')
        return false
      } else {
        let params = {
          deptId: d.id,
        }
        apiDelete(this, 'system/dept', params).then((res) => {
          this.getDeptListFn()
        })
      }
    },
    // 关闭弹窗
    closeDialog(formName) {
      this.$refs[formName].resetFields()
      this.editDeptVisible = false
      this.editUserVisible = false
      this.roleVisi = false
    },
    // 获取用户列表
    getDeptUsersFn() {
      apiGet(this, 'system/user', this.queryParams).then((res) => {
        this.total = res.total
        this.userList = res.data
      })
    },
    // 用户账号状态
    switchAccountState(state) {
      switch (state) {
        case 0:
          return '未登录'
          break
        case 1:
          return '已登录'
          break
        case 2:
          return '密码已重置'
          break
        default:
          return '账号已停用'
          break
      }
    },
    // pageSize变化getDeptUsersFn()触动函数
    handleSizeChange(val) {
      this.queryParams.pageSize = val
      this.getDeptUsersFn()
    },
    // pageSize变化getDeptUsersFn()触动函数
    handleCurrentChange(val) {
      this.queryParams.page = val
      this.getDeptUsersFn()
    },

    // 点击新增用户按钮
    addUserFn() {
      if (!this.DATA) {
        this.$message.error('请选择用户所属组织！')
        return false
      }
      this.editUserTitle = '新增用户'
      this.editUserForm = {
        deptName: this.DATA.name,
        dept: {
          deptId: this.DATA.id,
        },
      }
      this.editUserVisible = true
    },
    // 新增编辑用户
    updateUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.editUserTitle == '编辑用户') {
            apiPut(this, 'system/user', this.editUserForm).then((res) => {
              this.getDeptUsersFn()
              this.closeDialog('editUserForm')
            })
          } else {
            apiPost(this, 'system/user', this.editUserForm).then((res) => {
              this.getDeptUsersFn()
              this.closeDialog('editUserForm')
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 点击修改用户
    editUser(row) {
      this.editUserTitle = '编辑用户'
      this.editUserForm = row
      this.editUserForm.deptName = row.dept.deptName
      this.editUserForm.password = ''
      this.editUserVisible = true
    },
    // 禁用用户
    forbiddenUser(row) {
      let params = { userId: row.userId, accountState: 3 }
      apiPut(this, 'system/user/handleAccount', params).then((res) => {
        this.getDeptUsersFn()
      })
    },
    // 启用用户
    enableUser(row) {
      this.$confirm('确定要启用吗？', '提示', {
        type: 'warning',
      }).then(() => {
        let params = { userId: row.userId, accountState: 0 }
        apiPut(this, 'system/user/handleAccount', params).then((res) => {
          this.getDeptUsersFn()
        })
      })
    },
    // 删除用户
    delUser(row) {
      let params = { userId: row.userId }
      apiDelete(this, 'system/user', params).then((res) => {
        this.getDeptUsersFn()
      })
    },
    // 重置密码
    resetPassword(row) {
      let params = { userId: row.userId }
      apiPutCustom(
        this,
        'system/user/resetPassword',
        params,
        '你确定重置所选帐号的密码？重置后的密码为"New@0987"'
      ).then((res) => {
        this.getDeptUsersFn()
      })
    },
    // 点击角色授权
    grantUser(row) {
      this.roleForm = row
      this.checkedItems = []
      let params = { userId: row.userId }
      apiGet(this, 'system/user/showChooseRole', params).then((res) => {
        this.checkList = res.data.chooseList ? res.data.chooseList : []
        this.checkedItems = res.data.choosedList ? res.data.choosedList : []
      })
      this.roleVisi = true
    },
    //账号授权
    roleAuthorization(data) {
      let params = {
        userId: this.roleForm.userId,
        arrId: this.checkedItems,
      }
      apiPut(this, 'system/user/chooseRole', params).then((res) => {
        this.closeDialog('roleForm')
        this.getDeptUsersFn()
      })
    },
    // 是否显示密码
    showPwdFn1() {
      if (this.passwordType1 === 'password') {
        this.passwordType1 = ''
      } else {
        this.passwordType1 = 'password'
      }
    },
    showPwdFn2() {
      if (this.passwordType2 === 'password') {
        this.passwordType2 = ''
      } else {
        this.passwordType2 = 'password'
      }
    },
    showPwdFn3() {
      if (this.passwordType3 === 'password') {
        this.passwordType3 = ''
      } else {
        this.passwordType3 = 'password'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.el-main {
  padding-top: 0px;
}
.rightMenus,
.el-menu-vertical {
  background: #545c64;
  z-index: 100;
}
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: #a1bede;
}

.show-pwd {
  position: absolute;
  right: 10px;
  top: 1px;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
}
</style>
