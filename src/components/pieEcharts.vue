<template>
  <div :id="id" ref="main2" :style="{ width: '50%', height: '500px' }"> </div>
  <img src="" alt="" :id="imgid" :style="{ display: 'none' }" />
</template>
<script>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex'
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { PieChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer])
export default defineComponent({
  name: 'pieEcharts',
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
    console.log(props.data.data)
    const state = reactive({
      id: props.id,
      imgid: props.imgid
      //state: props.state
    })

    onMounted(() => {
      var myChart = echarts.init(document.getElementById(props.id))
      // 绘制图表
      myChart.setOption({
        animation: false,
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '50%',
            data: props.data.data,
            emphasis: {
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal: {
                  label: {
                    show: true,
                    formatter: '{b} ({d}%)'
                  },
                  labelLine: {
                    show: true
                  }
                }
              }
            }
          }
        ]
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