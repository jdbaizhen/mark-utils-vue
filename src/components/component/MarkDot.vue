<template>
  <g>
    <v-markpoint :points="dots" :scale="scale" :markType="markType"></v-markpoint>
    <text v-for="(item, index) in dots"
      :key="index+1"
      :x="item.x*scale-5 "
      :y="item.y*scale-10"
      :fill="svgColor"
      style="font-size:12px">
      {{index+1}}
    </text>
  </g>
</template>

<script>
import MarkPoint from './utils/MarkPoint.vue'
export default {
  props: ['svgColor', 'dots', 'scale', 'markType'],
  components: {
    'v-markpoint': MarkPoint
  },
  data () {
    return {}
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.dot-container {
  width: 120px;
  height: 100px;
  z-index: 999;
}
</style>
