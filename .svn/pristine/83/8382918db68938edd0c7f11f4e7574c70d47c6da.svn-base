<template>
  <div class="appContainer">
    <div class="mainWrapper">
      <div class="main-header">模板查询</div>
      <div class="main-content">
        <el-form ref="queryParams" :model="queryParams" label-width="80px" label-position="top">
          <el-row>
            <el-col :md="4">
              <el-form-item label="企业名称" prop="qymc">
                <el-input v-model="queryParams.qymc" aria-placeholder="请输入企业名称" />
              </el-form-item>
            </el-col>
            <el-col :md="4">
              <el-form-item label="统一信用社代码" prop="tyshxydm">
                <el-input v-model="queryParams.tyshxydm" aria-placeholder="请输入统一信用社代码" />
              </el-form-item>
            </el-col>
            <el-col :md="4">
              <el-form-item label="所属行业" prop="sshy">
                <el-input v-model="queryParams.sshy" aria-placeholder="请输入所属行业" />
              </el-form-item>
            </el-col>
            <el-col :md="6">
              <el-form-item class="textLeft param">
                <el-button type="warning" size="mini" @click="queryList('queryParams')">查询</el-button>
                <el-button type="danger" size="mini" @click="resetData('queryParams')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="mainWrapper">
      <div class="main-header">
        <el-row>
          <el-col :span="4">模板列表</el-col>
          <el-col :span="20" class="tableHeadRow">
            <el-button type="primary" size="medium" @click="addTemplateFn()">新增</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="main-content">
        <el-table ref="multipleTable" :data="businessInfoList" border fit highlight-current-row>
          <el-table-column type="index" width="55" label="序号" align="center" />
          <el-table-column prop="aaa" label="企业名称" width="220" align="center" sortable />
          <el-table-column prop="bbb" label="统一信用社代码" width="220" align="center" sortable />
          <el-table-column prop="ccc" label="联系人" width="220" align="center" sortable />
          <el-table-column prop="ddd" label="联系人电话" width="220" align="center" sortable />
          <el-table-column prop="eee" label="更新时间" align="center" sortable />
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-dropdown>
                <el-button type="success" size="medium">
                  操作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown" v-if="scope.row.accountState!=3">
                  <el-dropdown-item @click.native="editFn(scope.row)">修改</el-dropdown-item>
                  <el-dropdown-item @click.native="deletFn(scope.row)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handelSizeChange"
          @current-change="handelCurrentChange" />
      </div>
    </div>
    <el-dialog :title="addEditTitle" :visible.sync="addEditVisi" :close-on-click-modal="false"
      :close-on-press-escape="false" :before-close="dialogClose" width="50%">
      <el-form ref="addEditForm" class="dialogBody" :rules="AddEditRules" :model="addEditForm" label-width="80px" label-position="top">
        <el-row>
          <el-col :span="12">
            <el-form-item label="两年内股权退出计划" prop="aaa">
              <el-input v-model="addEditForm.aaa" placeholder="请输入两年内股权退出计划" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="两年内股权退出计划" prop="aaa">
              <el-input v-model="addEditForm.aaa" placeholder="请输入两年内股权退出计划" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预计税收情况" prop="bbb">
              <el-input v-model="addEditForm.bbb" placeholder="请输入预计税收情况" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所投企业落户黄浦意向信息" prop="ccc">
              <el-input v-model="addEditForm.ccc" placeholder="请输入所投企业落户黄浦意向信息" />
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
        qymc: '',
        tyshxydm: '',
        sshy: '',
        state: 1
      },
      businessInfoList: [
        {
          aaa: 'aaa',
          bbb: 'bbb',
          ccc: 'ccc',
          ddd: 'ddd',
          eee: 'eee'
        }
      ], // 模板表格数据
      addEditVisi: false, // 是否新增编辑弹窗
      AddEditRules:{
        aaa: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        bbb: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        ccc: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      addEditForm: {
        aaa: '',
        bbb: '',
        ccc: '',
        ddd: ''
      },
      addEditTitle: '新增模板' // 新增编辑详情弹窗标题
    }
  },
  mounted() {},
  methods: {
    // 获取模板表格
    businessInfoApiFn() {
      businessInfoApi(this.queryParams).then(res => {
        this.businessTotal = res.total
        this.businessInfoList = res.data
        this.addEditVisi = false
        this.visitedRecordVisi = false
        this.fangLiuShiVisi = false
      })
    },
    // page变化businessInfoApiFn()触动函数
    handelSizeChange(val) {
      this.queryParams.page = val
      this.businessInfoApiFn()
    },
    // pageSize变化businessInfoApiFn()触动函数
    handelCurrentChange(val) {
      this.queryParams.pageSize = val
      this.businessInfoApiFn()
    },
    // 搜索栏查询
    queryList: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.businessInfoApiFn()
        } else {
          return false
        }
      })
    },
    // 搜索栏重置
    resetData(formName) {
      this.$refs[formName].resetFields()
      this.businessInfoApiFn()
    },
    // 打开新增编辑弹窗
    addTemplateFn(falg) {
      this.addEditTitle = '新增模板'
      this.addEditVisi = true
    },
    // 打开修改弹窗
    editFn() {
      this.addEditVisi = true
      this.addEditTitle = '编辑模板'
    },
    // 删除模板
    deletFn() {
      alert()
    },
    // 关闭新增、编辑、变更记录弹窗
    dialogClose() {
      this.addEditVisi = false
      this.changeRecordVisi = false
      this.visitedRecordVisi = false
    }
  }
}
</script>
