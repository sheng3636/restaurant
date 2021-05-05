<template>
  <el-container class="appContainer">
    <el-aside width="500px">
      <div class="mainWrapper">
        <div class="main-header">
          <el-col :md="4" class="tableHeadRow">
            角色信息
          </el-col>
          <el-col :md="20" class="tableHeadRow">
            <el-button type="primary" size="mini" @click="addRoleClick">新增</el-button>
          </el-col>
        </div>
        <div class="main-content">
          <el-table :data="roleList" v-loading="roleLoading" border class="table" ref="multipleTable"
            header-cell-class-name="table-header">
            <el-table-column prop="roleName" label="角色名称" align="center">
              <template slot-scope="scope">
                <div @click="cellClick(scope.row)">
                  {{scope.row.roleName}}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <el-dropdown>
                  <el-button type="success" size="mini">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="editRoleClick(scope.row)">修改</el-dropdown-item>
                    <el-dropdown-item @click.native="dataAuthorityClick(scope.row)">数据权限</el-dropdown-item>
                    <el-dropdown-item @click.native="deleteRoleClick(scope.row)">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />

        </div>
      </div>
    </el-aside>

    <el-main width="70%">
      <div class="mainWrapper">
        <div class="main-header box">
          功能权限
        </div>
        <div class="main-content">
          <el-table :data="menuData" v-loading="authLoading" border header-cell-class-name="table-header">
            <el-table-column label="全选" align="center">
              <template slot="header" slot-scope="scope">
                <el-checkbox v-model="checkAll" :label="scope.checkKey" @change="handleCheckAllChange">全选</el-checkbox>
              </template>
              <el-table-column prop="menuName" label="模块名称" align="center">
                <template slot-scope="scope">
                  <el-checkbox v-model="checkRows" :label="scope.row.menuId"
                    @change="handleCheckChange($event,scope.row)">{{scope.row.menuName}}</el-checkbox>
                </template>
              </el-table-column>
              <el-table-column prop="loginName" label="权限名称" align="left">
                <template slot-scope="scope">
                  <el-checkbox-group v-model="checkedItems" @change="handleCheckedItemChange($event,scope.row,1)">
                    <el-checkbox v-for="item in scope.row.auth" :label="item.autId" :key="item.autId">{{item.autName}}
                    </el-checkbox>
                  </el-checkbox-group>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-main>

    <!-- 新增编辑角色弹窗 -->
    <el-dialog :title="editRoleTitle" :visible.sync="editRoleVisi" @close="closeDialog('editRoleForm')"
      :close-on-click-modal="false" width="25%">
      <el-form ref="editRoleForm" :model="editRoleForm" :rules="roleFromRules" label-position="top">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input type="textarea" v-model="editRoleForm.memo" placeholder="请输入描述信息"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog('editRoleForm')" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" @click="editRoleSubmit('editRoleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 角色授权 -->
    <el-dialog title="数据权限" :visible.sync="roleAuthorizationVisi" width="40%">
      <el-form ref="roleAuthorizationForm" :model="editRoleForm" lable-position="top">
        <div class="mainWrapper">
          <div class="main-header box">基本信息</div>
          <div class="main-content">
            <el-row>
              <el-col :span="12">
                <el-form-item label="所属角色" prop="roleName">
                  <el-input v-model="editRoleForm.roleName" disabled></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item label="全局授权" prop="isGlobal">
                  <el-switch v-model="editRoleForm.isGlobal" active-text="是" inactive-text="否" disabled />
                </el-form-item>
              </el-col> -->
              <el-col :span="12">
                <el-form-item label="活动区域">
                  <el-select v-model="editRoleForm.execSql" placeholder="请选择活动区域">
                    <el-option label="公开（所有人可见）" value="0"></el-option>
                    <el-option label="自定义范围" value="1"></el-option>
                    <el-option label="本部门" value="2"></el-option>
                    <el-option label="创建人" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="授权描述" prop="memo">
                  <el-input type="textarea" v-model="editRoleForm.memo" placeholder="请输入描述信息"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="mainWrapper" v-show="editRoleForm.execSql==='1'">
          <div class="main-header box">数据范围</div>
          <div class="main-content">
            <el-row>
              <el-col :span="24">
                <el-form-item label="设置数据范围(数据范围为空，表示数据范围为登录者本部门)" prop="deptNames">
                  <el-input type="textarea" v-model="editRoleForm.deptNames" placeholder="请输入描述信息" disabled>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-tree :data="deptList" v-loading="isLoadingTree" :props="defaultProps" highlight-current
                  show-checkbox node-key="id" ref="tree" default-expand-all :default-checked-keys="defaultChecked"
                  :expand-on-click-node="false" @check='deptNodCheck'>
                </el-tree>
              </el-col>
            </el-row>
          </div>
        </div>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="closeDialog('roleAuthorizationForm')">取 消</el-button>
        <el-button size="mini" type="primary" @click="roleAuthorizationSubmit('roleAuthorizationForm')">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import { apiGet, apiPost, apiDefaultPut, apiPut, apiDelete } from '@/utils/request.js'
