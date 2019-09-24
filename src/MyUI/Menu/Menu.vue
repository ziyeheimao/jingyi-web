<template>
  <section>
    右键菜单
    <ul class="setUp">
      <li v-for="(v, k) in list" :key="k">{{v.ctn}}</li>
    </ul>
  </section>
</template>

<script>
// import api from '@api'
// import main from '@main'

export default {
  components: {
    // x
  },
  props: {
    list: { type: Array }
    // type: { type: String, default: 'default' },
    // long: Boolean,
    // loading: { type: Boolean, default: false },
    // noRadius: { ype: Boolean, default: false },
    // bgColor: { type: String, default: '' },
    // borderColor: { type: String, default: '' },
    // icon: { type: String, default: '' },
    // color: { type: String, default: '' },
    // block: Boolean,
    // disabled: Boolean,
    // plain: Boolean,
    // round: Boolean
  },
  computed: {

  },
  data () {
    return {}
  },
  methods: {

  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  deactivated () {},
  watch: {}

}
</script>

<style lang='scss' scoped>
.setUp{
  // display: none;
  position: fixed;
  top: 100px;
  left: 100px;

  width: 100px;
  padding: 6px;
  border:1px solid rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  overflow: hidden;
  background-color: #fff;

  li{
    list-style: none;
    height: 35px;
    line-height: 35px;

    transition: .5s;
    font-size: 15px;
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

</style>
