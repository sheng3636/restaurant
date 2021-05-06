<template>
  <div class="appContainer">
    <div class="mainWrapper">
      <div class="mainHeader">
        <span class="title">用户查询</span>
        <el-form class="searchBar" ref="queryParams" :model="queryParams" label-width="80px" label-position="top">
          <el-form-item label="" prop="userName">
            <el-input v-model="queryParams.userName" placeholder="请输入用户姓名" />
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
        <span class="title">用户列表</span>
        <div class="searchBar">
          <el-button type="info" @click="addUserUpload()"><i class="el-icon-upload2"></i>上传</el-button>
          <el-button type="success" @click="download()"><i class="el-icon-download"></i>模板下载</el-button>
          <el-button type="primary" @click="addUserFn()"><i class="el-icon-plus"></i>新增</el-button>
        </div>
      </div>
      <div class="mainContent">
        <el-table ref="multipleTable" :data="tables" border fit highlight-current-row>
          <el-table-column type="index" label="序号" width="70px" align="center" />
          <el-table-column prop="userName" label="用户名" align="center" sortable />
          <el-table-column prop="userPhone" label="手机号" align="center" sortable />
          <el-table-column prop="wxNumber" label="微信号" align="center" sortable />
          <el-table-column prop="roleName" label="角色" align="center" sortable />
          <el-table-column prop="deptName" label="部门" align="center" sortable />
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
    <el-dialog top="12%" :title="title" :visible.sync="formVisit" :close-on-click-modal="false"
      :close-on-press-escape="false" width="30%" @close="closeDialog('form')">
      <el-form ref="form" class="dialogBody" :rules="AddEditRules" :model="form" label-width="100px"
        label-position="right">
        <el-row>
          <el-col :span="24">
            <el-form-item label="用户名称" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入用户名称" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="手机号" prop="userPhone">
              <el-input v-model="form.userPhone" placeholder="请输入手机号" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="微信号" prop="wxNumber">
              <el-input v-model="form.wxNumber" placeholder="请输入微信号" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="角色" prop="roleId">
              <el-select v-model="form.roleId" placeholder="请选择" style="width:100%">
                <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="部门" prop="deptId">
              <el-select v-model="form.deptId" placeholder="请选择" style="width:100%">
                <el-option v-for="item in deptList" :key="item.id" :label="item.departmentName" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog('form')">取 消</el-button>
        <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      </span>
    </el-dialog>

    <div>
      <el-dialog top="12%" :title="title" :visible.sync="formUpload" :close-on-click-modal="false"
        :close-on-press-escape="false" width="30%" @close="closeFile()">
        <div class="uploadBody">
          <el-upload enctype="multipart/form-data" ref="file" action="#" class="upload-demo" :file-list="fileTable"
            :clearFiles="clearFiles" :on-change="handleChange" :on-remove="handleRemoce" :auto-upload="false" drag
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传xlsx文件</div>
          </el-upload>

          <div class="uploadErrTxtWrap" v-if="uploadErrTxt">
            <el-input type="textarea" :rows="5" disabled v-model="uploadErrTxt">
            </el-input>
            <!-- el-button class="copyBtn" v-clipboard:copy="uploadErrTxt" v-clipboard:success="clipboardSuccess" type="primary"
            icon="el-icon-document">
            复制
          </el-button!-->
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeFile()">取 消</el-button>
          <el-button type="primary" @click="Submit('file')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import { apiDelete, apiGet, apiPost, apiPut } from '@/utils/request.js'
