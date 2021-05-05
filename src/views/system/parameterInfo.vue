
<template>
  <div class="appContainer">
    <div class="mainWrapper">
      <div class="mainHeader">
        <span class="title">参数查询</span>
        <el-form class="searchBar" ref="queryParams" :model="queryParams" label-width="80px" label-position="top">
          <el-form-item label="" prop="paraType">
            <el-input v-model="queryParams.paraType" placeholder="请输入参数类型" />
          </el-form-item>
          <el-form-item label="" prop="paraName">
            <el-input v-model="queryParams.paraName" placeholder="请输入参数名称" />
          </el-form-item>
          <div class="btnGroup">
            <el-button type="primary" size="mini" @click="queryList('queryParams')">查询</el-button>
            <el-button type="primary" plain size="mini" @click="resetData('queryParams')">重置</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mainWrapper">
      <div class="mainHeader mainHeader1"><span class="title">参数列表</span>
        <div class="searchBar">
          <el-button type="primary" @click="editClick()"><i class="el-icon-plus"></i>新增</el-button>
        </div>
      </div>
      <!--表格-->
      <div class="mainContent">
        <el-table :data="parameterList" highlight-current-row style="width: 100%;" border>
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
      <!-- 新增编辑弹窗 -->
      <el-dialog :title="dialogTitle" :visible.sync="editFormVisible" width="40%" @close="closeDialog('editForm')"
        :close-on-click-modal="false">
        <el-form label-width="120px" label-position="top" :model="editForm" :rules="rules" ref="editForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="参数类型" prop="paraType" width="50%">
                <el-input size="small" v-model="editForm.paraType" :disabled="dialogTitle === '修改信息'" maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参数编码" prop="paraCode">
                <el-input size="small" v-model="editForm.paraCode" :disabled="dialogTitle === '修改信息'" maxlength="50" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="参数名称" prop="paraName">
                <el-input size="small" v-model="editForm.paraName" maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参数数值" prop="paraValue">
                <el-input size="small" v-model="editForm.paraValue" :disabled="dialogTitle === '修改信息'" maxlength="50" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="参数所属模块" prop="belModule">
                <el-input size="small" v-model="editForm.belModule" maxlength="200" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="参数备注" prop="memo">
              <el-input type="textarea" v-model="editForm.memo" :rows="3" />
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
      total: 0, // 参数信息表格总数
      currentPage: 1, // 参数信息分页当前页码
      pageSize: 10, // 参数信息分页大小
      queryParams: {
        // 参数信息查询参数
        page: 1,
        pageSize: 10,
        paraType: '',
        paraName: '',
      },
      parameterList: [], // 参数信息表格数据

      //新增、修改 表格部分
      dialogTitle: '新增信息',
      editFormVisible: false,
      editForm: {},
      rules: {
        paraType: [{ required: true, message: '不能为空', trigger: 'blur' }],
        paraCode: [{ required: true, message: '不能为空', trigger: 'blur' }],
        paraValue: [{ required: true, message: '不能为空', trigger: 'blur' }],
        paraName: [{ required: true, message: '不能为空', trigger: 'blur' }],
      },
    }
  },
  mounted() {
    this.getParameterFn()
  },
  methods: {
    // 获取参数信息数据
    getParameterFn() {
      apiGet(this, '/system/parameterInfo', this.queryParams).then((res) => {
        this.parameterList = res.data
        this.total = res.total
      })
    },
    // 查询业务参数信息详情
    getDetails(row) {
      apiGet(this, '/system/parameterInfo/details', { id: row.id }).then(
        (res) => {
          this.editForm = Object.assign({}, res.data)
        }
      )
    },
    // 搜索栏查询
    queryList(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getParameterFn()
        } else {
          return false
        }
      })
    },
    // 搜索栏重置
    resetList(formName) {
      this.$refs[formName].resetFields()
      this.getParameterFn()
    },
    // pageSize变化getParameterFn()触动函数
    handleSizeChange(val) {
      this.queryParams.pageSize = val
      this.getParameterFn()
    },
    // page变化getParameterFn()触动函数
    handleCurrentChange(val) {
      this.queryParams.page = val
      this.getParameterFn()
    },
    // 打开新增编辑弹窗并对参数表单赋值
    editClick(row) {
      if (row) {
        this.dialogTitle = '修改信息'
        this.getDetails(row)
      } else {
        this.dialogTitle = '新增信息'
        this.editForm = {}
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
            apiPut(this, '/system/parameterInfo', this.editForm).then((res) => {
              this.getParameterFn()
              this.closeDialog('editForm')
            })
          } else {
            apiPost(this, '/system/parameterInfo', this.editForm).then(
              (res) => {
                this.getParameterFn()
                this.closeDialog('editForm')
              }
            )
          }
        } else {
          return false
        }
      })
    },
    // 删除参数信息
    deleteClick(row) {
      var params = {
        id: row.id,
      }
      apiDelete(this, 'system/parameterInfo', params).then((res) => {
        this.getParameterFn()
      })
    },
  },
}
</script>
<style lang="scss" >
</style>
