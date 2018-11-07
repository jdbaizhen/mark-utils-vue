<template>
  <section>
    <button @click="handleToggleLine">辅助线</button>
    <button @click="handleDelete">删除</button>
    <button v-show="mark===2" @click="handleCompletePolygon">多边形完成</button>
    <input type="color" name="color" v-model="color" @change="handleChangeColor">
    <select name="opacity" v-model="opacityNumber" @change="handleChangeOpacity">
      <option v-for="(item, index) in opacity" :value="item" :key="index">{{item}}</option>
    </select>
    <!-- <input type="button" value="辅助线" @click="toggleLine"> -->
    <span class="mark-types" v-for="(item, index) in markTypes" :key="index">
      <label :for="item.type">{{item.label}}</label>
      <input type="radio" name="types" :id="item.type" :value="item.value" v-model.lazy="mark" @click="handleChangeMarkType(item.value)"/>
    </span>
  </section>
</template>

<script>
import vm from '@/utils/vm.js'
export default {
  props: {
    'markType': {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      markTypes: [
        { 'label': '矩', 'type': 'rect', 'value': 1 },
        { 'label': '多', 'type': 'polygon', 'value': 2 },
        { 'label': '点', 'type': 'dot', 'value': 3 },
        { 'label': '移', 'type': 'move', 'value': 4 }
      ],
      opacity: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
      opacityNumber: 0.1,
      mark: this.markType,
      color: '#000000'
    }
  },
  methods: {
    handleChangeMarkType (value) {
      this.$emit('changemarkType', value)
    },
    handleToggleLine () {
      vm.$emit('toggleLine')
    },
    handleDelete () {
      vm.$emit('delete')
    },
    handleCompletePolygon () {
      vm.$emit('completePolygon')
    },
    handleChangeColor () {
      vm.$emit('changeColor', this.color)
    },
    handleChangeOpacity () {
      vm.$emit('changeOpacity', this.opacityNumber)
    }
  }
}
</script>

<style scoped lang="less">
section {
  height: 100%;
  .mark-types {
    display: block;
    margin: 5px 0px;
    padding: 0px 5px;
    border: 2px solid skyblue;
  }
}

</style>
