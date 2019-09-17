<template>
  <section class="Exchange-Box" id="Exchange-Box">
    <slot></slot>
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
  mounted () {
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  deactivated () {},
  watch: {}
}
</script>

<style scoped>
.Exchange-Box{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.Exchange-Box>div.Exchange-Card{
  width: calc((100% - (20px * 2)) / 3);
  height: calc((100% - (20px * 3) - 20px) / 4);
}
</style>
