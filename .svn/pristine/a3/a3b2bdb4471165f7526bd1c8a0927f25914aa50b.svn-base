<template>
  <div class="appContainer">
    <div class="mainWrapper">
      <div class="mainHeader"><span class="title">核销机查询</span>
        <el-form class="searchBar" ref="queryParams" :model="queryParams" label-width="80px" label-position="top">
          <el-form-item label="" prop="keyWord">
            <el-input v-model="queryParams.keyWord" placeholder="请输入核销机名称" />
          </el-form-item>
          <div class="btnGroup">
            <el-button type="primary" size="mini" @click="queryList('queryParams')">查询</el-button>
            <el-button type="primary" plain size="mini" @click="resetData('queryParams')">重置</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mainWrapper">
      <div class="mainHeader mainHeader1">
        <span class="title">核销机列表</span>
        <div class="searchBar">
          <el-button type="primary" @click="addCheckMachineFn()"><i class="el-icon-plus"></i>新增</el-button>
        </div>
      </div>
      <div class="mainContent">
        <el-table ref="multipleTable" :data="tables" :cell-style="statusStyle" border fit highlight-current-row>
          <el-table-column type="index" label="序号" width="70px" align="center" />
          <el-table-column prop="machineName" label="核销机名称" align="center" sortable />
          <el-table-column prop="deviceNumber" label="设备号" align="center" sortable />
          <el-table-column prop="status" label="状态" align="center" sortable :formatter="statusFormatter" />
          <el-table-column label="操作" width="200px" align="center">
            <template slot-scope="scope">
              <div class="optWrap" v-if="scope.row.accountState != 3">
                <p class="optBtn optBtn2" @click="editFn(scope.row)">编辑</p>
                <p class="optBtn optBtn3" @click="deleteFn(scope.row)">删除</p>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <div class="paginationWrap">
          <el-pagination :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handelSizeChange"
            @current-change="handelCurrentChange" />
        </div>
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="formVisit" :close-on-click-modal="false" :close-on-press-escape="false"
      @close="closeDialog('form')" width="25%">
      <el-form ref="form" class="dialogBody" :rules="AddEditRules" :model="form" label-width="100px"
        label-position="right">
        <el-row>
          <el-col :span="24">
            <el-form-item label="核销机名称" prop="machineName">
              <el-input v-model="form.machineName" placeholder="请输入核销机名称" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="设备号" prop="deviceNumber">
              <el-input v-model="form.deviceNumber" placeholder="请输入设备号" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog('form')">取 消</el-button>
        <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { apiDelete, apiGet, apiPost, apiPut } from '@/utils/request.js'

export default {
  data() {
    return {
      total: 0, // 模板表格总数
      currentPage: 1, // 模板表格当前页码
      pageSize: 10, // 模板表格整页大小
      queryParams: {
        // 获取模板参数
        page: 1,
        pageSize: 10,
        machineName: null,
      },
      tables: [], // 模板表格数据
      formVisit: false, // 是否新增编辑弹窗
      AddEditRules: {
        machineName: [
          { required: true, message: '请输入核销机名称', trigger: 'blur' },
        ],
        deviceNumber: [
          { required: true, message: '请输入设备号', trigger: 'blur' },
        ],
      },
      form: {},

      title: '新增模板', // 新增编辑详情弹窗标题

      operation: '/business/checkMachine',
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    statusStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 3) {
        return ['color: #FF3131', 'color: #1BBC00'][row.status]
      }
    },
    statusFormatter(row, column, cellValue, index) {
      return ['未占用', '使用中'][cellValue]
    },

    // 获取模板表格
    getList() {
      apiGet(this, this.operation, this.queryParams).then((res) => {
        this.tables = res.data
        this.total = res.total
      })
    },
    // 查询详情
    getDetails(row) {
      apiGet(this, this.operation + '/details', { id: row.id }).then((res) => {
        this.form = Object.assign({}, res.data)
      })
    },
    // page变化getList()触动函数
    handelSizeChange(val) {
      this.queryParams.pageSize = val
      this.getList()
    },
    // pageSize变化getList()触动函数
    handelCurrentChange(val) {
      this.queryParams.page = val
      this.getList()
    },
    // 搜索栏查询
    queryList: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getList()
        } else {
          return false
        }
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.title === '新增核销机') {
            apiPost(this, this.operation, this.form).then((res) => {
              this.getList()
              this.closeDialog(formName)
            })
          } else if (this.title === '编辑核销机') {
            apiPut(this, this.operation, this.form).then((res) => {
              this.getList()
              this.closeDialog(formName)
            })
          }
        } else {
          return false
        }
      })
    },
    // 搜索栏重置
    resetData(formName) {
      this.$refs[formName].resetFields()
      this.getList()
    },
    // 打开新增编辑弹窗
    addCheckMachineFn(falg) {
      this.title = '新增核销机'
      this.formVisit = true
    },
    // 打开修改弹窗
    editFn(row) {
      this.formVisit = true
      this.getDetails(row)
      this.title = '编辑核销机'
    },
    // 删除模板
    deleteFn(row) {
      let params = {
        id: row.id,
      }
      apiDelete(this, this.operation, params).then((res) => {
        this.getList()
      })
    },
    // 关闭新增、编辑、变更记录弹窗
    closeDialog(formName) {
      this.$refs[formName].resetFields()
      this.formVisit = false
    },
  },
}
</script>

<style scoped>
</style>