<template>
  <div :id="id" ref="main" :style="{ width: '50%', height: '500px' }"> </div>
  <img src="" alt="" :id="imgid" :style="{ display: 'none' }" />
</template>
<script>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { LineChart, BarChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
import { useStore } from 'vuex'

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  LegendComponent,
  BarChart
])
export default defineComponent({
  name: 'lineEcharts',
  props: {
    id: {
      type: String
    },
    imgid: {
      type: String
    },
    data: {
      type: Object
    }
  },
  setup(props) {
    console.log(props.data)
    const state = reactive({
      id: props.id,
      imgid: props.imgid
      //state: props.state
    })

    onMounted(() => {
      //console.log(props.data)
      var myChart = echarts.init(document.getElementById(props.id))
      // 绘制图表
      myChart.setOption({
        animation: false,
        title: {
          text: props.data.title,
          textAlign: 'center',
          x: 'center',
          top: '2%'
        },
        tooltip: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '15%',
          containLabel: true
        },
        legend: {
          data: props.data.legendData,
          top: '8%'
        },
        xAxis: {
          data: props.data.xAxisData
        },
        yAxis: {},
        series: props.data.series
      })

      getImg(myChart)
    })
    const store = useStore()
    const getImg = (option) => {
      var img = new Image() //图标的大小
      img.src = option.getDataURL({
        type: 'png',
        pixelRatio: 1, //放大2倍
        backgroundColor: '#fff'
      })
      document.getElementById(state.imgid).src = img.src
      store.commit('setImg', img.src)
      console.log(store.state.imgArray)
    }
    return {
      ...toRefs(state),
      getImg
    }
  }
})
</script>
<style scoped>
</style>