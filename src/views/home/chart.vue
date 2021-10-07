<template>
  <div class=""> chart.vue </div>
  <button @click="handle">点我</button>
</template>
<script>
import { defineComponent } from 'vue'
import {_httpGet} from '@/utils/api'
export default defineComponent({
  name: 'Chart',
  setup() {
    const handle = () => {
      _httpGet({url:'/users'}).then((res)=>{
        console.log(res)
      })
    }

   
    return {
      handle
    }
  }
})
</script>
<style scoped>
</style>