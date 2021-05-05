<template>
  <div class="appContainer">
    <div class="mainWrapper">
      <div class="mainHeader">
        <span class="title">网点查询</span>
        <el-form class="searchBar" ref="queryParams" :model="queryParams" label-width="80px" label-position="top">
          <el-form-item label="" prop="name">
            <el-input v-model="queryParams.name" placeholder="请输入网点名称" />
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
        <span class="title">网点列表</span>
        <div class="searchBar">
          <el-button type="primary" @click="addSiteFn()"><i class="el-icon-plus"></i>新增</el-button>
        </div>
      </div>
      <div class="mainContent">
        <el-table ref="multipleTable" :data="tables" border fit highlight-current-row>
          <el-table-column type="index" width="55" label="序号" align="center" />
          <el-table-column prop="name" label="地址名称" align="center" sortable />
          <el-table-column prop="address" label="详细地址" align="center" sortable />
          <el-table-column prop="createTime" label="创建日期" align="center" sortable />
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
      @close="closeDialog('form')" width="30%">
      <el-form ref="form" class="dialogBody" :rules="AddEditRules" :model="form" label-width="100px"
        label-position="right">
        <el-row>
          <el-col :span="24">
            <el-form-item label="地址名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入网点名称" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="form.address" type="textarea" maxlength="200" rows="6" placeholder="请输入具体位置" />
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
import { mapGetters } from 'vuex'
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
        name: null,
      },
      tables: [], // 模板表格数据
      formVisit: false, // 是否新增编辑弹窗
      AddEditRules: {
        name: [{ required: true, message: '请输入地址名称', trigger: 'blur' }],

        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
        ],
      },
      form: {},

      title: '新增地址', // 新增编辑详情弹窗标题

      operation: '/business/site',
    }
  },
  computed: {
    ...mapGetters(['canteenId']),
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    canteenId: function (newValue, oldValue) {
      if (newValue) {
        console.log(newValue)
        this.getList()
      }
    },
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取模板表格
    getList() {
      this.queryParams.canteenId = this.canteenId
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
      this.queryParams.page = val
      this.getList()
    },
    // pageSize变化getList()触动函数
    handelCurrentChange(val) {
      this.queryParams.pageSize = val
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
          if (this.title === '新增地址') {
            this.form.canteenId = this.canteenId
            apiPost(this, this.operation, this.form).then((res) => {
              this.getList()
              this.closeDialog(formName)
            })
          } else if (this.title === '编辑地址') {
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
    addSiteFn(falg) {
      this.title = '新增地址'
      this.formVisit = true
    },
    // 打开修改弹窗
    editFn(row) {
      this.formVisit = true
      this.getDetails(row)
      this.title = '编辑地址'
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
