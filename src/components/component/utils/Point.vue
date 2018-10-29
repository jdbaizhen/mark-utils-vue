<template>
  <g>
     <circle v-for="(item, index) in points"
      :key="index"
      :cx="item.x*scale" :cy="item.y*scale" r="2"
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
  props: [ 'points', 'scale' ],
  data () {
    return {}
  },
  methods: {
    dragStart (index) {
      this.$emit('dragStart', index)
    },
    dragEnd () {
      this.$emit('dragEnd')
    }
  }
}
</script>

<style>

</style>
