
<template>
  <div class="appContainer">
    <div class="mainWrapper">
      <div class="mainHeader">
        <span class="title">日志查询</span>
        <el-form class="searchBar" ref="queryParams" :model="queryParams" label-width="80px" label-position="top">
          <el-form-item label="" prop="operUser">
            <el-input v-model="queryParams.operUser" placeholder="请输入操作人姓名" />
          </el-form-item>
          <el-form-item label="" prop="operIp">
            <el-input v-model="queryParams.operIp" placeholder="请输入操作IP" />
          </el-form-item>
          <el-form-item label="" prop="operTimeStart">
            <el-date-picker style="width:100%" v-model="queryParams.operTimeStart" type="datetime"
              placeholder="选择开始日期时间" value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="" prop="operTimeEnd">
            <el-date-picker style="width:100%" v-model="queryParams.operTimeEnd" type="datetime" placeholder="选择结束日期时间"
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="" prop="name">
            <el-input v-model="queryParams.name" placeholder="请输入食堂名称" />
          </el-form-item>
          <div class="btnGroup">
            <el-button type="primary" size="mini" @click="queryList('queryParams')">查询</el-button>
            <el-button type="primary" plain size="mini" @click="resetList('queryParams')">重置</el-button>
          </div>
        </el-form>
      </div>
    </div>

    <div class="mainWrapper">
      <div class="mainHeader mainHeader1">
        <span class="title">日志列表</span>
      </div>
      <!--列表-->
      <div class="mainContent">
        <el-table :data="logsList" highlight-current-row border>
          <el-table-column type="index" label="序号" width="55" align="center" />
          <el-table-column prop="operUser" label="操作人" width="180" align="center" />
          <el-table-column prop="operIp" label="操作IP" width="260" align="center" sortable />
          <el-table-column prop="operMod" label="操作模块" width="220" :show-overflow-tooltip="true" align="center" />
          <el-table-column prop="operTime" label="操作时间" width="260" align="center" sortable>
            <template slot-scope="scope">
              {{dateFormat(scope.row.operTime)}}
            </template>
          </el-table-column>
          <el-table-column prop="operType" label="操作类型" width="160" align="center" sortable />
          <el-table-column prop="operContent" label="操作内容" align="center" :show-overflow-tooltip="true" sortable />

        </el-table>
      </div>
      <!--分页-->
      <div class="paginationWrap">
        <el-pagination :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </div>
  </div>
</template>

<script>
import { apiGet } from '@/utils/request.js'
import { mixin } from '@/utils/mixin.js'
export default {
  mixins: [mixin],
  data() {
    return {
      total: 0, // 日志表格总数
      currentPage: 1, // 日志分页当前页码
      pageSize: 10, // 日志分页大小
      queryParams: {
        // 日志查询参数
        pageSize: 10,
        page: 1,
        operUser: '',
        operIp: '',
        operTimeStart: null,
        operTimeEnd: null,
      },
      logsList: [], // 日志表格数据
    }
  },
  mounted() {
    this.getLoggingFn()
  },
  methods: {
    // 获取日志数据
    getLoggingFn() {
      apiGet(this, '/system/logging', this.queryParams).then((res) => {
        this.logsList = res.data
        this.total = res.total
      })
    },
    // 搜索栏查询
    queryList(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getLoggingFn()
        } else {
          return false
        }
      })
    },
    // 搜索栏重置
    resetList(formName) {
      this.$refs[formName].resetFields()
      this.getLoggingFn()
    },
    // pageSize变化getLoggingFng()触动函数
    handleSizeChange(val) {
      this.queryParams.pageSize = val
      this.getLoggingFn()
    },
    // page变化getLoggingFn()触动函数
    handleCurrentChange(val) {
      this.queryParams.page = val
      this.getLoggingFn()
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
