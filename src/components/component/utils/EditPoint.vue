<template>
  <g>
    <circle v-for="(item ,index) in fixedPoints"
        :key="index"
        v-show="activeRectIndex>-1?true:false"
        :cx="item.fixedX*scaleRect" :cy="item.fixedY*scaleRect" r="3"
        @mousedown.stop="changeRectPointStart(index)"
        @mouseup.stop="changeRectPointEnd()"
        stroke="#0000ff" stroke-width="2"
        fill="#0000ff"
        :cursor="index===0||index===7?'nw-resize':index===1||index===6?'s-resize':index===2||index===5?'ne-resize':index===3||index===4?'e-resize':''"
        />
  </g>
</template>

<script>
/*
  1. 渲染可编辑拖拽的点位
  2. 接收参数
    1) fixedPoints(Array): 所有点位的数组集合,数据格式为[{fixedX:x, fixedY:y}]
    2) activeRectIndex(Number): 当前激活的图形索引
    3) changeRectPointStart(function): 拖拽开始函数，参数：当前拖拽点位的索引值，改变父组件内选中图形的可编辑状态
    4) changeRectPointEnd(function): 拖拽结束的函数，改变状态，将改为不可编辑，释放mousemove事件
    5) scaleRect(number): 矩形的缩放比例
*/
export default {
  props: [ 'fixedPoints', 'activeRectIndex', 'scaleRect' ],
  data () {
    return {}
  },
  methods: {
    changeRectPointStart (index) {
      this.$emit('funcStart', index)
    },
    changeRectPointEnd () {
      this.$emit('funcEnd')
    }
  }
}
</script>

<style>

</style>
