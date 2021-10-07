<template>
  
<add-report  v-if="show" :edit="edit" @changeShow="changehandle"></add-report>

  <div class="content" v-if="!show">
    <el-form
      :inline="true"
      :model="ruleForm"
      ref="formRef"
      :rules="rules"
      label-width="80px"
      class="demo-form-inline"
    >
      <!-- <el-form-item label="省市区/县:" prop="swjg">
          <el-cascader :options="options" v-model="ruleForm.swjg"></el-cascader>
        </el-form-item> -->
      <el-form-item label="税务机关" prop="swjg">
        <el-cascader
          v-model="ruleForm.swjg"
          :options="options"
          :props="{
            checkStrictly: true,
            label: 'label',
            value: 'value',
            children: 'children'
          }"
          clearable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="企业名称" prop="nsrmc">
        <el-input v-model="ruleForm.nsrmc" placeholder="企业名称"></el-input>
      </el-form-item>
      <el-form-item label="信用代码" prop="nsrsbh">
        <el-input v-model="ruleForm.nsrsbh" placeholder="信用代码"></el-input>
      </el-form-item>
      <el-form-item label="任务名称" prop="rwmc">
        <el-autocomplete
          class="inline-input"
          v-model="ruleForm.rwmc"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
        ></el-autocomplete>
        <!-- @select="handleSelect" -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="handleShow">新建任务</el-button>

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
            <template v-if="scope.row.content == 'edit'">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
            <template v-else-if="scope.row.content == 'rwmx'">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
                >任务名称</el-button
              >
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        v-model:page-size="listQuery.limit"
        @current-change="currentPage"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, toRefs, reactive, unref, onMounted, onActivated } from 'vue'
import { _httpGet } from '@/utils/api'
import addReport from './addReport.vue'
export default defineComponent({
  components: { addReport },
  name: 'newReport',
  setup() {
    const formRef = ref(null)
    const ruleForm = reactive({
      ruleForm: {
        nsrmc: '',
        swjg: ['zhinan'],
        rwmc: ''
      },
      options: [],
      rwmcArray: []
    })
    const table = reactive({
      tableData: [],
      total: 0, // 总条数
      listQuery: {
        // 分页查询参数
        page: 1, // 当前页码
        limit: 3 // 每页条数
      }
    })
    const rules = {
      nsrmc: {
        message: '企业名称不能为空',
        trigger: 'blur'
      },
      swjg: {
        required: true,
        message: '请先选择省份信息！',
        trigger: 'blur',
        type: 'array'
      },
      nsrsbh: {
        message: '信用代码不能为空',
        trigger: 'blur'
      },
      rwmc: {
        message: '任务名称不能为空',
        trigger: 'blur'
      }
    }

    const querySearch = (queryString, cb) => {
      var results = queryString
        ? ruleForm.rwmcArray.filter(createFilter(queryString))
        : ruleForm.rwmcArray
      // 调用 callback 返回建议列表的数据
      cb(results)
    }
    const createFilter = (queryString) => {
      return (data) => {
        return data.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    }
    const formatter = (row, column) => {
      return row.address
    }
    const handleEdit = (index, row) => {
        state.show=true
        state.edit =row.name
      console.log(index, row)
    }
    const handleDelete = (index, row) => {
      console.log(index, row)
    }
    const currentPage = (param) => {
      _httpGet({ url: '/tableArray', params: { page: param, limit: table.listQuery.limit } }).then(
        (res) => {
          table.tableData = res.data
          table.total = res.limit
        }
      )
    }
    onMounted(() => {
      _httpGet({ url: '/newreport' }).then((res) => {
        ruleForm.options = res.data
      })
      _httpGet({ url: '/rwmc' }).then((res) => {
        ruleForm.rwmcArray = res.data
      })
      currentPage(table.listQuery.page)
    })

    const submitForm = async () => {
      const form = unref(formRef)
      if (!form) return
      try {
        await form.validate((valid) => {
          if (valid) {
            const t = { ...ruleForm.ruleForm }
            debugger
            if (t.swjg == '') {
              alert('kong')
            }
          }
        })
      } catch (error) {}
    }
    const resetForm = (formName) => {
      const form = unref(formRef)
      form.resetFields()
    }

    const state = reactive({ show: false,edit:'' })
    const handleShow=()=>{
        state.show=!state.show
    }
    const changehandle=(value)=>{
        state.show=!value
    }
    return {
      formRef,
      ...toRefs(ruleForm),
      ...toRefs(table),
      rules,
      submitForm,
      resetForm,
      querySearch,
      formatter,
      handleEdit,
      handleDelete,
      currentPage,
      ...toRefs(state),
      handleShow,
      changehandle
    }
  }
})
</script>
<style scoped>
.el-form {
  border-bottom: solid 1px #ddd;
  margin-bottom: 20px;
}
a {
  text-decoration: none;
  color: #fff;
}
a:hover {
  text-decoration: none;
}
</style>