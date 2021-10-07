<template>
  <div class="">
    <el-table
      :data="tableData4"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column prop="id" label="11" width="180"> </el-table-column>
      <el-table-column prop="name" label="22"> </el-table-column>
      <el-table-column prop="amount1" label="33"> </el-table-column>
      <el-table-column prop="amount2" label="44"> </el-table-column>
      <el-table-column prop="amount3" label="55"> </el-table-column>
      <el-table-column prop="amount3" label="66"> </el-table-column>
      <el-table-column prop="amount3" label="77"> </el-table-column>
      <el-table-column prop="amount3" label="88"> </el-table-column>
      <el-table-column prop="amount3" label="99"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
export default defineComponent({
  setup() {
    const state = reactive({
      spanArr: [],
      tableData4: [
        {
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        },
        {
          id: '12987122',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        },
        {
          id: '你好',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        },
        {
          id: '你好',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        },
        {
          id: '你好',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        },
        {
          id: '你',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        },
        {
          id: '你',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        },
        {
          id: '你',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        },
        {
          id: '他',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }
      ],
      formLabelWidth: '90px'
    })
    const objectSpanMethod = ({ row, column, rowIndex, columnIndex }) => {
      // console.log(row,column,rowIndex,columnIndex)
      if (columnIndex === 0) {
        const _row = state.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      if (columnIndex === 1) {
        const _row = state.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      if (columnIndex === 2) {
        const _row = state.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    }
    onMounted(() => {
      let contactDot = 0
      state.tableData4.forEach((item, index) => {
        item.index = index
        if (index === 0) {
          state.spanArr.push(1)
        } else {
          if (item.id === state.tableData4[index - 1].id) {
            state.spanArr[contactDot] += 1
            state.spanArr.push(0)
          } else {
            state.spanArr.push(1)
            contactDot = index
          }
        }
      })
    })

    return {
      ...toRefs(state),
      objectSpanMethod
    }
  }
})
</script>
<style scoped>
</style>