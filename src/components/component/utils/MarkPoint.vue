<template>
  <g>
     <circle v-for="(item, index) in points"
      :key="index"
      :cx="item.x*scale" :cy="item.y*scale" r="2"
      @mousedown.stop="dragStart(index)"
      @mouseup.stop="dragEnd"
      stroke="#0000ff" stroke-width="2"
      fill="#0000ff"
      :cursor="markType===3?'pointer':''"
      style="z-index:999;"
     ></circle>
  </g>
</template>

<script>
import vm from '@/utils/vm'
export default {
  props: [ 'points', 'scale', 'markType' ],
  data () {
    return {}
  },
  methods: {
    dragStart (index) {
      vm.$emit('dragStart', index)
    },
    dragEnd () {
      vm.$emit('dragEnd')
    }
  }
}
</script>

<style>

</style>
