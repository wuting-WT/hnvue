<template>
<div class="content">
  <!-- <line-echarts id="main1" imgid="imgid1" :data="stateData"></line-echarts>
 <table-view></table-view>
 <pie-echarts id="main2" imgid="imgid2" :data="pieData"></pie-echarts> -->
 <map-echarts id="map1" imgid="imgmap1" :data="mapData" title="地图"></map-echarts>
</div>
 
</template>
<script>
import lineEcharts from '@comps/lineEcharts.vue'
import MapEcharts from '@comps/mapEcharts.vue'
import PieEcharts from '@/components/pieEcharts.vue'
import {  defineComponent, reactive, toRefs } from 'vue'
import tableView from './table.vue'
export default defineComponent({
  components: { lineEcharts,tableView, MapEcharts },
  setup() {
    const state = reactive({
      stateData: {
        series: [
          {
            name: '邮件营销',
            type: 'bar',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'bar',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'bar',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'bar',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'bar',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ],
        title: 'ECharts 入门示例',
        legendData: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
        xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      pieData:{
          data: [
              { value: 1048, name: '搜索引擎11' },
              { value: 735, name: '直接访问' },
              { value: 580, name: '邮件营销' },
              { value: 484, name: '联盟广告' },
              { value: 300, name: '视频广告' }
            ],
      },
      mapData:[
              {
                name: '北京',
                value: 599
              },
              {
                name: '上海',
                value: 142
              },
              {
                name: '黑龙江',
                value: 44
              },
              {
                name: '深圳',
                value: 92
              },
              {
                name: '湖北',
                value: 810
              },
              {
                name: '四川',
                value: 453
              }
            ]
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>
<style scoped>
</style>