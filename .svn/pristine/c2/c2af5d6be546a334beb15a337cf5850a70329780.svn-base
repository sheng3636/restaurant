<template>
  <div class="appContainer">
    <div class="mainWrapper">
      <div class="mainHeader mainHeader1">
        <span class="title">列表</span>
        <div class="searchBar">
          <el-button type="primary" @click="addUserFn()"><i class="el-icon-plus"></i>新增</el-button>
        </div>
      </div>
      <div class="mainContent">
        <!-- 列表数据 -->
        <el-table ref="multipleTable" :data="tables" @cell-mouse-enter="cellEnter" border fit highlight-current-row>
          <!-- 索引列 -->
          <el-table-column type="index" label="序号" width="70px" align="center"></el-table-column>
          <el-table-column prop="configName" label="名称" width="150px" align="center" />
          <el-table-column prop="type" label="套餐分类" width="150px" align="center" :formatter="typeFormatter" />
          <el-table-column prop="reserveDate" label="可订餐日期" width="350px" :formatter="weekFormatter" align="center">
          </el-table-column>
          <el-table-column prop="reserveStartTime,reserveEndTime" label="可订餐时间" width="250px" align="center">
            <template slot-scope="scope">
              {{ scope.row.reserveStartTime }} - {{ scope.row.reserveEndTime }}
            </template>
          </el-table-column>
          <el-table-column prop="availableStartTime,availableEndTime" label="可用餐时间" width="250px" align="center">
            <template slot-scope="scope">
              {{ scope.row.availableStartTime }} -
              {{ scope.row.availableEndTime }}
            </template>
          </el-table-column>
          <el-table-column prop="mealIds" label="可定套餐（套）" width="120px" align="center">
            <template slot-scope="scope">
              {{ scope.row.availableNum }}
            </template>
          </el-table-column>
          <el-table-column prop="statue" label="状态" width="100px" align="center">
            <template slot-scope="scope">
              <i-switch v-model="scope.row.status" :false-value="falseValue" :true-value="trueValue"
                true-color="#13ce66" false-color="rgb(195, 195, 195)" :before-change="handleBeforeChange" />
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建日期" width="250px" align="center" />
          <el-table-column fixed="right" label="操作" width="200px" align="center">
            <template slot-scope="scope">
              <div class="optWrap">
                <!-- <p class="optBtn" @click="see(scope.row)">查看</p> -->
                <p class="optBtn optBtn2" @click="edit(scope.row)">编辑</p>
                <p class="optBtn optBtn3" @click="del(scope.row)">删除</p>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <div class="paginationWrap">
          <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handelSizeChange"
            @current-change="handelCurrentChange" />
        </div>
      </div>
    </div>
    <!-- 新增对话框 -->
    <el-dialog top="10vh" custom-class="custom-dialog" :title="title" :visible="formVisit" :close-on-click-modal="false"
      :close-on-press-escape="false" @close="closeDialogOne('newPackageFormRef')" width="50%">
      <el-form ref="newPackageFormRef" class="dialogBody" v-show="!mealStatus" :rules="newPackageFormRules"
        :model="newPackageForm" label-width="120px" label-position="right">
        <!-- 第一行 -->
        <el-row>
          <el-col :span="10">
            <el-form-item label="名称" prop="configName">
              <el-input v-model="newPackageForm.configName" placeholder="请输入名称..." />
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="套餐分类" prop="type">
              <el-select v-model="newPackageForm.type" placeholder="请选择" style="width: 100%">
                <el-option v-for="item in packageClassifyList" :key="item.value" :label="item.name"
                  :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row>
          <el-col :span="10">
            <el-form-item label="每日可预定次数" prop="reserveNumber">
              <el-select v-model="newPackageForm.reserveNumber" placeholder="请选择" style="width: 100%">
                <el-option v-for="item in reserveNumberList" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="预定状态" prop="reserveType">
              <el-select v-model="newPackageForm.reserveType" placeholder="请选择" style="width: 100%">
                <el-option v-for="item in reserveTypeList" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row>
          <el-col :span="10">
            <el-form-item label="可订餐日期" prop="reserveDate">
              <el-select v-model="newPackageForm.reserveDate" multiple collapse-tags placeholder="请选择"
                style="width: 100%">
                <el-option v-for="item in reserveDateList" :key="item.value" :label="item.day" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-row>
              <el-col :span="14">
                <el-form-item label="可订餐时间" prop="reserveStartTime">
                  <el-time-picker v-model="newPackageForm.reserveStartTime" :picker-options="{
                      selectableRange: `00:00:00-${
                        newPackageForm.reserveEndTime
                          ? newPackageForm.reserveEndTime + ':00'
                          : '23:59:59'
                      }`,
                    }" format="HH:mm" placeholder="请选择时间" style="width: 100%" value-format="HH:mm">
                  </el-time-picker>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <span style="line-height: 2.7;text-align:center;"> — </span>
              </el-col>
              <el-col :span="9">
                <el-form-item label="" prop="reserveEndTime" label-width="0">
                  <el-time-picker v-model="newPackageForm.reserveEndTime" :picker-options="{
                      selectableRange: `${
                        newPackageForm.reserveStartTime
                          ? newPackageForm.reserveStartTime + ':00'
                          : '00:00:00'
                      } - '23:59:59'`,
                    }" format="HH:mm" placeholder="请选择时间" style="width: 100%" value-format="HH:mm">
                  </el-time-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 第四行 -->
        <el-row>
          <el-col :span="10">
            <el-form-item label="可用餐日期" prop="availableDate">
              <el-select v-model="newPackageForm.availableDate" multiple collapse-tags placeholder="请选择"
                style="width: 100%">
                <el-option v-for="item in availableDateList" :key="item.value" :label="item.day" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-row>
              <el-col :span="14">
                <el-form-item label="可用餐时间" prop="availableStartTime">
                  <el-time-picker v-model="newPackageForm.availableStartTime" format="HH:mm" :picker-options="{
                      selectableRange: `${
                        newPackageForm.reserveStartTime
                          ? newPackageForm.reserveStartTime + ':00'
                          : '00:00:00'
                      }-${
                        newPackageForm.availableEndTime
                          ? newPackageForm.availableEndTime + ':00'
                          : newPackageForm.reserveEndTime
                          ? newPackageForm.reserveEndTime + ':00'
                          : '23:59:59'
                      }`,
                    }" placeholder="请选择时间" style="width: 100%" value-format="HH:mm">
                  </el-time-picker>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <span style="line-height: 2.7;text-align:center;"> — </span>
              </el-col>
              <el-col :span="9">
                <el-form-item label="" label-width="0" prop="availableEndTime">
                  <el-time-picker v-model="newPackageForm.availableEndTime" :picker-options="{
                      selectableRange: `${
                        newPackageForm.availableStartTime
                          ? newPackageForm.availableStartTime + ':00'
                          : newPackageForm.reserveStartTime
                          ? newPackageForm.reserveStartTime + ':00'
                          : '00:00:00'
                      }-${
                        newPackageForm.reserveEndTime
                          ? newPackageForm.reserveEndTime + ':00'
                          : '23:59:59'
                      }`,
                    }" format="HH:mm" placeholder="请选择时间" style="width: 100%" value-format="HH:mm">
                  </el-time-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 第五行 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="二维码失效时间" prop="expireTime">
              <el-input-number v-model="newPackageForm.expireTime" :min="1" size="small" :controls="false"
                style="width: 70px; margin-right: 5px">
              </el-input-number>
              <!-- <el-input
                type="text"
                v-model="newPackageForm.expireTime"
                
              ></el-input> -->
              分
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 套餐列表数据 -->
      <div v-show="mealStatus">
        <span v-show="mealStatus">选择包含的套餐</span>
        <el-table ref="mealTable" :data="mealList" row-key="id" style="width: 100%"
          @selection-change="handleSelectionChange" border fit highlight-current-row>
          <el-table-column type="selection" :reserve-selection="true" width="55">
          </el-table-column>
          <el-table-column type="index" label="序号" width="70px" align="center"></el-table-column>
          <el-table-column prop="name" label="套餐名称" align="center">
          </el-table-column>
          <el-table-column prop="picAddress" label="套餐图片" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.picAddress" style="width: 60px; height: 60px" />
            </template>
          </el-table-column>
          <el-table-column prop="detail" label="套餐详情" align="center">
          </el-table-column>
          <el-table-column prop="price" label="价格(元)" align="center">
          </el-table-column>
        </el-table>
        <el-pagination :current-page.sync="mealCurrentPage" :page-sizes="[5, 10, 15, 20]" :page-size="mealPageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="mealTotal" @size-change="handelMealSizeChange"
          @current-change="handelMealCurrentChange" />
      </div>
      <!-- 下一步和取消按钮 -->
      <span slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="nextAdd" v-if="!mealStatus">下一步</el-button>
        <el-button type="info" @click="lastStep" v-if="mealStatus">上一步</el-button>
        <el-button type="primary" @click="onSubmit()" v-if="mealStatus">保 存</el-button>
        <el-button type="info" @click="closeDialogOne('newPackageFormRef')">取 消</el-button>
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
      state: 'add',
      //标记当前选中行，用于修改状态时使用
      selectObj: {},
      //switch 开、关状态绑定值
      trueValue: 1,
      falseValue: 0,

      //套餐分类列表查询参数
      total: 0, // 模板表格总数
      currentPage: 1, // 模板表格当前页码
      pageSize: 10, // 模板表格整页大小
      queryParams: {
        // 获取模板参数
        page: 1,
        pageSize: 10,
        userName: null,
      },

      //套餐表格查询参数
      mealTotal: 0, // 模板表格总数
      mealCurrentPage: 1, // 模板表格当前页码
      mealPageSize: 5, // 模板表格整页大小
      mealQueryParams: {
        page: 1,
        pageSize: 5,
      },

      tables: [], // 模板表格数据
      formVisit: false, // 是否新增编辑弹窗

      title: '新增套餐分类', // 新增编辑详情弹窗标题

      operation: '/business/mealType',

      // 新增套餐表单对象
      newPackageForm: {
        configName: '', // 用户名
        type: 1, // 套餐分类
        reserveNumber: 1, // 每日可预定次数
        reserveType: 1, // 预定状态
        reserveDate: [], // 可订餐日期（多选）
        reserveStartTime: '', // 订餐开始时间
        reserveEndTime: '', // 订餐结束时间
        availableDate: [], // 可用餐日期
        availableStartTime: '', // 可用餐开始时间
        availableEndTime: '', // 可用餐结束时间
        expireTime: 0, // 二维码失效时间
        mealIds: [], // 选择的套餐
      },
      // 新增套餐的规则
      newPackageFormRules: {
        configName: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' },
        ],
      },
      // 套餐分类List
      packageClassifyList: [
        { value: 1, name: '工作日午餐' },
        { value: 2, name: '值班用餐' },
        { value: 3, name: '业务招待' },
      ],
      // 每日可预定次数List
      reserveNumberList: [
        { value: 1, name: '一次' },
        { value: 2, name: '三次' },
        { value: 3, name: '无限制' },
      ],
      // 每日可预定状态List
      reserveTypeList: [
        { value: 1, name: '核销后' },
        { value: 2, name: '核销前' },
      ],

      // 可订餐日期List
      reserveDateList: [
        { value: 1, day: '周一' },
        { value: 2, day: '周二' },
        { value: 3, day: '周三' },
        { value: 4, day: '周四' },
        { value: 5, day: '周五' },
        { value: 6, day: '周六' },
        { value: 7, day: '周日' },
      ],
      // 可用餐日期List
      availableDateList: [
        { value: 1, day: '周一' },
        { value: 2, day: '周二' },
        { value: 3, day: '周三' },
        { value: 4, day: '周四' },
        { value: 5, day: '周五' },
        { value: 6, day: '周六' },
        { value: 7, day: '周日' },
      ],
      // 详情对话框的显示
      // detailDialogVisiable: false,
      // 套餐列表数据
      mealList: [],

      // 编辑框中默认选中的数据
      hasSelectList: [],
      // 转换日期
      arrDate: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],

      roleName: '',

      //套餐表格跨页多选参数
      selectionSet: [],
      mealIds: new Set(),
      viewdPages: new Set(),

      //判断点击的是上一步 还是取消按钮
      mealStatus: false,
    }
  },
  computed: {
    ...mapGetters(['canteenId']),
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    canteenId: function (newValue, oldValue) {
      if (newValue) {
        this.getList()
      }
    },
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 将数组转换日期
    weekFormatter(row, column, cellValue, index) {
      return cellValue.map((item) => this.arrDate[item - 1]).join('，')
    },
    typeFormatter(row, column, cellValue, index) {
      return ['工作日午餐', '值班用餐', '业务招待'][cellValue - 1]
    },
    // 新增选择套餐
    // handleSelectionChange(val) {
    //   this.newPackageForm.mealIds.push(val[0].id);
    // },

    handleSelectionChange(val) {
      let curIdList = val.map((item) => item.id)

      if (this.state == 'edit') {
        if (curIdList.length > this.selectionSet.length) {
          let preIdSet = new Set(this.selectionSet)
          curIdList.forEach((id) => {
            if (!preIdSet.has(id)) {
              this.mealIds.add(id)
            }
          })
        } else {
          let curIdSet = new Set(curIdList)
          this.selectionSet.forEach((id) => {
            if (!curIdSet.has(id)) {
              this.mealIds.delete(id)
            }
          })
        }
      }

      this.selectionSet = curIdList
    },

    //鼠标进入表格事件
    cellEnter(row, column, cell, event) {
      this.selectObj = row
    },
    // 预定状态改变
    handleBeforeChange() {
      return new Promise((resolve) => {
        if (this.selectObj.status === 1) {
          this.$message({
            message: '各订餐分类必须存在一条启用的规则',
            type: 'warning',
          })
        } else {
          this.$confirm('此操作将会关闭其他同类套餐规则', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
          }).then(() => {
            apiGet(
              this,
              `/business/mealType/enableConfig?id=${this.selectObj.id}&canteenId=${this.canteenId}`
            ).then((res) => {
              this.getList()
            })
          })
        }
      })
    },

    // 列表按钮查看详细信息
    // see(info) {
    //   this.detailDialogVisiable = true
    // },

    // 列表按钮编辑套餐信息
    edit(row) {
      this.title = '编辑套餐分类'
      this.state = 'edit'

      // 给与对象赋值
      this.formVisit = true
      this.mealIds = new Set(row.mealIds)
      this.$nextTick(function () {
        this.newPackageForm = Object.assign({}, row)
      })
    },
    // 列表按钮删除信息availableDate
    del(row) {
      if (row.status === 1) {
        this.$message({
          message: '不允许删除正在启用的规则',
          type: 'warning',
        })
        return
      }
      apiDelete(this, '/business/mealType', { id: row.id }).then((res) => {
        this.getList()
      })
    },
    // 新增套餐的下一步
    nextAdd() {
      this.$refs['newPackageFormRef'].validate((valid) => {
        if (!valid) {
          return false
        }

        this.mealStatus = true
        // 调用列表套餐接口显示数据
        this.getMealList()
        // 开启下一步的对话框
      })
    },
    // 新增对话框上一步
    lastStep() {
      this.mealStatus = false
    },

    // 获取模板表格
    getList() {
      this.queryParams.canteenId = this.canteenId
      apiGet(this, this.operation, this.queryParams).then((res) => {
        this.tables = res.data
        this.total = res.total
      })
    },
    getMealList() {
      this.mealQueryParams.canteenId = this.canteenId
      apiGet(this, '/business/meal/availableList', this.mealQueryParams).then(
        (res) => {
          this.mealList = res.data
          this.mealTotal = res.total

          if (
            this.state == 'edit' &&
            !this.viewdPages.has(this.mealQueryParams.page)
          ) {
            this.mealList.forEach((item) => {
              if (this.mealIds.has(item['id'])) {
                this.$refs.mealTable.toggleRowSelection(item, true)
              }
            })
          }

          this.viewdPages.add(this.mealQueryParams.page)
        }
      )
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
    // 套餐列表 size 变化
    handelMealCurrentChange(val) {
      this.mealQueryParams.page = val
      this.getMealList()
    },
    // 套餐列表 curr 变化
    handelMealSizeChange(val) {
      this.mealQueryParams.pageSize = val
      this.getMealList()
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
    onSubmit() {
      if (this.title === '新增套餐分类') {
        if (this.selectionSet.length < 1) {
          this.$message.error('请选择套餐')
          return false
        }

        this.newPackageForm.mealIds = this.selectionSet
        this.newPackageForm.canteenId = this.canteenId
        apiPost(this, this.operation + '/add', this.newPackageForm).then(
          (res) => {
            this.getList()
            this.closeDialogOne('newPackageFormRef')
          }
        )
      } else if (this.title === '编辑套餐分类') {
        if (this.mealIds.size < 1) {
          this.$message.error('请选择套餐')
          return false
        }

        this.newPackageForm.mealIds = [...this.mealIds]
        apiPut(this, this.operation, this.newPackageForm).then((res) => {
          this.getList()
          this.closeDialogOne('newPackageFormRef')
        })
      }
    },
    // 搜索栏重置
    resetData(formName) {
      this.$refs[formName].resetFields()
      this.getList()
    },
    // 打开新增弹窗
    addUserFn() {
      this.title = '新增套餐分类'
      this.state = 'add'
      this.formVisit = true
    },

    // 关闭新增、编辑、变更记录弹窗
    closeDialogOne(formName) {
      this.$refs[formName].resetFields()
      this.formVisit = false
      this.mealStatus = false

      //清除套餐表格多选状态
      this.$refs['mealTable'].clearSelection()

      this.mealQueryParams = {
        page: 1,
        pageSize: 5,
      }
      this.mealList = []
      this.mealCurrentPage = 1
      this.mealPageSize = 5
      this.viewdPages.clear()
    },
  },
}
</script>

<style >
.custom-dialog .el-dialog__header {
  padding: 15px 20px 15px;
  font-size: 20px;
  font-family: Source Han Sans SC;
  font-weight: 400px;
  color: #011427;
}
.custom-dialog .el-dialog__footer {
  text-align: center !important;
}
</style>