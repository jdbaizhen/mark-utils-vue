<template>
   <section class="container">
      <aside class="aside-operate">
        <v-markoperate @changemarkType="changeMarkType" :markType="markType"/>
      </aside>
      <section class="mark-container">
        <svg ref="svg" class="svg-container"
          :width="img.width*scale" :height="img.height*scale"
          :style="`background-image:url(${img.url});left:${svgLeft};top:${svgTop}`"
          :cursor="markType===4?'move':markType===1?'crosshair':''"
        >
          <v-line :lineObj="lineObj"></v-line>
          <v-markrect :svgColor="svgColor" :opacityNumber="opacityNumber" :scale="scale" :rects="rects" :fixPoints="fixPoints" :markType="markType" :activeRect="activeRect"></v-markrect>
          <v-markpolygon :svgColor="svgColor" :opacityNumber="opacityNumber" :polygons="polygons" :markType="markType" :polygonsStrArr="polygonsStrArr" :scale="scale" :activePolygon="activePolygon" @changeActivePolygon="changeActivePolygon"></v-markpolygon>
          <v-markdot :svgColor="svgColor" :dots="dots" :scale="scale" :markType="markType"></v-markdot>
        </svg>
      </section>
      <aside class="aside-info">
        <v-markinfoshow :rects="rects" :polygons="polygons" :dots="dots"/>
      </aside>
    </section>
</template>

