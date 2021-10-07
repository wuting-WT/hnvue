<template>
  <div class="menu">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          router
          unique-opened
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :default-active="$route.path"
        >
          <template v-for="(item, index) in RouterComputed">
            <!--二级菜单-->
            <template v-if="!item.hidden">
              <el-submenu :index="`${index}`" :key="index">
                <template #title>
                  <i :class="item.iconCls"></i>
                  <span>{{ item.name }}{{ index }}</span>
                </template>
                <el-menu-item-group>
                  <template v-for="(child, _index) in item.children">
                    <template v-if="!child.hidden">
                      <el-menu-item :index="child.path" :key="_index" @click="clickMenu(child)">
                        <span
                          >{{ child.name }}
                          <!-- {{ child.path }} -->
                        </span>
                      </el-menu-item>
                    </template>
                  </template>
                </el-menu-item-group>
              </el-submenu>
            </template>
          </template>
        </el-menu>
        <!-- <el-menu class="el-menu-vertical-demo" @open="handleOpen" route>
          <el-submenu index="1">
            <template #title>
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu> -->
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { computed, defineComponent, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
  // @close="handleClose"
}

const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
  // @close="handleClose"
}
export default defineComponent({
  name: 'Menu',
  setup() {
    const router = useRouter()
    const RouterComputed = computed(() => {
      return router.options.routes
    })
    const store = useStore()
    const clickMenu = (item) => {
      //调用vuex的selectMenu方法存储数据
      store.commit('selectMenu', item)
      //跳转路由
      router.push({ name: item.name })
    }
    return {
      handleOpen,
      RouterComputed,
      handleClose,
      clickMenu
    }
  }
})
</script>
<style scoped>
.el-menu-item.is-active {
  background: #dbecff;
}
</style>