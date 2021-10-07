<template>
  <div class="common-layout" style="height: 100%; border: 1px solid #eee">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-header>Header</el-header>

      <el-container style="position: relative; min-height: calc(100% - 70px)">
        <el-aside width="200px">
          <Menu></Menu>
        </el-aside>

        <el-main>
          <div class="bar">
            <comtab></comtab>
          </div>
          <router-view v-slot="{ Component, route }">
            <keep-alive v-if="route.meta.keepAlive">
              <component :is="Component" />
            </keep-alive>
            <component :is="Component" v-else />
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script >
import { ref, defineComponent } from 'vue'

import Menu from '@/components/menu.vue'
import comtab from '@/components/CommonTab.vue'
export default defineComponent({
  name: 'home',
  components: {
    Menu,
    comtab
  },
  setup() {}
})
</script>

<style scoped>
.el-header {
  background-color: #409EFF;
  color: #333;
  text-align: center;
  line-height: 60px;
  border-bottom: solid 2px #fff;
}


.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #fff;
  color: #333;
  text-align: left;
  position: relative;
  padding-top: 0;
}
.bar {
  text-align: left;
  position: fixed;
    z-index: 3;
    background: #fff;
    width: 100%;
    top: 62px;
}
.el-aside >>> .el-submenu .el-submenu__title{
  background:#409EFF;
  color: #fff;
}
.el-aside >>> .el-submenu__title i{color: #fff;}
.el-aside >>> .el-submenu .el-menu-item.is-active{
  background: #cce2f7;
}
.el-aside >>> .el-menu-item-group__title{padding: 0;}
/* .el-aside >>> .el-submenu{border-bottom: solid 0px #fff;} */
</style>
