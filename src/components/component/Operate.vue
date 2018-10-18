<template>
  <div class="operate-container">
    <input type="button" value="delete" @click="deleteRect">
    <input type="color" name="color" v-model="color" @change="changeColor">
    <input type="button" value="line" @click="toggleLine">
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
    toggleLine () {
      vm.$emit('toggleLine')
    },
    changeColor () {
      vm.$emit('changeColor', this.color)
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
