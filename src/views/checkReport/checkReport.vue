<template>
  <div class="content">
    <search-form
      :searchFormItem="searchFormItem"
      :searchData="searchData"
      :rules="rules"
      :optionData="optionData"
      @formData="formData"
      @exportExcel="exportExcel"
    ></search-form>
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
        border
      >
        <el-table-column prop="date" label="日期" sortable width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" sortable width="180"> </el-table-column>
        <el-table-column prop="address" label="地址" :formatter="formatter"> </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="mini" type="primary" @click="handleExcel(scope.$index, scope.row)"
              >查看原始报表</el-button
            >
            <el-button size="mini" type="primary" @click="handleReport(scope.$index, scope.row)"
              >查看报告</el-button
            >

            <el-button size="mini" type="primary" @click="exportReport(scope.$index, scope.row)"
              >导出报告</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        v-model:page-size="listQuery.limit"
        @current-change="currentPage"
        v-if="total > 0"
      >
      </el-pagination>
    </div>
    <el-dialog title="" v-model="dialogTableVisible" width="80%">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="资产负债表" name="first">资产负债表</el-tab-pane>
        <el-tab-pane label="利润表" name="second">利润表</el-tab-pane>
        <el-tab-pane label="利润表年报" name="third">利润表年报</el-tab-pane>
        <el-tab-pane label="现金流量表" name="fourth">现金流量表</el-tab-pane>
        <el-tab-pane label="现金流量表年报" name="five">现金流量表年报</el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog title="" v-model="dialoghandleReport" width="80%">
      <div>查看报告</div>
    </el-dialog>
  </div>
</template>
<script>
import { defineComponent, ref, unref, reactive, toRefs, onMounted } from 'vue'
import axios from 'axios'
import SearchForm from '@/components/SearchForm.vue'
import { _httpGet ,download} from '@/utils/api'
export default defineComponent({
  components: { SearchForm },
  setup() {
    onMounted(() => {
      _httpGet({ url: '/newreport' }).then((res) => {
        state.optionData.swjgOption = res.data
      })
      _httpGet({ url: '/rwmc' }).then((res) => {
        state.optionData.rwmcArray = res.data
      })
      currentPage(state.listQuery.page)
    })
    const jcztOpitons = [
      {
        value: '选项1',
        label: '黄金糕'
      },
      {
        value: '选项2',
        label: '双皮奶'
      },
      {
        value: '选项3',
        label: '蚵仔煎'
      }
    ]

    const state = reactive({
      activeName: 'first',
      dialogTableVisible: false,
      dialoghandleReport: false,
      tableData: [],
      total: 0, // 总条数
      listQuery: {
        // 分页查询参数
        page: 1, // 当前页码
        limit: 3 // 每页条数
      },
      optionData: {
        swjgOption: [],
        rwmcArray: []
      },
      searchFormItem: [
        {
          type: 'Cascader',
          label: '税务机关',
          prop: 'swjg',
          placeholder: '请选择'
        },
        {
          type: 'Input',
          label: '纳税人名称',
          prop: 'nsrmc',
          placeholder: '请输入纳税人名称'
        },

        {
          type: 'Input',
          label: '纳税识别号',
          prop: 'nsrsbh',
          placeholder: '请输入统一社会信用代码'
        },
        {
          type: 'Autocomplete',
          label: '任务名称',
          prop: 'rwmc',
          placeholder: '请输入任务名称'
        },
        {
          type: 'Select',
          label: '检查状态',
          prop: 'jczt',
          options: jcztOpitons,
          change: (row) => '',
          placeholder: '请输入检查状态'
        },
        { labelname: '查询', label: '', prop: '', type: 'primary', handle: () => '' },
        {
          labelname: '重置',
          label: '',
          type: 'primary'
        },
        {
          labelname: '确定',
          label: '',
          type: 'primary'
        },
        {
          labelname: '问题明细汇总',
          label: '',
          type: 'primary',
          typeButton: 'down'
        }
      ],
      searchData: {
        nsrmc: '',
        swjg: ['zhinan'],
        nsrsbh: '',
        rwmc: '',
        jczt: ''
      },
      rules: {
        swjg: {
          required: true,
          message: '请先选择省份信息！',
          trigger: 'blur',
          type: 'array'
        }
      }
    })
    const formData = (value) => {
      //   _httpGet({ url: '/rwmc' }).then((res) => {
      //     currentPage(state.listQuery.page)
      //   })
    }
    const exportExcel = (value) => {
      console.log('汇总')
    }
    const currentPage = (param) => {
      _httpGet({ url: '/tableArray', params: { page: param, limit: state.listQuery.limit } }).then(
        (res) => {
          state.tableData = res.data
          state.total = res.limit
        }
      )
    }
    const formatter = (row, column) => {
      return row.address
    }

    //点击查看原始报表
    const handleExcel = (index, row) => {
      state.dialogTableVisible = true
      
    }

    const handleReport = (index, row) => {
      state.dialoghandleReport = true
      console.log(index, row.name)
    }
    const exportReport = (tab, event) => {
      download('/newreport')
    }
    return {
      ...toRefs(state),
      jcztOpitons,
      formData,
      exportExcel,
      currentPage,
      formatter,
      handleExcel,
      handleReport,
      exportReport
    }
  }
})
</script>
<style scoped>
</style>