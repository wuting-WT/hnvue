<template>
  <div class="content" v-if="showstatus">
    <el-form
      :model="ruleForm"
      ref="formRef"
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="任务名称" prop="name">
        <el-row>
          <el-col :span="6">
            <el-input v-model="ruleForm.name"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dialogFormVisible = true">企业信息</el-button>
        <el-dialog title="企业信息" width="70%" v-model="dialogFormVisible">
          <choose-company @tableArray="tableArray"></choose-company>
        </el-dialog>
        <div v-if="ReportTable.length" class="mt20">
          <el-table :data="ReportTable" max-height="200" border style="width: 100%">
            <el-table-column prop="date" label="日期" width="180"> </el-table-column>
            <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
                  >Delete</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
      <el-form-item label="所属期" prop="ssq">
        <div class="block">
          <el-date-picker
            v-model="ruleForm.ssq"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
          >
          </el-date-picker>
        </div>
      </el-form-item>

      <el-form-item label="描述" prop="ms">
        <el-row>
          <el-col :span="6">
            <el-input type="textarea" v-model="ruleForm.ms"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="changeShow">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { defineComponent, ref, unref, reactive, toRefs, onMounted } from 'vue'
import {addGetData} from '@/utils/http_api'
import momment from 'moment'
import ChooseCompany from './ChooseCompany.vue'
export default {
  name: 'addReport',
  components: { ChooseCompany },
  props: {
    show: {
      type: Boolean
    },
    edit: {
      type: String,
      default: ''
    }
  },
  emits: ['changeShow'],
  setup(props, context) {
    console.log(props.edit)
    const formRef = ref(null)
    const ruleForm = reactive({
      ruleForm: {
        name: '',
        ssq: [],
        ms: ''
      },
      ReportTable: []
    })
    const rules = {
      name: {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur'
      },
      ssq: {
        required: true,
        message: '日期不能为空',
        trigger: 'blur'
      },

      ms: {
        message: '日期不能为空',
        trigger: 'blur'
      }
    }
    const submitForm = async () => {
      const form = unref(formRef)
      if (!form) return
      try {
        await form.validate((valid) => {
          if (valid) {
            const t = { ...ruleForm.ruleForm }
            console.log(t.ssq)
            console.log(momment(t.ssq[0]).format('YYYY-MM-DD HH:mm:ss'))
          }
        })
      } catch (error) {}
    }

    const state = reactive({
      showstatus: !props.show
    })
    const changeShow = () => {
      state.showstatus = false
      context.emit('changeShow', true)
    }
    onMounted(() => {
      getdata()
    })
    const getdata = () => {
      if (props.edit != '') {
        let dataJson = addGetData( { name: props.edit })
        dataJson.then((res)=>{
            ruleForm.ruleForm = {
            name: res.data.name,
            ssq: [res.data.ssq[0], res.data.ssq[1]],
            ms: res.data.ms
          }
          ruleForm.ReportTable = res.data.tableData
          console.log(res)
        })
      }
    }
    const handleDelete = (index, row) => {
      console.log(index, row)
    }
    const dialogState = reactive({
      dialogFormVisible: false
    })
    const closeDialog = (value) => {
      dialogState.dialogFormVisible = value
    }
    const tableArray=(value)=>{
      dialogState.dialogFormVisible = value.dialog
      ruleForm.ReportTable = value.submitDataArray
      console.log(value)
    }
    return {
      ...toRefs(ruleForm),
      formRef,
      rules,
      submitForm,
      changeShow,
      ...toRefs(state),
      getdata,
      handleDelete,
      ...toRefs(dialogState),
      closeDialog,
      tableArray
    }
  }
}
</script>
<style  scoped>
.content1 {
  padding-top: 20px;
}
.mt20{margin-top: 20px;}
</style>