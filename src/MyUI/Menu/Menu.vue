<template>
  <ul class="setUp" :style="'display:'+show2 +
    'position:fixed;'+'left:'+position.x +'px;top:'+position.y + 'px;' +
    listStyle" @mouseleave='mouseleave'>
    <li v-for="(v, k) in list" :key="k"
      :style="(v.style !== false ? v.style : '') + (v.disabled === true ? `background-color: #efefef; color: #bbb; cursor: not-allowed;` : ``)"
      @click="click(v.value)"
      @mousedown="mousedown(v.disabled)">

      {{v.label}}
      <i v-if="v.children" class="el-icon-arrow-right"></i>

      <ul v-if="v.children" class="setUp2" :style='listStyle'>
        <li v-for="(v2, k2) in v.children" :key="k2"
          :style="(v2.style !== false ? v.style : '') + (v.disabled === true ? `background-color: #efefef; color: #bbb; cursor: not-allowed;` : ``)"
          @click.stop="click(`${v.value}-${v2.value}`)"
          @mousedown="mousedown(v2.disabled)">{{v2.label}}</li>
      </ul>
    </li>
  </ul>
</template>

<script>
// import api from '@api'
// import main from '@main'

export default {
  components: {
    // x
  },
  props: {
    list: { type: Array },
    show: { type: Boolean, default: false },
    listStyle: { type: String, default: '' },
    position: { type: Object, defalut: {x: 0, y: 0} }
  },
  computed: {
    isShow () {
      let str = ''
      if (this.show) {
        str = 'block;'
      } else {
        str = 'none;'
      }
      return str
    }
  },
  data () {
    return {
      show2: 'none;',
      disabled: ''
    }
  },
  methods: {
    // 鼠标移出父元素时隐藏菜单
    mouseleave () {
      this.show2 = 'none;'
    },
    mousedown (disabled) {
      this.disabled = disabled
    },
    click (event, value1) {
      if (!this.disabled) {
        return this.$emit('click', event)
      }
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  deactivated () {},
  watch: {
    isShow () {
      this.show2 = this.isShow
    }
  }

}
</script>

<style lang='scss' scoped>
// 所有ul & li
ul{
  width: 100px;
  padding: 5px;
  border:1px solid rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  background-color: #fff;

  li{
    position: relative;
    padding: 0 8px;

    font-size: 15px;
    height: 30px;
    line-height: 30px;

    transition: all 0.3s linear;
    color: #000;
    cursor: pointer;
    text-align: center;

    /* 禁止文字被选中 */
    -moz-user-select: none;
    -o-user-select:none;
    -khtml-user-select:none;
    -webkit-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
  li~li{
    border-top: 1px solid rgba(0, 0, 0, 0.15);
  }
}
ul>li:hover{
  color: #fff;
  background-color: #b1d2f4;
  // #fe8181
}

// 显示二级菜单
ul>li:hover > .setUp2{
  display: block;
}

// 二级菜单
.setUp2{
  position: absolute;
  left: 100px;
  width: 100px;
  top: -5px;
  display: none;
}

// 二级菜单下 单行文本溢出显示...
.setUp2>li{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
