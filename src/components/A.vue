<template>
  <el-form :model="form"  label-position="left" :rules="rules" ref="form">

    <el-form-item label="" :label-width="formLabelWidth">
      <el-input clearable v-model="form.user" placeholder="收件人"></el-input>
    </el-form-item>

    <el-form-item label="" :label-width="formLabelWidth">
      <el-input clearable v-model="form.some" show-password placeholder="内容"></el-input>
    </el-form-item>

    <el-button type="success" class="btn" :disabled="disabled" @click="submit">密码找回</el-button>
  </el-form>
</template>

<script>
// import api from '../../../../api'
export default {
  components: {
    // x
  },
  // props: [''],
  computed: {

  },
  data () {
    return {
      formLabelWidth: '0',

      form: {
        user: '',
        some: ''
      }
    }
  },
  methods: {
    submit () {

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
  watch: {}
}
</script>

<style scoped>
</style>
