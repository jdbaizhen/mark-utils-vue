<template>
  <section class='polygon-container'>
    <svg ref="polygonSvg" class="svg-container"
      :width="img.width*scaleRect" :height="img.height*scaleRect"
      :style="`background-image:url(${img.url});`">
      <polygon v-for="(item, index) in polygonsStrArr"
      :key="index"
      :points="item"
      :fill="svgColor" :stroke="svgColor"
      @mousedown.stop="activeThisPolygon(index)"
      style="stroke-width:1;fill-opacity:0.1;stroke-opacity:0.9;cursor:pointer"/>
      <v-polygonpoint :points="polygons" :scale="scaleRect" :index="activePolygon" @dragStart="dragStartHandle" @dragEnd="dragEndHandle"/>
    </svg>
  </section>
</template>

<script>
import polygonpoint from './utils/PolygonPoint'
import vm from '@/utils/vm'
export default {
  props: [ 'img' ],
  components: {
    'v-polygonpoint': polygonpoint
  },
  data () {
    return {
      scaleRect: 1,
      polygons: [], // 多边形的所有点位
      svgColor: '#000000',
      isDrag: false, // 是否可拖拽
      activePointIndex: 0, // 当前激活的可拖拽点
      activePolygon: 0 // 当前激活的多边形
    }
  },
  created () {
    vm.$on('changeColor', (color) => {
      this.svgColor = color
    })
    vm.$on('delectPolygon', () => {
      if (this.activePolygon !== undefined && this.polygons[this.activePolygon].length > 0) {
        let delIndex = this.polygons[this.activePolygon].length - 1
        this.polygons[this.activePolygon].splice(delIndex, 1)
      } else {
        alert('请先选择多边形')
      }
    })
    vm.$on('completePolygon', () => {
      this.activePolygon += 1
    })
  },
  mounted () {
    let polygonSvg = this.$refs.polygonSvg
    polygonSvg.addEventListener('mousedown', (event) => {
      let point = {
        x: event.offsetX / this.scaleRect,
        y: event.offsetY / this.scaleRect
      }
      let index = this.activePolygon
      if (this.polygons[index] === undefined) {
        this.polygons.splice(index, 0, [])
      }
      this.polygons[index].push(point)
    })
    // 拖拽位置监听
    polygonSvg.addEventListener('mousemove', (event) => {
      if (this.isDrag) {
        let point = {
          x: event.offsetX / this.scaleRect,
          y: event.offsetY / this.scaleRect
        }
        this.polygons[this.activePolygon].splice(this.activePointIndex, 1, point)
      }
    }, false)
    // 监听鼠标缩放
    polygonSvg.addEventListener('mousewheel', (event) => {
      event.stopPropagation()
      event.preventDefault()
      // event.wheelDeltaY的正负表示放大还是缩小
      if (event.wheelDeltaY > 0) {
        this.scaleRect += 0.02
      } else if (event.wheelDeltaY < 0 && this.img.width * this.scaleRect > 320) {
        this.scaleRect -= 0.02
      }
    })
  },
  methods: {
    // 点位拖拽标志
    dragStartHandle (activePointIndex, activePolygonIndex) {
      this.isDrag = true
      this.activePointIndex = activePointIndex
      this.activePolygon = activePolygonIndex
    },
    dragEndHandle () {
      this.isDrag = false
    },
    // 选中多边形
    activeThisPolygon (index) {
      this.activePolygon = index
    }
  },
  computed: {
    // 格式化多边形的数据
    'polygonsStrArr': function () {
      let scale = this.scaleRect
      return this.polygons.map((item, index) => {
        return item.reduce((prev, next) => {
          return `${prev}${next.x * scale},${next.y * scale} `
        }, '')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.polygon-container{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(0,0,0,0.1);
  .svg-container{
    position: absolute;
    left: 0;
    top: 0;
    user-select:none;
    background-size: 100% 100%;
  }
}
</style>
