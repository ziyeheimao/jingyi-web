<template>
  <div>
    <div class="about-ctn" :style="'max-height:'+height+'px;'">
      <h1>关于本站</h1>

      <div class="about-title">
        <p>从前有座山...</p>
      </div>
      <div class="about-body">
        <p>
          如果你很不小心进来，然后又很不小心地进来了这个页面，那么证明你对我这人或这个网站有点兴趣。
          如果我表错情了，这不是你的错，我应该检讨一下为什么这个页面的链接这么容易被人点到；
          如果我没错，那么，我应该暗自 YY 一下，可能又有一个小朋友稀饭我鸟，o(*≧▽≦)ツ 啦啦啦...
        </p>
      </div>

      <div class="about-title">
        <p>关于俺...</p>
      </div>
      <div class="about-body">
        <p>
          网名：箫羽叶。90后，程序员一枚；经常出没于互联网各角落，出产于大东北，毕业与某不知名学院。
          是一个比普通懒人更懒那么一小丢丢的人，也不是懒主要是怕麻烦，哎~算了 ╮(╯▽╰)╭
          从小就好奇心旺盛。爱好贼广泛~ 偶尔喜欢动手做些手工DIY之类的小玩应。
          喜欢 DIY、烘焙、美食（¯﹃¯）、码代码、游戏、电影、音乐、动漫、二次元及一些与电子、数码、网络相关滴东东。
          除了这些 能使人快乐的事情和高科技很 Cool 以外，就是网络、软件等能让我可以更懒的...
          啊~不 能满足求知欲 随便让生活变得更便捷，推进人类文明进步的了(๑•̀ㅂ•́)و✧...
        </p>
      </div>

      <div class="about-title">
        <p>关于本站...</p>
      </div>
      <div class="about-body">
        <p>
          n年前的某一天，可能是没事闲的把在瞎捅咕photoshop的时候，领悟了网页切图⊙▽⊙，生成web文件这一技能。
          从此改变了我对网站的一些认知，兴趣 + 高收入推动着我踏上了web开发的不归路~
          那时作为初学者只能勉勉强强的码一点静态页，就想着介玩应咱得学以致用是吧╰(￣▽￣)╭
          于是乎，就给自己写一个导航作为浏览器首页吧，没错就是现在你所看到的这个网站，不过哪个时候还是灰常简陋滴~
          随着学习的深入，静逸也经历了无数次的改版，才有了今天的这个小站...
        </p>
      </div>

      <div class="about-title">
        <p>召唤作者~biu...</p>
      </div>
      <div class="about-body contact-information">
        <div class="contact-info">
          <p>V信： <span>xiaoyuye819405246</span></p>
          <p>企鹅： <span>819405246</span></p>
          <p>Email： <span>jingyidaohang@qq.com</span></p>
          <p>亦或者飞鸽传书： <span>┑(￣Д ￣)┍</span></p>
        </div>

        <div class="WeChat2DCode">
          <img src="../../assets/about/WeChat2DCode.png" alt="WeChat2DCode">
        </div>
      </div>

      <div class="about-title">
        <p>请作者吃好吃哒(*ˉ﹃ˉ)...</p>
      </div>
      <div class="about-body">
        <p>
          作者微信、支付宝自愿投食，一毛不嫌少，亿元不嫌多看你心情楼(๑•̀ㅁ•́ฅ)...
        </p>
        <div class="PaymentCode">
          <img width="600" src="../../assets/about/PaymentCode.jpg" alt="PaymentCode">
        </div>
      </div>
    </div>
   </div>
</template>

<script>
// import api from '@api'
// import main from '@main'

export default {
  components: {
    // x
  },
  // props: [''],
  computed: {
    InnerSize () { // 文档可视区尺寸
      return this.$store.getters.InnerSize
    },
    height () {
      return this.InnerSize.height - 61 - 160
    }
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
@import '@style/index.scss';

.about-ctn{
  width: 80%;
  margin: 20px auto 0;
  padding: 20px 20px 40px 20px;
  background-color: #ffffff80;
  border-radius: 5px;

  overflow: hidden;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE 10+ */
  &::-webkit-scrollbar { /* WebKit */
    width: 0;
    height: 0;
  }
}
h1{
  text-align: center;
  color: #85ce61;
  font-size: 2.3rem;
  margin: 2rem 0 3rem;
}
.about-title{
  padding: 6px 15px;
  font-size: 1.7rem;
  background-color: #ecffee;
  color: #85ce61;
  border: 1px solid #85ce61;
}
.about-body{
  margin: 1rem 0;
  &>p{
    font-family: huakang-shaonv;
    font-size: 1.5rem;
    padding: 0 10px;
    text-indent: 2.8rem;
    line-height: 1.9rem;
  }
}

// 联系方式
.contact-information{
  display: flex;
}
// 联系信息
.contact-information > .contact-info{
  min-width: 310px;
  &>p{
    font-family: huakang-shaonv;
    font-size: 1.5rem;
    padding: 0 10px;
    text-indent: 2.8rem;
    line-height: 1.9rem;
  }
}
.contact-information > .WeChat2DCode{
  margin: 0 auto;
}
//  收款码
.PaymentCode{
  padding: 15px 0;
  text-align: center;
}
</style>