<script>
import vm from '@/utils/vm'
import imgUrl from '@/assets/test.jpg'
import MarkOperate from '../component/MarkOperate.vue'
import MarkLine from '../component/utils/Line.vue'
import MarkInfoShow from '../component/MarkInfoShow.vue'
import MarkDot from '../component/MarkDot.vue'
import MarkPolygon from '../component/MarkPolygon.vue'
import MarkRect from '../component/MarkRect.vue'
export default {
  components: {
    'v-markoperate': MarkOperate,
    'v-line': MarkLine,
    'v-markinfoshow': MarkInfoShow,
    'v-markdot': MarkDot,
    'v-markpolygon': MarkPolygon,
    'v-markrect': MarkRect
  },
  data () {
    return {
      /*
        图层相关
      */
      img: { // 图片信息
        url: imgUrl,
        width: 1920,
        height: 1080
      },
      svgColor: '#000', // 标注颜色
      opacityNumber: 0.1, // 透明度设置
      lineObj: { // 辅助线数据
        lineX: 0,
        lineY: 0
      },
      markType: 1, // 标注类型，1=矩形，2=多边形，3=点
      scale: 1, // 图片缩放比例
      isMouseDown: false, // 鼠标是否按下
      isDrag: false, // 是否可拖拽
      svgLeft: 0,
      svgTop: 0,
      initPos: {}, // 鼠标按下时相对于svg的位置
      movePos: {}, // 鼠标移动时相对于svg的位置
      /*
        点位相关
      */
      dots: [], // 所有点位的数组
      activeDot: 0, // 当前激活的点
      /*
        矩形相关
      */
      rects: [], // 所有矩形的数组
      fixPoints: [], // 矩形框的修改点位
      fixData: {}, // 被修改矩形的原始数据
      initPoints: { // 鼠标按下绘制开始的坐标
        initX: 0,
        initY: 0
      },
      activeRect: 0, // 当前激活的矩形
      activeFixPosition: 0, // 激活修改的点位
      isMove: false, // 移动矩形的标识符
      moveInitPoints: {}, // 移动矩形的初始数据
      /*
        多边形相关
      */
      polygons: [], // 所有多边形数组
      activePolygon: 0, // 当前激活的多边形
      activePolygonPoint: 0 // 当前激活的点位
    }
  },
  created () {
    // 更改标注颜色
    vm.$on('changeColor', color => {
      this.svgColor = color
    })
    // 修改透明度
    vm.$on('changeOpacity', opacityNumber => {
      this.opacityNumber = opacityNumber
    })
    // 各类型操作，开始修改
    vm.$on('dragStart', (index, indexPolygon) => {
      if (this.markType === 1) {
        this.isDrag = true
        this.activeFixPosition = index
        this.fixData = this.rects[this.activeRect]
      }
      if (this.markType === 2) {
        this.isDrag = true
        this.activePolygon = indexPolygon
        this.activePolygonPoint = index
      }
      if (this.markType === 3) {
        this.isDrag = true
        this.activeDot = index
      }
    })
    // 修改结束
    vm.$on('dragEnd', () => {
      this.isDrag = false
    })
    // 矩形拖拽初始化
    vm.$on('dragRectStart', (index, event) => {
      if (this.rects[index].x !== undefined && this.markType === 1) {
        this.moveInitPoints = {
          index: index,
          gapX: event.offsetX, // 计算鼠标位置和矩形框左上角的差值
          gapY: event.offsetY,
          x: this.rects[index].x,
          y: this.rects[index].y
        }
        this.activeRect = index
        this.isMove = true
        this.isDrag = false
      }
    })
    // 矩形移动完成
    vm.$on('dragRectEnd', () => {
      if (this.markType === 1) {
        this.isMove = false
        this.isMouseDown = false
      }
    })
    // 矩形选择
    vm.$on('changeActiveRect', index => {
      if (this.markType === 1) {
        this.activeRect = index
        this.fixPointsHandle(index)
      }
    })
    vm.$on('delete', () => {
      /**
       * 矩形删除
       */
      if (this.markType === 1 && this.rects.length > 0) {
        if (confirm('确认删除矩形吗?')) {
          this.rects.splice(this.activeRect, 1)
          this.activeRect = -1
        }
      }
      /*
        多边形删除
      */
      if (this.markType === 2 && this.polygons.length > 0) {
        if (this.activePolygon !== undefined) {
          if (confirm(`确认删除${this.activePolygon}号多边形?`)) {
            this.polygons.splice(this.activePolygon, 1)
          }
        } else {
          alert('请选择多边形')
        }
      }
      /**
       * 点位删除
       */
      if (this.markType === 3 && this.dots.length > 0) {
        this.dots.splice(this.dots.length - 1, 1)
      }
    })
    vm.$on('completePolygon', () => {
      if (this.markType === 2) {
        this.activePolygon = this.polygons.length
      }
    })
  },
  mounted () {
    let svgElem = this.$refs.svg
    /*
      标注区域
    */
    svgElem.addEventListener('mousedown', (event) => {
      event.preventDefault()
      let x = event.offsetX
      let y = event.offsetY
      // 还原原始比例的坐标
      let point = {
        x: x / this.scale,
        y: y / this.scale
      }
      // 标注矩形
      if (this.markType === 1) {
        this.isMouseDown = true
        this.initPoints.initX = x
        this.initPoints.initY = y
        let rectObj = {x: 0, y: 0, w: 0, h: 0}
        this.rects.push(rectObj)
      }
      // 标注多边形
      if (this.markType === 2) {
        let index = this.activePolygon
        if (this.polygons[index] === undefined) {
          this.polygons.splice(index, 0, [])
        }
        this.polygons[index].push(point)
      }
      // 标注点
      if (this.markType === 3) {
        this.dots.push(point)
      }
      // 拖拽图片
      if (this.markType === 4) {
        this.isMouseDown = true
        // 鼠标相对于svg的位置差值
        this.initPos = {
          initX: x,
          initY: y
        }
      }
    }, false)
    /*
      修改区域
    */
    svgElem.addEventListener('mousemove', (event) => {
      event.preventDefault()
      // 获取鼠标相对mark-container的位置
      let x = event.clientX - 1920 / 24
      let y = event.clientY - 50
      let x1 = event.offsetX
      let y1 = event.offsetY
      let scale = this.scale
      this.movePos = {
        moveX: x,
        moveY: y
      }
      let point = {
        x: x1 / scale,
        y: y1 / scale
      }
      this.lineObj = {
        lineX: x1,
        lineY: y1
      }
      // 绘制矩形
      if (this.markType === 1 && this.isMouseDown) {
        let index = this.rects.length - 1
        let initX = this.initPoints.initX
        let initY = this.initPoints.initY
        if (x1 > initX) {
          this.rects[index].x = initX / scale
          this.rects[index].w = (x1 - initX) / scale
        } else {
          this.rects[index].x = x1 / scale
          this.rects[index].w = (initX - x1) / scale
        }
        if (y1 > initY) {
          this.rects[index].y = initY / scale
          this.rects[index].h = (y1 - initY) / scale
        } else {
          this.rects[index].y = y1 / scale
          this.rects[index].h = (initY - y1) / scale
        }
      }
      // 移动矩形
      if (this.markType === 1 && this.isMove) {
        this.moveRect(x1, y1)
      }
      // 矩形修改
      if (this.markType === 1 && this.isDrag) {
        this.changeRectPoint(x1, y1)
      }
      // 多边形修改
      if (this.markType === 2 && this.isDrag) {
        this.polygons[this.activePolygon].splice(this.activePolygonPoint, 1, point)
      }
      // 点位修改
      if (this.markType === 3 && this.isDrag) {
        this.dots.splice(this.activeDot, 1, point)
      }
      // 拖拽
      if (this.markType === 4 && this.isMouseDown) {
        event.stopPropagation()
        this.handleSvgMove()
      }
    })
    svgElem.addEventListener('mouseup', (event) => {
      event.preventDefault()
      if (this.markType === 1) {
        let index = this.rects.length - 1
        if (this.rects[index].w < 30 && this.rects[index].h < 30) {
          this.rects.pop()
          alert('矩形框最小为30*30像素')
        } else {
          this.fixPointsHandle(index)
        }
        this.isMouseDown = false
      }
      // 拖拽完成
      if (this.markType === 4) {
        this.isMouseDown = false
      }
    }, false) // 开启捕获
    /**
     *  监听多边形点的删除
     */
    document.addEventListener('keydown', event => {
      if (this.markType === 2) {
        if (event.keyCode === 46 && this.activePolygon !== undefined) {
          this.polygons[this.activePolygon].length === 1 ? this.polygons.splice(this.activePolygon, 1) : this.polygons[this.activePolygon].splice(this.polygons[this.activePolygon].length - 1, 1)
        }
      }
    })
    // 监听鼠标缩放
    svgElem.addEventListener('mousewheel', (event) => {
      event.stopPropagation()
      event.preventDefault()
      // event.wheelDeltaY的正负表示放大还是缩小
      if (event.wheelDeltaY > 0) {
        this.scale += 0.02
      } else if (event.wheelDeltaY < 0 && this.img.width * this.scale > 320) {
        this.scale -= 0.02
      }
    })
  },
  methods: {
    // 更改标注类型
    changeMarkType (value) {
      this.markType = value
      this.activePolygon = this.polygons.length
      this.activeRect = -1
    },
    // 计算svg随鼠标移动的坐标
    handleSvgMove () {
      this.svgLeft = this.movePos.moveX - this.initPos.initX
      this.svgTop = this.movePos.moveY - this.initPos.initY
    },
    /**
     * 矩形相关函数
     */
    // 为矩形增加八个拖拽点
    fixPointsHandle (index) {
      this.activeRect = index
      let pointData = this.rects[index]
      let leftTop = { fixedX: pointData.x, fixedY: pointData.y }
      let centerTop = { fixedX: pointData.x + (pointData.w) / 2, fixedY: pointData.y }
      let rightTop = { fixedX: pointData.x + pointData.w, fixedY: pointData.y }
      let centerLeft = { fixedX: pointData.x, fixedY: pointData.y + (pointData.h) / 2 }
      let centerRight = { fixedX: pointData.x + pointData.w, fixedY: pointData.y + (pointData.h) / 2 }
      let leftBottom = { fixedX: pointData.x, fixedY: pointData.y + pointData.h }
      let centerBottom = { fixedX: pointData.x + (pointData.w) / 2, fixedY: pointData.y + pointData.h }
      let rightBottom = { fixedX: pointData.x + pointData.w, fixedY: pointData.y + pointData.h }
      let fixPointArr = [ leftTop, centerTop, rightTop, centerLeft, centerRight, leftBottom, centerBottom, rightBottom ]
      this.fixPoints = fixPointArr
    },
    // 拖拽点更改矩形坐标
    changeRectPoint (xx, yy) {
      let activeFixPosition = this.activeFixPosition
      let activeRectIndex = this.activeRect
      let fixData = this.fixData
      let scale = this.scale
      let x = xx / scale
      let y = yy / scale
      let fixedObj = {}
      if (activeFixPosition === 1) { // centerTop
        fixedObj = {
          x: fixData.x,
          y: y < fixData.y + fixData.h ? y : (fixData.y + fixData.h),
          w: fixData.w,
          h: y <= (fixData.y + fixData.h) ? fixData.h - (y - fixData.y) : (y - fixData.y - fixData.h)
        }
      } else if (activeFixPosition === 6) { // centerBottom
        fixedObj = {
          x: fixData.x,
          y: y > fixData.y ? fixData.y : y,
          w: fixData.w,
          h: y > fixData.y ? y - fixData.y : (fixData.y - y)
        }
      } else if (activeFixPosition === 3) { // leftCenter
        fixedObj = {
          x: x < (fixData.x + fixData.w) ? x : (fixData.x + fixData.w),
          y: fixData.y,
          w: x < (fixData.x + fixData.w) ? fixData.x + fixData.w - x : x - (fixData.x + fixData.w),
          h: fixData.h
        }
      } else if (activeFixPosition === 4) { // rightCenter
        fixedObj = {
          x: x > fixData.x ? fixData.x : x,
          y: fixData.y,
          w: x > fixData.x ? x - fixData.x : fixData.x - x,
          h: fixData.h
        }
      } else if (activeFixPosition === 0) { // leftTop
        fixedObj = {
          x: x < (fixData.x + fixData.w) ? x : (fixData.x + fixData.w),
          y: y < (fixData.y + fixData.h) ? y : (fixData.y + fixData.h),
          w: x < (fixData.x + fixData.w) ? fixData.x + fixData.w - x : x - (fixData.x + fixData.w),
          h: y < (fixData.y + fixData.h) ? fixData.y + fixData.h - y : y - (fixData.y + fixData.h)
        }
      } else if (activeFixPosition === 2) { // rightTop
        fixedObj = {
          x: x > fixData.x ? fixData.x : x,
          y: y > fixData.y + fixData.h ? fixData.y + fixData.h : y,
          w: x > fixData.x ? x - fixData.x : fixData.x - x,
          h: y > fixData.y + fixData.h ? y - fixData.h - fixData.y : fixData.h + fixData.y - y
        }
      } else if (activeFixPosition === 5) { // leftBottom
        fixedObj = {
          x: x < (fixData.x + fixData.w) ? x : (fixData.x + fixData.w),
          y: y > fixData.y ? fixData.y : y,
          w: x < (fixData.x + fixData.w) ? fixData.x + fixData.w - x : x - (fixData.x + fixData.w),
          h: y > fixData.y ? y - fixData.y : fixData.y - y
        }
      } else if (activeFixPosition === 7) { // rightBottom
        fixedObj = {
          x: x > fixData.x ? fixData.x : x,
          y: y > fixData.y ? fixData.y : y,
          w: x > fixData.x ? x - fixData.x : fixData.x - x,
          h: y > fixData.y ? y - fixData.y : fixData.y - y
        }
      }
      this.rects.splice(activeRectIndex, 1, fixedObj)
      this.fixPointsHandle(activeRectIndex)
    },
    // 移动矩形位置
    moveRect (moveX, moveY) {
      let scale = this.scale
      let initData = this.moveInitPoints
      let x = (moveX - initData.gapX) / scale + initData.x
      let y = (moveY - initData.gapY) / scale + initData.y
      if (x < 0) {
        x = 0
      } else if (x > (this.img.width - this.rects[initData.index].w)) {
        x = this.img.width - this.rects[initData.index].w
      }
      if (y < 0) {
        y = 0
      } else if (y > (this.img.height - this.rects[initData.index].h)) {
        y = this.img.height - this.rects[initData.index].h
      }
      let newObj = {
        x,
        y,
        w: this.rects[initData.index].w,
        h: this.rects[initData.index].h
      }
      this.rects.splice(initData.index, 1, newObj)
      this.fixPointsHandle(initData.index)
    },
    /*
      多边形 相关函数
    */
    changeActivePolygon (index) {
      if (this.markType === 2) {
        this.activePolygon = index
      }
    }
  },
  computed: {
    // 格式化多边形的数据
    'polygonsStrArr': function () {
      let scale = this.scale
      return this.polygons.map((item, index) => {
        return item.reduce((prev, next) => {
          return `${prev}${next.x * scale},${next.y * scale} `
        }, '')
      })
    }
  }
}
</script>

<style scoped lang="less">
.container{
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  .aside-operate{
    flex: 1;
    display: flex;
    flex-direction: column;
    line-height: 50px;
    padding: 5px;
    height: 50px;
  }
  .mark-container{
    flex: 18;
    position: relative;
    background: #eee;
    height: 90vh;
    overflow: hidden;
    .svg-container{
      position: absolute;
      background-size: 100% 100%;
    }
  }
  .aside-info{
    flex: 5;
    background: #efe;
    height: 100%;
  }
}
</style>
