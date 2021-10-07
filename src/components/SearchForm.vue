<template>
  <div class="contantForm">
      111
    <el-form
      :inline="true"
      :model="searchData"
      ref="formRef"
      :rules="rules"
      label-width="100px"
      class="demo-form-inline"
    >
      <el-form-item
        v-for="item in searchFormItem"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
      >
        <el-cascader
          v-if="item.type == 'Cascader'"
          v-model="searchData[item.prop]"
          :options="optionData.swjgOption"
          :props="{
            checkStrictly: true,
            label: 'label',
            value: 'value',
            children: 'children'
          }"
          clearable
        ></el-cascader>
        <el-input
          v-if="item.type == 'Input'"
          v-model="searchData[item.prop]"
          :placeholder="item.placeholder"
        ></el-input>
        <el-autocomplete
          v-if="item.type == 'Autocomplete'"
          class="inline-input"
          v-model="searchData[item.prop]"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
        ></el-autocomplete>
        <el-select
          v-if="item.type === 'Select'"
          v-model="searchData[item.prop]"
          @change="item.change(searchData[item.prop])"
        >
          <el-option
            v-for="op in item.options"
            :label="op.label"
            :value="op.value"
            :key="op.value"
          ></el-option>
        </el-select>
        <div>
          <el-button
            v-if="item.labelname == '重置'"
            :type="item.type"
            @click="resetForm('formRef')"
            >{{ item.labelname }}</el-button
          >
          <el-button
            v-if="item.labelname == '确定'"
            :type="item.type"
            @click="submitForm('formRef', 'enter')"
            >{{ item.labelname }}</el-button
          >
          <el-button
            v-if="item.typeButton == 'down'"
            :type="item.type"
            @click="submitForm('formRef', 'down')"
            >{{ item.labelname }}</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { defineComponent, reactive, ref, toRefs, unref } from 'vue'
export default defineComponent({
  name: 'SearchForm',
  props: {
    searchFormItem: {
      type: Array
    },
    searchData: {
      type: Object
    },
    rules: {
      type: Object
    },
    optionData: {
      type: Object
    }
  },
  emits: ['formData','exportExcel'],
  setup(props, context) {
    const state = reactive({
      formData: null
    })
    const formRef = ref(null)
    const resetForm = (formName) => {
      const form = unref(formRef)
      form.resetFields()
    }
    const submitForm = async (type, name) => {
      const form = unref(formRef)
      if (!form) return
      try {
        await form.validate((valid) => {
          if (valid) {
            if (name == 'enter') {  //点击确定按钮
              context.emit('formData', props.searchData)
            }else{  //点击导出按钮
              context.emit('exportExcel', props.searchData)
            }
          }
        })
      } catch (error) {}
    }
    const querySearch = (queryString, cb) => {
      var results = queryString
        ? props.optionData.rwmcArray.filter(createFilter(queryString))
        : props.optionData.rwmcArray
      // 调用 callback 返回建议列表的数据
      cb(results)
    }
    const createFilter = (queryString) => {
      return (data) => {
        return data.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    }
    return {
      ...toRefs(state),
      querySearch,
      formRef,
      resetForm,
      submitForm
    }
  }
})
</script>
<style scoped>
</style>