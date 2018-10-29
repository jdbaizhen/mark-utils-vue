<template>
  <section class="dot-container">
    <svg ref="dotSvg" class="svg-container"
      :width="img.width*scaleDot" :height="img.height*scaleDot"
      :style="`background-image:url(${img.url})`">
      <v-point :points="dots" :scale="scaleDot" @dragStart="dragStartHandle" @dragEnd="dragEndHandle"/>
      <text v-for="(item, index) in dots" :key="index+1" :x="item.x*scaleDot-5 " :y="item.y*scaleDot-10" :fill="svgColor" class="dot-point-number">{{index+1}}</text>
    </svg>
  </section>
</template>

<script>
import point from './utils/Point'
import vm from '@/utils/vm'
export default {
  props: [ 'img' ],
  components: {
    'v-point': point
  },
  data () {
    return {
      scaleDot: 1,
      isDrag: false,
      svgColor: '#000000',
      dots: [],
      activePointIndex: 0
    }
  },
  created () {
    vm.$on('changeColor', (color) => {
      this.svgColor = color
    })
    vm.$on('deleteDot', () => {
      this.deletePoint()
    })
  },
  mounted () {
    let dotSvg = this.$refs.dotSvg
    dotSvg.addEventListener('mousedown', (event) => {
      let point = {
        x: event.offsetX / this.scaleDot,
        y: event.offsetY / this.scaleDot
      }
      this.dots.push(point)
    })

    // 监听鼠标缩放
    dotSvg.addEventListener('mousewheel', (event) => {
      event.stopPropagation()
      event.preventDefault()
      // event.wheelDeltaY的正负表示放大还是缩小
      if (event.wheelDeltaY > 0) {
        this.scaleDot += 0.1
      } else if (event.wheelDeltaY < 0 && this.img.width * this.scaleDot > 320) {
        this.scaleDot -= 0.1
      }
    })

    dotSvg.addEventListener('mousemove', (event) => {
      if (this.isDrag) {
        let point = {
          x: event.offsetX / this.scaleDot,
          y: event.offsetY / this.scaleDot
        }
        this.dots.splice(this.activePointIndex, 1, point)
      }
    })
  },
  methods: {
    dragStartHandle (index) {
      this.isDrag = true
      this.activePointIndex = index
    },
    dragEndHandle () {
      this.isDrag = false
    },
    deletePoint () {
      let index = this.dots.length - 1
      this.dots.splice(index, 1)
    }
  },
  watch: {
    'dots': (newDots) => {
      vm.$emit('getDotData', newDots)
    }
  }
}
</script>

<style lang="less" scoped>
.dot-container{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.1);
  .svg-container{
    position: relative;
    user-select:none;
    background-size: 100% 100%;
    .dot-point-number{
      font-size: 12px;
    }
  }
}
</style>
