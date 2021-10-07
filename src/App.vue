<template>

<router-view></router-view>
</template>

<script lang="ts">
import { defineComponent,onMounted} from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  setup(){
    const store = useStore()
    onMounted(()=>{
        window.addEventListener('unload', saveState)
    })
    const saveState=()=>{
       sessionStorage.setItem('state', JSON.stringify(store.state))
       console.log(sessionStorage.setItem('state', JSON.stringify(store.state)))
    }
    return{
      saveState
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>


