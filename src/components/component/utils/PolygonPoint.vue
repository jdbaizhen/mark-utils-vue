<template>
  <g>
     <circle v-for="(item, index) in points[index]"
      :key="index"
      :cx="item.x*scale" :cy="item.y*scale" r="3"
      @mousedown.stop="dragStart(index)"
      @mouseup.stop="dragEnd"
      stroke="#0000ff" stroke-width="2"
      fill="#0000ff"
      style="cursor:pointer"
     ></circle>
  </g>
</template>

<script>
export default {
  props: [ 'points', 'scale', 'index' ],
  data () {
    return {}
  },
  methods: {
    dragStart (indexPoint) {
      let indexPolygon = this.index
      this.$emit('dragStart', indexPoint, indexPolygon)
    },
    dragEnd () {
      this.$emit('dragEnd')
    }
  }
}
</script>

<style>

</style>
