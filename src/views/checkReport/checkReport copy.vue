<template>
  <div class="content">
    <el-form
      :inline="true"
      :model="ruleForm"
      ref="formRef"
      :rules="rules"
      label-width="80px"
      class="demo-form-inline"
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
      <el-form-item label="任务名称" prop="rwmc">
        <el-autocomplete
          class="inline-input"
          v-model="ruleForm.rwmc"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { defineComponent, ref, unref,reactive, toRefs, onMounted } from 'vue'
import { _httpGet } from '@/utils/api'
export default defineComponent({
  setup() {
    onMounted(() => {
      _httpGet({ url: '/newreport' }).then((res) => {
        ruleForm.options = res.data
      })
      _httpGet({ url: '/rwmc' }).then((res) => {
        ruleForm.rwmcArray = res.data
      })
    })
    const formRef = ref(null)
    const ruleForm = reactive({
      ruleForm: {
        nsrmc: '',
        swjg: 'zhinan',
        rwmc: ''
      },
      options: [],
      rwmcArray:[]
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
    const submitForm = async () => {
      const form = unref(formRef)
      if (!form) return
      try {
        await form.validate((valid) => {
          if (valid) {
            const t = { ...ruleForm.ruleForm }
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
    return {
      formRef,
      ...toRefs(ruleForm),
      rules,
      submitForm,
      resetForm,
      querySearch
    }
  }
})
</script>
<style scoped>

</style>