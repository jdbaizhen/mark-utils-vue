<template>
  <g>
    <line :x1="lineObj.lineX" y1="0" :x2="lineObj.lineX" y2="100%" style="stroke:rgb(255,255,255);stroke-width:2;"/>
    <line x1="0" :y1="lineObj.lineY" x2="100%" :y2="lineObj.lineY" style="stroke:rgb(255,255,255);stroke-width:2;"/>
  </g>
</template>

<script>
/*
  1. 标注使用的辅助线
  2. lineObj(object): 父组件传来的数据对象，内部放置的是鼠标在svg图层上的当前位置。数据格式{lineX:x, lineY:y}
*/
export default {
  props: [ 'lineObj' ],
  data () {
    return {}
  }
}
</script>

<style>

</style>
