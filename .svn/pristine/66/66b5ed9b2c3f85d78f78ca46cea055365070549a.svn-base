<template>
  <div class="appContainer">
    <div class="mainWrapper">
      <div class="mainHeader">
        <span class="title">点餐查询</span>
        <el-form class="searchBar" ref="queryParams" :model="queryParams" label-width="80px" label-position="top">
          <el-form-item label="" prop="username">
            <el-input v-model="queryParams.username" placeholder="请输入用户名" />
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
        <span class="title">点餐列表</span>
        <div class="headerCenterWrap">
          <el-badge :value="200" :max="99" class="item">
            <span class="typeButton" :class="{ active: activeNum === 1 }" @click="shift(1)">工作日午餐</span>
          </el-badge>
          <el-badge :value="200" :max="99" class="item">
            <span class="typeButton" :class="{ active: activeNum === 2 }" @click="shift(2)">值班用餐</span>
          </el-badge>
          <el-badge :value="200" :max="99" class="item">
            <span class="typeButton" :class="{ active: activeNum === 3 }" @click="shift(3)">招待用餐</span>
          </el-badge>
        </div>
        <div class="searchBar">
          <el-button type="success"><i class="el-icon-download" @click="download(activeNum)"></i>导出</el-button>
        </div>
      </div>
      <div class="mainContent">
        <el-table :key="a1" ref="multipleTable" v-if="activeNum === 1" :data="tables" border fit highlight-current-row>
          <el-table-column type="index" width="55" label="序号" align="center" />
          <el-table-column prop="username" label="用户名" align="center" sortable />
          <el-table-column prop="status" label="状态" :formatter="normalStatusFormatter" align="center" sortable />
          <el-table-column prop="phone" label="手机号" align="center" sortable />
          <el-table-column prop="roleName" label="用户类型" align="center" sortable />
          <el-table-column prop="createTime" label="订餐时间" align="center" width="250px" show-overflow-tooltip sortable />
          <el-table-column prop="mealType" label="用餐方式" :formatter="mealTypeFormatter" align="center" sortable />
          <el-table-column prop="siteName" label="网点" :formatter="siteFormatter" align="center" sortable />
          <el-table-column prop="finishTime" label="餐券核销时间" :formatter="finishTimeFormatter" align="center" width="250px" show-overflow-tooltip sortable />
          <el-table-column prop="checkCanteenName" label="核销食堂" :formatter="finishTimeFormatter" align="center"
            sortable />
        </el-table>
        <!--分页-->
        <div class="paginationWrap">
          <el-pagination v-if="activeNum === 1" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"
            @size-change="handelSizeChange" @current-change="handelCurrentChange" />
        </div>

        <!-- 值班用餐表格 -->
        <el-table ref="workingTable" :key="a2" v-if="activeNum === 2" empty-text=" - " :data="workingTables" border fit
          highlight-current-row>
          <el-table-column type="index" width="55" label="序号" align="center" />
          <el-table-column prop="username" label="用户名" align="center" sortable />
          <el-table-column prop="phone" label="手机号" align="center" sortable />
          <el-table-column prop="roleName" label="用户类型" align="center" sortable />
          <el-table-column prop="createTime" label="订餐时间" align="center" sortable />
          <el-table-column prop="canteenName" label="食堂名称" align="center" sortable />
          <el-table-column prop="createTime" label="餐券领取时间" align="center" width="250px" show-overflow-tooltip sortable />
          <el-table-column prop="finishTime" label="餐券核销时间" :formatter="finishTimeFormatter" align="center" width="250px" show-overflow-tooltip sortable />
          <el-table-column prop="checkCanteenName" label="核销食堂" :formatter="finishTimeFormatter" align="center"
            sortable />
        </el-table>
        <!--分页-->
        <div class="paginationWrap">
          <el-pagination v-if="activeNum === 2" :current-page.sync="workingCurrentPage" :page-sizes="[10, 20, 30, 40]"
            :page-size="workingPageSize" layout="total, sizes, prev, pager, next, jumper" :total="workingTotal"
            @size-change="handelworkingSizeChange" @current-change="handelWorkingCurrentChange" />
        </div>

        <!-- 招待用餐表格 -->
        <el-table ref="meetingTable" :key="a3" v-if="activeNum === 3" empty-text=" - " :data="meetingTables" border fit
          highlight-current-row>
          <el-table-column type="index" width="55" label="序号" align="center" />
          <el-table-column prop="applyName" width="120" label="用户名" align="center" sortable />
          <el-table-column prop="status" width="120" :formatter="meetingStatusFormatter" label="状态" align="center"
            sortable />
          <el-table-column prop="phone" label="手机号" align="center" sortable />
          <el-table-column prop="roleName" label="用户类型" align="center" sortable />
          <el-table-column prop="canteenName" label="食堂名称" align="center" sortable />
          <el-table-column prop="createTime" label="提交时间" align="center" width="250px" show-overflow-tooltip sortable />
          <el-table-column prop="cooperateNum" label="招待人数" width="100" align="center" sortable />
          <el-table-column prop="confirmNum" width="100" label="已领取人数" align="center" sortable />
          <el-table-column prop="examineTime" label="审核时间" :formatter="finishTimeFormatter" align="center" width="250px" show-overflow-tooltip sortable />
          <el-table-column prop="examineResult" label="审核结果" :formatter="finishTimeFormatter" align="center" sortable />
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button type="success" v-if="scope.row.status === 2" @click.native="confirmDetail(scope.row)"
                size="small">
                领取详情
              </el-button>
              <span v-else> 无 </span>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <div class="paginationWrap">
          <el-pagination v-if="activeNum === 3" :current-page.sync="meetingCurrentPage" :page-sizes="[10, 20, 30, 40]"
            :page-size="meetingPageSize" layout="total, sizes, prev, pager, next, jumper" :total="meetingTotal"
            @size-change="handelMeetingSizeChange" @current-change="handelMeetingCurrentChange" />
        </div>

        <el-dialog :title="dialogTitle" :visible.sync="formVisit" :close-on-click-modal="false"
          :close-on-press-escape="false" @close="closeDialog('form')" width="50%">
          <el-table ref="machineTable" row-key="id" :data="subOrderTables" border fit highlight-current-row>
            <el-table-column type="index" width="55" label="序号" align="center" />
            <el-table-column prop="name" label="姓名" width="100" align="center" sortable />
            <el-table-column prop="phone" label="手机号" align="center" sortable />
            <el-table-column prop="status" label="状态" :formatter="normalStatusFormatter" align="center" sortable />
            <el-table-column prop="createTime" label="领取时间" align="center" sortable />
            <el-table-column prop="finishTime" label="核销时间" :formatter="finishTimeFormatter" align="center" sortable />
            <el-table-column prop="checkCanteenName" label="核销食堂" :formatter="finishTimeFormatter" align="center"
              sortable />
          </el-table>

          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="closeDialog('form')">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGet } from '@/utils/request.js'

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
        username: null,
      },
      tables: [], // 模板表格数据

      workingTotal: 0, // 模板表格总数
      workingCurrentPage: 1, // 模板表格当前页码
      workingPageSize: 10, // 模板表格整页大小
      workingQueryParams: {
        // 获取模板参数
        page: 1,
        pageSize: 10,
        username: null,
      },
      workingTables: [], // 模板表格数据

      meetingTotal: 0, // 模板表格总数
      meetingCurrentPage: 1, // 模板表格当前页码
      meetingPageSize: 10, // 模板表格整页大小
      meetingQueryParams: {
        // 获取模板参数
        page: 1,
        pageSize: 10,
        username: null,
      },
      meetingTables: [], // 模板表格数据

      formVisit: false, // 是否新增编辑弹窗
      AddEditRules: {
        siteName: [
          { required: true, message: '请输入网点名称', trigger: 'blur' },
        ],
      },
      form: {},

      title: '新增模板', // 新增编辑详情弹窗标题

      operation: '/business/normalOrder',
      intervalId: '',
      activeNum: 1,

      a1: 'a1',
      a2: 'a2',
      a3: 'a3',

      dialogTitle: '领取详情',
      subOrderTables: [],

      baseUrl: process.env.VUE_APP_BASE_API, // url
    }
  },
  mounted() {
    this.getList()
    let intervalId = setInterval(() => {
      this.getList()
    }, 2000)
    this.intervalId = intervalId

    this.$store.dispatch('user/setInterval', { id: intervalId })
  },
  destroyed() {
    clearInterval(this.intervalId)
  },
  methods: {
    shift(val) {
      clearInterval(this.intervalId)
      this.activeNum = val

      if (val === 1) {
        this.getList()
        let intervalId = setInterval(() => {
          this.getList()
        }, 2000)
        this.intervalId = intervalId

        this.$store.dispatch('user/setInterval', { id: intervalId })
      } else if (val === 2) {
        this.getWorkingList()
        let intervalId = setInterval(() => {
          this.getWorkingList()
        }, 2000)
        this.intervalId = intervalId
        this.$store.dispatch('user/setInterval', { id: intervalId })
      } else if (val === 3) {
        this.getMeetingList()
        let intervalId = setInterval(() => {
          this.getMeetingList()
        }, 2000)
        this.intervalId = intervalId
        this.$store.dispatch('user/setInterval', { id: intervalId })
      }
    },
    normalStatusFormatter(row, column, cellValue, index) {
      return ['待核销', '已核销', '超时过期'][cellValue]
    },
    mealTypeFormatter(row, column, cellValue, index) {
      return ['堂食', '送餐'][cellValue - 1]
    },
    meetingStatusFormatter(row, column, cellValue, index) {
      return ['审核中', '审核失败', '审核通过'][cellValue]
    },
    siteFormatter(row, column, cellValue, index) {
      return cellValue ? cellValue : ' —— '
    },
    finishTimeFormatter(row, column, cellValue, index) {
      return cellValue ? cellValue : ' —— '
    },

    download(val) {
      if (val == 1) {
        console.log(
          `${this.baseUrl}${this.operation}/normalList/download?username=${this.queryParams.username}`
        )
        window.open(
          `${this.baseUrl}${this.operation}/normalList/download?username=${this.queryParams.username}`,
          '_self'
        )
      } else if (val == 2) {
        console.log(
          `${this.baseUrl}${this.operation}/workList/download?username=${this.queryParams.username}`
        )

        window.open(
          `${this.baseUrl}${this.operation}/workList/download?username=${this.queryParams.username}`,
          '_self'
        )
      } else if (val == 3) {
        window.open(
          `${this.baseUrl}${this.operation}/meetingList/download?username=${this.queryParams.username}`,
          '_self'
        )
      }
    },
    // 获取模板表格
    getList() {
      apiGet(this, this.operation + '/normalList', this.queryParams).then(
        (res) => {
          this.tables = res.data
          this.total = res.total
        }
      )
    },
    getWorkingList() {
      apiGet(
        this,
        this.operation + '/workingList',
        this.workingQueryParams
      ).then((res) => {
        this.workingTables = res.data
        this.workingTotal = res.total
      })
    },
    getMeetingList() {
      apiGet(
        this,
        this.operation + '/meetingList',
        this.meetingQueryParams
      ).then((res) => {
        this.meetingTables = res.data
        this.meetingTotal = res.total
      })
    },

    confirmDetail(row) {
      if (row.confirmNum < 1) {
        this.$message({
          message: '暂无人领取',
          type: 'warning',
        })
        return
      }
      this.formVisit = true
      this.subOrderTables = row.subOrderList
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

    // page变化getList()触动函数
    handelworkingSizeChange(val) {
      this.workingQueryParams.pageSize = val
      this.getWorkingList()
    },
    // pageSize变化getList()触动函数
    handelWorkingCurrentChange(val) {
      this.workingQueryParams.page = val
      this.getWorkingList()
    },

    // page变化getList()触动函数
    handelMeetingSizeChange(val) {
      this.meetingQueryParams.pageSize = val
      this.getMeetingList()
    },
    // pageSize变化getList()触动函数
    handelMeetingCurrentChange(val) {
      this.meetingQueryParams.page = val
      this.getMeetingList()
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

    // 搜索栏重置
    resetData(formName) {
      this.$refs[formName].resetFields()
      this.getList()
    },

    closeDialog(formName) {
      this.formVisit = false
      this.subOrderTables = []
    },
  },
}
</script>

<style scoped>
</style>