import { getToken } from '@/utils/auth'
import axios from 'axios'

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
        userName: null,
      },
      tables: [], // 模板表格数据
      formVisit: false, // 是否新增编辑弹窗
      formUpload: false, // 是否打开上传弹窗
      AddEditRules: {
        userName: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' },
        ],
        userPhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
        ],
        roleId: [
          { required: true, message: '请选择用户角色', trigger: 'blur' },
        ],
        deptId: [
          { required: true, message: '请选择用户部门', trigger: 'blur' },
        ],
      },
      form: {},

      title: '新增模板', // 新增编辑详情弹窗标题

      operation: '/business/user',
      roleList: [],
      deptList: [],
      fileObj: '',
      fileTable: [],
      uploadErrTxt: '',
      baseUrl: process.env.VUE_APP_BASE_API, // url
    }
  },
  mounted() {
    this.getList()
    this.getRoleList()
    this.getDeptList()
  },
  methods: {
    download() {
      window.open(this.baseUrl + this.operation + '/downloadTemplate', '_self')
    },

    clearFiles() {
      this.fileTable = []
    },
    handleChange(file, fileList) {
      const fileName = file.name
      const pos = fileName.lastIndexOf('.')
      const lastName = fileName.substring(pos, fileName.length)
      if (lastName.toLowerCase() !== '.xlsx') {
        this.$message.error('文件必须为.xlsx类型')
        this.$refs.upload.clearFiles()
        return
      }
      this.fileObj = file.raw
    },
    handleRemoce(file, fileList) {
      this.fileObj = ''
    },
    //获取所有角色列表
    getRoleList() {
      apiGet(this, '/business/role', {
        page: 1,
        pageSize: 50,
      }).then((res) => {
        this.roleList = res.data
      })
    },
    getDeptList() {
      apiGet(this, '/business/department', {
        page: 1,
        pageSize: 50,
      }).then((res) => {
        this.deptList = res.data
      })
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
      apiGet(this, this.operation + '/details', { userId: row.userId }).then(
        (res) => {
          this.form = Object.assign({}, res.data)
        }
      )
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
          if (this.title === '新增用户') {
            apiPost(this, this.operation, this.form).then((res) => {
              this.getList()
              this.getRoleList()
              this.getDeptList()
              this.closeDialog(formName)
            })
          } else if (this.title === '编辑用户') {
            apiPut(this, this.operation, this.form).then((res) => {
              this.getList()
              this.getRoleList()
              this.getDeptList()
              this.closeDialog(formName)
            })
          }
        } else {
          return false
        }
      })
    },
    Submit(formName) {
      if (this.fileObj === '') {
        this.$message.error('请选择文件')
        return false
      }
      let form = new FormData()
      form.append('files', this.fileObj)

      axios({
        url: process.env.VUE_APP_BASE_API + this.operation + '/upload',
        method: 'post',
        data: form,
        headers: {
          'Content-Type': 'multipart/form-data;charset=utf-8',
          Authorization: getToken(),
        },
      })
        .then((res) => {
          let { data } = res
          if (data.code !== 0) {
            this.uploadErrTxt = data.data.join('\n')
          } else {
            this.$message({
              type: 'success',
              message: data.message,
            })
            this.getList()
            this.closeFile()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 搜索栏重置
    resetData(formName) {
      this.$refs[formName].resetFields()
      this.getList()
    },
    // 打开新增编辑弹窗
    addUserFn(falg) {
      this.title = '新增用户'
      this.formVisit = true
    },
    //打开上传弹窗
    addUserUpload() {
      this.title = '上传文件'
      this.formUpload = true
      ;(this.from = {}), (this.fileObj = ''), (this.uploadErrTxt = '')
    },

    // 打开修改弹窗
    editFn(row) {
      this.formVisit = true
      this.getDetails(row)
      this.title = '编辑用户'
    },
    // 删除模板
    deleteFn(row) {
      let params = {
        userId: row.userId,
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
    // 关闭新增、编辑、变更记录弹窗
    closeFile() {
      this.formUpload = false
      this.form = {}
      this.clearFiles()
      this.uploadErrTxt = ''
    },
  },
}
</script>
<style lang='scss' scoped>
.uploadBody {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .uploadErrTxtWrap {
    margin-top: 10px;
    width: 360px;
    input {
      color: red;
    }
    .copyBtn {
      display: block;
      float: right;
      margin-top: 15px;
    }
  }
}
</style>
