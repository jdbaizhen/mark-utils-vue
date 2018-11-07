<template>
  <g>
    <rect v-for="( item, index ) in rects"
      :key="index"
      :x="item.x*scale" :y="item.y*scale"
      :width="item.w*scale" :height="item.h*scale"
      @mousedown="moveRectStart(index, $event)"
      @click.stop="changeActiveRect(index)"
      @mouseup.stop="moveRectEnd"
      :fill="svgColor" :stroke="svgColor"
      :cursor="markType===1?'move':''"
      :fill-opacity="opacityNumber"
      style="stroke-width:2;stroke-opacity:1;"/>
    <!-- <text v-for="(item, index) in rects"
      :key="index+1"
      :x="item.x*scale+5 "
      :y="item.y*scale+15"
      fill="red"
      style="font-size:12px">
      {{index+1}}
    </text> -->
    <v-markfixedrect :scale="scale" :fixPoints="fixPoints" :activeRect="activeRect"></v-markfixedrect>
  </g>
</template>

<script>
import vm from '@/utils/vm.js'
import MarkFixedRect from './utils/MarkFixedRect.vue'
export default {
  props: ['svgColor', 'opacityNumber', 'scale', 'rects', 'markType', 'fixPoints', 'activeRect'],
  components: {
    'v-markfixedrect': MarkFixedRect
  },
  data () {
    return {}
  },
  methods: {
    moveRectStart (index, $event) {
      if (this.markType === 1) {
        $event.stopPropagation()
        vm.$emit('dragRectStart', index, $event)
      }
    },
    moveRectEnd () {
      vm.$emit('dragRectEnd')
    },
    changeActiveRect (index) {
      vm.$emit('changeActiveRect', index)
    }
  }
}
</script>

<style>

</style>
