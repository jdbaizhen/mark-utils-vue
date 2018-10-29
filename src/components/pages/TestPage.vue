<template>
    <section class="rect-mark-container">
      <header class="header-operate">
        <v-operate/>
      </header>
      <section class="main-mark">
        <section class="main-polygon">
          <v-polygon :img="img"/>
        </section>
        <section class="main-rect">
          <v-rect :img="img"/>
        </section>
        <section class="main-dot">
          <v-dot :img="img"/>
        </section>
      </section>
    </section>
</template>

<script>
import operate from '../component/Operate'
import rect from '../component/Rect'
import polygon from '../component/Polygon'
import dot from '../component/Dot'
import vm from '@/utils/vm'
import imgUrl from '@/assets/test1.jpg'
export default {
  data () {
    return {
      rects: [], // 矩形框数据
      dots: [], // 点位数据
      img: { // 图片信息
        url: imgUrl,
        width: 1920,
        height: 1080
      }
    }
  },
  components: {
    'v-operate': operate,
    'v-rect': rect,
    'v-polygon': polygon,
    'v-dot': dot
  },
  created () {
    vm.$on('getRectData', (data) => {
      this.rects = data
    })
    vm.$on('getDotData', (data) => {
      this.dots = data
    })
  }
}
</script>

<style lang="less" scoped>
  .rect-mark-container {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    .header-operate {
      height: 50px;
      padding: 10px;
    }
    .main-mark {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow: hidden;
      .main-polygon, .main-rect, .main-dot  {
        flex: 1;
        height: 90vh;
        border: 10px solid skublue;
        overflow: scroll;
      }
    }
  }
</style>
