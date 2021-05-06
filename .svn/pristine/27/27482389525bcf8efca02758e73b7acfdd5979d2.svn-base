
<template>
  <div class="appContainer">
    <div class="mainWrapper">
      <div class="mainHeader"><span class="title">业务参数查询</span>
        <el-form class="searchBar" ref="queryParams" :model="queryParams" label-width="80px" label-position="top">
          <el-form-item label="" prop="paraType">
            <el-input v-model="queryParams.paraType" placeholder="请输入参数类型" />
          </el-form-item>
          <el-form-item label="" prop="paraName">
            <el-input v-model="queryParams.paraName" placeholder="请输入参数名称" />
          </el-form-item>
          <div class="btnGroup">
            <el-button type="primary" size="mini" @click="queryList('queryParams')">查询</el-button>
            <el-button type="primary" plain size="mini" @click="resetList('queryParams')">重置</el-button>
          </div>
        </el-form>
      </div>
    </div>

    <div class="mainWrapper">
      <div class="mainHeader mainHeader1"><span class="title">业务参数列表</span>
        <div class="searchBar">
          <el-button type="primary" @click="editClick()"><i class="el-icon-plus"></i>新增</el-button>
        </div>
      </div>
      <!--表格-->
      <div class="mainContent">
        <el-table :data="parameterBusinessList" highlight-current-row border>
          <el-table-column type="index" label="序号" width="70px" align="center" />
          <el-table-column prop="paraType" label="参数类型" width="180" align="center" />
          <el-table-column prop="paraCode" label="参数编码" align="center" sortable />
          <el-table-column prop="paraName" label="参数名称" :show-overflow-tooltip="true" align="center" />
          <el-table-column prop="paraValue" label="参数数值" :show-overflow-tooltip="true" align="center" sortable />
          <el-table-column fixed="right" label="操作" align="center" width="180">
            <template slot-scope="scope">
              <el-dropdown>
                <el-button type="success" size="mini">
                  操作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="editClick(scope.row)">修改</el-dropdown-item>
                  <el-dropdown-item @click.native="deleteClick(scope.row)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页-->
      <div class="paginationWrap">
        <el-pagination :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
      <!-- 新增编辑界面 -->
      <el-dialog :title="dialogTitle" :visible.sync="editFormVisible" width="40%" @close="closeDialog('editForm')"
        :close-on-click-modal="false">
        <el-form label-width="120px" label-position="top" :model="editForm" :rules="rules" ref="editForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="参数类型" prop="paraType">
                <el-input size="small" v-model="editForm.paraType" placeholder="请输入参数类型"
                  :disabled="dialogTitle === '修改信息'" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参数编码" prop="paraCode">
                <el-input size="small" v-model="editForm.paraCode" placeholder="请输入参数编码"
                  :disabled="dialogTitle === '修改信息'" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="参数名称" prop="paraName">
                <el-input size="small" v-model="editForm.paraName" placeholder="请输入参数名称" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参数数值" prop="paraValue">
                <el-input size="small" v-model="editForm.paraValue" placeholder="请输入参数数值" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="参数所属模块" prop="belModule">
                <el-input size="small" v-model="editForm.belModule" placeholder="请输入参数所属模块" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="参数备注" prop="memo">
              <el-input type="textarea" v-model="editForm.memo" :rows="3" placeholder="请输入参数备注" />
            </el-form-item>
          </el-row>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="closeDialog('editForm')">关闭</el-button>
          <el-button size="small" type="primary" @click="saveEdit('editForm')">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { apiGet, apiPost, apiPut, apiDelete } from '@/utils/request.js'
export default {
  data() {
    return {
      total: 0, // 业务参数信息表格总数
      currentPage: 1, // 业务参数信息分页当前页码
      pageSize: 10, // 业务参数信息分页大小
      queryParams: {
        // 业务参数信息查询参数
        page: 1,
        pageSize: 10,
        paraType: '',
        paraName: '',
      },
      parameterBusinessList: [], // 业务参数信息表格数据
      //新增、修改 表格部分
      dialogTitle: '新增信息', // 弹窗标题
      editFormVisible: false, // 是否显示新增编辑弹窗
      editForm: {}, // 新增编辑表单
      rules: {
        // 新增编辑表单验证
        paraType: [
          { required: true, message: '参数类型不能为空', trigger: 'blur' },
        ],
        paraCode: [
          { required: true, message: '参数编码不能为空', trigger: 'blur' },
        ],
        paraValue: [
          { required: true, message: '参数数值不能为空', trigger: 'blur' },
        ],
        paraName: [
          { required: true, message: '参数名称不能为空', trigger: 'blur' },
        ],
      },
    }
  },
  mounted() {
    this.getParameterBusinessFn()
  },
  methods: {
    // 获取业务参数信息数据
    getParameterBusinessFn() {
      apiGet(this, '/parameterInfo/parameterBusiness', this.queryParams).then(
        (res) => {
          this.parameterBusinessList = res.data
          this.total = res.total
        }
      )
    },
    // 查询业务参数信息详情
    getDetails(row) {
      apiGet(this, '/parameterInfo/parameterBusiness/details', {
        id: row.id,
      }).then((res) => {
        this.editForm = Object.assign({}, res.data)
      })
    },
    // 搜索栏查询
    queryList(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getParameterBusinessFn()
        } else {
          return false
        }
      })
    },
    // 搜索栏重置
    resetList(formName) {
      this.$refs[formName].resetFields()
      this.getParameterBusinessFn()
    },
    // pageSize变化getParameterBusinessFn()触动函数
    handleSizeChange(val) {
      this.queryParams.pageSize = val
      this.getParameterBusinessFn()
    },
    // page变化getParameterBusinessFn()触动函数
    handleCurrentChange(val) {
      this.queryParams.page = val
      this.getParameterBusinessFn()
    },
    // 打开新增编辑弹窗并对参数表单赋值
    editClick(row) {
      if (row) {
        this.dialogTitle = '修改信息'
        this.getDetails(row)
      } else {
        this.dialogTitle = '新增信息'
        this.editFormVisible = true
      }
      this.editFormVisible = true
    },
    // 关闭新增修改弹窗
    closeDialog(formName) {
      this.$refs[formName].resetFields()
      this.editFormVisible = false
    },
    // 新增或修改提交
    saveEdit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dialogTitle === '修改信息') {
            apiPut(this, 'parameterInfo/parameterBusiness', this.editForm).then(
              (res) => {
                this.getParameterBusinessFn()
                this.closeDialog('editForm')
              }
            )
          } else {
            apiPost(
              this,
              'parameterInfo/parameterBusiness',
              this.editForm
            ).then((res) => {
              this.getParameterBusinessFn()
              this.closeDialog('editForm')
            })
          }
        } else {
          return false
        }
      })
    },
    // 删除业务参数信息
    deleteClick(row) {
      var params = {
        id: row.id,
      }
      apiDelete(this, '/parameterInfo/parameterBusiness', params).then(
        (res) => {
          this.getParameterBusinessFn()
        }
      )
    },
  },
}
</script>
<style lang="scss" >
</style>
