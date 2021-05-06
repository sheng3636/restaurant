<template>
  <div class="appContainer">
    <div class="mainWrapper">
      <div class="mainHeader">
        <span class="title">定时任务查询</span>
        <el-form class="searchBar" ref="queryParams" :model="queryParams" label-width="80px" label-position="top">
          <el-form-item label="" prop="jobName">
            <el-input v-model="queryParams.jobName" placeholder="请输入任务名称" />
          </el-form-item>
          <el-form-item label="" prop="jobGroup">
            <el-input v-model="queryParams.jobGroup" placeholder="请输入任务组" />
          </el-form-item>
          <el-form-item label="" prop="cronExpression">
            <el-input v-model="queryParams.cronExpression" placeholder="请输入corn" />
          </el-form-item>
          <el-form-item label="" prop="beanName">
            <el-input v-model="queryParams.beanName" placeholder="请输入bean名称" />
          </el-form-item>
          <el-form-item label="" prop="methodName">
            <el-input v-model="queryParams.methodName" placeholder="请输入方法名" />
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
        <span class="title">定时任务列表</span>
        <div class="searchBar">
          <el-button type="primary" @click="addScheduleJobFn()"><i class="el-icon-plus"></i>新增</el-button>
        </div>
      </div>
      <div class="mainContent">
        <el-table ref="multipleTable" :data="tables" border fit highlight-current-row>
          <el-table-column type="index" label="序号" width="70px" align="center" />
          <el-table-column prop="jobName" label="任务" align="center" sortable />
          <el-table-column prop="jobGroup" label="任务组" align="center" sortable />
          <el-table-column prop="cronExpression" label="corn" align="center" sortable />
          <el-table-column prop="beanName" label="bean名称" align="center" sortable />
          <el-table-column prop="methodName" label="方法名" align="center" sortable />
          <el-table-column prop="jobStatus" label="状态" align="center" sortable>
            <template scope="scope">
              <div v-if="scope.row.jobStatus==='NORMAL'">正常</div>
              <div v-if="scope.row.jobStatus=='PAUSED'">已暂停</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-dropdown>
                <el-button type="success" size="medium">
                  操作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown" v-if="scope.row.accountState!=3">
                  <el-dropdown-item @click.native="editFn(scope.row)">修改</el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.jobStatus==='NORMAL'" @click.native="stopFn(scope.row)">停止
                  </el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.jobStatus=='PAUSED'" @click.native="startFn(scope.row)">运行
                  </el-dropdown-item>
                  <el-dropdown-item @click.native="deleteFn(scope.row)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
    <el-dialog :title="title" :visible.sync="addEditVisit" :close-on-click-modal="false" :close-on-press-escape="false"
      :before-close="dialogClose" width="50%">
      <el-form ref="addEditForm" class="dialogBody" :rules="AddEditRules" :model="form" label-width="80px"
        label-position="top">
        <el-row>
          <el-col :span="12">
            <el-form-item label="任务" prop="jobName">
              <el-input v-model="form.jobName" placeholder="请输入任务" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务组" prop="jobGroup">
              <el-input v-model="form.jobGroup" placeholder="请输入任务组" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="corn" prop="cronExpression">
              <el-input v-model="form.cronExpression" placeholder="请输入corn" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="bean名称" prop="beanName">
              <el-input v-model="form.beanName" placeholder="请输入bean名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="方法名" prop="methodName">
              <el-input v-model="form.methodName" placeholder="请输入方法名" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="onSubmit('addEditForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchData,
  getDetails,
  saveData,
  deleteData,
  updateData,
} from '@/api/http_request'
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
        pathPrefix: '',
        pathSuffix: '',
        library: '',
      },
      tables: [], // 模板表格数据
      addEditVisit: false, // 是否新增编辑弹窗
      popup: false, // 生成代码弹窗
      AddEditRules: {
        jobName: [{ required: true, message: '请输入任务', trigger: 'blur' }],
        jobGroup: [
          { required: true, message: '请输入任务组', trigger: 'blur' },
        ],
        cronExpression: [
          { required: true, message: '请输入corn', trigger: 'blur' },
        ],
        beanName: [
          { required: true, message: '请输入bean名称', trigger: 'blur' },
        ],
        methodName: [
          { required: true, message: '请输入方法名', trigger: 'blur' },
        ],
      },
      form: {},

      title: '新增模板', // 新增编辑详情弹窗标题

      operation: '/system/schedule',
      pauseJob: '/system/schedule/pauseJob',
      updateJob: '/system/schedule/updateJob',
      resumeJob: '/system/schedule/resumeJob',
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取模板表格
    getList() {
      fetchData(this.operation, this.queryParams).then((res) => {
        this.tables = res.data
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
          if (this.title === '新增模板') {
            //新增
            saveData(this.operation, this.form).then((res) => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '保存成功！',
                })
                this.getList()
                this.dialogClose()
              }
            })
          } else if (this.title === '编辑模板') {
            //修改路径
            updateData(this.updateJob, this.form).then((res) => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '修改成功！',
                })
                this.getList()
                this.dialogClose()
              }
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
    addScheduleJobFn(falg) {
      this.title = '新增模板'
      this.addEditVisit = true
    },
    // 打开修改弹窗
    editFn(row) {
      this.form = row
      this.addEditVisit = true
      this.title = '编辑模板'
    },
    //停止
    stopFn(row) {
      let params = { jobName: row.jobName, jobGroup: row.jobGroup }
      updateData(this.pauseJob, params).then((res) => {
        this.getList()
      })
    },
    //运行
    startFn(row) {
      let params = { jobName: row.jobName, jobGroup: row.jobGroup }
      updateData(this.resumeJob, params).then((res) => {
        this.getList()
      })
    },
    // 删除模板
    deleteFn(row) {
      let params = { jobName: row.jobName, jobGroup: row.jobGroup }
      deleteData(this.operation, params).then((res) => {
        this.getList()
      })
    },
    // 关闭新增、编辑、变更记录弹窗
    dialogClose() {
      this.addEditVisit = false
      this.changeRecordVisit = false
      this.visitedRecordVisit = false
      this.popup = false
    },
  },
}
</script>
