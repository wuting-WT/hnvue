<template>
  <div class="tabs">
      222
      我是222分支的内容
      woshi
    <!--closable这里说明home是不能关闭的-->
    <el-tag
      size="medium"
      :key="tag.name"
      v-for="(tag, index) in tags"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      @close="handleClose(tag, index)"
      @click="changeMenu(tag)"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
    >
      {{ tag.name }}
    </el-tag>
    111
  </div>
</template>
<script>
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { mapState, useStore } from 'vuex'
export default defineComponent({
  name: 'CommonTab',
  setup() {
    
    const store = useStore()
    const router = useRouter()
    const tags = computed(() => {
      return store.state.tabsList
    })
    console.log(tags)
    const tagstore = computed({ ...mapState(['tabsList']) })

    //关闭标签
    const handleClose = (tag, index) => {
      let length = tags.value.length - 1
      //vuex调方法的另一种写法
      store.commit('closeTab', tag)
      // 如果关闭的标签不是当前路由的话，就不跳转
      if (tag.name !== router.name) {
        return
      }

      // 关闭的标签是最右边的话，往左边跳转一个
      if (index === length) {
        router.push({ path: tags.value[index - 1].path })
      } else {
        // 否则往右边跳转
        router.push({ name: tags.value[index].name })
      }
    }

    const changeMenu = (item) => {
      if (item.name == '新建报表任务1') {
        router.push({ name: '新建报表任务' })
        store.commit('selectMenu', '新建报表任务')
      } else {
        router.push({ name: item.name })
        store.commit('selectMenu', item)
      }

      
    }
    return {
      tags,
      handleClose,
      tagstore,
      changeMenu
    }
  }
})
</script>
<style scoped>
/* .el-tag:nth-child(1) {
  display:block;
} */
.el-tag {
  border-radius: 0;
  cursor: pointer;
  margin-right: 9px;
  border: none;
  font-size: 14px;
}
.tabs {
  border-bottom: solid 1px #ddd;
  padding-bottom: 1px;
}
</style>