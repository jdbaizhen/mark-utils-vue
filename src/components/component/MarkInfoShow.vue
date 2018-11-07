<template>
  <section style="height:100%">
    <section>
      <h4>矩形描述</h4>
      <input type="text" v-for="(item, index) in rects" :key="index+1" :placeholder="`矩形${index+1}描述`">
    </section>
    <section>
      <h4>多边形描述</h4>
      <input type="text" v-for="(item, index) in polygons" :key="index+1" :placeholder="`多边形形${index+1}描述`">
    </section>
  </section>
</template>

<script>
export default {
  props: {
    rects: Array,
    polygons: Array,
    dots: Array
  }
}
</script>

<style scoped>
input {
  width: 80%;
  border-radius: 3px;
  padding: 5px 8px;
  margin: 3px;
}
</style>
