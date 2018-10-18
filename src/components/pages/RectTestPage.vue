<template>
    <div>
        <v-operate/>
        <v-rect/>
    </div>
</template>

<script>
import operate from '../component/Operate'
import rect from '../component/Rect'
export default {
  data () {
    return {}
  },
  components: {
    'v-operate': operate,
    'v-rect': rect
  }
}
</script>

<style lang="less" scoped>

</style>
