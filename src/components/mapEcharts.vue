<template>
  <div class="">
    <div :id="id" ref="myMap" class="border"></div>
    <img src="" alt="" :id="imgid" :style="{ display: 'none' }" />
     <el-table
      :data="dataArray"
      border
      style="width: 70%; margin:0 auto"
    >
      <el-table-column prop="value" label="value" align="center"> </el-table-column>
      <el-table-column prop="name" label="name" align="center"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { defineComponent, onMounted, toRefs,reactive } from 'vue'
import { useStore } from 'vuex'
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
  GeoComponent
} from 'echarts/components'
import { MapChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import china from '@/utils/china.json'
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
  GeoComponent,
  MapChart,
  CanvasRenderer
])
echarts.registerMap('china', china)
export default defineComponent({
  name: 'mapEcharts',
  props: {
    id: {
      type: String
    },
    imgid: {
      type: String
    },
    data: {
      type: Array
    },
    title:{
        type:String
    }
    
  },
  setup(props) {
    const state = reactive({
      id: props.id,
      imgid: props.imgid,
      dataArray:props.data,
      titleName:props.title
    })
    onMounted(() => {
      var myChart = echarts.init(document.getElementById(props.id))
      var option = {
        title: {
          text: state.titleName,
          textAlign: 'center',
          x: 'center',
        },
        tooltip: {
          formatter: function (params) {
            var info = '<p style="font-size:18px">' + params.name + ':' + params.value + '</p>'
            return info
          },
          backgroundColor: '#ff7f50', //提示标签背景颜色
          textStyle: {
            color: '#fff'
          } //提示标签字体颜色
        },
        textStyle: {
          fontSize: 17,
          fontWeight: 'bold',
          color: '#ffffff',
          fontFamily: ['Microsoft YaHei', 'Arial']
        },
        //左侧小导航图标
        visualMap: {
          type: 'piecewise',
          right: 20,
          y: 'center',
          min: 0,
          max: 300,
          pieces: [
            {
              min: 200,
              max: 800
            },
            {
              min: 100,
              max: 200
            },
            {
              min: 40,
              max: 100
            },
            {
              min: 20,
              max: 40
            },
            {
              min: 10,
              max: 20
            },
            {
              min: 1,
              max: 10
            },
            {
              min: 0,
              max: 1,
              label: '(采购数量) 0 - 1'
            }
          ],
          calculable: true,
          realtime: false,
          splitNumber: 8,
          inRange: {
            color: ['#dddddd', '#61a0a8', '#99ff99', '#ccff99', '#cccc00', '#ff9900', '#ff3300']
          }
        },
        series: [
          {
            name: '中国',
            type: 'map',
            mapType: 'china',
            label: {
              normal: {
                show: true //显示省份标签
              },
              emphasis: {
                show: true //对应的鼠标悬浮效果
              }
            },
            data: props.data,
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                if (params.value) {
                  return params.seriesName + '<br/>' + params.name + ' : ' + params.value
                } else {
                  return params.seriesName + '<br/>' + params.name + ' : ' + '0'
                }
              }
            }
          }
        ]
      }
      myChart.setOption(option)
      getImg(myChart)
    })
    console.log(state.imgid)
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
.border {
  width: 70%;
  height: 600px;
  margin: 0 auto;
}
</style>