<template>
  <div class="content">
    <el-form
      :model="ruleForm"
      ref="formRef"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { defineComponent, reactive, ref, toRefs, unref } from 'vue'
import { useRouter } from "vue-router";
export default defineComponent({
  name: 'login',
  setup() {
    const formRef = ref(null)
    const ruleForm = reactive({
      ruleForm: {
        name: '',
        pass: ''
      }
    })
    const rules = {
      name: {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur'
      },
      pass: {
        required: true,
        message: '密码不能为空',
        trigger: 'blur'
      }
    }
    const router = useRouter();
    const submitForm = async () => {
      const form = unref(formRef)
      if (!form) return
      try {
        await form.validate((valid) => {
          if (valid) {
            console.log(ruleForm)
            router.push({
              path: '/newReport',
             // query: { aid: 14 },
            })
          }
        })
      } catch (error) {}
    }
    return {
      ...toRefs(ruleForm),
      formRef,
      rules,
      submitForm
    }
  }
})
</script>
<style scoped>
.content {
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>