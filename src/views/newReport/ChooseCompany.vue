<template>
  <div class="">
    <el-form
      :model="ruleForm"
      ref="chooseForm"
      :rules="rules"
      :inline="true"
      label-width="80px"
      class="demo-ruleForm"
    >
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
      <el-form-item label="登记类别" prop="djlb">
        <el-select v-model="ruleForm.djlb" multiple placeholder="请选择">
          <el-option
            v-for="item in lboptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search('ruleForm')">查询</el-button>
        <el-button @click="submit">立即提交</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="日期" width="120">
        <template #default="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip> </el-table-column>
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
</template>
<script>
import { defineComponent, onMounted, reactive, ref, unref, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { chooseCompanyData, chooseCurrentPage } from '@/utils/http_api'
export default defineComponent({
  name: 'chooseCompany',
  emits: ['tableArray'],
  setup(props, context) {
    onMounted(() => {
      chooseCompanyData().then((res) => {
        ruleForm.options = res.data
      })
      // _httpGet({ url: '/newreport' }).then((res) => {

      // })
      //currentPage(tableState.listQuery.page)
    })
    const ruleForm = reactive({
      ruleForm: {
        nsrmc: '',
        swjg: ['zhinan'],
        nsrsbh: '',
        djlb: ['千户集团', '列名企业']
      },
      options: [],
      lboptions: [
        {
          value: '千户集团',
          label: '千户集团'
        },
        {
          value: '列名企业',
          label: '列名企业'
        },
        {
          value: '规上企业',
          label: '规上企业'
        }
      ]
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
      djlb: {
        message: '登记类别',
        trigger: 'blur',
        type: 'array'
      }
    }

    const chooseForm = ref(null)
    const search = async () => {
      const form1 = unref(chooseForm)
      if (!form1) return
      try {
        await form1.validate((valid) => {
          if (valid) {
            const forValue = { ...ruleForm.ruleForm }
            currentPage(tableState.listQuery.page)
            // debugger
          }
        })
      } catch (error) {}
    }
    const tableState = reactive({
      tableData: [],
      total: 0, // 总条数
      listQuery: {
        // 分页查询参数
        page: 1, // 当前页码
        limit: 3 // 每页条数
      },
      submit: {
        submitDataArray: [],
        dialog: false
      }
    })
    const currentPage = (param) => {
      chooseCurrentPage({ page: param, limit: tableState.listQuery.limit }).then((res) => {
        tableState.tableData = res.data
        tableState.total = res.limit
      })
    }
    const handleSelectionChange = (val) => {
      tableState.submit.submitDataArray = val
    }
    const submit = () => {
      if (!tableState.submit.submitDataArray.length) {
        ElMessage.warning({
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        })
      } else {
        context.emit('tableArray', tableState.submit)
        console.log(tableState.submit.submitDataArray)
      }
    }

    return {
      ...toRefs(ruleForm),
      ...toRefs(tableState),
      rules,
      search,
      chooseForm,
      currentPage,
      handleSelectionChange,
      submit
    }
  }
})
</script>
<style scoped>
</style>