<template>
  <div class="operate-container">
    <input type="button" value="删除矩形" @click="deleteRect">
    <input type="color" name="color" v-model="color" @change="changeColor">
    <input type="button" value="辅助线" @click="toggleLine">
    <input type="button" value="删除多边形" @click="delectPolygon">
    <input type="button" value="多边形标注完成" @click="completePolygon">
    <input type="button" value="删除点" @click="deleteDot">
  </div>
</template>

<script>
import vm from '@/utils/vm'
export default {
  data () {
    return {
      color: '#000000'
    }
  },
  methods: {
    deleteRect () {
      vm.$emit('deleteRect')
    },
    delectPolygon () {
      vm.$emit('delectPolygon')
    },
    toggleLine () {
      vm.$emit('toggleLine')
    },
    changeColor () {
      vm.$emit('changeColor', this.color)
    },
    completePolygon () {
      vm.$emit('completePolygon')
    },
    deleteDot () {
      vm.$emit('deleteDot')
    }
  }
}
</script>

<style lang="less" scoped>
  .operate-container {
    display: flex;
    flex-direction: row;
  }
</style>
