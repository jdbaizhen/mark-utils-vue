<template>
  <g>
    <polygon v-for="(item, index) in polygonsStrArr"
      :key="index"
      :points="item"
      @mousedown.stop="changeActivePolygon(index)"
      :stroke="svgColor" :fill="svgColor"
      :fill-opacity="opacityNumber"
      style="stroke-width:1;stroke-opacity:1"/>
    <!-- <text v-for="(item, index) in polygons"
      :key="index"
      :x="item[0].x*scale+5 "
      :y="item[0].y*scale+15"
      fill="red"
      style="font-size:12px">
      {{index}}
    </text> -->
    <v-markpolygonpoint :points="polygons" :scale="scale" :index="activePolygon"></v-markpolygonpoint>
  </g>
</template>

<script>
import MarkPolygonPoint from './utils/MarkPolygonPoint.vue'
export default {
  props: ['svgColor', 'opacityNumber', 'polygons', 'polygonsStrArr', 'scale', 'activePolygon', 'markType'],
  components: {
    'v-markpolygonpoint': MarkPolygonPoint
  },
  data () {
    return {}
  },
  methods: {
    changeActivePolygon (index) {
      this.$emit('changeActivePolygon', index)
    }
  }
}
</script>

<style>

</style>