export default {
  data() {
    return {
      roleLoading: true, // 角色信息加载
      total: 0, // 角色信息表格总数
      currentPage: 1, // 角色信息分页当前页码
      pageSize: 10, // 角色信息分页大小
      queryParams: {
        // 角色信息查询参数
        page: 1,
        pageSize: 10
      },
      //树
      maxexpandId: 95,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      //默认选中
      defaultChecked: [],
      isLoadingTree: true, // 是否加载节点树
      roleList: [], // 角色信息表格数据

      editRoleTitle: '新增角色', // 新增编辑角色标题
      editRoleVisi: false, // 新增编辑角色弹窗是否显示
      editRoleForm: {}, // 新增编辑角色表单
      roleFromRules: {
        // 新增编辑角色表单校验
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      roleAuthorizationVisi: false, // 角色授权数据权限弹窗是否显示
      deptList: [], // 组织机构树形数据

      menuData: [],
      authLoading: false,
      roleId: '',
      checkAll: [],
      checkKey: '1',
      checkRows: [],
      checkedItems: [],
      allMenuIds: []
    }
  },
  mounted() {
    this.getRoleListFn()
    this.getDeptListFn()
  },
  methods: {
    // 获取角色表格数据
    getRoleListFn() {
      apiGet(this, '/system/role', this.queryParams).then(res => {
        this.roleList = res.data
        this.total = res.total
        this.roleLoading = false
      })
    },
    // 查询角色信息详情
    getDetails(row){
      console.log(row)
      apiGet(this, '/system/role/details', {id:row.roleId}).then(
        res => { 
          this.editRoleForm = Object.assign({},res.data)
        }
      )
    },
    // pageSize变化getRoleListFn()触动函数
    handleSizeChange(val) {
      this.queryParams.pageSize = val
      this.getRoleListFn()
    },
    // page变化getRoleListFn()触动函数
    handleCurrentChange(val) {
      this.queryParams.page = val
      this.getRoleListFn()
    },
    //点击添加角色
    addRoleClick() {
      this.editRoleTitle = '新增角色'
      this.editRoleForm = {}
      this.editRoleVisi = true
    },
    // 关闭新增修改弹窗
    closeDialog(formName) {
      this.$refs[formName].resetFields()
      this.editRoleVisi = false
      this.roleAuthorizationVisi = false
    },
    // 点击修改角色
    editRoleClick(row) {
      this.editRoleTitle = '编辑角色'
      this.getDetails(row)
      this.editRoleVisi = true 
    },
    // 新增编辑角色
    editRoleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.editRoleTitle === '编辑角色') {
            apiPut(this, 'system/role', this.editRoleForm).then(res => {
              this.closeDialog('editRoleForm')
              this.getRoleListFn()
            })
          } else {
            apiPost(this, 'system/role', this.editRoleForm).then(res => {
              this.closeDialog('editRoleForm')
              this.getRoleListFn()
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 删除角色
    deleteRoleClick(row) {
      let params = { roleId: row.roleId }
      apiDelete(this, 'system/role', params).then(res => {
        this.getRoleListFn()
      })
    },

    // 获取组织架构树
    getDeptListFn() {
      apiGet(this, 'system/dept/list', this.queryParams).then(res => {
        this.deptList = res.data
        this.isLoadingTree = false
      })
    },
    // 点击数据权限，预览权限设置
    dataAuthorityClick(row) {
      this.editRoleForm = {}
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys([])
      })
      this.editRoleForm = row
      this.roleAuthorizationVisi = true
      let params = {
        roleId: row.roleId
      }
      apiGet(this, 'system/authorize/dataPreview', params).then(res => {
        this.$set(
          this.editRoleForm,
          'isGlobal',
          res.data.isGlobal == 1 ? true : false
        )
        if(res.data.arrId){
          let arr = res.data.arrId.split(',')
          this.$refs.tree.setCheckedKeys(arr)
        }
        this.$set(this.editRoleForm, 'authorizeId', res.data.authorizeId)
        this.$set(this.editRoleForm, 'deptNames', res.data.arrName)
        this.$set(this.editRoleForm, 'deptIdArr', res.data.arrId)
        this.$set(this.editRoleForm, 'memo', res.data.memo)
        this.$set(this.editRoleForm, 'execSql', res.data.execSql)
      })
    },
    // 树复选框选中
    deptNodCheck(node, data) {
      let checkedNodes = data.checkedNodes
      let checkedKeys = data.checkedKeys

      if (checkedNodes) {
        let tempNames = ''
        let tempDeptIds = ''
        for (let i = 0; i < checkedNodes.length; i++) {
          tempNames += checkedNodes[i].name + ','
          tempDeptIds += checkedKeys[i] + ','
        }
        this.$set(
          this.editRoleForm,
          'deptNames',
          tempNames.substring(0, tempNames.length - 1)
        )
        this.$set(
          this.editRoleForm,
          'deptIdArr',
          tempDeptIds.substring(0, tempDeptIds.length - 1)
        )
      }
    },
    // 数据权限提交
    roleAuthorizationSubmit(formName) { 
      let editParams={
        roleId:this.editRoleForm.roleId,
        roleName:this.editRoleForm.roleName,
        deptIdArr:this.editRoleForm.deptIdArr,
        deptNames:this.editRoleForm.deptNames,
        authorizeId:this.editRoleForm.authorizeId,
        execSql:this.editRoleForm.execSql,
        memo:this.editRoleForm.memo,
      }
      apiPut(this, 'system/authorize/chooseAuthorize', editParams).then(
        res => {
          this.closeDialog('roleAuthorizationForm')
          this.getRoleListFn()
        }
      )
    },

    // 点击左边表格角色名称获取功能权限
    cellClick(row) {
      this.authLoading = true
      let params = { roleId: row.roleId }
      this.roleId = row.roleId
      apiGet(this, 'system/role/getAuth', params).then(res => {
        this.allMenuIds = []
        this.menuData = res.data.authList
        this.checkedItems = res.data.chooseAuthority.split(',')
        //所有权限id
        for (let i = 0; i < this.menuData.length; i++) {
          if (this.menuData[i].auth) {
            let k = 0
            for (let j = 0; j < this.menuData[i].auth.length; j++) {
              let authItem = this.menuData[i].auth[j]
              this.allMenuIds.push(authItem.autId)
              if (this.checkedItems.indexOf(authItem.autId) != -1) {
                k++
              }
            }
            if (this.menuData[i].auth.length == k) {
              this.checkRows.push(this.menuData[i].menuId)
            }
          }
        }
        this.authLoading = false
      })
    },
    // 设置角色功能权限
    chooseRoleAuthFn() {
      let params = { roleId: this.roleId, arrID: this.checkedItems }
      console.log('b')
      apiDefaultPut(this, 'system/role/chooseFuncAuth', params).then(res => {
        this.getRoleListFn()
      })
    },
    // 全选
    handleCheckAllChange(val) {
      if (val) {
        for (let i = 0; i < this.menuData.length; i++) {
          this.checkedItems = this.allMenuIds
          this.handleCheckedItemChange(true, this.menuData[i], 0)
        }
      } else {
        this.checkRows = []
        this.checkedItems = []
      }
      this.chooseRoleAuthFn()
    },
    // 单选
    handleCheckChange(val, row) {
     
      if (val) {
        for (let i = 0; i < row.auth.length; i++) {
          if (this.checkedItems.indexOf(row.auth[i].autId) === -1) {
            this.checkedItems.push(row.auth[i].autId)
          }
        }
      } else {
        for (let j = 0; j < row.auth.length; j++) {
          for (let i = 0; i < this.checkedItems.length; i++) {
            if (row.auth[j].autId === this.checkedItems[i]) {
              this.checkedItems.splice(i, 1)
            }
          }
        }
      }
      this.chooseRoleAuthFn()
    },
    handleCheckedItemChange(val, row, m) {
      let k = 0
      for (let i = 0; i < this.checkedItems.length; i++) {
        for (let j = 0; j < row.auth.length; j++) {
          if (row.auth[j].autId === this.checkedItems[i]) {
            k++
          }
        }
      }
      if (row.auth.length == k) {
        this.checkRows.push(row.menuId)
      } else {
        for (let k = 0; k < this.checkRows.length; k++) {
          if (row.menuId === this.checkRows[k]) {
            this.checkRows.splice(k, 1)
          }
        }
      }
      if (m == 1) {
        this.chooseRoleAuthFn()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-main {
  margin-top: -20px;
}
</style>
