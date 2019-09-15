<template>
  <div id="d"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
    :class="[borderR ? 'borderR' : '', border ? 'border' : '']"
    :style="'backgrund:' + bgc"><h4 v-if='title!==""'>{{title}}</h4><slot></slot></div>
</template>

<script>
export default {
  name: 'box',
  props: {
    title: { type: String, default: '' },
    borderR: { type: Boolean, default: false },
    border: { type: Boolean, default: true },
    backgrund: { type: String, default: 'default' },
    bgc: { sype: String, default: '#fff' }
  },
  data () {
    return {}
  },
  methods: {
    handleClick (event) {
      return this.$emit('click', event)
    },
    handleFocus (event) {
      return this.$emit('focus', event)
    },
    handleBlur (event) {
      return this.$emit('blur', event)
    }
  }
}
</script>

<style scoped>
#d{
  padding: 25px;
}
.borderR{
  border-radius: 10px;
}
.border{
  border: 1px solid #eee;
}
</style>
